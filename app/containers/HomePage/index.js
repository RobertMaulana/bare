/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';

import {
  selectHome,
  selectStatus,
  selectData,
  selectSubmitted,
  selectError,
  selectIPAddress,
  selectFullBenefits,
} from './selectors';
import { submitFormRequest } from './actions';
import { createStructuredSelector } from 'reselect';

import messages from './messages';
import { FormattedMessage } from 'react-intl';

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
const genderOptions = ['male', 'female'];

export class HomePage extends React.Component {

  componentDidMount() {
    // get ip address. if success update state and store in localstorage
  }
  
  render() {
    const benefitsImage = this.props.fullBenefits ? Benefits : Benefits2;
    let mainContent = null;
    if (this.props.ipAddress) {
      mainContent = (<List component={LoadingIndicator} />);
    }
    else if (this.props.submitted) {
      mainContent = (<ThankYouPage />);
    } 
    else {
      mainContent = (
        <div>
          <img className={styles.goproteksi} src={GoProteksi} alt="GoProteksi Logo" />
          <form onSubmit={this.props.onSubmitForm} id="goproteksiform">
            <FormTextInput type="text" name="name" label="Nama Lengkap" minLength="2" maxLength="100" />
            <FormRadioInput name="gender" altname="Jenis Kelamin" options={genderOptions} />
            <FormTextInput name="email" label="Email" minLength="7" maxLength="50" />
            <FormTextInput name="mobileNumber" label="Nomor HP" minLength="10" maxLength="15" />
            <FormTextInput name="simNumber" label="Nomor SIM" minLength="12" maxLength="12" />
            <FormDatePicker name="simExpiryDate" title="Expiry Date SIM" />
            <FormTextInput name="vehicleAge" label="Usia Kendaraan" minLength="1" maxLength="2" />
            <FormTextInput name="vehiclePlate" label="Nomor Plat" minLength="3" maxLength="9" />
            <img className={styles.benefits} src={benefitsImage} alt="Benefits" />
            <FormCheckbox name="tncCheckbox" value="tncCheckbox" message={tncMessage} />
            <FormButton name="submit" value="Daftar Sekarang" handleRoute={this.props.onSubmitForm} />
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
  changeRoute: React.PropTypes.func,
  submitted: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  data: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  ipAddress: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
  fullBenefits: React.PropTypes.bool,
  onSubmitForm: React.PropTypes.func,
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
  data: selectData(),
  submitted: selectSubmitted(),
  error: selectError(),
  ipAddress: selectIPAddress(),
  fullBenefits: selectFullBenefits(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
