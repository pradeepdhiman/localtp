
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
import curved6 from "assets/images/curved-images/curved14.jpg";

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



const rawFields = {
  applicantID: 0,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  qualification: "",
  designation: "",
  dob: new Date(),
  nationality: "",
  companyName: "",
  companyContactNumber: "",
  companyAddress: "",
  password: "",
  courseId: 0,
  scheduleId: 0,
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
}



function SignUp() {
  const navigate = useNavigate();
  const { session } = useSelector(state => state.common)

  const [agreement, setAgremment] = useState(true);
  const [formData, setFormData] = useState(rawFields);
  const [error, setError] = useState("");
  const [formerror, setFormerror] = useState({});
  const [designation, setDesignation] = useState({});
  const [qualification, setQualification] = useState({});
  const [nationality, setNationality] = useState({});


  const location = useLocation();

  const queryStrings = location.search;
  const queryStringObject = queryString.parse(queryStrings);
  const courseId = queryStringObject.courseid;
  const coursename = queryStringObject.coursename;
  const [register, { data: regData, error: regErr, isLoading: regLoading }] = useApplicantRegisterMutation()
  const [getProfile, { data: profileData, isError: profileErr, isLoading: profileLoading }] = useProfileMutation()
  const { data: qualificationList, isLoading: qualificationErr } = useMasterListByTypeQuery({ TypeID: 3 })
  const { data: desigList, isLoading: desigErr } = useMasterListByTypeQuery({ TypeID: 4 })
  const { data: nationalityList, isLoading: nationalityErr } = useMasterListByTypeQuery({ TypeID: 5 })

  const user = authUser()
  const MySwal = withReactContent(Swal)


  useEffect(() => {

  }, [qualificationList, desigList, nationalityList])

  useEffect(() => {
    if (user?.id) {
      getProfile({ id: user.id })
        .then((response) => {
          console.log(response, "response profile")
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


  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      let newData = {};

      if (user?.id) {
        newData = {
          ...formData,
          courseId: parseInt(courseId),
          applicantID: parseInt(user.applicantID),
          firstName: user.userName,
          email: user.email,
          password: JSON.stringify(formData.password),
          createdById: parseInt(user.applicantID),
          scheduleId: parseInt(session?.scheduleId),
        };
      } else {
        newData = {
          ...formData,
          courseId: parseInt(courseId),
          createdById: 1,
          scheduleId: parseInt(session?.scheduleId),
          nationality: nationality.code,
          designation: designation.code,
          qualification: qualification.code,
        };
      }

      let err = validateForm(newData, formRule)
      console.log(err)
      if (err) {
        setFormerror(err)
        return
      }

      const response = await register(newData);

      if (response.data.success) {
        Swal.fire({
          title: "Successfully register!",
          text: "Please check your email we will send you payment link.",
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

  return (
    <BasicLayout
      title="Welcome!"
      description="Use these awesome forms to login or create new account in your project for free."
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
                  onChange={handleFormData}
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
                <SoftButton variant="gradient" color="dark" onClick={handleSubmit} fullWidth>
                  Send Request
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
                  placeholder="first name"
                  onChange={handleFormData}
                />
                {formerror?.firstName ? <SoftTypography color="error" variant="button" fontWeight="medium">
                  {formerror?.firstName}
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
              </SoftBox>
              <SoftBox mb={2}>
                <SoftAutoSelect
                  dataList={qualificationList?.data}
                  selectedValue={qualification}
                  selectHandler={qualificationSelectHandler}
                  placeholder="Select Qualification"
                />
                {formerror?.qualification ? <SoftTypography color="error" variant="button" fontWeight="medium">
                  {formerror?.qualification}
                </SoftTypography> : null}
              </SoftBox>
              <SoftBox mb={2}>
                <SoftAutoSelect
                  dataList={desigList?.data}
                  selectedValue={designation}
                  selectHandler={designationSelectHandler}
                  placeholder="Select Designation"
                />
                {formerror?.designation ? <SoftTypography color="error" variant="button" fontWeight="medium">
                  {formerror?.designation}
                </SoftTypography> : null}
              </SoftBox>
              <SoftBox mb={2}>
                <SoftAutoSelect
                  dataList={nationalityList?.data}
                  selectedValue={nationality}
                  selectHandler={nationalitySelectHandler}
                  placeholder="Select Nationality"
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
