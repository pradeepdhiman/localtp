
// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import typography from "assets/theme/base/typography";
import { Autocomplete, Card, CardContent, Switch, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import CompleteCourse from "./component/CompleteCourse";
import Projects from "layouts/courses/components/Projects";
import { CardCover } from "@mui/joy";
import VideoList from "examples/Lists/VideoLIst";
import profilesListData from "./data/profilesListData";
import StudyMaterialList from "examples/Lists/StudyMaterialList";
import ScheduleList from "examples/Lists/ScheduleList";
import studymaterialdata from "./data/studymaterialdata";
import schedulelistdata from "./data/schedulelistdata";
import { useLocation } from "react-router-dom";
import { useActiveCourseQuery } from "utils/functions";
import { authUser } from "utils/utils";
import { useStudyMatMutation } from "utils/functions";
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";
import { useSelectedScheduleMutation } from "utils/functions";
import { useSelector } from "react-redux";
const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 }
];
function Study() {
  const { joinedSession } = useSelector(state => state.study)
  const [selectedCourse, setSelectedCourse] = useState({});
  const [isLive, setIsLive] = useState(false);
  let user = authUser()
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const courseParam = queryParams.get('course');
  const { data: activeCourse, isError: activeError, isLoading: activeLoading } = useActiveCourseQuery({ ApplicantID: user?.applicantId })
  const [getMat, { data: material, isError: matError, isLoading: matLoading }] = useStudyMatMutation()
  const [getSch, { data: schList, isLoading: schLoading }] = useSelectedScheduleMutation()

  useEffect(() => {
    if (!courseParam) {
      setSelectedCourse(activeCourse?.data[0])
    } else {
      let selected = activeCourse?.data?.find(x => x.courseID == courseParam)
      setSelectedCourse(selected)
    }
  }, [activeCourse, courseParam])

  useEffect(() => {
    async function fetchData() {
      try {
        if (selectedCourse?.courseID !== undefined && selectedCourse?.courseID !== null) {
          await getMat({ CourseID: selectedCourse.courseID });
          await getSch({ id: selectedCourse.scheduleID });
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }

    fetchData();

  }, [selectedCourse]);


  const handleCourseSelect = (event, newValue) => {
    setSelectedCourse(newValue);
  };

  const videoVSlive = () => setIsLive(!isLive);


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox display="flex" alignItems="center" justifyContent="space-between">
        <Autocomplete
          disablePortal
          disableClearable
          id="combo-box-demo"
          value={selectedCourse}
          onChange={handleCourseSelect}
          options={activeCourse?.data || []}
          getOptionLabel={(option) => option?.courseName}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} />}
        />
        <SoftBox display="flex" alignItems="center">
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={videoVSlive}
            color={isLive ? "error" : "success"}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            {isLive ? "Live" : "Video"}&nbsp;&nbsp;
          </SoftTypography>
          <Switch checked={isLive} onChange={videoVSlive} />
        </SoftBox>
      </SoftBox>
      {joinedSession && Object.keys(joinedSession).length ? <SoftBox pb={3} mt={3}>
        <Grid container gap={2}>
          <Grid item xs={12} md={8}>
            <Card sx={{ minWidth: 300, minHeight: 450, width: "100%", flexGrow: 1 }}>
              <CardCover>
                <video
                  autoPlay
                  loop
                  muted
                  poster="https://assets.codepen.io/6093409/river.jpg"
                >
                  <source
                    src="https://assets.codepen.io/6093409/river.mp4"
                    type="video/mp4"
                  />
                </video>
              </CardCover>
              <CardContent>
                <SoftTypography
                  level="body-lg"
                  fontWeight="lg"
                  textColor="#fff"
                  mt={{ xs: 12, sm: 18 }}
                >
                  Video
                </SoftTypography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md>
            <VideoList title="Video List" videolist={profilesListData} />
          </Grid>
        </Grid>
      </SoftBox> : null}
      <SoftBox pb={3} mt={3}>
        <Grid container gap={2}>
          <Grid item xs={12} md>
            {matLoading && <SoftBarLoader />}
            {material?.data?.length && <StudyMaterialList title="Study Material" datalist={material?.data || []} />}
          </Grid>
          <Grid item xs={12} md={8}>
            {schLoading && <SoftBarLoader />}
            {schList && Object.keys(schList?.data).length && <ScheduleList title="Course Schedules" datalist={[schList?.data] || []} />}
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Study;
