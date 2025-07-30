import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, Calendar, Link } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CalendarUploadProps {
  onFileUpload: (file: File) => void;
  onGoogleConnect: () => void;
  loading?: boolean;
}

const CalendarUpload: React.FC<CalendarUploadProps> = ({
  onFileUpload,
  onGoogleConnect,
  loading = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.name.endsWith('.ics')) {
        onFileUpload(file);
      } else {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please select a .ics calendar file"
        });
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="p-8 text-center bg-gradient-hero border-2 border-dashed border-primary/30 hover:border-primary/50 transition-colors">
      <div className="space-y-6">
        <div className="space-y-2">
          <Calendar className="w-16 h-16 mx-auto text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Import Your Calendar</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Upload an .ics file or connect to Google Calendar to organize your events by month
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={triggerFileInput}
            disabled={loading}
            size="lg"
            className="bg-gradient-primary hover:shadow-elevated"
          >
            <Upload className="w-5 h-5 mr-2" />
            Upload .ics File
          </Button>

          <div className="text-muted-foreground">or</div>

          <Button
            onClick={onGoogleConnect}
            disabled={loading}
            variant="outline"
            size="lg"
            className="border-primary/30 hover:border-primary/50 hover:bg-primary/5"
          >
            <Link className="w-5 h-5 mr-2" />
            Connect Google Calendar
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".ics"
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="text-xs text-muted-foreground">
          Supported formats: .ics (iCalendar)
        </div>
      </div>
    </Card>
  );
};

export default CalendarUpload;