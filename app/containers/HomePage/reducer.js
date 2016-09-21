import { fromJS } from 'immutable';
import {
  SUBMIT_FORM_REQUEST,
  SUBMIT_FORM_SUCCESS,
  SUBMIT_FORM_FAILURE,
  UPDATE_VEHICLE_AGE,
  OBTAIN_IP_ADDRESS,
} from './constants';

const initialState = fromJS({
  status: 'SUBMIT_FORM_EMPTY',
  data: false,
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
        .set('error', false)
      case SUBMIT_FORM_SUCCESS:
      return state
        .set('status', 'SUBMIT_FORM_SUCCESS')
        .set('data', fromJS(action.data))
        .set('submitted', true)
        .set('error', false)
    case SUBMIT_FORM_FAILURE:
      return state
        .set('status', 'SUBMIT_FORM_FAILURE')
        .set('data', fromJS(action.data))
        .set('submitted', false)
        .set('error', true)
    case UPDATE_VEHICLE_AGE:
      return state
        .set('fullBenefits', action.data <= 5)
    case OBTAIN_IP_ADDRESS:
      return state
        .set('ipAddress', action.data)
    default:
      return state;
  }
}

export default homePageReducer;
