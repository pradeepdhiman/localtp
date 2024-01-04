

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import SoftBox from "components/SoftBox";
import PageCoverLayoutPlain from "examples/LayoutContainers/PageLayoutCoverPlain";
import { Grid } from "@mui/material";
import Details from "../BuildByDevelopers/details";
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";


function CourseDetail() {
  const navigate = useNavigate();
  const { courseid } = useParams()
  const [getCoursem, { data, isError, isLoading }] = useGetCourseMutation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCoursem({ id: courseid });
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchData();
  }, [courseid, getCoursem]);

  const { data: course } = data || {};

  return (
    <PageCoverLayoutPlain>
      <SoftBox mb={3}>
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12}>
            {(isLoading) && <SoftBarLoader />}
            {course && <Details course={course} />}
          </Grid>
        </Grid>
      </SoftBox>
    </PageCoverLayoutPlain>
  );
}

export default CourseDetail;
