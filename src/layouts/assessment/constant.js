import { authUser } from "utils/utils";

const user = authUser()
export const ReAssessTableHeads = [
    { name: "applicantName", label: "Applicant", align: 'left', type: "string" },
    { name: "courseName", label: "Course Name", align: 'left', type: "string" },
    { name: "statusName", label: "Status", align: 'left', type: "string" },
    { name: "fee", label: "Course Fee", align: 'left', type: "number" },
    { name: "amountPaid", label: "Fee Paid", align: 'left', type: "number" },
    { name: "paymentStatusName", label: "Payment Status", align: 'left', type: "string" },
    { name: "remarks", label: "Remarks", align: 'left', type: "string" },
];



export const initialFilters = {
    "draw": 0,
    "start": 0,
    "length": 10,
    "columns": [
        {
            "data": "ApplicantName",
            "name": "ApplicantName",
            "searchable": true,
            "orderable": true,
            "search": {
                "value": "",
                "regex": ""
            }
        }
    ],
    "search": {
        "value": "",
        "regex": ""
    },
    "order": {
        "orderBy": "ApplicantName",
        "orderDirection": "asc"
    },
    "filter": {
        "reassessmentID": 0,
        "courseID": 0,
        "courseName": "",
        "applicantID": parseInt(user?.applicantId),
        "applicantName": "",
        "fee": "",
        "receipt": "",
        "receiptID": "",
        "receiptDate": null,
        "amountPaid": "",
        "paymentStatusID": 0,
        "paymentStatusName": "",
        "status": 0,
        "statusName": "",
        "createdById": 0,
        "updatedById": 0,
        "updatedDate": null,
        "isDeleted": false,
        "remarks": ""
    }
}