
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Grid } from "@mui/material";
import AssessmentCourseItem from "./component/AssessmentCourseItem";
import { useActiveCourseQuery } from "utils/functions";
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";
import { authUser } from "utils/utils";
import SoftTypography from "components/SoftTypography";

function Assessment() {

  const user = authUser()
  const { data: { data: courses } = {}, isError: activeError, isLoading: activeLoading } = useActiveCourseQuery({ ApplicantID: user?.applicantId })
  console.log("first", courses)

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox p={2}>
        {activeLoading && <SoftBarLoader />}
        {courses?.length !== 0 ? <Grid container spacing={3}>
          {courses?.map((courseItem, index) => <Grid key={courseItem.applicantCourseID} item xs={12} md={6} xl={3}>
            <AssessmentCourseItem itemData={courseItem} />
          </Grid>)}
        </Grid> : <SoftTypography>No Active course available</SoftTypography>}
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Assessment;
