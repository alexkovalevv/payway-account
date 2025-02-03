// toastSlice.js
import {createSlice} from '@reduxjs/toolkit';

const ToastSlice = createSlice({
    name: 'toast',
    initialState: {
        message: null, // Сообщение, которое будет отображаться
        severity: 'success', // Тип сообщения (success, error и т.д.)
    },
    reducers: {
        showToast: (state, action) => {
            state.message = action.payload.message;
            state.severity = action.payload.severity;
        },
        clearToast: (state) => {
            state.message = null;
        },
    },
});

export const {showToast, clearToast} = ToastSlice.actions;
export default ToastSlice.reducer;