import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Logo from './images/logo.png';
import GojekLogo from './images/gojek.png';

import styles from './styles.css';

export class AppHeader extends React.Component {

  render() {
    return (
      <div className={styles.header}>
        <img className={styles.pplogo} src={Logo} alt="Pasarpolis Logo" />
        <img className={styles.gojeklogo} src={GojekLogo} alt="Gojek Logo" />
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

AppHeader.propTypes = {
};

export default connect(null, mapDispatchToProps)(AppHeader);
