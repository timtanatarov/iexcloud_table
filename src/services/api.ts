import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://cloud.iexapis.com/stable/' }),
  endpoints: (builder) => ({
    getStocks: builder.query<any, void>({
      query: () => 'tops?token=sk_2efd82e1ba3544129e75b23f1dc24ba5',
    }),
  }),
});

export const { useGetStocksQuery } = api;
