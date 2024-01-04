
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

const rawFields = {
  applicantID: null,
  firstName: null,
  lastName: null,
  email: null,
  phone: null,
  address: null,
  qualification: null,
  designation: null,
  dob: null,
  nationality: null,
  companyName: null,
  companyContactNumber: null,
  companyAddress: null,
  password: null,
  courseId: null,
  createdById: null,
  remarks: null
}

function SignUp() {
  const navigate = useNavigate();

  const [agreement, setAgremment] = useState(true);
  const [formData, setFormData] = useState(rawFields);
  const [error, setError] = useState("");


  const location = useLocation();

  const queryStrings = location.search;
  const queryStringObject = queryString.parse(queryStrings);
  const courseId = queryStringObject.courseid;
  const coursename = queryStringObject.coursename;
  const [register, { data: regData, isError: regErr, isLoading: regLoading }] = useApplicantRegisterMutation()
  const [getProfile, { data: profileData, isError: profileErr, isLoading: profileLoading }] = useProfileMutation()

  const user = authUser()

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


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let newData = {};
  
      if (user?.id) {
        newData = {
          ...formData,
          courseId: courseId,
          applicantID: user.id,
          firstName: user.userName,
          email: user.email,
        };
      } else {
        newData = {
          ...formData,
          courseId: courseId,
        };
      }
  
      console.log(newData, "new data");
  
      const response = await register(newData);
  
      if (response.data.success) {
        return navigate("/authentication/sign-in");
      } else {
        setError(response.data.msg || "An error occurred during registration.");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.msg || "An error occurred during registration.");
      } else {
        setError("There has been an error.");
      }
    }
  };
  
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   AuthApi.Register(formData)
  //     .then((response) => {
  //       if (response.data.success) {
  //         return navigate("/authentication/sign-in");
  //       } else {
  //         setError(response.data.msg);
  //       }
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //         return setError(error.response.data.msg);
  //       }
  //       return setError("There has been an error.");
  //     });
  // };

  const handleRedirect = () => navigate("/dashboard");

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
            <SoftBox component="form" role="form">
              <SoftBox mb={2}>
                <SoftInput
                  type="text"
                  name="firstName"
                  placeholder="first name"
                  onChange={handleFormData}
                />
              </SoftBox>
              <SoftBox mb={2}>
                <SoftInput
                  type="email"
                  name="email"
                  onChange={handleFormData}
                  placeholder="Email"
                />
              </SoftBox>
              <SoftBox mb={2}>
                <SoftInput
                  type="password"
                  name="password"
                  onChange={handleFormData}
                  placeholder="Password"
                />
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
                <SoftButton variant="gradient" color="dark" onClick={handleSubmit} fullWidth>
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

      {/* {user && user.token ? (
        <Card>
          <h3 style={{ textAlign: "center" }}>You are already signed in.</h3>
          <SoftBox mt={4} mb={1}>
            <SoftButton variant="gradient" buttonColor="info" fullWidth onClick={handleRedirect}>
              {`Let's go`}
            </SoftButton>
          </SoftBox>
        </Card>
      ) : (
        <Card>
          <SoftBox pt={2} pb={3} px={3}>
            <SoftBox component="form" role="form">
              <SoftBox mb={2}>
                <SoftInput
                  type="text"
                  name="username"
                  placeholder="Name"
                  onChange={handleFormData}
                />
              </SoftBox>
              <SoftBox mb={2}>
                <SoftInput
                  type="email"
                  name="email"
                  onChange={handleFormData}
                  placeholder="Email"
                />
              </SoftBox>
              <SoftBox mb={2}>
                <SoftInput
                  type="password"
                  name="password"
                  onChange={handleFormData}
                  placeholder="Password"
                />
              </SoftBox>
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
                <SoftButton variant="gradient" color="dark" onClick={handleSubmit} fullWidth>
                  sign up
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
      )} */}
    </BasicLayout>
  );
}

export default SignUp;
