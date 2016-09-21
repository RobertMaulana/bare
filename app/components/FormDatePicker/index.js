/**
*
* FormDatePicker
*
*/

import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

import styles from './styles.css';

function capitalizeFirstLetter(string) {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return '';
}

class FormDatePicker extends React.Component {

  constructor(props) {
    let storedValue = localStorage.getItem(props.name);
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    if (!storedValue) {
      const d = new Date();
      d.setTime(d.getTime() - d.getTimezoneOffset() * 60 * 1000);
      storedValue = d.toISOString().slice(0, 10);
      localStorage.setItem(this.props.name, storedValue);
    }
    this.state = {
      value: storedValue,
      isError: false,
      errorMessage: 'SIM anda telah expired. Mohon perpanjang sebelum lanjut pendaftaran',
    };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
    localStorage.setItem(this.props.name, e.target.value);
  }

  handleBlur(e) {
    const dateSplit = e.target.value.split('-');
    const year = dateSplit[0];
    const month = dateSplit[1];
    const date = dateSplit[2];
    const expiryDate = new Date(year, month-1, date);
    const now = new Date();
    const simExpired = expiryDate < now;
    if (simExpired) {
      this.setState({ isError: true });
    } else {
      this.setState({ isError: false });
    }
  }

  render() {
    const cx = classNames.bind(styles);
    const titleLabel = this.props.title ? <span>{capitalizeFirstLetter(this.props.title)}</span> : '';
    let errorClass = cx({
      error: this.state.isError,
      notError: !this.state.isError,
    });

    let errorTextClass = cx({
      formDatePickerError: this.state.isError,
      formDatePicker: !this.state.isError,
    });

    return (
      <div className={styles.formDatePickerContainer}>
        <div className={errorTextClass}>
          {titleLabel}
          <input type="date" name={this.props.name} onChange={this.handleChange} onBlur={this.handleBlur} value={this.state.value} />
        </div>
        <div className={errorClass}>
          <label htmlFor={this.props.name}>{this.state.errorMessage}</label>
        </div>
      </div>
    );
  }
}

FormDatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default FormDatePicker;
