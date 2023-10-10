import {createStore} from 'redux';
import rootReducers from './reducer-config';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


const persistConfig = {
    timeout: 15000,
    key: 'root',
    storage: storage,
    whitelist: [
      'loginUserReducer',
      "isUserSignup",
    ], 
    //blacklist: [''],
  };

  const persistedReducer = persistReducer(persistConfig, rootReducers);
  const store = createStore(persistedReducer)

  let persistor = persistStore(store);

export { store, persistor }


