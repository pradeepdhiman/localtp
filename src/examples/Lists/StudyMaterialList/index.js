

// react-routers components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftButton from "components/SoftButton";
import pdficon from "assets/images/icons/pdf.png"
import { _apiBaseUrl } from "config/constant";

function StudyMaterialList({ title, datalist }) {
  const renderList = datalist.length !== 0 ? (
    datalist.map(({ courseName, materialTypeName, filePath, materialID }) => (
      <SoftBox key={materialID} component="li" display="flex" alignItems="center" py={1} mb={1}>
        <SoftBox mr={2}>
          <SoftAvatar src={pdficon} alt="pdf file" variant="rounded" shadow="md" />
        </SoftBox>
        <SoftBox
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
        >
          <SoftTypography variant="button" fontWeight="medium">
            {courseName}
          </SoftTypography>
          <SoftTypography variant="caption" color="text">
            {materialTypeName}
          </SoftTypography>
        </SoftBox>
        <SoftBox ml="auto">
          <SoftButton sx={{cursor:"pointer"}}  onClick={() => window.open(`${_apiBaseUrl}Content/Receipts/${filePath}`, "_blank")} variant="text" color="info">
            Read
          </SoftButton>
          {/* <SoftButton component={Link} to={filePath} target="_blank" variant="text" color="info">
            Read
          </SoftButton> */}
        </SoftBox>
      </SoftBox>
    ))
  ) : (
    <SoftTypography variant="h6" fontWeight="medium" >
      Study material not available
    </SoftTypography>
  );


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



export default StudyMaterialList;
