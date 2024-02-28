

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


function DetailLayout({ color, header, title, description, image, top, children }) {
  const navigate = useNavigate()


  return (
    <HomePagelayout background="white" >
      <SoftBox className={styles.absolutenavbox}><CustomeNavbar /></SoftBox>
      
      <SoftBox mt={4}>
        {children}
      </SoftBox>


      <Footer />
    </HomePagelayout>
  );
}

// Setting default values for the props of HomeLayout
DetailLayout.defaultProps = {
  header: "",
  title: "",
  description: "",
  color: "info",
  top: 7,
};

// Typechecking props for the HomeLayout
DetailLayout.propTypes = {
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

export default DetailLayout;
