import React, { PropTypes } from 'react';

import styles from './styles.css';

function FormButton(props) {
  const { value, name } = props;
  return (
    <div className={styles.container}>
      <button type="button" name={name} className={styles.Button} onClick={props.handleRoute}><div className={styles.wave}></div>{value}</button>
    </div>
  );
}

FormButton.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleRoute: PropTypes.func,
};

export default FormButton;
