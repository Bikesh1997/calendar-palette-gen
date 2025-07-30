import React from 'react';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from 'lucide-react';

interface MonthlyCardProps {
  month: string;
  monthIndex: number;
  events: string[];
  editableText: string;
  onTextChange: (text: string) => void;
}

const monthColors = [
  'monthly-january', 'monthly-february', 'monthly-march', 'monthly-april',
  'monthly-may', 'monthly-june', 'monthly-july', 'monthly-august',
  'monthly-september', 'monthly-october', 'monthly-november', 'monthly-december'
];

const MonthlyCard: React.FC<MonthlyCardProps> = ({
  month,
  monthIndex,
  events,
  editableText,
  onTextChange
}) => {
  const monthColor = monthColors[monthIndex];

  return (
    <Card className="relative overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-1">
      {/* Colorful header */}
      <div 
        className={`h-16 flex items-center justify-center text-white font-bold text-lg relative`}
        style={{ backgroundColor: `hsl(var(--${month.toLowerCase()}))` }}
      >
        <Calendar className="w-5 h-5 mr-2" />
        {month.toUpperCase()}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>
      
      {/* Content area */}
      <div className="p-4 space-y-3">
        {/* Original events preview */}
        {events.length > 0 && (
          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-2">Original Events ({events.length}):</p>
            <div className="space-y-1 max-h-24 overflow-y-auto">
              {events.slice(0, 3).map((event, index) => (
                <div key={index} className="text-xs bg-muted/50 rounded px-2 py-1 truncate">
                  {event}
                </div>
              ))}
              {events.length > 3 && (
                <div className="text-xs text-muted-foreground">
                  +{events.length - 3} more events...
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Editable textarea */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Editable Text for PDF:
          </label>
          <Textarea
            value={editableText}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder={`Add custom text for ${month}...`}
            className="min-h-[120px] resize-none border-2 focus:border-primary/50"
          />
        </div>
        
        {/* Events count badge */}
        <div className="flex justify-between items-center pt-2 border-t">
          <span className="text-xs text-muted-foreground">
            {events.length} events imported
          </span>
          <div 
            className={`px-3 py-1 rounded-full text-white text-xs font-medium`}
            style={{ backgroundColor: `hsl(var(--${month.toLowerCase()}))` }}
          >
            {month.slice(0, 3).toUpperCase()}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MonthlyCard;