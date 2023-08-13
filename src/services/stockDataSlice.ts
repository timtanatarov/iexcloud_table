import { createSlice } from '@reduxjs/toolkit';
import { api } from '../services/api';

const stocksSlice = createSlice({
  name: 'stocks',
  initialState: {
    stocks: [],
    allData: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getStocks.matchFulfilled,
      (state, action) => {
        state.stocks = action.payload;
        state.allData = action.payload;
      }
    );
  },
});

export default stocksSlice.reducer;
