import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../reducer/user/AuthReducer';

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
