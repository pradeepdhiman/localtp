
import { useState, useEffect } from "react";

// react-router-dom components
import { Link, useLocation, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import curved6 from "assets/images/banners/27323.jpg";
// import curved6 from "assets/images/curved-images/curved14.jpg";

import AuthApi from "../../../api/auth";

import queryString from "query-string";
import { authUser } from "utils/utils";
import { useApplicantRegisterMutation } from "utils/functions";
import { useProfileMutation } from "utils/functions";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useMasterListByTypeQuery } from "utils/functions";
import SoftAutoSelect from "examples/AutoSelect";
import { validateForm } from "utils/utils";
import SoftAddAbleAutoSelect from "examples/AutoSelect/AddAbleAutoSelect";
import { useEnrollcourseMutation } from "utils/functions";
import { toastHandler } from "utils/utils";
import moment from "moment";
import { toast } from "react-toastify";
import { usePostMasterMutation } from "utils/functions";
import { masterType } from "common/constant";



// const rawFields = {
//   applicantID: 0,
//   firstName: "",
//   lastName: "",
//   email: "",
//   phone: "",
//   address: "",
//   qualification: "",
//   designation: "",
//   dob: new Date(),
//   nationality: "",
//   companyName: "",
//   companyContactNumber: "",
//   companyAddress: "",
//   password: "",
//   courseId: 0,
//   scheduleId: 0,
//   createdById: 0,
//   remarks: ""
// }
const rawFields = {
  applicantID: 0,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  qualification: 0,
  designation: 0,
  dob: null,
  nationality: 0,
  companyName: "",
  companyContactNumber: "",
  companyAddress: "",
  password: "",
  courseId: 0,
  createdById: 0,
  remarks: ""
}

const formRule = {
  firstName: { required: true },
  email: { required: true },
  qualification: { required: true },
  designation: { required: true },
  nationality: { required: true },
  password: { required: true },
  // course: { required: true },
}





function SignUp() {
  const navigate = useNavigate();
  // const { session } = useSelector(state => state.common)

  const [agreement, setAgremment] = useState(true);
  const [formData, setFormData] = useState(rawFields);
  const [error, setError] = useState("");
  const [formerror, setFormerror] = useState({});
  const [designation, setDesignation] = useState({});
  const [qualification, setQualification] = useState({});
  const [nationality, setNationality] = useState({});
  const [localLoading, setLocalLoading] = useState({
    qualificationLoad: false,
    desgLoad: false
  });


  const location = useLocation();

  const queryStrings = location.search;
  const queryStringObject = queryString.parse(queryStrings);
  const courseId = queryStringObject.courseid;
  const coursename = queryStringObject.coursename;
  const [register, { data: regData, error: regErr, isLoading: regLoading }] = useApplicantRegisterMutation()
  const [getProfile, { data: profileData, isError: profileErr, isLoading: profileLoading }] = useProfileMutation()
  const { data: qualificationList, isLoading: qualificationErr, refetch: refreshQualification } = useMasterListByTypeQuery({ TypeID: masterType.Qualification })
  const { data: desigList, isLoading: desigErr, refetch: refreshDesg } = useMasterListByTypeQuery({ TypeID: masterType.Designation })
  const { data: nationalityList, isLoading: nationalityErr } = useMasterListByTypeQuery({ TypeID: masterType.Nationality })
  const [enrollcourse, { data: enrollRes, isLoading: enrollLoading, isError: enrollErr }] = useEnrollcourseMutation()
  const [addMaster, { isLoading: masterLoading }] = usePostMasterMutation()

  const user = authUser()
  const MySwal = withReactContent(Swal)


  useEffect(() => {

  }, [qualificationList, desigList, nationalityList])

  useEffect(() => {
    if (user?.id) {
      getProfile({ id: user.id })
        .then((response) => {
          if (!response.data.success) {
            console.log("Failed to get profile info")
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user?.id]);


  const handleSetAgremment = () => setAgremment(!agreement);

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // courseId scheduleId createdById password nationality designation qualification email firstName

  async function enrollNewCourse() {

    if (!coursename) {
      Swal.fire({
        title: "Error!",
        text: "Please select any course from course page to enroll.",
        confirmButtonText: "Ok",
      })
      return
    }

    let newData = {
      applicantCourseID: 0,
      applicantID: parseInt(user?.applicantId),
      courseID: parseInt(courseId),
      scheduleID: null,
      // scheduleID: parseInt(session?.scheduledID),
      enrollmentDate: moment().format("YYYY-MM-DD"),
      completionDate: moment().format("YYYY-MM-DD"),
      receiptID: "",
      receiptDate: null,
      amountPaid: "",
      paymentStatus: 7,
      courseStatus: 9,
      createdById: parseInt(user?.applicantId),
      remarks: ""
    };

    try {
      const res = await enrollcourse(newData)
      toastHandler(res)
      if (res?.data?.success) {
        Swal.fire({
          title: "Successfully Enroll!",
          text: "You have Successfully enroll course.",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            return navigate("/dashboard");
          }
        });
      }
    } catch (err) { console.log(err) }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!coursename) {
      Swal.fire({
        title: "Error!",
        text: "Please select any course from course page to enroll.",
        confirmButtonText: "Ok",
      })
      return
    }

    try {
      let newData = {
        ...formData,
        courseId: parseInt(courseId),
        createdById: 1,
        scheduleId: null,
        // scheduleId: parseInt(session?.scheduledID),
        nationality: nationality.masterCodeID,
        designation: designation.masterCodeID,
        qualification: qualification.masterCodeID,
      };

      let err = validateForm(newData, formRule)
      if (Object.keys(err).length > 0) {
        setFormerror(err);
        return;
      }

      const response = await register(newData);

      if (response.data.success) {
        Swal.fire({
          title: "Successfully Registered!",
          text: "Thank you for registering with us. Your Registration details have been successfully submitted to the admin. We will contact you shortaly with the next steps. Meanwhile, please check your email regularly for further updates.",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            return navigate("/authentication/sign-in");
          }
        });
      } else {
        setError(response.data.errors[0] || "An error occurred during registration.");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.msg || "An error occurred during registration.");
      } else {
        setError("There has been an error.");
      }
    }
  };



  const handleRedirect = () => navigate("/dashboard");

  const qualificationSelectHandler = (event, newValue) => {
    setQualification(newValue)
  };
  const designationSelectHandler = (event, newValue) => {
    setDesignation(newValue)
  };
  const nationalitySelectHandler = (event, newValue) => {
    setNationality(newValue)
  };

  async function saveQuelification(data) {
    if (qualificationList?.data?.find(x => x.value === data)) {
      toast.error('Duplicate not allowed', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
      });
      return null;
    }
    setLocalLoading(prev => ({ ...prev, qualificationLoad: true }));
    const newData = {
      masterCodeID: 0,
      code: 0,
      value: data,
      fixedColumnName: null,
      description: null,
      masterCodeTypeID: masterType.Qualification
    };

    try {
      const res = await addMaster(newData);
      toastHandler(res);
      if (res?.data?.success) {
        setQualification(res?.data?.data);
        refreshQualification();
        setLocalLoading(prev => ({ ...prev, qualificationLoad: false }));
        return res;
      } else {
        console.error("Unsuccessful response:", res);
        return null;
      }
    } catch (error) {
      console.error("Error adding master:", error);
      setLocalLoading(prev => ({ ...prev, qualificationLoad: false }));
      return null;
    }
  }

  async function saveDesgnation(data) {
    if (desigList?.data?.find(x => x.value === data)) {
      toast.error('Duplicate not allowed', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
      });
      return null;
    }
    setLocalLoading(prev => ({ ...prev, desgLoad: true }));
    const newData = {
      masterCodeID: 0,
      code: 0,
      value: data,
      fixedColumnName: null,
      description: null,
      masterCodeTypeID: masterType.Designation
    };

    try {
      const res = await addMaster(newData);
      toastHandler(res);
      if (res?.data?.success) {
        setDesignation(res?.data?.data);
        refreshDesg();
        setLocalLoading(prev => ({ ...prev, desgLoad: false }));
        return res;
      } else {
        console.error("Unsuccessful response:", res);
        return null;
      }
    } catch (error) {
      console.error("Error adding master:", error);
      setLocalLoading(prev => ({ ...prev, desgLoad: false }));
      return null;
    }
  }


  return (
    <BasicLayout
      title="Enroll"
      description="Provide the necessary information to register for the selected course."
      image={curved6}
    >
      {user && user.token ? (
        <Card>
          <SoftBox pt={2} pb={3} px={3}>
            <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Send request to learn this course.</h3>
            <SoftBox component="form" role="form">
              <SoftBox mb={2}>
                <SoftInput
                  type="text"
                  readonly
                  name="course"
                  placeholder="Course"
                  value={coursename}
                />
              </SoftBox>
              <SoftBox mt={2} mb={2} textAlign="center">
                <h6
                  style={{
                    fontSize: ".8em",
                    color: "red",
                    textAlign: "center",
                    fontWeight: 400,
                    transition: ".2s all",
                  }}
                >
                  {error}
                </h6>
              </SoftBox>
              <SoftBox mt={4} mb={1}>
                <SoftButton disabled={enrollLoading} variant="gradient" color="dark" onClick={enrollNewCourse} fullWidth>
                  {enrollLoading ? "Enrolling" : "Send Request"}
                </SoftButton>
              </SoftBox>
            </SoftBox>
          </SoftBox>
        </Card>
      ) : (
        <Card>
          <SoftBox pt={2} pb={3} px={3}>
            <SoftBox component="form" role="form" onSubmit={handleSubmit}>
              <SoftBox mb={2}>
                <SoftInput
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  onChange={handleFormData}
                />
                {formerror?.firstName ? <SoftTypography color="error" variant="button" fontWeight="medium">
                  {formerror?.firstName}
                </SoftTypography> : null}
              </SoftBox>
              <SoftBox mb={2}>
                <SoftInput
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  onChange={handleFormData}
                />
                {formerror?.lastName ? <SoftTypography color="error" variant="button" fontWeight="medium">
                  {formerror?.lastName}
                </SoftTypography> : null}
              </SoftBox>
              <SoftBox mb={2}>
                <SoftInput
                  type="email"
                  name="email"
                  onChange={handleFormData}
                  placeholder="Email"
                />
                {formerror?.email ? <SoftTypography color="error" variant="button" fontWeight="medium">
                  {formerror?.email}
                </SoftTypography> : null}
              </SoftBox>
              <SoftBox mb={2}>
                <SoftInput
                  type="password"
                  name="password"
                  onChange={handleFormData}
                  placeholder="Password"
                />
                {formerror?.password ? <SoftTypography color="error" variant="button" fontWeight="medium">
                  {formerror?.password}
                </SoftTypography> : null}
              </SoftBox>
              <SoftBox mb={2}>
                <SoftInput
                  type="text"
                  readonly
                  name="course"
                  placeholder="Course"
                  value={coursename}
                />
                {formerror?.course ? <SoftTypography color="error" variant="button" fontWeight="medium">
                  {formerror?.course}
                </SoftTypography> : null}
              </SoftBox>
              <SoftBox mb={2}>
                <SoftAddAbleAutoSelect
                  dataList={qualificationList?.data || []}
                  selectedValue={qualification}
                  selectHandler={qualificationSelectHandler}
                  label={null}
                  placeholder="Select Qualification"
                  saveHandler={saveQuelification}
                  loading={localLoading.qualificationLoad}
                  isEditable={true}
                />

                {formerror?.qualification ? <SoftTypography color="error" variant="button" fontWeight="medium">
                  {formerror?.qualification}
                </SoftTypography> : null}
              </SoftBox>
              <SoftBox mb={2}>
                <SoftAddAbleAutoSelect
                  dataList={desigList?.data || []}
                  selectedValue={designation}
                  selectHandler={designationSelectHandler}
                  label={null}
                  placeholder="Select Designation"
                  saveHandler={saveDesgnation}
                  loading={localLoading.desgLoad}
                  isEditable={true}
                />
                {formerror?.designation ? <SoftTypography color="error" variant="button" fontWeight="medium">
                  {formerror?.designation}
                </SoftTypography> : null}
              </SoftBox>
              <SoftBox mb={2}>
                <SoftAddAbleAutoSelect
                  dataList={nationalityList?.data || []}
                  selectedValue={nationality}
                  selectHandler={nationalitySelectHandler}
                  label={null}
                  placeholder="Select Nationality"
                  isEditable={false}
                />
                {formerror?.nationality ? <SoftTypography color="error" variant="button" fontWeight="medium">
                  {formerror?.nationality}
                </SoftTypography> : null}
              </SoftBox>
              <SoftBox display="flex" alignItems="center">
                <Checkbox checked={agreement} onChange={handleSetAgremment} />
                <SoftTypography
                  variant="button"
                  fontWeight="regular"
                  onClick={handleSetAgremment}
                  sx={{ cursor: "poiner", userSelect: "none" }}
                >
                  &nbsp;&nbsp;I agree the&nbsp;
                </SoftTypography>
                <SoftTypography
                  component="a"
                  href="#"
                  variant="button"
                  fontWeight="bold"
                  textGradient
                >
                  Terms and Conditions
                </SoftTypography>
              </SoftBox>
              <SoftBox mt={2} mb={2} textAlign="center">
                <h6
                  style={{
                    fontSize: ".8em",
                    color: "red",
                    textAlign: "center",
                    fontWeight: 400,
                    transition: ".2s all",
                  }}
                >
                  {error}
                </h6>
              </SoftBox>
              <SoftBox mt={4} mb={1}>
                <SoftButton type="submit" variant="gradient" color="dark" fullWidth>
                  {regLoading ? "Loading..." : "sign up"}
                </SoftButton>
              </SoftBox>
              <SoftBox mt={3} textAlign="center">
                <SoftTypography variant="button" color="text" fontWeight="regular">
                  Already have an account?&nbsp;
                  <SoftTypography
                    component={Link}
                    to="/authentication/sign-in"
                    variant="button"
                    color="dark"
                    fontWeight="bold"
                    textGradient
                  >
                    Sign in
                  </SoftTypography>
                </SoftTypography>
              </SoftBox>
            </SoftBox>
          </SoftBox>
        </Card>
      )}
    </BasicLayout>
  );
}

export default SignUp;
