import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "@/types/user";

const userUrl = import.meta.env.VITE_USER_URL;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: userUrl,
  }),
  endpoints: (builder) => ({
    getUserData: builder.query<Partial<User>, void>({
      query: () => "/",
    }),
  }),
});

export const { useGetUserDataQuery, useLazyGetUserDataQuery } = userApi;
