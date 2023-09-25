import {SpotifyWebApi} from '.node_modules/spotify-web-api-node';

// Function to get the value of a cookie by name
function getCookie(name) {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Get the access token from the cookie
const accessToken = getCookie('access_token');

// Initialize the SpotifyWebApi object with the access token
const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(accessToken);

// Get the currently playing track
spotifyApi.getMyCurrentPlayingTrack()
  .then((response) => {
    // Handle the response
    console.log(response);
  })
  .catch((error) => {
    // Handle the error
    console.error(error);
  });
