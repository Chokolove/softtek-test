import type { Plan } from "@/types/plan";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const plansUrl = import.meta.env.VITE_PLANS_URL;
type PlanQuery = {
  list: Plan[];
};

export const plansApi = createApi({
  reducerPath: "plansApi",
  baseQuery: fetchBaseQuery({
    baseUrl: plansUrl,
  }),
  endpoints: (builder) => ({
    getPlans: builder.query<PlanQuery, void>({
      query: () => "/",
    }),
  }),
});

export const { useGetPlansQuery } = plansApi;
