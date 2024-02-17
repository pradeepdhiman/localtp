
// // @mui material components
// import Grid from "@mui/material/Grid";

// // @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import PinterestIcon from "@mui/icons-material/Pinterest";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";

// // Soft UI Dashboard React components
// import SoftBox from "components/SoftBox";
// import SoftTypography from "components/SoftTypography";

// function Footer() {
//   return (
//     <SoftBox component="footer" py={6}>
//       <Grid container justifyContent="center">
//         <Grid item xs={10} lg={8}>
//           <SoftBox display="flex" justifyContent="center" flexWrap="wrap" mb={3}>
//             <SoftBox mr={{ xs: 2, lg: 3, xl: 6 }}>
//               <SoftTypography component="a" href="/aboutus" variant="body2" color="secondary">
//                 About Us
//               </SoftTypography>
//             </SoftBox>
//             <SoftBox mr={{ xs: 0, lg: 3, xl: 6 }}>
//               <SoftTypography component="a" href="/courses" variant="body2" color="secondary">
//                 Courses
//               </SoftTypography>
//             </SoftBox>
//             <SoftBox mr={{ xs: 2, lg: 3, xl: 6 }}>
//               <SoftTypography component="a" href="/faq" variant="body2" color="secondary">
//                 Faq
//               </SoftTypography>
//             </SoftBox>
//             <SoftBox mr={{ xs: 2, lg: 3, xl: 6 }}>
//               <SoftTypography component="a" href="/contectus" variant="body2" color="secondary">
//                 Contact us
//               </SoftTypography>
//             </SoftBox>
//             <SoftBox>
//               <SoftTypography component="a" href="/privacypolicy" variant="body2" color="secondary">
//                 Privacy Policy
//               </SoftTypography>
//             </SoftBox>
//           </SoftBox>
//         </Grid>
//         <Grid item xs={12} lg={8}>
//           <SoftBox display="flex" justifyContent="center" mt={1} mb={3}>
//             <SoftBox mr={3} color="secondary">
//               <FacebookIcon fontSize="small" />
//             </SoftBox>
//             <SoftBox mr={3} color="secondary">
//               <TwitterIcon fontSize="small" />
//             </SoftBox>
//             <SoftBox mr={3} color="secondary">
//               <InstagramIcon fontSize="small" />
//             </SoftBox>
//             <SoftBox mr={3} color="secondary">
//               <PinterestIcon fontSize="small" />
//             </SoftBox>
//             <SoftBox color="secondary">
//               <LinkedInIcon fontSize="small" />
//             </SoftBox>
//           </SoftBox>
//         </Grid>
//         <Grid item xs={12} lg={8} sx={{ textAlign: "center" }}>
//           <SoftTypography variant="body2" color="secondary">
//             Copyright &copy; 2023 Soft by Bilberry.
//           </SoftTypography>
//         </Grid>
//       </Grid>
//     </SoftBox>
//   );
// }

// export default Footer;



/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

function Footer({ company, links }) {
  const { href, name } = company;
  const { size } = typography;

  const renderLinks = () =>
    links.map((link) => (
      <SoftBox key={link.name} component="li" px={2} lineHeight={1}>
        <Link href={link.href} target="_blank">
          <SoftTypography variant="button" fontWeight="regular" color="text">
            {link.name}
          </SoftTypography>
        </Link>
      </SoftBox>
    ));

  return (
    <SoftBox
      // width="100%"
      display="flex"
      flexDirection={{ xs: "column" }}
      justifyContent="space-between"
      alignItems="center"
      py={6}
    >
      <SoftBox
        component="ul"
        sx={({ breakpoints }) => ({
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          listStyle: "none",
          mt: 3,
          mb: 0,
          p: 0,

          [breakpoints.up("lg")]: {
            mt: 0,
          },
        })}
      >
        {renderLinks()}
      </SoftBox>
      <SoftBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        color="text"
        fontSize={size.sm}
        mt={2}
      >
        &copy; {new Date().getFullYear()}
        <Link href={href} target="_blank">
          <SoftTypography variant="button" fontWeight="medium">
            &nbsp;{name}&nbsp;
          </SoftTypography>
        </Link>
        - Coded by Bilberry.
      </SoftBox>
    </SoftBox>
  );
}

// Setting default values for the props of Footer
Footer.defaultProps = {
  company: { href: "", name: "Bilberry Solution" },
  links: [
    { href: "/aboutus", name: "About Us" },
    { href: "/FAQ", name: "Faq" },
    { href: "/contectus", name: "Contact us" },
    { href: "/privacypolicy", name: " Privacy Policy" },
  ],
};



export default Footer;

