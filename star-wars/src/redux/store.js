
import { configureStore } from '@reduxjs/toolkit';
import peopleReducer from './reducers/rootReducer'; 

export const store = configureStore({
  reducer: {
    peopleReducer: peopleReducer
  },
});

export const rootState = store.getState();
export const appDispatch = store.dispatch;
export default store;
