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
        id:1,
        name: 'Don\'t stop till you get enough',
        artist: "Michael Jackson",
        album: "Bad"
      },{
        id:2,
        name:'Hollywood Swinging',
        artist: "Sugarhill Gang",
        album: "Sugarhill Gang" 
      },{
        id:3,
        name: 'Livin Da Vie Da Loca',
        artist: "Ricky Martin",
        album: "NOW Thats Music 21" 
      }],
      playlistTracks: [{
        id:1,
        name: 'Don\'t stop till you get enough',
        artist: "Michael Jackson",
        album: "Bad"
      },{
        id:2,
        name:'Hollywood Swinging',
        artist: "Sugarhill Gang",
        album: "Sugarhill Gang" 
      },{
        id:3,
        name: 'Livin Da Vie Da Loca',
        artist: "Ricky Martin",
        album: "NOW Thats Music 21" 
      }]
      
    }
      
  }

  render() {
    //console.log(this.state.searchResults);
    return (
      <div>
        <h1>Ya<span className="highlight">nnn</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;