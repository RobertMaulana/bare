import React from 'react';

import Logo from './images/logo.png';
import GojekLogo from './images/gojek.png';

import styles from './styles.css';

function AppHeader() {
  return (
    <div className={styles.header}>
      <img className={styles.pplogo} src={Logo} alt="Pasarpolis Logo" />
      <img className={styles.gojeklogo} src={GojekLogo} alt="Gojek Logo" />
    </div>
  );
}

export default AppHeader;
