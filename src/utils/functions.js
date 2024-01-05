import emptySplitApi from "utils/emptySplitApi";
import { deleteRequest } from "utils/utils";
import { getRequest } from "utils/utils";
import { updateRequest } from "utils/utils";
import { readRequest } from "utils/utils";
import { createRequest } from "utils/utils";
import { userRegister } from "./utils";

export const applicantApis = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        getQuestionsList: build.query({
            query: () => readRequest("/CourseQuestion/List"),
        }),
        getCourses: build.query({
            query: () => readRequest("/Course/List"),
        }),
        completedCourse: build.query({
            query: (data) => getRequest("/ApplicantCourse/GetAplicantCompletedCourses", data),
        }),
        activeCourse: build.query({
            query: (data) => getRequest("/ApplicantCourse/GetAplicantActiveCourses", data),
        }),
        login: build.mutation({
            query: (data) => createRequest("/Authentication/authenticate", data),
        }),
        getCourse: build.mutation({
            query: (data) => getRequest("/Course", data),
        }),
        applicantRegister: build.mutation({
            query: (data) => createRequest("/ApplicantRegister", data),
        }),
        profile: build.mutation({
            query: (data) => getRequest("/User", data),
        }),
        // listApplicant: build.query({
        //     query: () => readRequest("/Applicant/List"),
        // }),
        // filterApplicant: build.mutation({
        //     query: (filters) => createRequest("/Applicant/GetApplicants", filters),
        // }),
        // createApplicant: build.mutation({
        //     query: (data) => createRequest("/Applicant", data),
        // }),
        // getApplicant: build.mutation({
        //     query: (data) => getRequest("/Applicant", data),
        // }),
        // updateApplicant: build.mutation({
        //     query: (data) => updateRequest("/Applicant", data),
        // }),
        // deleteApplicant: build.mutation({
        //     query: (id) => deleteRequest("/Applicant", id),
        // }),
        // applicantCompleteCourse: build.mutation({
        //     query: (data) => getRequest("/ApplicantCourse/GetAplicantCompletedCourses", data),
        // }),
        // applicantActiveCourse: build.mutation({
        //     query: (data) => getRequest("/ApplicantCourse/GetAplicantActiveCourses", data),
        // }),
    }),
});

export const {
    useApplicantRegisterMutation,
    useProfileMutation,
    useLoginMutation,
    useGetCourseMutation,
    useGetQuestionsListQuery,
    useGetCoursesQuery,
    useCompletedCourseQuery,
    useActiveCourseQuery,
} = applicantApis;
