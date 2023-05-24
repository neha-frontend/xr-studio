import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './saga';
import { modalRootReducer, authRootReducer, profileRootReducer, myTeamRootReducer, commonRootReducer } from './reducer';

// setup saga middleware
const sagaMiddleware = createSagaMiddleware();

// create root reducer
const rootReducer = {
  auth: authRootReducer,
  modal: modalRootReducer,
  profile: profileRootReducer,
  myTeam: myTeamRootReducer,
  common: commonRootReducer
};

// setup store
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.REACT_APP_ENV_STATUS !== 'production',
  middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

export default store;
