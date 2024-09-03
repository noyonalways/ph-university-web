import {
  TAcademicFaculty,
  TAcademicSemester,
  TQueryParam,
  TResponseRedux,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // academic semester
    getAllSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item?.name, item?.value as string);
          });
        }
        return {
          url: "/academic-semesters",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        return {
          data: response.data,
        };
      },
      providesTags: ["AcademicSemesters"],
    }),
    addAcademicSemester: builder.mutation({
      query: (payload) => {
        return {
          url: "/academic-semesters",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["AcademicSemesters"],
    }),

    // academic faculty
    getAcademicFaculties: builder.query({
      query: () => {
        return {
          url: "/academic-faculties",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
        return {
          data: response.data,
        };
      },
      providesTags: ["AcademicFaculties"],
    }),
    addAcademicFaculty: builder.mutation({
      query: (payload) => {
        return {
          url: "/academic-faculties",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["AcademicFaculties"],
    }),
  }),
});

export const {
  useGetAllSemestersQuery,
  useAddAcademicSemesterMutation,
  useGetAcademicFacultiesQuery,
  useAddAcademicFacultyMutation,
} = academicManagementApi;
