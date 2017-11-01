require('es6-promise').polyfill();
require('universal-fetch');

import * as _ from 'lodash';
import * as React from 'react';
import * as moment from 'moment';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { v4 as uuidV4 } from 'uuid';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as deviceActions from '../actions/device';
import muiThemeProps from '../utils/material-theme';
import { stateTreeType } from '../reducers/initialState';
import { getLogger } from '../utils/logger/index';
const { Component } = React;
const cookies = require('next-cookies');

// Make sure react-tap-event-plugin only gets injected once 
// Needed for material-ui
if (!process.tapEventInjected) {
  injectTapEventPlugin();
  process.tapEventInjected = true;
}

export function getUserAgent(context) {
  if (process.browser) {
    return navigator.userAgent;
  }

  return context.req.headers['user-agent'];
}

export class App extends Component {
  static Logger = getLogger({ loggerPath: __filename });

  static async getInitialProps(context) {
    const { req, store } = context;
    const userAgent = getUserAgent(context);
    const serverCookies = cookies(context);
    const state = store.getState();

    return {
      // Ensures material-ui renders the correct css prefixes server-side
      userAgent
    }
  }

  async componentDidMount() {
    await this.props.setEnvironment('browser');
    await this.props.detectEnvironment();
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          App.Logger.log('service worker registration succeeded', registration)
        })
        .catch((err) => {
          App.Logger.warn('service worker registration failed', err)
        });
    }
  }

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { userAgent, children } = this.props;
    const muiTheme = getMuiTheme({
      userAgent,
      ...muiThemeProps,
    });

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          {children}
        </div>
      </MuiThemeProvider>
    )
  }
}

export const getInitialProps = App.getInitialProps;

const mapDispatchToProps = dispatch => ({
  setEnvironment: bindActionCreators(deviceActions.setEnvironment, dispatch),
  detectEnvironment: bindActionCreators(deviceActions.detectEnvironment, dispatch),
});

export const App = connect(undefined, mapDispatchToProps)(App);
