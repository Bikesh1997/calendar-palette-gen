import ICAL from 'ical.js';

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  location?: string;
}

export interface MonthlyEvents {
  [month: string]: CalendarEvent[];
}

export const parseICSFile = async (file: File): Promise<MonthlyEvents> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const icsData = e.target?.result as string;
        const jcalData = ICAL.parse(icsData);
        const comp = new ICAL.Component(jcalData);
        const vevents = comp.getAllSubcomponents('vevent');
        
        const monthlyEvents: MonthlyEvents = {
          January: [],
          February: [],
          March: [],
          April: [],
          May: [],
          June: [],
          July: [],
          August: [],
          September: [],
          October: [],
          November: [],
          December: []
        };

        vevents.forEach((vevent) => {
          const event = new ICAL.Event(vevent);
          
          const calendarEvent: CalendarEvent = {
            id: event.uid || Math.random().toString(36),
            title: event.summary || 'Untitled Event',
            start: event.startDate.toJSDate(),
            end: event.endDate.toJSDate(),
            description: event.description || '',
            location: event.location || ''
          };

          const monthName = calendarEvent.start.toLocaleString('default', { month: 'long' });
          if (monthlyEvents[monthName]) {
            monthlyEvents[monthName].push(calendarEvent);
          }
        });

        // Sort events by date within each month
        Object.keys(monthlyEvents).forEach(month => {
          monthlyEvents[month].sort((a, b) => a.start.getTime() - b.start.getTime());
        });

        resolve(monthlyEvents);
      } catch (error) {
        reject(new Error('Failed to parse calendar file: ' + error));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
};

export const formatEventForDisplay = (event: CalendarEvent): string => {
  const date = event.start.toLocaleDateString();
  const time = event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return `${date} ${time} - ${event.title}`;
};

export const getEventsAsText = (events: CalendarEvent[]): string[] => {
  return events.map(formatEventForDisplay);
};