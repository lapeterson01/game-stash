import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Home from './Home';
import GameList from './GameList';
import GameDetail from './GameDetail';
import Scores from './Scores';
import Profile from './Profile';
import Upload from './Upload';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <div className="container container-main" id="main-page">
              <Route exact path='/' component={Home} />
              <Route exact path='/games' component={GameList} />
              <Route exact path='/games/new' component={Upload} />
              <Route path='/games/detail/:gameID' component={GameDetail} />
              <Route path='/scores' component={Scores} />
              <Route path='/profile/:userID' component={Profile} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
