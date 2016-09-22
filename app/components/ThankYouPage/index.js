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
      <p>SELAMAT! Sekarang anda terlindungi dengan GO-PROTEKSI</p>
      <br />
      <span className={styles.text_bold}>Langkah Selanjutnya</span>
      <hr />
      <ul className={styles.checklist}>
        <li>Mohon pastikan bahwa SIM anda belum kadaluarsa selama masa berlaku polis asuransi atau anda tidak bisa melakukan klaim.</li>
      </ul>
    </div>
  );
}

export default ThankYouPage;
