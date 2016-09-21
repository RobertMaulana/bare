import { takeLatest } from 'redux-saga';
import { take, call, put, fork } from 'redux-saga/effects';
import { SUBMIT_FORM_REQUEST } from './constants';
import { submitFormSuccess, submitFormFailure } from './actions';

import request from 'utils/request';

// Individual exports for testing
function* submitForm() {
  // Call our request helper (see 'utils/request')
  const url = 'https://api.pasarpolis.com/goproteksi/';

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
    ipAddress
  };

  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  };

  console.log('params: ' + params);

  const results = yield call(request, url, options);

  if (!results.err) {
    if (results.data.return === "GoProteksi registration successful") {
      yield put(submitFormSuccess(JSON.stringify(results.data.return)));
    }
    else {
      yield put(submitFormFailure(JSON.stringify(results.data.return)));
    }
  } else {
    yield put(submitFormFailure(JSON.stringify(results.err)));
  }
}

function* defaultSaga() {
  yield fork (takeLatest, "SUBMIT_FORM_REQUEST", submitForm);
}

// All sagas to be loaded
export default [
  defaultSaga,
];