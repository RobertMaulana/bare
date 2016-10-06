import { fromJS } from 'immutable';
import {
  SUBMIT_FORM_REQUEST,
  SUBMIT_FORM_SUCCESS,
  SUBMIT_FORM_FAILURE,
  UPDATE_VEHICLE_YEAR,
  IP_ADDRESS_REQUEST,
  IP_ADDRESS_SUCCESS,
} from './constants';

const initialState = fromJS({
  status: 'SUBMIT_FORM_EMPTY',
  submitted: false,
  error: false,
  ipAddress: false,
  fullBenefits: true,
});

function homePageReducer(state = initialState, action = null) {
  switch (action.type) {
    case SUBMIT_FORM_REQUEST:
      return state
        .set('status', 'SUBMIT_FORM_REQUEST')
        .set('submitted', false)
        .set('error', false);
    case SUBMIT_FORM_SUCCESS:
      return state
        .set('status', 'SUBMIT_FORM_SUCCESS')
        .set('submitted', true)
        .set('error', false);
    case SUBMIT_FORM_FAILURE:
      return state
        .set('status', 'SUBMIT_FORM_FAILURE')
        .set('submitted', false)
        .set('error', true);
    case UPDATE_VEHICLE_YEAR:
      return state
        .set('fullBenefits', action.data >= 2012);
    case IP_ADDRESS_REQUEST:
      return state
        .set('ipAddress', false);
    case IP_ADDRESS_SUCCESS:
      return state
        .set('ipAddress', action.data);
    default:
      return state;
  }
}

export default homePageReducer;
