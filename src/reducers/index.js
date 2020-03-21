import { combineReducers } from 'redux';

import { reducer as formReducer } from 'redux-form';
import modalReducer from './modal';
import videoReducer from './video';
import uiReducer from './ui';
const rootReducer = combineReducers({
  modal: modalReducer,
  video:videoReducer,
  ui:uiReducer,
  //Mặc định là form
  //nếu ko có form thì sẽ không nhập vào textField được
  form: formReducer
});

export default rootReducer;
