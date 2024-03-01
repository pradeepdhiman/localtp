import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { _apiUrl } from 'config/constant';
import { API_SERVER } from "config/constant";
import { toast } from 'react-toastify';



const baseQuery = fetchBaseQuery({ baseUrl: _apiUrl });

const emptySplitApi = createApi({
  baseQuery: async (args, api, extraOptions) => {
    try {
      const result = await baseQuery(args, api, extraOptions);
      if (result.error && result.error.status === 401) {
        window.location.href = '/authentication/sign-in';
      }
      return result;
    } catch (error) {
      throw error;
    }
  },
  endpoints: () => ({}),
});

export default emptySplitApi


