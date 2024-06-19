
import { configureStore } from '@reduxjs/toolkit';
import peopleReducer from './reducers/peopleSlice'; 
import filmReducer from './reducers/filmSlice';

export const store = configureStore({
  reducer: {
    peopleReducer: peopleReducer,
    filmReducer: filmReducer
  },
});

export const rootState = store.getState();
export const appDispatch = store.dispatch;
export default store;
