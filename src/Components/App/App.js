import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import Spotify from '../../util/Spotify';

Spotify.getAccessToken();

class App extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = { 
      playlistName: 'Playlist Name',
      searchResults: [],
      playlistTracks: []
    }
    
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
      
  }

  addTrack(track){
    if (this.state.playlistTracks.indexOf(track) === -1 ){
      console.log(`${track.name} added to the playlist.`)
      track.isRemoval = true;
      this.setState({ 
        playlistTracks: this.state.playlistTracks.concat([track])
      })
    }
  }

  removeTrack(track){
    track.isRemoval = false;
    this.setState({ 
      playlistTracks: this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id)
    })
    console.log(`${track.name} removed from the playlist.`)
  }

  updatePlaylistName(name){
    this.setState({ 
      playlistName: name
    })
    console.log(`Playlist renamed to: ${name}`)
  }
    
  savePlaylist(){
    let trackURIs = []
    this.state.playlistTracks.forEach(track => {
      trackURIs.push(track.uri);
    }) 
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({
      playlistName: 'New Playlist', 
      playlistTracks: []
    });
  }

  search(term){
    Spotify.search(term)
    .then(searchResults => this.setState({
      searchResults: searchResults
    }));
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults onRemove={this.removeTrack} onAdd={this.addTrack} searchResults={this.state.searchResults} />
            <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;