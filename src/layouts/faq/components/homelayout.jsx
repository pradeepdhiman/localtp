

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

function HomeLayout({ color, header, title, description, image, top, children }) {
const navigate = useNavigate()


  return (
    <PageLayout background="white">
      <DefaultNavbar />
      <Grid
        container
        justifyContent="center"
        sx={{
          minHeight: "75vh",
          margin: 0,
        }}
      >
        <Grid item xs={11} sm={8}>
          <SoftBox mt={top}>
            <SoftBox pt={3} px={3}>
              {children}
            </SoftBox>
          </SoftBox>
        </Grid>
      </Grid>
      <Footer />
    </PageLayout>
  );
}

HomeLayout.defaultProps = {
  header: "",
  title: "",
  description: "",
  color: "info",
  top: 20,
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
