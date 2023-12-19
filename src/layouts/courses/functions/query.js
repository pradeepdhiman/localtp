import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import emptySplitApi from "utils/emptySplitApi"



// export const coursesApi = createApi({
//     reducerPath: "courses",
//     baseQuery: fetchBaseQuery({
//         baseUrl: "https://jsonplaceholder.typicode.com"
//     }),
//     endpoints: (builder) => ({
//         getCourses: builder.query({
//             query: () => "/users"
//         })
//     })
// })

// export const { useGetCoursesQuery  } = coursesApi


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