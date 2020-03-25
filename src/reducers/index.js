import { combineReducers } from 'redux';

import { reducer as formReducer } from 'redux-form';
import modalReducer from './modal';
import videoReducer from './video';
import uiReducer from './ui';
import userReducer from './user';
const rootReducer = combineReducers({
  modal: modalReducer,
  video:videoReducer,
  ui:uiReducer,
  user : userReducer,
  //Mặc định là form
  //nếu ko có form thì sẽ không nhập vào textField được
  form : formReducer
});

export default rootReducer;
