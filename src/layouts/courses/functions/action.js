import { getCoursesListAPI } from "./apis"


export const COURSES_LIST_START = "COURSES_LIST_START"
export const COURSES_LIST_SUCCESS = "COURSES_LIST_SUCCESS"
export const COURSES_LIST_ERROR = "COURSES_LIST_ERROR"



export const courseList = () => dispatch =>
    new Promise((resolve, reject) => {
        dispatch({
            type: COURSES_LIST_START
        })
        getCoursesListAPI().then(res => {
            dispatch({
                type: COURSES_LIST_SUCCESS,
                payload: res && res.info || {}
            })
            return resolve(res)
        }).catch(err => {
            dispatch({
                type: COURSES_LIST_ERROR
            })
            // dispatch(commonActions.openSnackbarsState({ message: errorMessage(err), messageType: 'error' }))
            reject(err)
        })
    })