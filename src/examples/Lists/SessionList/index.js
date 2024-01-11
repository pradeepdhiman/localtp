
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
import {  useSelector } from "react-redux";

function SessionList({ title, list, action }) {
  
  const { session } = useSelector(state => state.common)

  
  
  
  const renderlist = list.map((item) => (
    <SoftBox key={item?.sessionId} component="li" display="flex" alignItems="center" py={1} mb={1}>
      <SoftBox
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
      >
        <SoftTypography variant="button" fontWeight="medium">
          {item?.sessionName}
        </SoftTypography>
        <SoftTypography variant="caption" color="text">
          {item?.teacher}
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
          {item?.sessionDate}
        </SoftTypography>
        <SoftTypography variant="caption" color="text">
          {item?.sessionStartTime}
        </SoftTypography>
      </SoftBox>
      <SoftBox ml="auto">
        <SoftButton onClick={()=>action(item)} component="button" variant="text" color="info">
          {session?.find(x => x.sessionId === item?.sessionId) ? "Unselect" : "Select"}
        </SoftButton>
      </SoftBox>
    </SoftBox>
  ));

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
