
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
import { useEffect, useState } from "react";
import { initialFilters } from "./constant";
import RetakeTable from "./component/RetakeTable";
import { toastHandler } from "utils/utils";
import { useGetReassessListMutation } from "utils/functions";

function Assessment() {
  const [filters, setFilters] = useState(initialFilters)

  const user = authUser()
  const { data: { data: courses } = {}, isError: activeError, isLoading: activeLoading } = useActiveCourseQuery({ ApplicantID: user?.applicantId })
  const [getReAssessList, { data: reAssessList, isError: reAssessErr, isLoading: reAssessLoading }] = useGetReassessListMutation(filters)



  useEffect(() => {
    async function getData() {
      try {
        const res = await getReAssessList(filters)
        toastHandler(res)
      } catch (err) { console.log(err) }
    }
   if(user && filters){
    getData()
   }
  }, [])

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox p={2}>
        <Grid container>
          <Grid item xs={12}>
            <RetakeTable list={reAssessList} loading={reAssessLoading} changeFilter={setFilters} />
          </Grid>
        </Grid>
      </SoftBox>
      <SoftBox p={2}>
        {activeLoading && <SoftBarLoader />}
        <SoftBox mb={2}>
          <SoftTypography variant="h6" gutterBottom>
            Available Assessment
          </SoftTypography>
        </SoftBox>
        <Grid container spacing={3}>
          {courses?.length > 0 ? (
            courses.map((courseItem, index) => (
              <Grid key={courseItem.applicantCourseID} item xs={12} md={6} xl={3}>
                <AssessmentCourseItem itemData={courseItem} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <SoftTypography>No Active courses available</SoftTypography>
            </Grid>
          )}
        </Grid>

      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Assessment;
