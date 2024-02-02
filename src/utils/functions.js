import emptySplitApi from "utils/emptySplitApi";
import { deleteRequest } from "utils/utils";
import { getRequest } from "utils/utils";
import { updateRequest } from "utils/utils";
import { readRequest } from "utils/utils";
import { createRequest } from "utils/utils";
import { postForm, userRegister } from "./utils";

export const applicantApis = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        filterCourse: build.query({
            query: (filters) => createRequest("/Course/GetCourses", filters),
        }),
        getQuestionsList: build.query({
            query: () => readRequest("/CourseQuestion/List"),
        }),
        getCourseswithauth: build.query({
            query: () => readRequest("/Course/List"),
        }),
        getCourses: build.query({
            query: () => readRequest("/General/CourseList"),
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
        courseAssessList: build.mutation({
            query: (data) => getRequest("/CourseAssessment/GetCourseAssessmentListbyCourse", data),
        }),
        randomQuestion: build.mutation({
            query: (data) => getRequest("/CourseQuestion/GetCourseQuestionRandomListByCourse", data),
        }),
        applicantAssementList: build.query({
            query: (data) => getRequest("/CandidateAssesment/GetCandidateAssesmentByApplicant", data),
        }),
        retakeRequest: build.mutation({
            query: (data) => createRequest("/CandidateReassessment", data),
        }),
    }),
});

export const {
    useRetakeRequestMutation,
    useStudyMatMutation,
    useSelectedScheduleMutation,
    useSelectedCourseScheduleMutation,
    usePaymentProofMutation,
    useRandomQuestionMutation,
    useUpdateProfileMutation,
    useGetCourseQuestionMutation,
    useCourseAssessListMutation,
    useGetCourseQuestionListMutation,
    useApplicantRegisterMutation,
    useSubmitAssessmentMutation,
    useCourseAssessMutation,
    useProfileMutation,
    useLoginMutation,
    useGetQuestionsListQuery,
    useFilterCourseQuery,
    useApplicantAssementListQuery,
    useGetCoursesQuery,
    useGetCourseswithauthQuery,
    useCompletedCourseQuery,
    useActiveCourseQuery,
    useGetProfileQuery,
    useGetAppliedCourseQuery,
    useAssociatedScheduleQuery,
    useGetCourseQuery,
    useMasterListByTypeQuery,
} = applicantApis;
