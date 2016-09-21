import {
  SUBMIT_FORM_REQUEST,
  SUBMIT_FORM_SUCCESS,
  SUBMIT_FORM_FAILURE,
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