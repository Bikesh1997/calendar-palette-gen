# Google Calendar Integration Setup

To enable Google Calendar integration in your Calendar Organizer app, you need to set up Google OAuth credentials and configure them in Supabase.

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Calendar API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Calendar API"
   - Click "Enable"

## Step 2: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Configure the consent screen if prompted
4. Set Application type to "Web application"
5. Add authorized redirect URIs:
   - `https://your-domain.com/auth/google/callback`
   - `http://localhost:8080/auth/google/callback` (for development)
6. Save and note down your Client ID and Client Secret

## Step 3: Configure Supabase Secrets

You need to add the following secrets to your Supabase project:

1. Go to your Supabase dashboard
2. Navigate to "Settings" > "Edge Functions" > "Secrets"
3. Add these secrets:
   - `GOOGLE_CLIENT_ID`: Your Google OAuth Client ID
   - `GOOGLE_CLIENT_SECRET`: Your Google OAuth Client Secret

## Step 4: Test the Integration

1. Make sure your Supabase edge function is deployed
2. Click "Connect Google Calendar" in the app
3. Complete the OAuth flow
4. Your Google Calendar events will be imported automatically

## Security Notes

- Never commit your Google credentials to version control
- Use environment variables for all sensitive information
- The OAuth flow is handled securely through Supabase edge functions
- Users' calendar data is processed client-side and not stored

## Troubleshooting

- **"OAuth error"**: Check that your redirect URIs are correctly configured
- **"API not enabled"**: Ensure Google Calendar API is enabled in your Google Cloud project
- **"Invalid client"**: Verify your Client ID and Secret are correctly set in Supabase
- **CORS errors**: Make sure your domain is added to authorized origins

The Google Calendar integration provides a seamless way to import events directly from users' Google calendars into the yearly planner format.