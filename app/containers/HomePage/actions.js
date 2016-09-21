import {
  SUBMIT_FORM_REQUEST,
  SUBMIT_FORM_SUCCESS,
  SUBMIT_FORM_FAILURE,
  UPDATE_VEHICLE_AGE,
  OBTAIN_IP_ADDRESS,
} from './constants';

export function submitFormRequest() {
  return { 
    type: SUBMIT_FORM_REQUEST,
  };
}

export function submitFormSuccess(data) {
  return {
    type: SUBMIT_FORM_SUCCESS,
    data,
  };
}

export function submitFormFailure(data) {
  return {
    type: SUBMIT_FORM_FAILURE,
    data,
  };
}

export function updateVehicleAge(data) {
  return { 
    type: UPDATE_VEHICLE_AGE,
    data,
  };
}

export function obtainIPAddress(data) {
  return { 
    type: OBTAIN_IP_ADDRESS,
    data,
  };
}