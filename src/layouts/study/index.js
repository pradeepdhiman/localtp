
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
import { useLocation } from "react-router-dom";
import { useActiveCourseQuery } from "utils/functions";
import { authUser } from "utils/utils";
import { useStudyMatMutation } from "utils/functions";
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";
import { useSelector } from "react-redux";
import { useSelectedCourseScheduleMutation } from "utils/functions";
import SessionList from "examples/Lists/SessionList";
import { useAssociatedScheduleMutation } from "utils/functions";
import moment from "moment";
import { useAssignScheduleMutation } from "utils/functions";
import { useGetApplicantinfoMutation } from "utils/functions";
import { useApplicantCourseMutation } from "utils/functions";
import { useScheduleFilterMutation } from "utils/functions";

const scheduleinitialfilter = {
  "draw": 0,
  "start": 0,
  "length": 1000,
  "columns": [
    {
      "data": "scheduledName",
      "name": "scheduledName",
      "searchable": true,
      "orderable": true,
      "search": {
        "value": "",
        "regex": ""
      }
    }
  ],
  "search": {
    "value": "",
    "regex": ""
  },
  "order": {
    "orderBy": "UpdatedDate",
    "orderDirection": "desc"
  },
  "filter": {
    "scheduledID": 0,
    "scheduledName": "",
    "courseID": 0,
    "courseName": "",
    "startDate": null,
    "endDate": null,
    "scheduleCreatedDateTime": null,
    "validityDateTime": null,
    "location": 0,
    "locationName": "",
    "instructor": 0,
    "instructorName": "",
    "status": 0,
    "statusName": "Active",
    "createdById": 0,
    "updatedById": 0,
    "updatedDate": null,
    "isDeleted": false,
    "remarks": ""
  }
}

const schedulelinkinitialfilter = {
  "draw": 0,
  "start": 0,
  "length": 100,
  "columns": [
    {
      "data": "string",
      "name": "string",
      "searchable": true,
      "orderable": true,
      "search": {
        "value": "",
        "regex": ""
      }
    }
  ],
  "search": {
    "value": "",
    "regex": ""
  },
  "order": {
    "orderBy": "UpdatedDate",
    "orderDirection": "desc"
  },
  "filter": {
    "courseScheduleID": 0,
    "scheduledID": 0,
    "scheduledName": "",
    "courseID": 0,
    "courseName": "",
    "meetingLink": "",
    "courseScheduleStatus": 0,
    "courseScheduleStatusName": "",
    "status": 0,
    "statusName": "",
    "createdById": 0,
    "updatedById": 0,
    "updatedDate": null,
    "isDeleted": false,
    "remarks": ""
  }
}

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
  // const [getSch, { data: schList, isLoading: schLoading }] = useSelectedScheduleMutation()
  const [getSch, { data: schList, isLoading: schLoading }] = useScheduleFilterMutation()
  // const [getSchedule, { data: assosSchedule, isError: assosErr, isLoading: assosLoading }] = useAssociatedScheduleMutation()
  const [getSchedule, { data: assosSchedule, isError: assosErr, isLoading: assosLoading }] = useAssociatedScheduleMutation()
  const [asignSchedule, { data: asignSch, isError: asignErr, isLoading: asignLoading }] = useAssignScheduleMutation()
  const [applicant, { data: appli, isError: appliErr, isLoading: appliLoading }] = useApplicantCourseMutation()

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
        if (selectedCourse && selectedCourse.courseID) {
          const courseID = selectedCourse.courseID;
          await Promise.all([
            getMat({ CourseID: courseID }),
            getSchedule({ ...scheduleinitialfilter, filter: { ...scheduleinitialfilter.filter, courseID: courseID } }),
            getSch({ ...schedulelinkinitialfilter, filter: { ...schedulelinkinitialfilter.filter, courseID: courseID, scheduledID: selectedCourse.scheduleID } })
          ]);
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

  async function selecthandler(selectedItem) {
    try {
      let data = {
        applicantCourseID: parseInt(selectedCourse?.applicantCourseID),
        applicantID: parseInt(selectedCourse?.applicantID),
        courseID: parseInt(selectedCourse?.courseID),
        scheduleID: parseInt(selectedItem?.scheduledID),
        enrollmentDate: selectedCourse?.enrollmentDate,
        completionDate: selectedCourse?.completionDate,
        receiptID: selectedCourse?.receiptID,
        receiptDate: selectedCourse?.receiptDate,
        amountPaid: selectedCourse?.amountPaid,
        paymentStatus: parseInt(selectedCourse?.paymentStatus),
        courseStatus: parseInt(selectedCourse?.courseStatus),
        status: parseInt(selectedCourse?.status),
        updatedById: parseInt(selectedCourse?.updatedById),
        remarks: selectedCourse?.remarks
      };
      const response = await asignSchedule(data);
      if (response?.data?.success) {
        await getSch({ ...schedulelinkinitialfilter, filter: { ...schedulelinkinitialfilter.filter, courseID: selectedItem?.courseID, scheduledID: selectedItem?.scheduledID } })
      }
    } catch (err) {
      console.error("Error occurred:", err);
    }
  }



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
          <Grid item xs={12}>
            {(assosLoading) && <SoftBarLoader />}
            <SessionList title="Availabe Schedules" list={assosSchedule?.data || []} action={selecthandler} />
          </Grid>
          <Grid item xs={12} md>
            {matLoading ? <SoftBarLoader /> : (
              !material || !material.data || material.data.length === 0 ? (
                <Card><SoftTypography>Study Material Not Availabe</SoftTypography></Card>
              ) : (
                <StudyMaterialList title="Study Material" datalist={material.data} />
              )
            )}
          </Grid>

          <Grid item xs={12} md={8}>
            {schLoading ? <SoftBarLoader /> : (
              !schList || !schList.data || Object.keys(schList.data).length === 0 ? (
                <Card><SoftTypography>Schedule Unavailable.</SoftTypography></Card>
              ) : (
                <ScheduleList title="Course Schedules" datalist={schList.data} />
              )
            )}
          </Grid>

        </Grid>

      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Study;
