import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import CalendarUpload from '@/components/CalendarUpload';
import MonthlyCard from '@/components/MonthlyCard';
import { parseICSFile, MonthlyEvents, getEventsAsText } from '@/utils/calendarParser';
import { generatePDF, MonthData } from '@/utils/pdfGenerator';
import { Download, Calendar as CalendarIcon } from 'lucide-react';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const Index = () => {
  const [monthlyEvents, setMonthlyEvents] = useState<MonthlyEvents>({});
  const [editableTexts, setEditableTexts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [hasData, setHasData] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    try {
      const events = await parseICSFile(file);
      setMonthlyEvents(events);
      setHasData(true);
      
      // Initialize editable texts with event summaries
      const initialTexts: Record<string, string> = {};
      MONTHS.forEach(month => {
        const monthEvents = events[month] || [];
        initialTexts[month] = monthEvents
          .map(event => `• ${event.title}`)
          .join('\n');
      });
      setEditableTexts(initialTexts);

      const totalEvents = Object.values(events).reduce((sum, events) => sum + events.length, 0);
      toast({
        title: "Calendar imported successfully!",
        description: `Imported ${totalEvents} events from your calendar.`
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
    toast({
      title: "Coming soon!",
      description: "Google Calendar integration will be available in the next update."
    });
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
      const monthsData: MonthData[] = MONTHS.map(month => ({
        month,
        text: editableTexts[month] || '',
        eventCount: monthlyEvents[month]?.length || 0
      }));

      await generatePDF(monthsData);
      
      toast({
        title: "PDF generated successfully!",
        description: "Your calendar overview has been downloaded."
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
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CalendarIcon className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Calendar Organizer
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Import your calendar events, organize them by month, and create beautiful PDF overviews
          </p>
        </div>

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

        {/* Monthly Cards Grid */}
        {hasData && (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">
                Annual Overview
              </h2>
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {MONTHS.map((month, index) => (
                <MonthlyCard
                  key={month}
                  month={month}
                  monthIndex={index}
                  events={getEventsAsText(monthlyEvents[month] || [])}
                  editableText={editableTexts[month] || ''}
                  onTextChange={(text) => handleTextChange(month, text)}
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
