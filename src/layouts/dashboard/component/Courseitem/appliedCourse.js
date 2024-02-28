
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Images
import SoftButton from "components/SoftButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { _sourcePath } from "config/constant";

function AppliedCourse(props) {
  const { course = {} } = props
  const Navigate = useNavigate()
  return (
    <>
      {course?.length && course?.map(item => <Card>
        <SoftBox p={2}>
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
                  src={_sourcePath + "Content/CourseImage/" + item.courseImage}
                  alt="waves"
                  display="block"
                  position="absolute"
                  left={0}
                  width="100%"
                  height="100%"
                />
                <SoftBox component="img" src={_sourcePath + "Content/CourseImage/" + item.courseImage} alt="rocket" width="100%" pt={3} />
              </SoftBox>
            </Grid>
            <Grid item xs={12} lg={8}>
              <SoftBox >
                <SoftTypography display="inline-block" variant="button" fontWeight="medium">
                  Course Name :
                </SoftTypography>
                <SoftTypography display="inline-block" variant="caption" fontWeight="regular" color="text">
                  &nbsp;{item?.courseName}
                </SoftTypography>
              </SoftBox>
              <SoftBox >
                <SoftTypography display="inline-block" variant="button" fontWeight="medium">
                  Course Schedule Name :
                </SoftTypography>
                <SoftTypography display="inline-block" variant="caption" fontWeight="regular" color="text">
                  &nbsp;{item?.scheduleName}
                </SoftTypography>
              </SoftBox>
              <SoftBox >
                <SoftTypography display="inline-block" variant="button" fontWeight="medium">
                  Course Fee :
                </SoftTypography>
                <SoftTypography display="inline-block" variant="caption" fontWeight="regular" color="text">
                  &nbsp; ${item?.trainingfee}
                </SoftTypography>
              </SoftBox>
              <SoftBox >
                <SoftTypography display="inline-block" variant="button" fontWeight="medium">
                  Status :
                </SoftTypography>
                <SoftTypography display="inline-block" variant="caption" fontWeight="regular" color="text">
                  &nbsp;{item?.courseStatusName}
                </SoftTypography>
              </SoftBox>
              <SoftBox >
                <SoftTypography display="inline-block" variant="button" fontWeight="medium">
                  Payment Status :
                </SoftTypography>
                <SoftTypography display="inline-block" variant="caption" fontWeight="regular" color="text">
                  &nbsp;{item?.paymentStatusName}
                </SoftTypography>
              </SoftBox>
              <SoftBox mt={2}>
                <SoftButton variant="gradient" color="dark" onClick={()=>Navigate("/dashboard/profile")}>Activate Now</SoftButton>
              </SoftBox>
            </Grid>
          </Grid>
        </SoftBox>
      </Card>)}
    </>
  );
}

export default AppliedCourse;

