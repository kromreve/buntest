import { generateRandomString } from './utils.js';
import { getAccessToken } from './spotify.js';
import { readFileSync } from 'fs';

export default {
  port: 3000,
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === '/auth/login') {
      const scope = 'user-read-private user-read-email';
      const state = generateRandomString(16);
      const authQueryParameters = new URLSearchParams({
        response_type: 'code',
        client_id: 'b68cdab7b33d4656a3e514c08a3598b5',
        scope: scope,
        redirect_uri: 'http://localhost:3000/auth/callback',
        state: state,
      });

      return Response.redirect(
        `https://accounts.spotify.com/authorize/?${authQueryParameters.toString()}`
      );
    }

    if (url.pathname === '/auth/callback') {
      const code = url.searchParams.get('code');
      const accessToken = await getAccessToken(code);
      // Save the access token and use it for future API calls
      // You can store the access token in a cookie or session
      const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <script>
            setTimeout(function() {
              window.location.href = './client/home.html';
            }, 3000);
          </script>
        </head>
        <body>
          <p>Logged in successfully! Redirecting to the homepage...</p>
        </body>
      </html>`;
      return new Response(html, { headers: { 'Content-Type': 'text/html' } });
    }

    if (url.pathname === '/auth/client/home.html') {
      const homepageHtml = await readFileSync('./client/home.html', 'utf8');
      return new Response(homepageHtml, { headers: { 'Content-Type': 'text/html' } });
    }

    return new Response('Welcome to Bun!');
  },
};