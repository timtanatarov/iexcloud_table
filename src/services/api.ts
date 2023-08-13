import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IEX_TOKEN } from './token';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://cloud.iexapis.com/stable/' }),
  endpoints: (builder) => ({
    getStocks: builder.query<any, void>({
      query: () => `tops?token=${IEX_TOKEN}`, // paste your token here
    }),
  }),
});

export const { useGetStocksQuery } = api;
