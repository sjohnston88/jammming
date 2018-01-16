import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'

class App extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = { 
      searchResults: [{
        key: 0,
        name: 1,
        artist: "Nicole",
        album: "0uTjaH"
      },{
        key: 1,
        name: 1,
        artist: "Nicole",
        album: "0uTjaH" 
      },{
        key: 2,
        name: 1,
        artist: "Nicole",
        album: "0uTjaH" 
      }]
    }
      
  }
    
    

  render() {
    //console.log(this.state.searchResults);
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist />
          </div>
        </div>
      </div>
    );
  }
}

export default App;