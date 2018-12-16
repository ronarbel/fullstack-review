import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import { stringify } from 'querystring';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    
  }

  addRepos (repos) {
    this.setState({repos: repos});
  }

  getRepos () {
    console.log('----GETTING REPOS ')
    $.ajax({
      method: "GET",
      url: "http://localhost:1128/repos",
      success: (data) => { this.addRepos(data) }
    })
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      method: "POST",
      url: "http://localhost:1128/repos",
      data: {term},
      dataType: "json",
      success: console.log
    })
  }

  componentDidMount () {
    this.getRepos()
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));