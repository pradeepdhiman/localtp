
// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Images
import wavesWhite from "assets/images/shapes/waves-white.svg";
// import rocketWhite from "assets/images/illustrations/rocket-white.png";
import rocketWhite from "assets/images/banners/profileBanner.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import SoftButton from "components/SoftButton";
import { _sourcePath } from "config/constant";

function BuildByDevelopers(props) {
  const { course = {} } = props
  const location = useLocation()
  const navigate = useNavigate();
  return (
    <Card>
      <SoftBox p={2}>
        <Grid container spacing={3} direction="column">
          <Grid item xs={12} lg={5} sx={{ position: "relative", ml: "auto" }} >
            <SoftBox
              height="100%"
              display="grid"
              justifyContent="center"
              alignItems="center"
              // bgColor="info"
              borderRadius="lg"
              variant="gradient"
            >
              <SoftBox
                component="img"
                src={_sourcePath + "Content/CourseImage/" + course.courseImage}
                alt={course.courseName}
                display="block"
                position="absolute"
                left={0}
                width="100%"
                height="100%"
              />
              <SoftBox component="img" src={_sourcePath + "Content/CourseImage/" + course.courseImage} alt={course.courseName} width="100%" pt={3} />

            </SoftBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <SoftBox display="flex" flexDirection="column" height="100%">
              <SoftBox pt={1} mb={0.5}>
                <SoftTypography variant="body2" color="text" fontWeight="medium">
                  {course.categoryName}
                </SoftTypography>
              </SoftBox>
              <SoftTypography variant="h5" fontWeight="bold" gutterBottom>
                {course.courseName}
              </SoftTypography>
              <SoftButton onClick={() => navigate(`${location.pathname}/${course.courseID}`)} size="small" variant="text" color="info">Read More</SoftButton>
              
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>
    </Card>
  );
}

export default BuildByDevelopers;
