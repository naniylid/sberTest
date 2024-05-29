import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import testSlice from '../components/TestMain/slice';
import apiSlice from './api/slice';
import booleanSlice from '../components/Boolean/slice';
import multipleSlice from '../components/Multiple/slice';

export const store = configureStore({
  reducer: {
    multipleSlice,
    booleanSlice,
    testSlice,
    apiSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
