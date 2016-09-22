/**
*
* FormRadioInput
*
*/

import React, { PropTypes } from 'react';

import styles from './styles.css';
import classNames from 'classnames/bind';

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
      storedValue = this.props.options[0];
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
    const { options, name, altname, id, type } = this.props;
    const title = altname || capitalizeFirstLetter(name);
    const cx = classNames.bind(styles);
    let radioContainer;
    if (name === 'health_time' || name === 'car_time' || name === 'motorcycle_time' || name === 'personalaccident_time' || name === 'travel_time' || name === 'life_time') {
      radioContainer = cx(styles.radioContainerTime);
    } else {
      radioContainer = cx(styles.radioContainer);
    }
    const radios = options.map((option, i) => {
      const isChecked = this.state.value === option;
      let idValue;
      if (type === 'travel') {
        idValue = id + i;
      } else {
        idValue = option;
      }
      return (
        <div className={radioContainer} key={i}>
          <input type="radio" id={idValue} name={name} value={option} onChange={this.handleChange} checked={isChecked} />
          <label htmlFor={idValue}><span><span></span></span><div className={styles.optionValue}>{capitalizeFirstLetter(option)}</div></label>
        </div>
      );
    });
    return (
      <div className={styles.formRadioInput}>
        <div className={styles.boxTitle}>
          <span>{title}</span>
        </div>
        {radios}
      </div>
    );
  }
}

FormRadioInput.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  altname: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
};

export default FormRadioInput;
