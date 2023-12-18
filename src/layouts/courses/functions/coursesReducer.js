import * as actionsTypes from "./action"

const initalState = {
    snackbar: {
        open: false,
        messageType: 'success',
        message: '',
        timer: 4000,
    },
    isLoading: false,
    data: []
}


export const coursesReducer = (state = { ...initalState }, action) => {

    switch (action.type) {
        case actionsTypes.COURSES_LIST_START: {
            return { ...state, isLoading: true }
        }

        case actionsTypes.COURSES_LIST_SUCCESS: {
            return { ...state, data: [...action.payload], isLoading: false }
        }

        case actionsTypes.COURSES_LIST_ERROR: {
            return { ...state, isLoading: false }
        }

        default:
            return state
    }
}
