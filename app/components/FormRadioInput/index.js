/**
*
* FormRadioInput
*
*/

import React, { PropTypes } from 'react';

import styles from './styles.css';

function capitalizeFirstLetter(string) {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return '';
}

class FormRadioInput extends React.Component {

  constructor(props) {
    let storedValue = localStorage.getItem(props.name);
    super(props);
    this.handleChange = this.handleChange.bind(this);
    if (!storedValue) {
      storedValue = props.options[0];
      localStorage.setItem(this.props.name, storedValue);
    }
    this.state = {
      value: storedValue,
    };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
    localStorage.setItem(this.props.name, e.target.value);
  }

  render() {
    const { options, name, altname } = this.props;
    const title = altname || capitalizeFirstLetter(name);
    const radios = options.map((option, i) => {
      const isChecked = this.state.value === option;
      return (
        <div className={styles.radioContainer} key={i}>
          <input type="radio" id={option} name={name} value={option} onChange={this.handleChange} checked={isChecked} />
          <label htmlFor={option}><span><span></span></span>{capitalizeFirstLetter(option)}</label>
        </div>
      );
    });
    return (
      <div className={styles.formRadioInput}>
        <span>{title}</span>
        {radios}
      </div>
    );
  }
}

// <span key={i}>
//   <input type="radio" name={name} value={option} onChange={this.handleChange} checked={isChecked} />
//   <label>&nbsp;{capitalizeFirstLetter(option)}</label>
// </span>

FormRadioInput.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  isChecked: PropTypes.bool,
  altname: PropTypes.string,
};

export default FormRadioInput;
