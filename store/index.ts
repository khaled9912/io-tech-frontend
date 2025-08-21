import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { useDispatch } from 'react-redux';
import servicesReducer from './slices/servicesSlice';
import languageReducer from './slices/languageSlice';
import formReducer from './slices/formSlice'
import teamReducer from './slices/teamsSlice'

const makeStore = () =>
  configureStore({
    reducer: {
      services: servicesReducer,
      language: languageReducer,
      form: formReducer,
      teams: teamReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: true,
        serializableCheck: false,
      }),
    devTools: process.env.NODE_ENV !== 'production',
  });
  
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;


export const wrapper = createWrapper<AppStore>(makeStore);
