

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";

// Authentication layout components
import Footer from "layouts/authentication/components/Footer";
import SoftButton from "components/SoftButton";
import { useNavigate } from "react-router-dom";
import HomePagelayout from "examples/LayoutContainers/HomePageLayout";
import CustomeNavbar from "examples/Navbars/CustomeNavbar";
import styles from "../style.module.css"

import curved9 from "assets/images/banners/vecteezy_arabic-business-man-at-meeting_12107251.webp"
import curved10 from "assets/images/banners/office-workers-using-finance-graphs.webp"
import curved11 from "assets/images/banners/vecteezy_arabic-business-man-at-meeting_12107251.webp"
import curved12 from "assets/images/banners/pexels-mikhail-nilov-7582655.webp"

function HomeLayout({ color, header, title, description, image, top, children }) {
  const navigate = useNavigate()


  return (
    <HomePagelayout background="white" >
      <SoftBox className={styles.absolutenavbox}><CustomeNavbar /></SoftBox>
      {/* <DefaultNavbar /> */}
      <Grid container className={styles.container} sx={{
        backgroundImage: `url(${image}) `,
        backgroundSize: "cover",
      }}>
        <Grid item xs={12} className={styles.gridbox}>
          <SoftBox p={3} className={styles.bannerContentbox}>
            <SoftBox mb={1}>
              <SoftTypography variant="h1" fontWeight="bold" color="white">
                {title}
              </SoftTypography>
            </SoftBox>
            {/* <SoftTypography variant="h5" fontWeight="regular" color="white">
              Welcome to an exciting journey of learning and empowerment with Compliance360! We are not just trainers – we're your professional partners in mastering the ever-changing world of AML/CFT Compliance.
            </SoftTypography>
            <SoftTypography variant="body2" fontWeight="regular" color="white">
              Unlock Your AML-Compliance Skills with Compliance360: Your Compliance Training Begins Here!
            </SoftTypography>
            <SoftBox mt={2}>
              <SoftButton onClick={() => navigate('/courses')} color="info" variant="gradient">Get Start</SoftButton>
            </SoftBox> */}
          </SoftBox>
        </Grid>
      </Grid>
      {/* <SoftBox>
        <Grid container spacing={2} alignItems="center">
          <Grid xs={12} sm={6} >
            <SoftBox className={styles.fluidImage} component="img" src={curved9} alt={curved9} />
          </Grid>
          <Grid xs={12} sm={6}>
            <SoftBox p={3}>
              <SoftBox mb={1}>
                <SoftTypography variant="h2" fontWeight="bold" color="dark">
                  Why <br></br> Choose Us?
                </SoftTypography>
              </SoftBox>
              <SoftBox
                component="ul"
                sx={{
                  mt: 3,
                  mb: 0,
                  ml: 2
                }}
              >
                <SoftBox component="li" px={2} lineHeight={1} >
                  <SoftTypography variant="button" fontWeight="regular" color="dark">
                    <strong>Seasoned Mentors:</strong> Learn from industry experts with real-world experience, tailoring insights and strategies to your specific needs.
                  </SoftTypography>
                </SoftBox>
                <SoftBox component="li" px={2} lineHeight={1} >
                  <SoftTypography variant="button" fontWeight="regular" color="dark">
                    <strong>Personalized Learning:</strong> Say goodbye to generic programs! Our training is crafted just for you, aligning with your unique goals.
                  </SoftTypography>
                </SoftBox>
                <SoftBox component="li" px={2} lineHeight={1} >
                  <SoftTypography variant="button" fontWeight="regular" color="dark">
                    <strong>Boundless Knowledge:</strong> Dive into a wealth of top-notch courses, certifications, and resources – your gateway to becoming an AML champion.
                  </SoftTypography>
                </SoftBox>
              </SoftBox>
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>

      <SoftBox>
        <Grid container spacing={2} alignItems="center">
          <Grid xs={12} sm={6} >
            <SoftBox p={3}>
              <SoftBox mb={1}>
                <SoftTypography variant="h2" fontWeight="bold" color="dark">
                  Our   Mission
                </SoftTypography>
              </SoftBox>
              <SoftTypography variant="body2" fontWeight="regular" color="dark">
                Empowering you to make informed decisions, safeguard your organization, and secure its future. Through transformative learning, we guide you to:
              </SoftTypography>
              <SoftBox
                component="ul"
                sx={{
                  mt: 3,
                  mb: 0,
                  ml: 2
                }}
              >
                <SoftBox component="li" px={2} lineHeight={1} >
                  <SoftTypography variant="button" fontWeight="regular" color="dark">
                    <strong>Navigate Regulations:</strong> Decode AML/CFT laws and confidently maneuver through the regulatory landscape.
                  </SoftTypography>
                </SoftBox>
                <SoftBox component="li" px={2} lineHeight={1} >
                  <SoftTypography variant="button" fontWeight="regular" color="dark">
                    <strong>Sharpen Detection Skills:</strong> Become adept at identifying suspicious activities and preventing financial crime.
                  </SoftTypography>
                </SoftBox>
                <SoftBox component="li" px={2} lineHeight={1} >
                  <SoftTypography variant="button" fontWeight="regular" color="dark">
                    <strong>Build a Solid Compliance Foundation:</strong> Strengthen internal controls for unwavering adherence to regulations.
                  </SoftTypography>
                </SoftBox>
                <SoftBox component="li" px={2} lineHeight={1} >
                  <SoftTypography variant="button" fontWeight="regular" color="dark">
                    <strong>Champion Continuous Improvement:</strong> Embrace a culture of growth, adapting to evolving risks and threats.
                  </SoftTypography>
                </SoftBox>
              </SoftBox>
            </SoftBox>
          </Grid>
          <Grid xs={12} sm={6}>
            <SoftBox className={styles.fluidImage} component="img" src={curved10} alt={curved9} />
          </Grid>
        </Grid>
      </SoftBox>



      <SoftBox>
        <Grid container spacing={2} alignItems="center" className={styles.darkContainer} px={3} py={6} mt={3} ml={0}>
          <Grid xs={12} sm={12} mb={3}>
            <SoftBox ml={3}>
              <SoftTypography variant="h2" fontWeight="regular" color="white" className={styles.centerHeading}>
                AML Training Pathway
              </SoftTypography>
              <SoftTypography variant="body2" fontWeight="regular" color="white" className={styles.centerHeading}>
                AML Training Pathway Compliance360 equips you with essential tools and knowledge to excel in your AML role:
              </SoftTypography>
            </SoftBox>
          </Grid>
          <Grid xs={12} sm={6} >
            <SoftBox ml={3}>
              <SoftBox mb={1}>
                <SoftTypography variant="h5" fontWeight="bold" color="white">
                  For Employees
                </SoftTypography>
              </SoftBox>
              <SoftBox
                component="ul"
                sx={{
                  mt: 3,
                  mb: 0,
                  ml: 2
                }}
              >
                <SoftBox component="li" px={2} lineHeight={1} color="white">
                  <SoftTypography variant="button" fontWeight="regular" color="white">
                    <strong>Master Fundamentals</strong> Understand AML/CFT concepts, legal frameworks, and your responsibilities.
                  </SoftTypography>
                </SoftBox>
                <SoftBox component="li" px={2} lineHeight={1} color="white">
                  <SoftTypography variant="button" fontWeight="regular" color="white">
                    <strong>Become a KYC Pro:</strong> Enhance skills in customer due diligence, identifying suspicious transactions, and risk mitigation.
                  </SoftTypography>
                </SoftBox>
                <SoftBox component="li" px={2} lineHeight={1} color="white">
                  <SoftTypography variant="button" fontWeight="regular" color="white">
                    <strong>Stay Ahead:</strong> Access cutting-edge training on emerging threats and regulatory changes.
                  </SoftTypography>
                </SoftBox>
              </SoftBox>
            </SoftBox>
          </Grid>
          <Grid xs={12} sm={6} >
            <SoftBox ml={3}>
              <SoftBox mb={1}>
                <SoftTypography variant="h5" fontWeight="bold" color="white">
                  For Executives and Compliance Staff
                </SoftTypography>
              </SoftBox>
              <SoftBox
                component="ul"
                sx={{
                  mt: 3,
                  mb: 0,
                  ml: 2
                }}
              >
                <SoftBox component="li" px={2} lineHeight={1} color="white">
                  <SoftTypography variant="button" fontWeight="regular" color="white">
                    <strong>Elevate Leadership:</strong> Develop strategic thinking and risk management skills for complex challenges.
                  </SoftTypography>
                </SoftBox>
                <SoftBox component="li" px={2} lineHeight={1} color="white">
                  <SoftTypography variant="button" fontWeight="regular" color="white">
                    <strong>Empower Your Team:</strong> Cultivate a vigilant and compliant culture within your organization.
                  </SoftTypography>
                </SoftBox>
                <SoftBox component="li" px={2} lineHeight={1} color="white">
                  <SoftTypography variant="button" fontWeight="regular" color="white">
                    <strong>Stay Updated:</strong> Gain in-depth knowledge of regulatory changes, keeping your organization ahead.
                  </SoftTypography>
                </SoftBox>
              </SoftBox>
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>

      <SoftBox>
        <Grid container spacing={2} alignItems="center" mt={3}>
          <Grid xs={12} sm={6} >
            <SoftBox className={styles.fluidImage} component="img" src={curved12} alt={curved9} />
          </Grid>
          <Grid xs={12} sm={6}>
            <SoftBox ml={3}>
              <SoftBox mb={1}>
                <SoftTypography variant="h2" fontWeight="bold" color="dark">
                  Compliance360
                </SoftTypography>
              </SoftBox>
              <SoftBox>
                <SoftTypography variant="body2" fontWeight="regular" color="dark">
                  Your Trusted AML Partner Embark on this thrilling journey of learning and growth. With Compliance360, you'll not only master AML/CFT compliance – you'll become a champion for financial security and integrity.
                </SoftTypography>
              </SoftBox>
              <SoftBox mt={2}>
                <SoftTypography variant="body2" fontWeight="regular" color="dark">
                  Contact us today to start your personalized AML training adventure!
                </SoftTypography>
              </SoftBox>
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox> */}


      <Footer />
    </HomePagelayout>
  );
}

// Setting default values for the props of HomeLayout
HomeLayout.defaultProps = {
  header: "",
  title: "",
  description: "",
  color: "info",
  top: 7,
};

// Typechecking props for the HomeLayout
HomeLayout.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  header: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  top: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default HomeLayout;
