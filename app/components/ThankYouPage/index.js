/**
*
* ThankYouPage
*
*/

import React from 'react';

import styles from './styles.css';

import Benefits from './benefits.jpg';
import Benefits2 from './benefits2.jpg';

function ThankYouPage(props) {
  const benefitsImage = props.fullBenefits ? Benefits : Benefits2;

  return (
    <div className={styles.thankYouPage}>
      <h1>Terima Kasih</h1>
      <br />
      <p>SELAMAT! Sekarang anda terlindungi dengan GO-PROTEKSI</p>
      <img className={styles.benefits} src={benefitsImage} alt="Benefits" />
      <br />
      <span className={styles.text_bold}>Langkah Selanjutnya</span>
      <hr />
      <ul className={styles.checklist}>
        <li>Mohon pastikan bahwa SIM anda belum kadaluarsa selama masa berlaku polis asuransi atau anda tidak bisa melakukan klaim.</li>
      </ul>
    </div>
  );
}

ThankYouPage.propTypes = {
  fullBenefits: React.PropTypes.bool,
};

export default ThankYouPage;
