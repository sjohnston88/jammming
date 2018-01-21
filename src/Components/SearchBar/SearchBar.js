import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {

  constructor(props){
    super(props);
    
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
    
  handleTermChange(event) {
    this.setState({term: event.target.value});
  }
    
  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.setState({term: event.target.value});
      this.search()
    }
  }

  search(){
    this.props.onSearch(this.state.term);
  }
    
  render(){
    return (
      <div className="SearchBar">
        <input onChange={this.handleTermChange} onKeyPress={this.handleKeyPress} placeholder="Enter A Song, Album, or Artist" />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;