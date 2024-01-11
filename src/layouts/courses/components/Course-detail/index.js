

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import SoftBox from "components/SoftBox";
import PageCoverLayoutPlain from "examples/LayoutContainers/PageLayoutCoverPlain";
import { Grid } from "@mui/material";
import Details from "../BuildByDevelopers/details";
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";
import { useGetCourseMutation } from "utils/functions";
import SessionList from "examples/Lists/SessionList";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedSession } from "utils/commonSlice";

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
  const [getCoursem, { data, isError, isLoading }] = useGetCourseMutation()
  const { data: course } = data || {};

  useEffect(() => {
    dispatch(setSelectedSession([]));
    const fetchData = async () => {
      try {
        const response = await getCoursem({ id: courseid });
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchData();
  }, [courseid, getCoursem]);

  

  function selecthandler(selectedItem) {
    let newSession = session || [];
  
    const isSessionSelected = newSession.some(item => item.sessionId === selectedItem.sessionId);
  
    if (isSessionSelected) {
      newSession = newSession.filter(item => item.sessionId !== selectedItem.sessionId);
    } else {
      newSession = [...newSession, selectedItem];
    }
  
    dispatch(setSelectedSession([...newSession]));
  }
  
  
  return (
    <PageCoverLayoutPlain>
      <SoftBox mb={3}>
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12}>
            {(isLoading) && <SoftBarLoader />}
            {course && <Details course={course} />}
          </Grid>
          <Grid item xs={12}>
            <SessionList title="Availabe Session" list={dummySession || []} action={selecthandler} />
          </Grid>
        </Grid>
      </SoftBox>
    </PageCoverLayoutPlain>
  );
}

export default CourseDetail;
