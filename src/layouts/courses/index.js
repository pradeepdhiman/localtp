

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import curved9 from "assets/images/curved-images/aboutBanner.png";
import PageCoverLayout from "examples/LayoutContainers/PageLayoutCover";
import BuildByDevelopers from "./components/BuildByDevelopers";
import { Card, Grid, Pagination, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import SoftSnakBar from "components/SoftSnakbar";
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";
import { useGetCoursesQuery } from "utils/functions";
import { useGetCourseswithauthQuery } from "utils/functions";
import { authUser } from "utils/utils";



function Courses() {
  const { data: courses, isError, isLoading, isFetching } = useGetCoursesQuery()
  const { data: courslist, isLoading: listloading } = useGetCourseswithauthQuery()

  let user = authUser()

  const navigate = useNavigate();
  const dispatch = useDispatch()

  console.log(courses, "vour")

  const [rememberMe, setRememberMe] = useState(true);
  const [formData, setFormData] = useState({
    'email': '',
    'password': ''
  });

  // console.log(courses)


  const renderSearch = (
    <SoftBox component="form" role="form">
      <SoftBox>
        <SoftInput type="text" name="search" value={formData?.search} placeholder="Search" />
      </SoftBox>
    </SoftBox>
  )


  return (
    <PageCoverLayout
      title="Our Courses"
      description="Lorm ipsum doller sit amet dummy cntent rfjjd remedies parlo gaibi"
      image={curved9}
    >
      {isLoading && <SoftBarLoader />}
      {courses?.data?.length ? <><SoftBox mb={3}>
        <>
          <SoftBox px={4} mt={2}>
            <SoftBox >
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <SoftTypography variant="h6" fontWeight="medium" >
                  Courses
                </SoftTypography>
                {renderSearch}
              </Stack>
            </SoftBox>
            <SoftBox mb={1}>
              <SoftTypography variant="button" fontWeight="regular" color="text">
                Here is our best course for you.
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          <SoftBox p={2}>
            {user?.applicantId ? <Grid container spacing={3}>
              {courslist?.data?.map((courseItem) => (
                <Grid key={courseItem.courseID} item xs={12} md={6} xl={3}>
                  <BuildByDevelopers course={courseItem} />
                </Grid>
              ))}
            </Grid> : <Grid container spacing={3}>
              {courses?.data?.map((courseItem) => (
                <Grid key={courseItem.courseID} item xs={12} md={6} xl={3}>
                  <BuildByDevelopers course={courseItem} />
                </Grid>
              ))}
            </Grid>}
          </SoftBox>
        </>
      </SoftBox>
        {/* <SoftBox>
          <Stack spacing={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Pagination count={10} variant="outlined" shape="rounded" />
          </Stack>
        </SoftBox> */}
      </>
        : <SoftTypography variant="button" fontWeight="regular" color="text">
          No Course Available
        </SoftTypography>}
    </PageCoverLayout>
  );
}

export default Courses;
