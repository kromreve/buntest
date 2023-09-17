import { generateRandomString } from './utils.js';

export default {
  port: 3000,
  fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === '/auth/login') {
      const scope = 'user-read-private user-read-email';
      const state = generateRandomString(16);
      const authQueryParameters = new URLSearchParams({
        response_type: 'code',
        client_id: 'b68cdab7b33d4656a3e514c08a3598b5',
        scope: scope,
        redirect_uri: 'http://localhost:3000/index',
        state: state,
      });

      return Response.redirect(
        `https://accounts.spotify.com/authorize/?${authQueryParameters.toString()}`
      );
    }

    return new Response('Welcome to Bun!');
  },
};