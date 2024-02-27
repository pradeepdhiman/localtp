
// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import CourseItem from "layouts/dashboard/component/Courseitem";
import { authUser } from "utils/utils";
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";
import SoftTypography from "components/SoftTypography";
import { useCompletedCourseQuery } from "utils/functions";
import { useActiveCourseQuery } from "utils/functions";
import { Card, Stack } from "@mui/material";
import ResultItem from "layouts/dashboard/component/ResultItem";
import { useApplicantAssementListQuery } from "utils/functions";

function MyCourses() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const completeParam = params.get('complete');

  let user = authUser()
  const { data: completedCourse, isError: completedError, isLoading: completedLoading } = useCompletedCourseQuery({ ApplicantID: user?.applicantId })
  const { data: activeCourse, isError: activeError, isLoading: activeLoading } = useActiveCourseQuery({ ApplicantID: user?.applicantId })
  const { data: resultData, isLoading: resultLoading } = useApplicantAssementListQuery({ ApplicantID: user?.applicantId })
  const [selectedCourse, setSelectedCourse] = useState({});

  const handleCourseSelect = (event, newValue) => {
    setSelectedCourse(newValue);
  };



  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mb={3}>
        {!completeParam && <Card>
          {/* <SoftBox pt={2} px={2}>
            <SoftBox mb={0.5}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <SoftTypography variant="h6" fontWeight="medium">
                  My Courses
                </SoftTypography>
              </Stack>
            </SoftBox>
          </SoftBox> */}
          <SoftBox p={2}>
            {activeLoading && <SoftBarLoader />}
            <Grid container spacing={3}>


              {activeCourse?.data.length && activeCourse?.data?.map(itemData => <Grid key={itemData.applicantCourseI} item xs={12} md={6} xl={3}><CourseItem item={itemData} /></Grid>)}
              {activeCourse?.data.length === 0 && <Grid item xs><SoftTypography variant="button" fontWeight="bold" color="text">
                You dont have active course.
              </SoftTypography></Grid>}

            </Grid>
          </SoftBox>
        </Card>}
        {completeParam && <Card>
          <SoftBox pt={2} px={2}>
            <SoftBox mb={0.5}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <SoftTypography variant="h6" fontWeight="medium">
                  Completed course
                </SoftTypography>
              </Stack>
            </SoftBox>
          </SoftBox>
          <SoftBox p={2}>
            {resultLoading && <SoftBarLoader />}
            <Grid container spacing={3}>
              {resultData?.data?.length !== 0 ? <Grid item xs={12} md={12} xl={12}>
                {resultData?.data.length && <ResultItem dataList={resultData?.data} />}
              </Grid> : <Grid item xs><SoftTypography variant="button" fontWeight="bold" color="text">
                You dont have completed course.
              </SoftTypography></Grid>}
            </Grid>
          </SoftBox>
          {/* <SoftBox p={2}>
            {completedLoading && <SoftBarLoader />}
            <Grid container spacing={3}>
              {completedCourse?.data?.length !== 0 ? <Grid item xs={12} md={6} xl={3}>
                {completedCourse?.data.length && completedCourse?.data?.map(itemData => <CourseItem key={itemData.applicantCourseI} item={itemData} />)}
              </Grid> : <Grid item xs><SoftTypography variant="button" fontWeight="bold" color="text">
                You dont have completed course.
              </SoftTypography></Grid>}
            </Grid>
          </SoftBox> */}
        </Card>}
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default MyCourses;


// { completeParam ? renderCompletedCourse() : renderActiveCourse() }