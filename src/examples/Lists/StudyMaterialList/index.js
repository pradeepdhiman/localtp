

// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftButton from "components/SoftButton";
import pdficon from "assets/images/icons/pdf.png"

function StudyMaterialList({ title, datalist }) {
  console.log(datalist, "datalist")
  const renderList = datalist.length !== 0 ? (
    datalist.map(({ image, name, description, action }) => (
      <SoftBox key={name} component="li" display="flex" alignItems="center" py={1} mb={1}>
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
            {name}
          </SoftTypography>
          <SoftTypography variant="caption" color="text">
            {description}
          </SoftTypography>
        </SoftBox>
        <SoftBox ml="auto">
          {action.type === "internal" ? (
            <SoftButton component={Link} to={action.route} variant="text" color="info">
              {action.label}
            </SoftButton>
          ) : (
            <SoftButton
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="text"
              color={action.color}
            >
              {action.label}
            </SoftButton>
          )}
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

// Typechecking props for the ProfilesList
StudyMaterialList.propTypes = {
  title: PropTypes.string.isRequired,
  datalist: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default StudyMaterialList;
