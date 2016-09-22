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
  const vehicleAge = localStorage.getItem('vehicleAge');
  const email = localStorage.getItem('email');
  const mobileNumber = localStorage.getItem('mobileNumber');
  const vehiclePlate = localStorage.getItem('vehiclePlate');
  const simNumber = localStorage.getItem('simNumber');
  const simExpiryDate = localStorage.getItem('simExpiryDate');
  const ipAddress = localStorage.getItem('ipAddress');

  const params = {
    name,
    gender,
    vehicleAge,
    email,
    mobileNumber,
    vehiclePlate,
    simNumber,
    simExpiryDate,
    ipAddress,
  };

  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  };

  const results = yield call(request, url, options);

  if (!results.err) {
    if (results.data.return === 'GoProteksi registration successful') {
      yield put(submitFormSuccess(JSON.stringify(results.data.return)));
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
  const url = 'https://getip.pasarpolis.com';
  const results = yield call(request, url);
  if (results.err === undefined || results.err === null) {
    yield put(ipAddressSuccess(results.data.ipAddress));
  } else {
    yield put(ipAddressRequest( ));
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
