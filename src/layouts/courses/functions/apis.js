import { apiGet } from "utils/utils";

export function getCoursesListAPI() {
    // return apiGet(process.env.REACT_APP_DEVICE_CSV_DOWNLOAD +  `/device/export?deviceType=${getDeviceType()}`)
    return apiGet(process.env.REACT_APP_DEVICE_CSV_DOWNLOAD +  `/device/export?deviceType=${getDeviceType()}`)
}