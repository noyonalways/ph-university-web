import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createStudent: builder.mutation({
      query: (payload) => ({
        url: "/users/create-student",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useCreateStudentMutation } = userManagementApi;
