

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
import { useGetCoursesQuery } from "utils/functions";
import DetailLayout from "../detailLayout";

export const initialFilters = {
  "draw": 0,
  "start": 0,
  "length": 10,
  "columns": [
    {
      "data": "CourseName",
      "name": "CourseName",
      "searchable": true,
      "orderable": true,
      "search": {
        "value": "",
        "regex": "false"
      }
    }
  ],
  "search": {
    "value": "",
    "regex": "false"
  },
  "order": {
    "orderBy": "Duration",
    "orderDirection": "asc"
  },
  "filter": {
    "courseID": 0,
    "courseName": "",
    "description": "",
    "duration": "",
    "categoryID": 0,
    "categoryName": "",
    "syllabus": "",
    "trainingfee": "",
    "vat": "",
    "totalAmount": "",
    "courseImage": "",
    "status": 26,
    "statusName": "",
    "createdById": 0,
    "updatedById": 0,
    "updatedDate": "2024-01-01",
    "isDeleted": false,
    "remarks": ""
  }
}

function CourseDetail() {
  const { courseid } = useParams()
  const [filters, setFilters] = useState(initialFilters)
  const dispatch = useDispatch()
  const { session, selectedCourse } = useSelector(state => state.common)
  const navigate = useNavigate();
  // const { data: course, isError, isLoading } = useGetCourseQuery({ id: courseid })
 

  useEffect(() => {
    dispatch(setSelectedSession([]));
  }, [courseid]);

  useEffect(() => {
   if(!Object.keys(selectedCourse).length){
    navigate("/courses")
   }
  }, []);



  return (
    <DetailLayout>
      <SoftBox mb={3}>
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12}>
            {/* {(isLoading) && <SoftBarLoader />} */}
            {selectedCourse && <Details course={selectedCourse} />}
          </Grid>
        </Grid>
      </SoftBox>
    </DetailLayout>
  );
}

export default CourseDetail;
