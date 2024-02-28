

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
      
      <SoftBox>
        <Grid container spacing={2} alignItems="center" mt={3}>
          <Grid xs={12} >
            <SoftBox p={4} mt={4}>
              <SoftBox mb={1}>
                <SoftTypography variant="h2" fontWeight="bold" color="dark">
                  Privacy Policy
                </SoftTypography>
              </SoftBox>
              {/* <SoftBox>
                <SoftTypography variant="body2" fontWeight="regular" color="dark">
                  Your Trusted AML Partner Embark on this thrilling journey of learning and growth. With Compliance360, you'll not only master AML/CFT compliance – you'll become a champion for financial security and integrity.
                </SoftTypography>
              </SoftBox>
              <SoftBox mt={2}>
                <SoftTypography variant="body2" fontWeight="regular" color="dark">
                  Contact us today to start your personalized AML training adventure!
                </SoftTypography>
              </SoftBox> */}
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>


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
