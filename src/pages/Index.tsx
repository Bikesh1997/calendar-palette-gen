import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import CalendarUpload from '@/components/CalendarUpload';
import MonthlyCard from '@/components/MonthlyCard';
import { parseICSFile, MonthlyEvents, CalendarEvent } from '@/utils/calendarParser';
import { initiateGoogleAuth, exchangeCodeForEvents } from '@/utils/googleCalendar';
import { generatePDF, MonthData } from '@/utils/pdfGenerator';
import { Download, Calendar as CalendarIcon } from 'lucide-react';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const Index = () => {
  const [monthlyEvents, setMonthlyEvents] = useState<MonthlyEvents>({});
  const [editableTexts, setEditableTexts] = useState<Record<string, string>>({});
  const [editedEvents, setEditedEvents] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [hasData, setHasData] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    try {
      const events = await parseICSFile(file);
      setMonthlyEvents(events);
      setHasData(true);
      
      // Initialize editable texts as empty - events will be shown separately
      const initialTexts: Record<string, string> = {};
      MONTHS.forEach(month => {
        initialTexts[month] = '';
      });
      setEditableTexts(initialTexts);

      const totalEvents = Object.values(events).reduce((sum, events) => sum + events.length, 0);
      toast({
        title: "Calendar imported successfully!",
        description: `Imported ${totalEvents} events. Click on any event to edit it inline.`
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Import failed",
        description: error instanceof Error ? error.message : "Failed to parse calendar file"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleConnect = () => {
    setLoading(true);
    
    try {
      initiateGoogleAuth();
      
      // Listen for auth completion
      const handleMessage = async (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;
        
        if (event.data.type === 'GOOGLE_AUTH_SUCCESS' && event.data.code) {
          try {
            const events = await exchangeCodeForEvents(event.data.code);
            setMonthlyEvents(events);
            setHasData(true);
            
            // Initialize editable texts as empty
            const initialTexts: Record<string, string> = {};
            MONTHS.forEach(month => {
              initialTexts[month] = '';
            });
            setEditableTexts(initialTexts);

            const totalEvents = Object.values(events).reduce((sum, events) => sum + events.length, 0);
            toast({
              title: "Google Calendar connected successfully!",
              description: `Imported ${totalEvents} events. Click on any event to edit it inline.`
            });
          } catch (error) {
            toast({
              variant: "destructive",
              title: "Import failed",
              description: error instanceof Error ? error.message : "Failed to import Google Calendar events"
            });
          } finally {
            setLoading(false);
            window.removeEventListener('message', handleMessage);
          }
        }
      };

      window.addEventListener('message', handleMessage);
      
      // Remove loading state after a short delay if no response
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Connection failed",
        description: "Failed to connect to Google Calendar"
      });
      setLoading(false);
    }
  };

  const handleEventEdit = (month: string, eventId: string, newText: string) => {
    setEditedEvents(prev => ({
      ...prev,
      [`${month}-${eventId}`]: newText
    }));
  };

  const handleTextChange = (month: string, text: string) => {
    setEditableTexts(prev => ({
      ...prev,
      [month]: text
    }));
  };

  const generatePDFReport = async () => {
    setLoading(true);
    try {
      const monthsData: MonthData[] = MONTHS.map(month => {
        const monthEvents = monthlyEvents[month] || [];
        const events = monthEvents.map(event => {
          const editKey = `${month}-${event.id}`;
          const editedText = editedEvents[editKey];
          if (editedText) {
            return { id: event.id, text: editedText };
          }
          const day = event.start.getDate().toString().padStart(2, '0');
          return { id: event.id, text: `[${day}] ${event.title}` };
        });

        return {
          month,
          events,
          additionalNotes: editableTexts[month] || '',
          eventCount: monthEvents.length
        };
      });

      await generatePDF(monthsData);
      
      toast({
        title: "PDF generated successfully!",
        description: "Your yearly planner PDF has been downloaded in A4 landscape format."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "PDF generation failed",
        description: "There was an error generating your PDF."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Orange background like reference */}
      <div className="bg-gradient-header text-white py-8 mb-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">Yearly Planner</h1>
          <p className="text-lg mt-2 text-white/90">
            Import your calendar and organize your year
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8">
        {/* Upload Section */}
        {!hasData && (
          <div className="max-w-2xl mx-auto mb-12">
            <CalendarUpload
              onFileUpload={handleFileUpload}
              onGoogleConnect={handleGoogleConnect}
              loading={loading}
            />
          </div>
        )}

        {/* Monthly Cards Grid - 2 rows like reference */}
        {hasData && (
          <>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <CalendarIcon className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold text-foreground">
                  Your Yearly Overview
                </h2>
              </div>
              <Button
                onClick={generatePDFReport}
                disabled={loading}
                size="lg"
                className="bg-gradient-primary hover:shadow-elevated"
              >
                <Download className="w-5 h-5 mr-2" />
                Generate PDF
              </Button>
            </div>

            {/* Grid layout: 4x3 for landscape PDF compatibility */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8 max-w-7xl mx-auto">
              {MONTHS.map((month, index) => (
                <MonthlyCard
                  key={month}
                  month={month}
                  monthIndex={index}
                  events={monthlyEvents[month] || []}
                  editableText={editableTexts[month] || ''}
                  onTextChange={(text) => handleTextChange(month, text)}
                  onEventEdit={(eventId, newText) => handleEventEdit(month, eventId, newText)}
                />
              ))}
            </div>

            {/* Reset Button */}
            <div className="text-center">
              <Button
                variant="outline"
                onClick={() => {
                  setHasData(false);
                  setMonthlyEvents({});
                  setEditableTexts({});
                  setEditedEvents({});
                }}
                className="border-primary/30 hover:border-primary/50"
              >
                Import New Calendar
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
