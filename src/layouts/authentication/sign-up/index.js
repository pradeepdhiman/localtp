
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
  createdById: 0,
  remarks: ""
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
  const [register, { data: regData, error: regErr, isLoading: regLoading }] = useApplicantRegisterMutation()
  const [getProfile, { data: profileData, isError: profileErr, isLoading: profileLoading }] = useProfileMutation()

console.log(regErr, "aaaa")
console.log(regData, "bbb")

  const user = authUser()
  const MySwal = withReactContent(Swal)

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
          courseId: parseInt(courseId),
          applicantID: parseInt(user.id),
          firstName: user.userName,
          email: user.email,
          password: JSON.stringify(formData.password),
          createdById: parseInt(user.id),
        };
      } else {
        newData = {
          ...formData,
          courseId: parseInt(courseId),
          createdById: 1
        };
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
                  required
                />
              </SoftBox>
              <SoftBox mb={2}>
                <SoftInput
                  type="email"
                  name="email"
                  onChange={handleFormData}
                  required
                  placeholder="Email"
                />
              </SoftBox>
              <SoftBox mb={2}>
                <SoftInput
                  type="password"
                  name="password"
                  onChange={handleFormData}
                  required
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
                <SoftButton type="submit" variant="gradient" color="dark"  fullWidth>
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
