

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
import { useAssociatedScheduleQuery } from "utils/functions";
import { useGetCourseQuery } from "utils/functions";

const dummySession = [
  {
    sessionId: 1,
    sessionName: "Session1",
    teacher: "Haider",
    sessionDate: "26-11-2024",
    sessionStartTime: "10:15AM"
  },
  {
    sessionId: 2,
    sessionName: "Session2",
    teacher: "Pradeep",
    sessionDate: "26-11-2024",
    sessionStartTime: "10:15AM"
  },
  {
    sessionId: 3,
    sessionName: "Session1",
    teacher: "Anwar",
    sessionDate: "26-11-2024",
    sessionStartTime: "10:15AM"
  },
  {
    sessionId: 4,
    sessionName: "Session1",
    teacher: "Haider",
    sessionDate: "26-11-2024",
    sessionStartTime: "10:15AM"
  },
  {
    sessionId: 5,
    sessionName: "Session2",
    teacher: "Pradeep",
    sessionDate: "26-11-2024",
    sessionStartTime: "10:15AM"
  },
  {
    sessionId: 6,
    sessionName: "Session1",
    teacher: "Anwar",
    sessionDate: "26-11-2024",
    sessionStartTime: "10:15AM"
  },
  {
    sessionId: 7,
    sessionName: "Session1",
    teacher: "Haider",
    sessionDate: "26-11-2024",
    sessionStartTime: "10:15AM"
  },
  {
    sessionId: 8,
    sessionName: "Session2",
    teacher: "Pradeep",
    sessionDate: "26-11-2024",
    sessionStartTime: "10:15AM"
  },
  {
    sessionId: 9,
    sessionName: "Session1",
    teacher: "Anwar",
    sessionDate: "26-11-2024",
    sessionStartTime: "10:15AM"
  }
]

function CourseDetail() {
  const dispatch = useDispatch()
  const { session } = useSelector(state => state.common)
  const navigate = useNavigate();
  const { courseid } = useParams()
  const { data: course, isError, isLoading } = useGetCourseQuery({ id: courseid })
  const { data: assosSchedule, isError: assosErr, isLoading: assosLoading } = useAssociatedScheduleQuery({ CourseID: courseid })


  useEffect(() => {
    dispatch(setSelectedSession([]));
  }, [courseid]);



  function selecthandler(selectedItem) {
    dispatch(setSelectedSession(selectedItem));
  }


  return (
    <PageCoverLayoutPlain>
      <SoftBox mb={3}>
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12}>
            {(isLoading) && <SoftBarLoader />}
            {course && <Details course={course?.data} />}
          </Grid>
          <Grid item xs={12}>
            {(assosLoading) && <SoftBarLoader />}
            <SessionList title="Availabe Session" list={assosSchedule?.data || []} action={selecthandler} />
          </Grid>
        </Grid>
      </SoftBox>
    </PageCoverLayoutPlain>
  );
}

export default CourseDetail;
