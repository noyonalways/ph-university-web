import { TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: userInfo,
        };
      },
    }),

    // get me
    getMe: builder.query({
      query: () => {
        return {
          url: "/users/me",
          method: "GET",
        };
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
    }),
  }),
});

export const { useLoginMutation, useGetMeQuery } = authApi;
