
// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import { useSelector } from "react-redux";
import moment from "moment";

function SessionList({ title, list, action }) {
  

  const { session } = useSelector(state => state.common)

  const renderlist = list.length > 0 ? (
    list.map((item) => (
      <SoftBox key={item?.scheduledID} component="li" display="flex" alignItems="center" py={1} mb={1}>
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
            {item?.instructorName}
          </SoftTypography>
        </SoftBox>
        <SoftBox
          ml="auto"
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
        >
          <SoftTypography variant="button" fontWeight="medium">
            <b>From</b> {moment(item?.startDate).format("MM-DD-YYYY")}
          </SoftTypography>
          <SoftTypography variant="button" fontWeight="medium">
            <b>To</b>  {moment(item?.endDate).format("MM-DD-YYYY")}
          </SoftTypography>
        </SoftBox>
        <SoftBox
          ml="auto"
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
        >
          <SoftTypography variant="button" fontWeight="medium">
            {moment(item?.validityDateTime).format("HH:mm:ss a")}
          </SoftTypography>
          <SoftTypography variant="button" fontWeight="medium">
            {item?.locationName}
          </SoftTypography>
        </SoftBox>
        <SoftBox ml="auto">
          <SoftButton onClick={() => action(item)} component="button" variant="text" color={session?.scheduledID === item?.scheduledID ? "success" : "info"}>
            {session?.scheduledID === item?.scheduledID ? "Unselect" : "Select"}
          </SoftButton>
        </SoftBox>
      </SoftBox>
    ))
  ) : (
    <SoftBox py={1} mb={1}>
      <SoftTypography variant="body1">
        No schedule available.
      </SoftTypography>
    </SoftBox>
  );



  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox pt={2} px={2} >
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </SoftTypography>
      </SoftBox>
      <SoftBox p={2} style={{ maxHeight: 300, overflow: 'auto' }}>
        <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {renderlist}
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

// Typechecking props for the SessionList
SessionList.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SessionList;
