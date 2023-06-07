import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

interface AuthState {
  isAuthenticated: 'check' | 'auth' | 'no-auth';
  userInfo: FirebaseAuthTypes.User | null;
}

const initialState: AuthState = {
  isAuthenticated: 'check',
  userInfo: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<FirebaseAuthTypes.User>) => {
      const {payload} = action;
      return {
        ...state,
        isAuthenticated: 'auth',
        userInfo: payload,
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
