import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserInfo} from '../../models/AuthData';

interface AuthState {
  isAuthenticated: 'check' | 'auth' | 'no-auth';
  userInfo: UserInfo | null;
}

const initialState: AuthState = {
  isAuthenticated: 'check',
  userInfo: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInfo>) => {
      return {
        ...state,
        isAuthenticated: 'auth',
        userInfo: action.payload,
      };
    },
    unSetUser: state => {
      return {
        ...state,
        isAuthenticated: 'no-auth',
        userInfo: null,
      };
    },
  },
});

export const {setUser, unSetUser} = authSlice.actions;

export default authSlice.reducer;
