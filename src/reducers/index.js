import { combineReducers } from 'redux';

import { reducer as formReducer } from 'redux-form';
import modalReducer from './modal';
const rootReducer = combineReducers({
  modal: modalReducer,
  //Mặc định là form
  //nếu ko có form thì sẽ không nhập vào textField được
  form: formReducer
});

export default rootReducer;
