import emptySplitApi from "utils/emptySplitApi"

export const coursesApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        getCourses: build.query({
            query: () => "/Course/List"
        }),
        getCourse: build.query({
            query: (id) => `/Course?id=${id}`
        }),
    })
})

export const { useGetCoursesQuery, useGetCourseQuery } = coursesApi