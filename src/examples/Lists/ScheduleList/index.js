
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftButton from "components/SoftButton";

import watch from "assets/images/icons/watch.png"
import moment from "moment";
import { useDispatch } from "react-redux";
import { setJoinedSession } from "layouts/study/studySlice";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

function ScheduleList({ title, datalist }) {

  const MySwal = withReactContent(Swal);
  const joinSchedulehandler = async (link) => {
    const result = await MySwal.fire({
      icon: 'info',
      title: 'Join Schedule',
      text: "Your session will be start in new tab, Press join to continue",
      confirmButtonText: 'Join',
      showCancelButton: true,
    });

    if (result.isConfirmed) {
      try {
        // navigate('/test');
        window.open(link, '_blank');
      } catch (err) {
        console.log(err);
      }
    }
  };
  const dispatch = useDispatch()
  const renderList = datalist?.map((item) => (
    <SoftBox key={item?.scheduledID} component="li" display="flex" alignItems="center" py={1} mb={1}>
      <SoftBox mr={2}>
        <SoftAvatar src={watch} alt="schedule icon" variant="rounded" shadow="md" />
      </SoftBox>
      <SoftBox
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
      >
        <SoftTypography variant="button" fontWeight="medium">
          {item?.scheduledName}
        </SoftTypography>
        <SoftTypography variant="caption" color="text">
          {moment(item?.startDate).format("DD-MM-YYYY hh:mmA")}
        </SoftTypography>
      </SoftBox>
      <SoftBox ml="auto">
        <SoftButton size="small" color="dark" onClick={()=>joinSchedulehandler(item?.meetingLink)}>
        {/* <SoftButton size="small" color="dark" onClick={() => dispatch(setJoinedSession({ scheduledID, scheduledName }))}> */}
          Join Session
        </SoftButton>
      </SoftBox>
    </SoftBox>
  ));

  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox pt={2} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </SoftTypography>
      </SoftBox>
      <SoftBox p={2}>
        <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {renderList}
        </SoftBox>
      </SoftBox>
    </Card>
  );
}



export default ScheduleList;
