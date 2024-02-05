
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
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";
import { useGetAppliedCourseQuery } from "utils/functions";
import AppliedCourse from "./component/Courseitem/appliedCourse";
import { useEffect } from "react";
import ResultItem from "./component/ResultItem";
import { useApplicantAssementListQuery } from "utils/functions";

function Dashboard() {
  const { size } = typography;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  let user = authUser()

  const { data: completedCourse, isError: completedError, isLoading: completedLoading } = useCompletedCourseQuery({ ApplicantID: user?.applicantId })
  const { data: activeCourse, isError: activeError, isLoading: activeLoading } = useActiveCourseQuery({ ApplicantID: user?.applicantId })
  const { data: appliedCourse, isError: appliedError, isLoading: appliedLoading } = useGetAppliedCourseQuery({ ApplicantID: user?.applicantId })
  const { data: resultData, isLoading: resultLoading } = useApplicantAssementListQuery({ ApplicantID: user?.applicantId })

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mb={3}>
        {appliedCourse?.data?.length !== 0 ? <Card>
          <SoftBox pt={2} px={2}>
            <SoftBox mb={0.5}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <SoftTypography variant="h6" fontWeight="medium">
                  Applied Course
                </SoftTypography>
                {/* <SoftButton onClick={() => navigate(`${pathname}/mycourses`)} variant="text" color="info">
                  All
                </SoftButton> */}
              </Stack>
            </SoftBox>
            <SoftBox mb={1}>
              <SoftTypography variant="button" fontWeight="regular" color="text">
                Your applied course.
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          <SoftBox p={2}>
            {appliedCourse?.data?.length !== 0 ?
              <AppliedCourse course={appliedCourse?.data} /> : <Card>
                <SoftBox p={2}>
                  <SoftTypography variant="button" fontWeight="bold" color="text">
                    You did not apply any course so far.
                  </SoftTypography>
                </SoftBox></Card>}
          </SoftBox>
        </Card> : null}
      </SoftBox>
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
              {activeCourse?.data?.length && activeCourse?.data?.map(itemData => <Grid key={itemData.applicantCourseI} item xs={12} md={6} xl={3}>
                <CourseItem item={itemData} />
              </Grid>)}
              {activeCourse?.data?.length === 0 && <Grid item xs><SoftTypography variant="button" fontWeight="bold" color="text">
                You dont have active course.
              </SoftTypography></Grid>}
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
                  My Assessment
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
            {resultLoading && <SoftBarLoader />}
            <Grid container spacing={3}>
              {resultData?.data?.length !== 0 ? <Grid item xs={12} md={12} xl={12}>
                <ResultItem dataList={resultData?.data} />
              </Grid> : <Grid item xs><SoftTypography variant="button" fontWeight="bold" color="text">
                You have not complete any course yet.
              </SoftTypography></Grid>}
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
                  Most Useful Courses
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
