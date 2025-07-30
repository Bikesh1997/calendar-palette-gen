import { CalendarEvent, MonthlyEvents } from './calendarParser';

interface GoogleCalendarEvent {
  id: string;
  summary?: string;
  start?: {
    dateTime?: string;
    date?: string;
  };
  end?: {
    dateTime?: string;
    date?: string;
  };
  description?: string;
  location?: string;
}

export const initiateGoogleAuth = (): void => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'your-google-client-id';
  const redirectUri = `${window.location.origin}/auth/google/callback`;
  
  const scope = 'https://www.googleapis.com/auth/calendar.readonly';
  const responseType = 'code';
  const accessType = 'offline';
  const prompt = 'consent';

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${clientId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `scope=${encodeURIComponent(scope)}&` +
    `response_type=${responseType}&` +
    `access_type=${accessType}&` +
    `prompt=${prompt}`;

  // Open in popup window
  const popup = window.open(
    authUrl,
    'google-auth',
    'width=500,height=600,scrollbars=yes,resizable=yes'
  );

  // Listen for the popup to close or receive a message
  const checkClosed = setInterval(() => {
    if (popup?.closed) {
      clearInterval(checkClosed);
      // Handle popup closed without completion
    }
  }, 1000);

  // Listen for messages from the popup
  window.addEventListener('message', (event) => {
    if (event.origin !== window.location.origin) return;
    
    if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
      clearInterval(checkClosed);
      popup?.close();
      // The actual handling will be done in the component
    }
  });
};

export const exchangeCodeForEvents = async (code: string): Promise<MonthlyEvents> => {
  const redirectUri = `${window.location.origin}/auth/google/callback`;
  
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  const response = await fetch(`${supabaseUrl}/functions/v1/google-calendar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${supabaseKey}`,
    },
    body: JSON.stringify({
      code,
      redirect_uri: redirectUri,
    }),
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch calendar events');
  }

  return parseGoogleEvents(data.events);
};

const parseGoogleEvents = (googleEvents: GoogleCalendarEvent[]): MonthlyEvents => {
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

  googleEvents.forEach((googleEvent) => {
    try {
      // Handle both dateTime and date formats
      const startDate = googleEvent.start?.dateTime 
        ? new Date(googleEvent.start.dateTime)
        : googleEvent.start?.date 
        ? new Date(googleEvent.start.date + 'T00:00:00')
        : null;

      const endDate = googleEvent.end?.dateTime 
        ? new Date(googleEvent.end.dateTime)
        : googleEvent.end?.date 
        ? new Date(googleEvent.end.date + 'T23:59:59')
        : startDate;

      if (!startDate) return;

      const calendarEvent: CalendarEvent = {
        id: googleEvent.id,
        title: googleEvent.summary || 'Untitled Event',
        start: startDate,
        end: endDate || startDate,
        description: googleEvent.description || '',
        location: googleEvent.location || ''
      };

      const monthName = startDate.toLocaleString('default', { month: 'long' });
      if (monthlyEvents[monthName]) {
        monthlyEvents[monthName].push(calendarEvent);
      }
    } catch (error) {
      console.warn('Failed to parse Google Calendar event:', googleEvent, error);
    }
  });

  // Sort events by date within each month
  Object.keys(monthlyEvents).forEach(month => {
    monthlyEvents[month].sort((a, b) => a.start.getTime() - b.start.getTime());
  });

  return monthlyEvents;
};

export const handleGoogleAuthCallback = (): Promise<string | null> => {
  return new Promise((resolve) => {
    // This will be called from the popup window
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');

    if (error) {
      console.error('Google Auth error:', error);
      resolve(null);
      return;
    }

    if (code) {
      // Send message to parent window
      window.opener?.postMessage({
        type: 'GOOGLE_AUTH_SUCCESS',
        code: code
      }, window.location.origin);
      
      resolve(code);
    } else {
      resolve(null);
    }
  });
};