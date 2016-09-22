/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
// import Helmet from 'react-helmet';

import {
  selectStatus,
  selectSubmitted,
  selectError,
  selectIPAddress,
  selectFullBenefits,
} from './selectors';
import { submitFormRequest, ipAddressRequest, updateVehicleAge } from './actions';
import { createStructuredSelector } from 'reselect';

// import messages from './messages';
// import { FormattedMessage } from 'react-intl';

import styles from './styles.css';

import ThankYouPage from 'components/ThankYouPage';
import FormTextInput from 'components/FormTextInput';
import FormRadioInput from 'components/FormRadioInput';
import FormDatePicker from 'components/FormDatePicker';
import FormCheckbox from 'components/FormCheckbox';
import FormButton from 'components/FormButton';
import List from 'components/List';
import LoadingIndicator from 'components/LoadingIndicator';

import GoProteksi from './goproteksi.png';
import Benefits from './benefits.jpg';
import Benefits2 from './benefits2.jpg';

const tncMessage = 'Saya setuju untuk mengambil program asuransi dengan manfaat terlampir, dimana saya akan mengikuti program beli asuransi 2 bulan gratis 1 bulan dengan harga premi per bulan Rp. 15,000 yang akan di bayarkan melalui GO Credit saya.';
const genderOptions = ['pria', 'wanita'];

export class HomePage extends React.Component {

  componentDidMount() {
    this.props.ipAddressRequest();
    this.startPolling();
  }

  componentWillUnmount() {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  }

  startPolling() {
    var self = this;
    setTimeout(function() {
      self.poll(); // do it once and then start it up ...
      self._timer = setInterval(self.poll.bind(self), 1000);
    }, 1000);
  }

  poll() {
    const vehicleAge = localStorage.getItem('vehicleAge');
    if (vehicleAge) {
      this.props.updateVehicleAge(vehicleAge);
    }
  }

  handleFormSubmit = () => {
    const textInputError = this.refs.field1.state.isEmpty || this.refs.field1.state.isError || this.refs.field3.state.isEmpty || this.refs.field3.state.isError || this.refs.field4.state.isEmpty || this.refs.field4.state.isError || this.refs.field5.state.isEmpty || this.refs.field5.state.isError || this.refs.field7.state.isEmpty || this.refs.field7.state.isError || this.refs.field8.state.isEmpty || this.refs.field8.state.isError;
    const radioInputError = !this.refs.field2.state.value;
    const datePickerError = !this.refs.field6.state.value || this.refs.field6.state.isError;
    const checkBoxError = !this.refs.field9.state.checked;
    const error = textInputError || radioInputError || datePickerError || checkBoxError;
    if (error) {
      alert('Formulir anda tidak komplit/ada data yang salah. Harap di rubah sebelum lanjut registrasi');
    } else {
      // this.props.onSubmitForm();
    }
  }

  render() {
    const benefitsImage = this.props.fullBenefits ? Benefits : Benefits2;
    let mainContent = null;
    if (!this.props.ipAddress) {
      mainContent = (<List component={LoadingIndicator} />);
    } else {
      localStorage.setItem('ipAddress', this.props.ipAddress);
      if (this.props.submitted) {
        mainContent = (<ThankYouPage />);
      } else {
        mainContent = (
          <div>
            <img className={styles.goproteksi} src={GoProteksi} alt="GoProteksi Logo" />
            <form onSubmit={this.props.onSubmitForm} id="goproteksiform">
              <FormTextInput ref="field1" type="text" name="name" label="Nama Lengkap (Sesuai KTP)" minLength="2" maxLength="100" />
              <FormRadioInput ref="field2" name="gender" altname="Jenis Kelamin" options={genderOptions} />
              <FormTextInput ref="field3" name="email" label="Email" minLength="7" maxLength="50" />
              <FormTextInput ref="field4" name="mobileNumber" label="Nomor HP (yang terdaftar di Gojek)" minLength="10" maxLength="15" />
              <FormTextInput ref="field5" name="simNumber" label="Nomor SIM" minLength="12" maxLength="12" />
              <FormDatePicker ref="field6" name="simExpiryDate" title="Expiry Date SIM" />
              <FormTextInput ref="field7" name="vehicleAge" label="Usia Kendaraan" minLength="1" maxLength="2" />
              <FormTextInput ref="field8" name="vehiclePlate" label="Nomor Plat" minLength="3" maxLength="9" />
              <img className={styles.benefits} src={benefitsImage} alt="Benefits" />
              <FormCheckbox ref="field9" name="tncCheckbox" value="tncCheckbox" message={tncMessage} />
              <FormButton name="submit" value="Daftar Sekarang" handleRoute={this.handleFormSubmit} />
            </form>
          </div>
        );
      }
    }

    return (
      <div>
        {mainContent}
      </div>
    );
  }
}

HomePage.propTypes = {
  submitted: React.PropTypes.bool,
  ipAddress: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
  fullBenefits: React.PropTypes.bool,
  onSubmitForm: React.PropTypes.func,
  ipAddressRequest: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    updateVehicleAge: (age) => dispatch(updateVehicleAge(age)),
    ipAddressRequest: () => dispatch(ipAddressRequest()),
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
  submitted: selectSubmitted(),
  error: selectError(),
  ipAddress: selectIPAddress(),
  fullBenefits: selectFullBenefits(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
