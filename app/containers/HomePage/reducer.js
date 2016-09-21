import { fromJS } from 'immutable';
import {
  SUBMIT_FORM_REQUEST,
  SUBMIT_FORM_SUCCESS,
  SUBMIT_FORM_FAILURE,
} from './constants';

const initialState = fromJS({
  status: 'SUBMIT_FORM_EMPTY',
  data: false,
  submitted: false,
  error: false,
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
    default:
      return state;
  }
}

export default homePageReducer;
