/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import {
  selectStatus,
  selectError,
  selectSubmitted,
} from './selectors';
import { submitFormRequest } from './actions';
import { createStructuredSelector } from 'reselect';

// import styles from './styles.css';

import FormTextInput from 'components/FormTextInput';
import FormRadioInput from 'components/FormRadioInput';
import FormDatePicker from 'components/FormDatePicker';
import FormDropdownInput from 'components/FormDropdownInput';
import FormButton from 'components/FormButton';

const genderOptions = ['pria', 'wanita'];
const vehicleYears = ['2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005', '2004', '2003', '2002', '2001', '2000'];

export class HomePage extends React.Component {

  handleFormSubmit = () => {
    const textInputError = this.field1.state.isEmpty || this.field1.state.isError || this.field3.state.isEmpty || this.field3.state.isError || this.field4.state.isEmpty || this.field4.state.isError || this.field5.state.isEmpty || this.field5.state.isError || this.field7.state.isEmpty || this.field7.state.isError || this.field8.state.isEmpty || this.field8.state.isError;
    const radioInputError = !this.field2.state.value;
    const datePickerError = !this.field6.state.value || this.field6.state.isError;
    const specialistError = this.field10.state.isEmpty || this.field10.state.isError;
    const error = textInputError || radioInputError || datePickerError || specialistError;
    if (error) {
      alert('Formulir anda tidak komplit/ada data yang salah. Harap di rubah sebelum lanjut registrasi');
    } else {
      this.props.onSubmitForm();
    }
  }

  render() {
    let mainContent = null;
    if (this.props.submitted) {
      mainContent = (
        <div>
          Pendaftaran sukses
        </div>
      );
    } else {
      mainContent = (
        <div>
          <form onSubmit={this.props.onSubmitForm} id="goproteksiform">
            <FormTextInput ref={(c) => { this.field1 = c; }} type="text" name="name" label="Nama Lengkap (Sesuai KTP)" minLength="2" maxLength="100" />
            <FormTextInput ref={(c) => { this.field9 = c; }} type="text" name="policyNumber" label="Nomor Polis" minLength="4" maxLength="5" />
            <FormRadioInput ref={(c) => { this.field2 = c; }} name="gender" altname="Jenis Kelamin" options={genderOptions} />
            <FormTextInput ref={(c) => { this.field3 = c; }} type="email" name="email" label="Email" minLength="7" maxLength="50" />
            <FormTextInput ref={(c) => { this.field4 = c; }} type="tel" name="mobileNumber" label="Nomor HP (yang terdaftar di Gojek)" minLength="10" maxLength="15" />
            <FormTextInput ref={(c) => { this.field5 = c; }} type="tel" name="simNumber" label="Nomor SIM" minLength="12" maxLength="16" />
            <FormDatePicker ref={(c) => { this.field6 = c; }} name="simExpiryDate" title="Masa Berlaku SIM" />
            <FormTextInput ref={(c) => { this.field8 = c; }} name="vehiclePlate" label="Nomor Plat" minLength="3" maxLength="9" />
            <FormDropdownInput ref={(c) => { this.field7 = c; }} title="Tahun Kendaraan" name="vehicleYear" firstOption={vehicleYears[0]} input={vehicleYears} />
            <FormTextInput ref={(c) => { this.field10 = c; }} type="text" name="specialist" label="Insurance Specialist" minLength="2" maxLength="25" />
            <FormButton name="submit" value="Daftar Sekarang" handleRoute={this.handleFormSubmit} />
          </form>
        </div>
      );
    }
    return (
      <div>
        {mainContent}
      </div>
    );
  }
}

HomePage.propTypes = {
  onSubmitForm: React.PropTypes.func,
  submitted: React.PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(submitFormRequest());
    },
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  status: selectStatus(),
  error: selectError(),
  submitted: selectSubmitted(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
