
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Images
import wavesWhite from "assets/images/shapes/waves-white.svg";
import rocketWhite from "assets/images/illustrations/rocket-white.png";
import SoftButton from "components/SoftButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { _sourcePath } from "config/constant";

function Details(props) {
  const { course = {} } = props
  const Navigate = useNavigate()
  const [showFee, setShowFee] = useState(false)
  const { session } = useSelector(state => state.common)

  function selectHandler() {
    // if (session.length === 0) {
    //   return;
    // }

    Navigate("/authentication/sign-up?courseid=" + course.courseID + "&coursename=" + course.courseName);
  }


  return (
    <Card>
      <SoftBox p={2} mt={3}>
        <Grid container spacing={3} direction="row">
          <Grid item xs={12} lg={4} sx={{ position: "relative", ml: "auto" }} >
            <SoftBox
              height="100%"
              display="grid"
              justifyContent="center"
              alignItems="center"
              bgColor="info"
              borderRadius="lg"
              variant="gradient"
            >
              <SoftBox
                component="img"
                src={_sourcePath + "Content/CourseImage/" + course.courseImage}
                alt="waves"
                display="block"
                position="absolute"
                left={0}
                width="100%"
                height="100%"
              />
              <SoftBox component="img" src={_sourcePath + "Content/CourseImage/" + course.courseImage} alt="rocket" width="100%" pt={3} />
            </SoftBox>
          </Grid>
          <Grid item xs={12} lg={8}>
            <SoftBox display="flex" flexDirection="column" height="100%">
              <SoftBox pt={1} mb={0.5}>
                <SoftTypography variant="body2" color="text" fontWeight="medium">
                  {course.categoryName}
                </SoftTypography>
              </SoftBox>
              <SoftTypography variant="h5" fontWeight="bold" gutterBottom>
                {course.courseName}
              </SoftTypography>
              <SoftBox mb={2}>
                <SoftTypography variant="body2" color="text" fontWeight="bold">
                  Course Content :
                </SoftTypography>
                <SoftTypography variant="body2" color="text">
                  {/* {course.description} */}
                  {course.syllabus}
                </SoftTypography>
              </SoftBox>
              <SoftBox >
                <SoftTypography variant="body2" color="text">
                  Course Duration : {course.duration} Hours
                </SoftTypography>
              </SoftBox>

              <SoftBox mb={2}>
                {!showFee && <>
                  <SoftTypography variant="body2" color="text">
                    Chceck Course Fee
                  </SoftTypography>
                  <SoftTypography variant="body2" color="text">
                    <SoftTypography onClick={() => setShowFee(!showFee)} sx={{ cursor: "pointer" }} variant="body2" component="span" color="info">Click here to View</SoftTypography>
                  </SoftTypography>
                </>}
                {showFee && <>
                  <SoftTypography variant="body2" color="text">
                    Total Amount : <SoftTypography variant="body2" component="span" color="info">${course.totalAmount}</SoftTypography>
                  </SoftTypography>
                  <SoftTypography variant="body2" color="text">
                    Training Fees : <SoftTypography variant="body2" component="span" color="info">${course.trainingfee}</SoftTypography>
                  </SoftTypography>
                </>}
              </SoftBox>
              <SoftButton variant="gradient" color="dark" onClick={selectHandler}>
                {/* {session.length !== 0 ? "Countinue" : "Select session to countinue"} */}
                Countinue
              </SoftButton>
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>
    </Card>
  );
}

export default Details;
