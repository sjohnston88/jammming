import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'

class App extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = { 
      playlistName: 'Playlist Name',
      searchResults: [{
        id: 1,
        uri: '1',
        name: 'Don\'t stop till you get enough',
        artist: "Michael Jackson",
        album: "Bad",
        isRemoval:false
      },{
        id: 2,
        uri: '2',
        name:'Hollywood Swinging',
        artist: "Sugarhill Gang",
        album: "Sugarhill Gang",
        isRemoval: false,
      },{
        id: 3,
        uri: '3',
        name: 'Livin Da Vie Da Loca',
        artist: "Ricky Martin",
        album: "NOW Thats Music 21",
        isRemoval:false
      }],
      playlistTracks: []
    }
    
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
      
  }

  addTrack(track){
    if (this.state.playlistTracks.indexOf(track) === -1 ){
      console.log(`${track.name} added to the array.`)
      track.isRemoval = true;
      this.setState({ 
        playlistTracks: this.state.playlistTracks.concat([track])
      })
    } else {
        console.log(`${track.name} already exists in the array.`)
    }
  }

  removeTrack(track){
    track.isRemoval = false;
    this.setState({ 
      playlistTracks: this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id)
    })
    console.log(`${track.name} removed from the array.`)
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
    console.log(trackURIs);
  }

  render() {
    return (
      <div>
        <h1>Ya<span className="highlight">nnn</span>ing</h1>
        <div className="App">
          <SearchBar />
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