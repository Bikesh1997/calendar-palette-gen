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

            {/* Grid layout matching reference: 3 columns x 4 rows */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 max-w-6xl mx-auto">
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
