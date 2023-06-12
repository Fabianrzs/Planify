import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface AlertState {
  state: 'alert' | 'error' | 'success';
  title: string;
  content: string;
  visible: boolean;
}

const initialState: AlertState = {
  state: 'alert',
  title: '',
  content: '',
  visible: false,
};

const AlertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    triggerAlert: (state, action: PayloadAction<AlertState>) => {
      console.log('despachando');
      const {
        payload: {visible, content, title, state: st},
      } = action;
      return {
        ...state,
        visible,
        content,
        title,
        state: st,
      };
    },
  },
});

export const {triggerAlert} = AlertSlice.actions;

export default AlertSlice.reducer;
