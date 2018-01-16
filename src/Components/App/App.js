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
        id:1,
        name: 'testing',
        artist: "Nicole",
        album: "0uTjaH"
      },{
        id:2,
        name:'testing',
        artist: "Nicole",
        album: "0uTjaH" 
      },{
        id:3,
        name: 'testing',
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
          </div>
        </div>
      </div>
    );
  }
}

export default App;