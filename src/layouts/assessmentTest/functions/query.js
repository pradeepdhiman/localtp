import emptySplitApi from "utils/emptySplitApi"

export const assessmentTestApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        getQuestionsList: build.query({
            query: (id) => `/CourseQuestion/List`
        }),
    })
})

export const { useGetQuestionsListQuery } = assessmentTestApi