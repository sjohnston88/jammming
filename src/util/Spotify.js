import secrets from './secrets.json';

console.log(secrets);

let accessToken;
let expiresIn;
const clientId = secrets.credentials.clientId;
const redirectUri = secrets.credentials.redirectUri;
const spotifyUrl = `https://accounts.spotify.com/authorize?response_type=token&scope=playlist-modify-public&client_id=${clientId}&redirect_uri=${redirectUri}`;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if (urlAccessToken && urlExpiresIn) {
      accessToken = urlAccessToken[1];
      expiresIn = urlExpiresIn[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      window.location = spotifyUrl;
    }
  },

  search(term) {
    const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term.replace(' ', '%20')}`;
    return fetch(searchUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(jsonResponse => {
      if (!jsonResponse.tracks) return [];
        return jsonResponse.tracks.items.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }
        })
    });
  }
}

export default Spotify;