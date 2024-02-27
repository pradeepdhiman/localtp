

import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import PropTypes from "prop-types";

import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

import DefaultNavbarLink from "examples/Navbars/DefaultNavbar/DefaultNavbarLink";
import DefaultNavbarMobile from "examples/Navbars/DefaultNavbar/DefaultNavbarMobile";

import breakpoints from "assets/theme/base/breakpoints";
import { useAuth } from "auth-context/auth.context";
import { authUser } from "utils/utils";
import { logout } from "utils/utils";

import brand from "../../../assets/images/logo-ct.png"

const logobox = {
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  gap: "10px"
}

function CustomeNavbar({ transparent, light, action }) {
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  const openMobileNavbar = ({ currentTarget }) => setMobileNavbar(currentTarget.parentNode);
  const closeMobileNavbar = () => setMobileNavbar(false);
  // let { user } = useAuth();
  let user = authUser()

  useEffect(() => {
    // A function that sets the display state for the DefaultNavbarMobile.
    function displayMobileNavbar() {
      if (window.innerWidth < breakpoints.values.lg) {
        setMobileView(true);
        setMobileNavbar(false);
      } else {
        setMobileView(false);
        setMobileNavbar(false);
      }
    }

    /** 
     The event listener that's calling the displayMobileNavbar function when 
     resizing the window.
    */
    window.addEventListener("resize", displayMobileNavbar);

    // Call the displayMobileNavbar function to set the state with the initial value.
    displayMobileNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", displayMobileNavbar);
  }, []);



  return (
    <SoftBox>
      <SoftBox
        py={1.5}
        px={{ xs: transparent ? 4 : 5, sm: transparent ? 2 : 5, lg: transparent ? 0 : 5 }}
        // my={2}
        // mx={3}
        width="calc(100%)"
        // borderRadius="section"
        shadow={transparent ? "none" : "md"}
        color={light ? "white" : "dark"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="absolute"
        left={0}
        zIndex={3}
        sx={({ palette: { transparent: transparentColor, white }, functions: { rgba } }) => ({
          backgroundColor: transparent ? transparentColor.main : rgba(white.main, 1),
          // backdropFilter: transparent ? "none" : `saturate(200%) blur(30px)`,
        })}
      >
        <SoftBox style={logobox} component={Link} to="/" py={transparent ? 1.5 : 0.75} lineHeight={1}>
          <SoftBox component="img" src={brand} alt="Training Portal" width="2rem" />
          <SoftTypography variant="button" fontWeight="bold" color={light ? "white" : "dark"}>
            Compliance 360
          </SoftTypography>
        </SoftBox>
        <SoftBox color="inherit" display={{ xs: "none", lg: "flex" }} m={0} p={0}>
          {user && <DefaultNavbarLink
            name="Dashaboard"
            route="/dashboard"
            light={light}
          />}
          <DefaultNavbarLink name="home" route="/home" light={light} />
          <DefaultNavbarLink name="our courses" route="/courses" light={light} />
          {/* <DefaultNavbarLink

            name="about us"
            route="/aboutus"
            light={light}
          /> */}
          {/* <DefaultNavbarLink
            name="contact us"
            route="/contectus"
            light={light}
          /> */}
          {!user && <DefaultNavbarLink
            name="Sign in"
            route="/authentication/sign-in"
            light={light}
          />}
          {user && <DefaultNavbarLink
            name="Logout"
            route="/authentication/sign-in"
            light={light}
          />}
        </SoftBox>
        {action &&
          (action.type === "internal" ? (
            <SoftBox display={{ xs: "none", lg: "inline-block" }}>
              <SoftButton
                component={Link}
                to={action.route}
                variant="gradient"
                color={action.color ? action.color : "info"}
                size="small"
                circular
              >
                {action.label}
              </SoftButton>
            </SoftBox>
          ) : (
            <SoftBox display={{ xs: "none", lg: "inline-block" }}>
              <SoftButton
                component="a"
                href={action.route}
                target="_blank"
                rel="noreferrer"
                variant="gradient"
                color={action.color ? action.color : "info"}
                size="small"
                circular
              >
                {action.label}
              </SoftButton>
            </SoftBox>
          ))}
        <SoftBox
          display={{ xs: "inline-block", lg: "none" }}
          lineHeight={0}
          py={1.5}
          pl={1.5}
          color="inherit"
          sx={{ cursor: "pointer" }}
          onClick={openMobileNavbar}
        >
          <Icon fontSize="default">{mobileNavbar ? "close" : "menu"}</Icon>
        </SoftBox>
      </SoftBox>
      {mobileView && <DefaultNavbarMobile open={mobileNavbar} close={closeMobileNavbar} />}
    </SoftBox>
  );
}

// Setting default values for the props of DefaultNavbar
CustomeNavbar.defaultProps = {
  transparent: false,
  light: false,
  action: false,
};

// Typechecking props for the DefaultNavbar
CustomeNavbar.propTypes = {
  transparent: PropTypes.bool,
  light: PropTypes.bool,
  action: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      type: PropTypes.oneOf(["external", "internal"]).isRequired,
      route: PropTypes.string.isRequired,
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
      label: PropTypes.string.isRequired,
    }),
  ]),
};

export default CustomeNavbar;
