
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

function MyCourses() {
  const { size } = typography;
  const [selectedCourse, setSelectedCourse] = useState({});

  const handleCourseSelect = (event, newValue) => {
    setSelectedCourse(newValue);
  };



  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mb={3}>
        <Grid container spacing={3} >
          <Grid item xs={12} lg={3}>
            <MyCourseItem />
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default MyCourses;
