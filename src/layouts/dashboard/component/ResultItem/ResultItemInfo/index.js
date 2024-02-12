
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import moment from "moment";
import SoftBadge from "components/SoftBadge";
import { useRetakeRequestMutation } from "utils/functions";
import { authUser } from "utils/utils";
import { toastHandler } from "utils/utils";
import { _reportPath } from "config/constant";
import { useNavigate } from "react-router-dom";

let user = authUser()

function ResultItemInfo({ name, coursename, date, questionnumber, correctanswer, result, courseID, noGutter }) {
  const [requestRetake, { data: reqRes, isLoading: reqLoading, isError: reqErr }] = useRetakeRequestMutation()
  // const [getUser, { data: userinfo, isLoading: userLoading, isError: userErr }] = useGetApplicantinfoMutation()

  const navigate = useNavigate();

  async function downloadHandler() {
    const reportPath = 'CertificateReport';
    const courseName = coursename;
    const certificateDate = date;
    const applicantName = "abc";

    const reportUrl = `${_reportPath}?name=${reportPath}&courseName=${courseName}&certificateDate=${certificateDate}&applicantName=${applicantName}`;

    const newTab = window.open(reportUrl, '_blank');
    if (newTab) {
      newTab.focus();
    } else {
      navigate(reportUrl);
    }
  }

  async function actionhandler(status) {
    let data = {
      reassessmentID: 0,
      courseID: courseID,
      applicantID: parseInt(user?.applicantId),
      fee: "",
      receipt: "",
      receiptID: "",
      receiptDate: null,
      amountPaid: "",
      paymentStatusID: "7",
      createdById: parseInt(user?.applicantId) || null,
      remarks: ""
    }
    if (status === "Fail") {
      try {
        const res = await requestRetake(data)
        toastHandler(res)
      } catch (err) {
        console.log(err)
      }
    } else {
      alert("download certificate")
    }
  }
  return (
    <SoftBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor="grey-100"
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={2}
    >
      <SoftBox width="100%" display="flex" flexDirection="column">
        <SoftBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <SoftTypography variant="button" fontWeight="medium" textTransform="capitalize">
            {name}
          </SoftTypography>

          <SoftBox
            display="flex"
            alignItems="center"
            mt={{ xs: 2, sm: 0 }}
            ml={{ xs: -1.5, sm: 0 }}
          >
            <SoftBox mr={1}>
              {result === "Fail" && <SoftButton disabled={isLoading} onClick={() => actionhandler(result)} variant="text" color="error">
                {isLoading ? "Sending Request" : "Request Retake"}
              </SoftButton>}
              {result === "Pass" && <SoftButton  onClick={() => downloadHandler()} variant="text" color="success">
                Download Certificate
              </SoftButton>}
            </SoftBox>
            {/* <SoftButton variant="text" color="dark">
              <Icon>edit</Icon>&nbsp;edit
            </SoftButton> */}
          </SoftBox>
        </SoftBox>
        <SoftBox mb={1} lineHeight={0}>
          <SoftTypography variant="caption" color="text">
            Course Name:&nbsp;&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium" textTransform="capitalize">
              {coursename}
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={1} lineHeight={0}>
          <SoftTypography variant="caption" color="text">
            Assessment Date:&nbsp;&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium">
              {moment(date).format("DD-MM-YYYY")}
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={1} lineHeight={0}>
          <SoftTypography variant="caption" color="text">
            Total Questions:&nbsp;&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium">
              {questionnumber}
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={1} lineHeight={0}>
          <SoftTypography variant="caption" color="text">
            Correct Answer:&nbsp;&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium">
              {correctanswer}
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
        <SoftTypography variant="caption" color="text">
          Result:&nbsp;&nbsp;&nbsp;
          <SoftBadge
            color={result === "Fail" ? "error" : "success"}
            size="xs"
            badgeContent={result}
            container
          />
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

// Setting default values for the props of ResultItemInfo
ResultItemInfo.defaultProps = {
  noGutter: false,
};



export default ResultItemInfo;
