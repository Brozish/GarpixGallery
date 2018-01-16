import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import history from '../history';
import { ConnectedRouter } from 'react-router-redux';
import Grid from 'react-bootstrap/lib/Grid';

import NotFound from './route/NotFound';
import AlbumListHandle from './route/AlbumListHandle';
import './style.css';
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

export default class App extends React.Component {
  render() {
    return (
      <ConnectedRouter history = {history}>
        <Grid>
          <Switch>
            <Redirect exact from = '/' to = '/albums' />
            <Route path = '/albums' component = {AlbumListHandle} />
            <Route component = {NotFound} />
          </Switch>
        </Grid>
      </ConnectedRouter>
    );
  }
}
