import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { _apiUrl } from 'config/constant';
import { API_SERVER } from "config/constant";
import { toast } from 'react-toastify';

const responseInterceptor = (baseQuery) => async (args, api, extraOptions) => {
  try {
    const result = await baseQuery(args, api, extraOptions);
    if (result?.data?.success) {
      toast.success(result?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
      });
    } else {
      toast.error(result?.data?.errors[0], {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
      });
    }
    return result;
  } catch (error) {
    toast.error('An error occurred. Please try again.', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
    });
    throw error;
  }
};


const baseQuery = fetchBaseQuery({ baseUrl: _apiUrl });

const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: _apiUrl }),
  // baseQuery: responseInterceptor(baseQuery),
  endpoints: () => ({}),
});


export default emptySplitApi