/**
*
* ThankYouPage
*
*/

import React from 'react';

import styles from './styles.css';

function ThankYouPage() {
  return (
    <div className={styles.thankYouPage}>
      <h1>Terima Kasih</h1>
      <br />
      <p>SELAMAT! Anda terlindungi dengan GO-PROTEKSI</p>
      <br />
      <span className={styles.text_bold}>Langkah Selanjutnya</span>
      <hr />
      <ul className={styles.checklist}>
        <li>Please ensure that your SIM does not expire during the validity of the insurance policy or you will not be covered.</li>
      </ul>
    </div>
  );
}

export default ThankYouPage;
