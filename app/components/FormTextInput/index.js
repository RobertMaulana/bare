/**
*
* FormTextInput
*
*/

import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

import TickIcon from './tick-icon.png';
import styles from './styles.css';

class FormTextInput extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    const storedValue = localStorage.getItem(props.name) || '';
    const isEmpty = storedValue.length === 0;
    const initialLabelState = Boolean(localStorage.getItem(`${props.name}ShouldMinimize`)) || false;
    localStorage.setItem(props.name, storedValue);

    let errorState = false;
    let errorMessage = 'Field tidak boleh kosong';
    switch (props.name) {
      case 'email':
        errorState = !this.validEmail(storedValue);
        errorMessage = 'Email tidak valid';
        break;
      case 'phone':
        errorState = !this.validHPNumber(storedValue);
        errorMessage = 'Nomor HP tidak valid';
        break;
      case 'zipcode':
        errorState = !this.validZipCode(storedValue);
        errorMessage = 'Zipcode tidak valid';
        break;
      default:
        errorState = !this.validText(storedValue);
        errorMessage = this.onlyLetters(storedValue) ? 'Input anda terlalu pendek' : 'Hanya bisa menggunakan huruf';
        break;
    }

    if (storedValue.length === 0) {
      errorState = false;
      errorMessage = 'Field tidak boleh kosong';
    }

    this.state = {
      value: storedValue,
      isError: errorState,
      labelShouldMinimize: initialLabelState,
      errorMessage,
      isEmpty,
      isEditing: false,
      hasIllegalCharacter: false,
    };
  }

  onlyLetters(e) {
    const letterValidate = /^[a-zA-Z\s]*$/;
    const matched = e.match(letterValidate);
    return matched;
  }

  validEmail(e) {
    const emailValidate = /^[-a-z0-9~!$%^&*_=+}{'?]+(\.[-a-z0-9~!$%^&*_=+}{'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/;
    const matched = e.match(emailValidate);
    return matched;
  }

  validText(e) {
    const textValidate = new RegExp(`^[a-zA-Z ]{${this.props.minLength},${this.props.maxLength}}$`);
    const matched = e.match(textValidate);
    return matched;
  }

  validHPNumber(e) {
    const hpNumberValidate = /^\+?620?8[0-9]{8,10}$|^08[0-9]{8,10}$/;
    const matched = e.match(hpNumberValidate);
    return matched;
  }

  validZipCode(e) {
    const zipcodeValidate = /^[0-9]{5}$/;
    const matched = e.match(zipcodeValidate);
    return matched;
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
    localStorage.setItem(this.props.name, e.target.value);
    if (e.target.type === 'text') {
      const charValidate = /^[a-zA-Z \s]*$/;
      if (e.target.value.match(charValidate)) {
        this.setState({ hasIllegalCharacter: false });
      } else {
        this.setState({ hasIllegalCharacter: true });
        this.setState({ errorMessage: 'Hanya bisa menggunakan huruf' });
      }
    }
  }

  handleBlur(e) {
    this.setState({ isEditing: false });
    if (e.target.value === '') {
      this.setState({ isError: true });
      this.setState({ isEmpty: true });
      this.setState({ labelShouldMinimize: false });
      this.setState({ errorMessage: 'Field tidak boleh kosong' });
      localStorage.removeItem(`${this.props.name}ShouldMinimize`);
    } else if (e.target.value !== '') {
      this.setState({ isError: false });
      this.setState({ isEmpty: false });
      this.setState({ labelShouldMinimize: true });
      localStorage.setItem(`${this.props.name}ShouldMinimize`, '1');
      if (e.target.name === 'email') {
        if (this.validEmail(e.target.value)) {
          this.setState({ isError: false });
        } else {
          this.setState({ errorMessage: 'Email tidak valid' });
          this.setState({ isError: true });
        }
      } else if (e.target.name === 'phone') {
        if (this.validNumber(e.target.value)) {
          this.setState({ isError: false });
        } else {
          this.setState({ errorMessage: 'Nomor HP tidak valid' });
          this.setState({ isError: true });
        }
      } else if (e.target.name === 'zipcode') {
        if (this.validZipCode(e.target.value)) {
          this.setState({ isError: false });
        } else {
          this.setState({ errorMessage: 'Kode pos tidak valid' });
          this.setState({ isError: true });
        }
      } else if (e.target.type === 'text') {
        if (this.validText(e.target.value)) {
          this.setState({ isError: false });
        } else {
          this.setState({ isError: true });
          if (this.onlyLetters(e.target.value)) {
            this.setState({ errorMessage: 'Input anda terlalu pendek.' });
          } else {
            this.setState({ errorMessage: 'Hanya bisa menggunakan huruf' });
          }
        }
      }
    }
  }

  handleFocus() {
    this.setState({ labelShouldMinimize: true });
    this.setState({ isEditing: true });
  }

  render() {
    const cx = classNames.bind(styles);
    const type = this.props.type || 'text';
    let errorClass = cx({
      error: this.state.isError,
      notError: !this.state.isError,
    });

    let errorTextClass = cx({
      formTextInputError: (this.state.isError && !this.state.isEditing) || this.state.hasIllegalCharacter,
      formTextInput: !this.state.isError || this.state.isEditing,
    });

    let labelClass = cx({
      labelTitle: !this.state.labelShouldMinimize,
      labelTitleFocus: this.state.labelShouldMinimize,
    });

    let verifiedTickClass = cx({
      verifiedTickError: this.state.isError || this.state.isEmpty || this.state.isEditing,
      verifiedTick: !this.state.isError && !this.state.isEmpty && !this.state.isEditing,
    });

    const divStyle = {
      backgroundImage: `url(${TickIcon})`,
      backgroundSize: '20px 20px',
      backgroundRepeat: 'no-repeat',
    };

    return (
      <div>
        <div className={errorTextClass}>
          <input type={type} id={this.props.name} name={this.props.name} value={this.state.value} onChange={this.handleChange} onFocus={this.handleFocus} onBlur={this.handleBlur} placeholder={this.props.placeholder} minLength={this.props.minLength} maxLength={this.props.maxLength} />
          <label className={labelClass}>{this.props.label}</label>
        </div>
        <div className={verifiedTickClass} style={divStyle}></div>
        <div className={errorClass}>
          <label>{this.state.errorMessage}</label>
        </div>
      </div>
    );
  }
}

FormTextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  maxLength: PropTypes.string,
  minLength: PropTypes.string,
};

export default FormTextInput;
