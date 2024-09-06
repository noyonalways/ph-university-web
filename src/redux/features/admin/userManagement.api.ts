import {
  TAdmin,
  TFaculty,
  TQueryParam,
  TResponseRedux,
  TStudent,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //student
    createStudent: builder.mutation({
      query: (payload) => ({
        url: "/users/create-student",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Students"],
    }),
    getStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item?.name, item?.value as string);
          });
        }
        return {
          url: "/students",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["Students"],
    }),
    getSingleStudent: builder.query({
      query: (studentId) => {
        return {
          url: `/students/${studentId}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TStudent>) => {
        return {
          ...response.data,
        };
      },
    }),

    // faculty
    createFaculty: builder.mutation({
      query: (payload) => ({
        url: "/users/create-faculty",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Faculty"],
    }),
    getFaculties: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item?.name, item?.value as string);
          });
        }
        return {
          url: "/faculties",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TFaculty[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["Faculty"],
    }),
    getSingleFaculty: builder.query({
      query: (facultyId) => {
        return {
          url: `/faculties/${facultyId}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TFaculty>) => {
        return {
          ...response.data,
        };
      },
    }),

    // admin
    createAdmin: builder.mutation({
      query: (payload) => ({
        url: "/users/create-admin",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Admin"],
    }),
    getAdmins: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item?.name, item?.value as string);
          });
        }
        return {
          url: "/admins",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TAdmin[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["Admin"],
    }),
    getSingleAdmin: builder.query({
      query: (adminId) => {
        return {
          url: `/admins/${adminId}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TAdmin>) => {
        return {
          ...response.data,
        };
      },
    }),
  }),
});

export const {
  useCreateStudentMutation,
  useGetStudentsQuery,
  useGetSingleStudentQuery,
  useCreateFacultyMutation,
  useGetFacultiesQuery,
  useGetSingleFacultyQuery,
  useCreateAdminMutation,
  useGetAdminsQuery,
  useGetSingleAdminQuery,
} = userManagementApi;
