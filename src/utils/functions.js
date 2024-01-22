import emptySplitApi from "utils/emptySplitApi";
import { deleteRequest } from "utils/utils";
import { getRequest } from "utils/utils";
import { updateRequest } from "utils/utils";
import { readRequest } from "utils/utils";
import { createRequest } from "utils/utils";
import { postForm, userRegister } from "./utils";

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
        getProfile: build.query({
            query: (data) => getRequest("/User", data),
        }),
        getAppliedCourse: build.query({
            query: (data) => getRequest("/ApplicantCourse/GetAplicantAppliedCourse", data),
        }),
        associatedSchedule: build.query({
            query: (data) => getRequest("/Schedule/GetScheduleListByCourse", data),
        }),
        selectedSchedule: build.mutation({
            query: (data) => getRequest("/Schedule", data),
        }),
        selectedCourseSchedule: build.mutation({
            query: (data) => getRequest("/CourseSchedule/GetCourseScheduleListByScheduledCourse", data),
        }),
        getCourseQuestion: build.mutation({
            query: (data) => getRequest("/CourseQuestion", data),
        }),
        getCourseQuestionList: build.mutation({
            query: (data) => getRequest("/CourseQuestion/GetCourseQuestionListByCourse", data),
        }),
        getCourse: build.query({
            query: (data) => getRequest("/Course", data),
        }),
        masterListByType: build.query({
            query: (data) => getRequest("/MasterCode/GetMasterCodeListByType", data),
        }),
        updateProfile: build.mutation({
            query: (data) => updateRequest("/User", data),
        }),
        login: build.mutation({
            query: (data) => createRequest("/Authentication/authenticate", data),
        }),
        applicantRegister: build.mutation({
            query: (data) => createRequest("/General/ApplicantRegister", data),
        }),
        submitAssessment: build.mutation({
            query: (data) => createRequest("/CandidateAssesment", data),
        }),
        studyMat: build.mutation({
            query: (data) => getRequest("/TrainingMaterial/GetTrainingMaterialListByCourse", data),
        }),
        profile: build.mutation({
            query: (data) => getRequest("/User", data),
        }),
        paymentProof: build.mutation({
            query: (data) => postForm("/ApplicantCourse/ApplicantCoursePaymentUpload", data),
        }),
        courseAssess: build.mutation({
            query: (data) => getRequest("/CourseAssessment", data),
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
    useStudyMatMutation,
    useSelectedScheduleMutation,
    useSelectedCourseScheduleMutation,
    usePaymentProofMutation,
    useUpdateProfileMutation,
    useGetCourseQuestionMutation,
    useGetCourseQuestionListMutation,
    useApplicantRegisterMutation,
    useSubmitAssessmentMutation,
    useCourseAssessMutation,
    useProfileMutation,
    useLoginMutation,
    useGetQuestionsListQuery,
    useGetCoursesQuery,
    useCompletedCourseQuery,
    useActiveCourseQuery,
    useGetProfileQuery,
    useGetAppliedCourseQuery,
    useAssociatedScheduleQuery,
    useGetCourseQuery,
    useMasterListByTypeQuery,
} = applicantApis;
