
// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import typography from "assets/theme/base/typography";
import CourseItem from "./component/Courseitem";
import { Card, Stack } from "@mui/material";
import SoftButton from "components/SoftButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useCompletedCourseQuery } from "utils/functions";
import { useActiveCourseQuery } from "utils/functions";
import { authUser } from "utils/utils";

function Dashboard() {
  const { size } = typography;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  let user = authUser()

  const { data: completedCourse, isError: completedError, isLoading: completedLoading } = useCompletedCourseQuery({ ApplicantID: user?.id })
  const { data: activeCourse, isError: activeError, isLoading: activeLoading } = useActiveCourseQuery({ ApplicantID: user?.id })


  console.log(completedCourse, "completed")
  console.log(activeCourse, "active")


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mb={3}>
        <Card>
          <SoftBox pt={2} px={2}>
            <SoftBox mb={0.5}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <SoftTypography variant="h6" fontWeight="medium">
                  My Courses
                </SoftTypography>
                <SoftButton onClick={() => navigate(`${pathname}/mycourses`)} variant="text" color="info">
                  All
                </SoftButton>
              </Stack>
            </SoftBox>
            <SoftBox mb={1}>
              <SoftTypography variant="button" fontWeight="regular" color="text">
                Start learning your course.
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          <SoftBox p={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} xl={3}>
                <CourseItem />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <CourseItem />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <CourseItem />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <CourseItem />
              </Grid>
            </Grid>
          </SoftBox>
        </Card>
      </SoftBox>
      <SoftBox mb={3}>
        <Card>
          <SoftBox pt={2} px={2}>
            <SoftBox mb={0.5}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <SoftTypography variant="h6" fontWeight="medium">
                  Completed Courses
                </SoftTypography>
                <SoftButton onClick={() => navigate(`${pathname}/mycourses?complete=true`)} variant="text" color="info">All</SoftButton>
              </Stack>
            </SoftBox>
            <SoftBox mb={1}>
              <SoftTypography variant="button" fontWeight="regular" color="text">
                Download your certificates.
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          <SoftBox p={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} xl={3}>
                <CourseItem complete={true} />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <CourseItem complete={true} />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <CourseItem complete={true} />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <CourseItem complete={true} />
              </Grid>
            </Grid>
          </SoftBox>
        </Card>
      </SoftBox>
      <SoftBox mb={3}>
        <Card>
          <SoftBox pt={2} px={2}>
            <SoftBox mb={0.5}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <SoftTypography variant="h6" fontWeight="medium">
                  Relative Courses
                </SoftTypography>
                <SoftButton onClick={() => navigate("/courses")} variant="text" color="info">All</SoftButton>
              </Stack>
            </SoftBox>
            <SoftBox mb={1}>
              <SoftTypography variant="button" fontWeight="regular" color="text">
                You may learn these courses related to your purchesed courses.
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          <SoftBox p={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} xl={3}>
                <CourseItem relativeCourse={true} />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <CourseItem relativeCourse={true} />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <CourseItem relativeCourse={true} />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <CourseItem relativeCourse={true} />
              </Grid>
            </Grid>
          </SoftBox>
        </Card>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
