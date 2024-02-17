

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import SoftBox from "components/SoftBox";
import PageCoverLayoutPlain from "examples/LayoutContainers/PageLayoutCoverPlain";
import { Grid } from "@mui/material";
import Details from "../BuildByDevelopers/details";
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";
import SessionList from "examples/Lists/SessionList";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedSession } from "utils/commonSlice";
import { useGetCourseQuery } from "utils/functions";

function CourseDetail() {
  const dispatch = useDispatch()
  const { session } = useSelector(state => state.common)
  const navigate = useNavigate();
  const { courseid } = useParams()
  const { data: course, isError, isLoading } = useGetCourseQuery({ id: courseid })
 


  useEffect(() => {
    dispatch(setSelectedSession([]));
  }, [courseid]);



  return (
    <PageCoverLayoutPlain>
      <SoftBox mb={3}>
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12}>
            {(isLoading) && <SoftBarLoader />}
            {course && <Details course={course?.data} />}
          </Grid>
        </Grid>
      </SoftBox>
    </PageCoverLayoutPlain>
  );
}

export default CourseDetail;
