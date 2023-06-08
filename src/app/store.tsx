import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../reducer/user/AuthReducer';
import AlertReducer from 'reducer/AlertReducer';

export default configureStore({
  reducer: {
    auth: authReducer,
    alert: AlertReducer,
  },
});
