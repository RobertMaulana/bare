/**
*
* FormCheckbox
*
*/

import React, { PropTypes } from 'react';

import styles from './styles.css';

class FormCheckbox extends React.Component {

  constructor(props) {
    const storedValues = JSON.parse(localStorage.getItem(props.name)) || [];
    super(props);
    this.handleChange = this.handleChange.bind(this);
    // if (props.isChecked) {
    if (storedValues.indexOf(props.value) === -1) {
      storedValues.push(props.value);
    }
    // }
    localStorage.setItem(props.name, JSON.stringify(storedValues));
    this.state = {
      values: storedValues,
      checked: props.isChecked || false,
    };
  }

  handleChange(e) {
    const storedValues = JSON.parse(localStorage.getItem(this.props.name));
    const index = storedValues.indexOf(this.props.value);
    this.setState({ checked: e.target.checked });
    if (e.target.checked) {
      if (index === -1) {
        storedValues.push(this.props.value);
        localStorage.setItem(this.props.name, JSON.stringify(storedValues));
      }
    } else if (index > -1) {
      storedValues.splice(index, 1);
      localStorage.setItem(this.props.name, JSON.stringify(storedValues));
    }
  }

  render() {
    return (
      <div className={styles.formCheckbox}>
        <div className={styles.checkboxContainer}>
          <input type="checkbox" id="agreement" name={this.props.name} value={this.props.value} onChange={this.handleChange} checked={this.state.checked} />
          <label htmlFor="agreement"><span><span></span></span><div className={styles.labelMessage}>{this.props.message}</div></label>
        </div>
      </div>
    );
  }
}

FormCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  isChecked: PropTypes.bool,
};

export default FormCheckbox;
