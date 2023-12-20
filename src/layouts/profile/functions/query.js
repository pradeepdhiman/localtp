import emptySplitApi from "utils/emptySplitApi"

export const profileApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        getProfile: build.query({
            query: (id) => `/Applicant?id=${id}`
        }),
    })
})

export const { useGetProfileQuery } = profileApi