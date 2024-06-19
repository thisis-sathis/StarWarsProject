
import { configureStore } from '@reduxjs/toolkit';
import peopleReducer from './reducers/peopleSlice'; 
import filmReducer from './reducers/filmSlice';

export const store = configureStore({
  reducer: {
    peopleReducer: peopleReducer,
    filmReducer: filmReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;



