import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import history from '../history';
import { ConnectedRouter } from 'react-router-redux';

import NotFound from './route/NotFound';
import AlbumListHandle from './route/AlbumListHandle';
import './style.css';

export default class App extends React.Component {
  render() {
    return (
      <ConnectedRouter history = {history}>
        <div>
          <Switch>
            <Redirect exact from = '/' to = '/albums' />
            <Route path = '/albums' component = {AlbumListHandle} />
            <Route component = {NotFound} />
          </Switch>
        </div>
      </ConnectedRouter>
    );
  }
}
