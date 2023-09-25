import SpotifyWebApi from 'spotify-web-api-js';
const clientId = 'b68cdab7b33d4656a3e514c08a3598b5';
const clientSecret = '49c95fe5520e4091ba2cee4879605763';
const redirectUri = 'http://localhost:3000/auth/callback';

export async function getAccessToken(code) {
  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
    client_id: clientId,
    client_secret: clientSecret,
  });

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error('Failed to get access token');
  }

  const data = await response.json();
  return data.access_token;
}