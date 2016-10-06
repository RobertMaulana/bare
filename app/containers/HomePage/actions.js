import {
  SUBMIT_FORM_REQUEST,
  SUBMIT_FORM_SUCCESS,
  SUBMIT_FORM_FAILURE,
  UPDATE_VEHICLE_YEAR,
  IP_ADDRESS_REQUEST,
  IP_ADDRESS_SUCCESS,
} from './constants';

export function submitFormRequest() {
  return {
    type: SUBMIT_FORM_REQUEST,
  };
}

export function submitFormSuccess() {
  return {
    type: SUBMIT_FORM_SUCCESS,
  };
}

export function submitFormFailure() {
  return {
    type: SUBMIT_FORM_FAILURE,
  };
}

export function updateVehicleYear(data) {
  return {
    type: UPDATE_VEHICLE_YEAR,
    data,
  };
}

export function ipAddressRequest() {
  return {
    type: IP_ADDRESS_REQUEST,
  };
}

export function ipAddressSuccess(data) {
  return {
    type: IP_ADDRESS_SUCCESS,
    data,
  };
}
