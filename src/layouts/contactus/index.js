
import { useState } from "react";

// react-router-dom components
import {  useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import curved6 from "assets/images/banners/bookSelf.webp";

import AuthApi from "../../api/auth";


function Contactus() {
  const navigate = useNavigate();

  const [agreement, setAgremment] = useState(true);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

  const handleSetAgremment = () => setAgremment(!agreement);

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AuthApi.Register(formData)
      .then((response) => {
        if (response.data.success) {
          return navigate("/authentication/sign-in");
        } else {
          setError(response.data.msg);
        }
      })
      .catch((error) => {
        if (error.response) {
          return setError(error.response.data.msg);
        }
        return setError("There has been an error.");
      });
  };

  const handleRedirect = () => navigate("/dashboard");

  return (
    <BasicLayout
      title="Write to us."
      description="We are happy to help you."
      image={curved6}
    >
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
                type="text"
                name="message"
                onChange={handleFormData}
                placeholder="Message"
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
                Send
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default Contactus;
