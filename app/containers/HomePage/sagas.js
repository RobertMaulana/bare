import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import { SUBMIT_FORM_REQUEST, IP_ADDRESS_REQUEST } from './constants';
import { submitFormSuccess, submitFormFailure, ipAddressRequest, ipAddressSuccess } from './actions';

import request from 'utils/request';

// Individual exports for testing
function* submitForm() {
  // Call our request helper (see 'utils/request')
  const url = 'https://api.pasarpolis.com/goproteksi/add';

  const name = localStorage.getItem('name');
  const gender = localStorage.getItem('gender');
  const vehicleYear = localStorage.getItem('vehicleYear');
  const email = localStorage.getItem('email');
  const mobileNumber = localStorage.getItem('mobileNumber');
  const vehiclePlate = localStorage.getItem('vehiclePlate');
  const simNumber = localStorage.getItem('simNumber');
  const simExpiryDate = localStorage.getItem('simExpiryDate');
  const ipAddress = '0.0.0.0';

  const policyNumber = `TMIGP${localStorage.getItem('policyNumber')}`;
  const origin = 'offline';
  const specialist = localStorage.getItem('specialist');

  const params = {
    name,
    gender,
    vehicleYear,
    email,
    mobileNumber,
    vehiclePlate,
    simNumber,
    simExpiryDate,
    ipAddress,
    policyNumber,
    origin,
    specialist,
  };

  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  };

  console.log(params);
  console.log(JSON.stringify(params));

  const results = yield call(request, url, options);

  console.log(results);

  if (!results.err) {
    if (results.data.return === 'GoProteksi registration successful') {
      yield put(submitFormSuccess(JSON.stringify(results.data.return)));
      localStorage.clear();
    } else {
      yield put(submitFormFailure(JSON.stringify(results.data.return)));
    }
  } else {
    yield put(submitFormFailure(JSON.stringify(results.err)));
  }
}

function* defaultSaga() {
  yield fork(takeLatest, SUBMIT_FORM_REQUEST, submitForm);
}

function* ipAddressRequestSaga() {
  const url = 'https://lab.pasarpolis.com/v1/getip';
  const results = yield call(request, url);
  if (results.err === undefined || results.err === null) {
    yield put(ipAddressSuccess(results.data.ipAddress));
  } else {
    yield put(ipAddressRequest());
  }
}

function* ipSaga() {
  yield fork(takeLatest, IP_ADDRESS_REQUEST, ipAddressRequestSaga);
}

// All sagas to be loaded
export default [
  defaultSaga,
  ipSaga,
];
