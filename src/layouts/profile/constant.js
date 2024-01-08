
// "userId": 0,
//   "": "string",
//   "": "string",
//   "": "string",
//   "": "string",
//   "": "string",
//   "": "string",
//   "passwordHash": "string",
//   "passwordSalt": "string",
//   "rightCategoryID": 0,
//   "status": 0,
//   "updatedById": 0,
//   "": "string"
import * as yup from 'yup';
export const fields = {
    userName: { label: "User name", placeholder: "User name" },
    firstname: { label: "First name", placeholder: "First name" },
    lastName: { label: "Last name", placeholder: "Last name", hidden: false },
    userEmail: { label: "User email", placeholder: "User email" },
    mobileNo: { label: "Contact No", placeholder: "Contact No" },
    password: { label: "Password", placeholder: "Password" },
    remarks: { label: "Remarks", placeholder: "Remarks" }
};

export const schema = yup.object().shape({
    userName: yup.string().required('User Name is required'),
    firstname: yup.string().required('First Name is required'),
    lastName: yup.string(),
    userEmail: yup.string().email('Invalid email').required('Email is required'),
    mobileNo: yup.string()
        .matches(/^\d{10}$/, 'Mobile number must be 10 digits')
        .required('Contact number is required'),
    // password: yup.string().required('Password is required'),
    // passwordHash: yup.string(),
    // passwordSalt: yup.string(),
    // rightCategoryID: yup.number(),
    // status: yup.number(),
    // createdById: yup.number(),
    // updatedById: yup.number(),
    // updatedDate: yup.date(),
    // isDeleted: yup.boolean(),
    // remarks: yup.string(),
});

