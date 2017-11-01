import * as _ from 'lodash';
import * as React from 'react';
import * as withRedux from 'next-redux-wrapper';
import RaisedButton from 'material-ui/RaisedButton';
import Router from 'next/router';
import { bindActionCreators } from 'redux';

import { initStore } from '../store';
import { Header } from '../components/utils/Header';
import { App, getInitialProps as appGetInitialProps } from '../containers/App';
import { SearchField } from '../components/inputs/SearchField';
import { getLogger } from '../utils/logger';

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center' as 'center',
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
    flexDirection: 'column' as 'column',
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
    fontWeight: 'bold' as 'bold',
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
        <Header title='Index page title' />
        <div style={styles.wrapper} >
          <img src='/static/images/seemba-logo.png'
            alt='Seemba logo'
            style={styles.image} />
          <h1 style={styles.header}>SEEMBA</h1>
          <form onSubmit={this.submit}
            style={styles.form}>
            <SearchField
              value={query}
              onSearch={this.submit}
              onChange={changeText}
              placeholder='What are you looking for?'
              onClear={this.clear} />
            <RaisedButton
              labelStyle={styles.buttonText}
              type='submit'
              label='SEARCH'
              primary
              style={styles.button} />
          </form>
        </div>
      </App>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeText: bindActionCreators(searchActions.changeSearchText, dispatch),
    submitForm: bindActionCreators(searchActions.submitSearchForm, dispatch),
    push: bindActionCreators(routesActions.pushRoute, dispatch),
    clearForm: bindActionCreators(searchActions.clearSearchForm, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    query: state.searchForm.query,
    routeSearch: _.get(state, 'routes.currentRoute.query.q', null),
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(LandingPage)
