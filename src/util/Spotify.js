import secrets from './secrets.json';

const clientId = secrets.credentials.clientId;
const redirectUri = secrets.credentials.redirectUri;

let accessToken;
let expiresIn;
let userId;
let playlistId;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    } else {
      const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
      const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
      if (urlAccessToken && urlExpiresIn) {
        accessToken = urlAccessToken[1];
        expiresIn = urlExpiresIn[1];
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
      } else {
        window.location = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}`;
      }
    }
  },

  search(term) {
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term.replace(' ', '%20')}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(response => response.json())
      .then(jsonResponse => {
        if (!jsonResponse.tracks) {
          return [];
        } else {
          return jsonResponse.tracks.items.map(track => {
            return {
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              preview: track.preview_url,
              uri: track.uri
            }
          })
        }
    });
  },
    
  savePlaylist(name, trackURIs){
    if (!name || !trackURIs) {
      console.log('Give the playlist a new name and make sure it has some tracks.')
      return;
    } else {
      console.log(name)
      console.log(trackURIs)
      return fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => response.json())
        .then(jsonResponse => userId = jsonResponse.id)
          .then(() => {
            fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${accessToken}`
              },
              body: JSON.stringify({
                name: name
              })
          })
          .then(response => response.json())
            .then(jsonResponse => playlistId = jsonResponse.id)
              .then(() => {
                fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${accessToken}`
                  },
                  body: JSON.stringify({
                    uris: trackURIs
                  })
                });
              })
          })
    }
  }
}

export default Spotify;