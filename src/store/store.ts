import { configureStore } from '@reduxjs/toolkit';
import { api } from '../../src/services/api';
import stocksReducer from '../../src/services/stockDataSlice';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    stocks: stocksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
