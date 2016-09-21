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

import GoProteksi from './goproteksi.png';

const tncMessage = 'Saya setuju untuk mengambil program asuransi dengan manfaat terlampir, dimana saya akan mengikuti program beli asuransi 2 bulan gratis 1 bulan dengan harga premi per bulan Rp. 15,000 yang akan di bayarkan melalui GO Credit saya.';
const genderOptions = ['male', 'female'];

export class HomePage extends React.Component {
  
  render() {
    let mainContent = null;
    if (this.props.submitted) {
      mainContent = (<ThankYouPage />);
    } else {
      mainContent = (
        <div>
          <img className={styles.goproteksi} src={GoProteksi} alt="GoProteksi Logo" />
          <form onSubmit={this.props.onSubmitForm} id="goproteksiform">
            <FormTextInput ref="a" type="text" name="name" label="Nama Lengkap" minLength="2" maxLength="100" />
            <FormRadioInput name="gender" altname="Jenis Kelamin" options={genderOptions} />
            <FormTextInput ref="b" name="email" label="Email" minLength="7" maxLength="50" />
            <FormTextInput ref="c" name="mobileNumber" label="Nomor HP" minLength="10" maxLength="13" />
            <FormTextInput ref="d" name="simNumber" label="Nomor SIM" minLength="12" maxLength="12" />
            <FormDatePicker ref="e" name="simExpiryDate" title="Expiry Date SIM" />
            <FormTextInput ref="f" type="vehicleAge" name="vehicleAge" label="Usia Kendaraan" minLength="1" maxLength="2" />
            <FormTextInput ref="g" type="vehiclePlate" name="vehiclePlate" label="Nomor Plat" minLength="3" maxLength="9" />
            <FormCheckbox name="tncCheckbox" value="tncCheckbox" message={tncMessage} />
            <button type="submit" value="Submit" className={styles.buttonCustom}>Daftar Sekarang</button>
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
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
