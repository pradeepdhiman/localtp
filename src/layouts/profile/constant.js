
import * as yup from 'yup';
export const fields = {
    firstName: { label: "First name", placeholder: "First name", type: "text" },
    lastName: { label: "Last name", placeholder: "Last name", hidden: false, type: "text" },
    email: { label: "User email", placeholder: "User email", type: "text" },
    phone: { label: "Contact No", placeholder: "Contact No", type: "number" },
    address: { label: "Address", placeholder: "Address", type: "text" },
    qualification: { label: "Qualification", placeholder: "Qualification", type: "text" },
    qualificationName: { label: "qualificationName", placeholder: "qualificationName", type: "text" },
    designation: { label: "Designation", placeholder: "Designation", type: "text" },
    dob: { label: "Date of birth", placeholder: "DOB", type: "date" },
    nationality: { label: "Nationality", placeholder: "Nationality", type: "text" },
    nationalityName: { label: "nationalityName", placeholder: "nationalityName", type: "text" },
    companyName: { label: "CompanyName", placeholder: "CompanyName", type: "text" },
    companyContactNumber: { label: "CompanyContactNumber", placeholder: "CompanyContactNumber", type: "number" },
    companyAddress: { label: "CompanyAddress", placeholder: "CompanyAddress", type: "text" },
    status: { label: "status", placeholder: "status", type: "number" },
    statusName: { label: "statusName", placeholder: "statusName", type: "text" },
    createdById: { label: "createdById", placeholder: "createdById", type: "number" },
    updatedById: { label: "updatedById", placeholder: "updatedById", type: "number" },
    updatedDate: { label: "updatedDate", placeholder: "updatedDate", type: "date" },
    file: { label: "file", placeholder: "file", type: "file" },
    isDeleted: { label: "isDeleted", placeholder: "isDeleted", type: "text" },
    remarks: { label: "Remarks", placeholder: "Remarks", type: "text" }
};



export const schema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    DocumentTypeID: yup.string().required('Document Id is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    // file: yup.mixed().required('File is required'),
    phone: yup.string()
        .required('Phone is required')
});


export const documentFilter = {
    "draw": 0,
    "start": 0,
    "length": 100,
    "columns": [
        {
            "data": "applicantName",
            "name": "applicantName",
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
        "orderBy": "CreatedDate",
        "orderDirection": "desc"
    },
    "filter": {
        "documentID": 0,
        "applicantCourseID": 0,
        "reassessmentID": 0,
        "applicantID": 0,
        "applicantName": "",
        "courseID": 0,
        "courseName": "",
        "document": "",
        "documentTypeID": 0,
        "documentTypeName": "",
        "status": 0,
        "statusName": "",
        "createdById": 0,
        "createdDate": null,
        "updatedById": 0,
        "updatedDate": null,
        "isDeleted": false,
        "remarks": ""
    }
}