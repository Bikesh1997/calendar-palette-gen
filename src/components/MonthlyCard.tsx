import React from 'react';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface MonthlyCardProps {
  month: string;
  monthIndex: number;
  events: string[];
  editableText: string;
  onTextChange: (text: string) => void;
}

const MonthlyCard: React.FC<MonthlyCardProps> = ({
  month,
  monthIndex,
  events,
  editableText,
  onTextChange
}) => {
  return (
    <Card className="relative overflow-hidden shadow-card hover:shadow-elevated transition-all duration-200 h-80 bg-white border border-gray-200">
      {/* Colorful header - matching reference design */}
      <div 
        className="h-12 flex items-center justify-center text-white font-bold text-base relative"
        style={{ backgroundColor: `hsl(var(--${month.toLowerCase()}))` }}
      >
        {month}
      </div>
      
      {/* Content area - clean and simple like reference */}
      <div className="p-3 h-68 flex flex-col">
        {/* Original events preview - compact */}
        {events.length > 0 && (
          <div className="text-xs text-gray-600 mb-2 pb-2 border-b border-gray-100">
            <span className="font-medium">{events.length} imported events</span>
          </div>
        )}
        
        {/* Editable textarea - main content area */}
        <div className="flex-1">
          <Textarea
            value={editableText}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder={`Add your plans for ${month}...`}
            className="w-full h-full resize-none border-0 shadow-none focus:ring-0 p-0 text-sm leading-relaxed placeholder:text-gray-400"
          />
        </div>
      </div>
    </Card>
  );
};

export default MonthlyCard;