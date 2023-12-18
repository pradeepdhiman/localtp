

import { combineReducers } from "@reduxjs/toolkit"

import { coursesReducer } from "layouts/courses/functions/coursesReducer"



const rootReducer = combineReducers({
    coursesReducer
})

export default rootReducer