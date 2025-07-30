import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { CalendarEvent } from '@/utils/calendarParser';
import { Edit3, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MonthlyCardProps {
  month: string;
  monthIndex: number;
  events: CalendarEvent[];
  editableText: string;
  onTextChange: (text: string) => void;
  onEventEdit?: (eventId: string, newText: string) => void;
}

interface EditableEventProps {
  event: CalendarEvent;
  onSave: (newText: string) => void;
}

const EditableEvent: React.FC<EditableEventProps> = ({ event, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(() => {
    const day = event.start.getDate().toString().padStart(2, '0');
    return `[${day}] ${event.title}`;
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    onSave(text);
    setIsEditing(false);
  };

  const handleCancel = () => {
    const day = event.start.getDate().toString().padStart(2, '0');
    setText(`[${day}] ${event.title}`);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-1 group">
        <input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 text-xs bg-transparent border-b border-primary/50 focus:outline-none focus:border-primary"
          autoFocus
        />
        <Button
          size="sm"
          variant="ghost"
          onClick={handleSave}
          className="h-5 w-5 p-0 text-green-600 hover:text-green-700"
        >
          <Save className="h-3 w-3" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleCancel}
          className="h-5 w-5 p-0 text-red-600 hover:text-red-700"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    );
  }

  return (
    <div 
      className="flex items-center justify-between group hover:bg-gray-50 px-1 py-0.5 rounded cursor-pointer"
      onClick={() => setIsEditing(true)}
    >
      <span className="text-xs text-gray-700 flex-1">{text}</span>
      <Edit3 className="h-3 w-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

const MonthlyCard: React.FC<MonthlyCardProps> = ({
  month,
  monthIndex,
  events,
  editableText,
  onTextChange,
  onEventEdit
}) => {
  const handleEventSave = (eventId: string, newText: string) => {
    onEventEdit?.(eventId, newText);
  };

  return (
    <Card className="relative overflow-hidden shadow-card hover:shadow-elevated transition-all duration-200 h-80 bg-white border border-gray-200">
      {/* Colorful header - matching reference design */}
      <div 
        className="h-12 flex items-center justify-center text-white font-bold text-base relative"
        style={{ backgroundColor: `hsl(var(--${month.toLowerCase()}))` }}
      >
        {month}
      </div>
      
      {/* Content area */}
      <div className="p-3 h-68 flex flex-col">
        {/* Imported events list - editable */}
        {events.length > 0 && (
          <div className="mb-3 pb-3 border-b border-gray-100">
            <div className="text-xs font-medium text-gray-600 mb-2">
              Imported Events ({events.length}):
            </div>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {events.map((event) => (
                <EditableEvent
                  key={event.id}
                  event={event}
                  onSave={(newText) => handleEventSave(event.id, newText)}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Additional notes area */}
        <div className="flex-1 flex flex-col">
          <label className="text-xs font-medium text-gray-600 mb-1">
            Additional Notes:
          </label>
          <Textarea
            value={editableText}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder={`Add custom notes for ${month}...`}
            className="flex-1 resize-none border-0 shadow-none focus:ring-0 p-0 text-xs leading-relaxed placeholder:text-gray-400"
          />
        </div>
      </div>
    </Card>
  );
};

export default MonthlyCard;