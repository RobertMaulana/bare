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
      <iframe width="100%" height="auto" src="https://www.youtube.com/embed/WdMXuygTO-I?autoplay=1" frameBorder="0" allowFullScreen></iframe>
      <br />
      <p>SELAMAT! Anda terlindungi dengan Asuransi Mudik - Mega Insurance dari Pasarpolis.com yang membuat mudik anda bebas cemas dan terlindungi.</p>
      <br />
      <span className={styles.text_bold}>Langkah Selanjutnya</span>
      <hr />
      <ul className={styles.checklist}>
        <li>Mohon periksa email Anda untuk download ePolis</li>
        <li>Polis akan berlaku 1 hari setelah registrasi</li>
      </ul>
      <br />
      <a href="https://www.pasarpolis.com/" className={styles.button}>Bandingkan Asuransi Lainnya</a>
    </div>
  );
}

export default ThankYouPage;
