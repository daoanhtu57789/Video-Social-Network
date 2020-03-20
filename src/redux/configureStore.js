//các
import { createStore, applyMiddleware, compose } from 'redux';
//reducer
import rootReducer from "./../reducers/index";
//thunk
import thunk from 'redux-thunk';

//process biến của node js để kiểm tra môi trường
//môi trường dev mới dùng dev tool nếu up lên host rồi thì ko cần
const composeEnhancers =
  process.env.NODE_ENV !== "production" &&
  //biến global window có phải object hay ko thì mới xài extension dev tool
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false
      })
    : compose;

const configureStore = () => {
  //middleWare chứa các danh sách các middleWera
  let middleWare = [thunk]; //ở trước trong mảng thì ưu tiên hơn
  //truyền các middleWera vào
  const enhancers = [applyMiddleware(...middleWare)];
  const store = createStore(rootReducer,composeEnhancers(...enhancers));
  return store
};

export default configureStore;
