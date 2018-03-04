import * as _ from 'lodash';
import * as React from 'react';
import withRedux from 'next-redux-wrapper';
import RaisedButton from 'material-ui/RaisedButton';
import Router from 'next/router';
import { bindActionCreators } from 'redux';

import { initStore } from '../store';
import { Header } from '../components/utils/Header';
import { App, getInitialProps as appGetInitialProps } from '../containers/App';
import { getLogger } from '../utils/logger';

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    marginTop: '40px',
    height: '70px',
    width: 'auto',
  },
  header: {
    fontFamily: 'Lato',
    fontSize: 16,
    letterSpacing: 3.43,
    color: '#171717',
    marginBottom: '40px',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    height: 48,
    minWidth: 200,
    marginTop: 30,
    borderRadius: 4,
    alignSelf: 'center',
  },
  buttonText: {
    fontFamily: 'Lato',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2.0,
    color: '#ffffff',
  },
};

export class LandingPage extends React.Component {
  static Logger = getLogger({ loggerPath: __filename });

  static async getInitialProps(context) {
    return await appGetInitialProps(context);
  }

  render() {
    const { changeText, query, userAgent } = this.props;

    return (
      <App userAgent={userAgent}>
        <Header title='Ale' />
        <div className="login-page">
          <div className="form">
            <img src='/static/images/logo.png'
              alt='Ale logo'
              style={styles.image} />
            <h1 style={styles.header}>Ale</h1>
            <form className="login-form">
              <input type="text" placeholder="Username" />
              <input type="password" placeholder="Password" />
              <button>login</button>
              <p className="message">Not registered? <a href="#">Create an account</a></p>
            </form>
          </div>
        </div>
      </App>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(LandingPage)
