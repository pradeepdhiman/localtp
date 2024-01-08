
// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import typography from "assets/theme/base/typography";
import { useState } from "react";
import MyCourseItem from "./component/MyCourseItem";
import { useLocation } from "react-router-dom";
import CourseItem from "layouts/dashboard/component/Courseitem";
import { authUser } from "utils/utils";
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";
import SoftTypography from "components/SoftTypography";
import { useCompletedCourseQuery } from "utils/functions";
import { useActiveCourseQuery } from "utils/functions";

function MyCourses() {
  const { size } = typography;
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const completeParam = params.get('complete');

  let user = authUser()
  const { data: completedCourse, isError: completedError, isLoading: completedLoading } = useCompletedCourseQuery({ ApplicantID: user?.id })
  const { data: activeCourse, isError: activeError, isLoading: activeLoading } = useActiveCourseQuery({ ApplicantID: user?.id })


  const [selectedCourse, setSelectedCourse] = useState({});

  const handleCourseSelect = (event, newValue) => {
    setSelectedCourse(newValue);
  };

  function renderCompletedCourse() {
    return (
      <SoftBox>
        {completedLoading && <SoftBarLoader />}
        {completedCourse?.data?.length !== 0 ? (
          <Grid item xs={12} md={6} xl={3}>
            <CourseItem complete={true} />
          </Grid>
        ) : (
          <Grid item xs={12}>
            <SoftTypography variant="button" fontWeight="bold" color="text">
              You have not completed any course yet.
            </SoftTypography>
          </Grid>
        )}
      </SoftBox>
    );
  }
  
  function renderActiveCourse() {
    return (
      <SoftBox>
        {activeLoading && <SoftBarLoader />}
        {activeCourse?.data?.length !== 0 ? (
          <Grid item xs={12} md={6} xl={3}>
            <CourseItem />
          </Grid>
        ) : (
          <Grid item xs={12}>
            <SoftTypography variant="button" fontWeight="bold" color="text">
              You have not started any active course yet.
            </SoftTypography>
          </Grid>
        )}
      </SoftBox>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={3}>
            {completeParam ? renderCompletedCourse() : renderActiveCourse()}
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default MyCourses;
