import SoftBox from "components/SoftBox";
import HomeLayout from "./components/homelayout";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import { useRandomQuestionMutation } from "utils/functions";
import { useCourseAssessListMutation } from "utils/functions";
import { useSubmitAssessmentMutation } from "utils/functions";
import { useNavigate } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Test = () => {
  const { assessmentItem } = useSelector(state => state.common);
  const navigate = useNavigate();
  var MySwal = withReactContent(Swal);
  const [isActive, setIsActive] = useState(false)
  const [changeAttamp, setChangeAttamp] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [getQuestion, { data: question, isLoading: questionLoading }] = useRandomQuestionMutation();
  const [courseAssess, { data: assessResp, isLoading: assessLoading }] = useCourseAssessListMutation();
  const [submitAssessment, { data: submitRes, isLoading: submitLoading }] = useSubmitAssessmentMutation();


  const startCountdown = async () => {
    if (!assessmentItem) {
      navigate("/dashboard/assessment");
    }
    const result = await MySwal.fire({
      icon: 'warning',
      title: 'Important Notes',
      text: 'Please refrain from refreshing or minimizing the screen. Any ongoing tests will be automatically canceled if you perform these actions. Your cooperation is appreciated to ensure the accuracy and completion of the testing process. Thank you.',
      confirmButtonText: 'Start Test',
      showCancelButton: true,
    });

    if (result.isConfirmed) {
      try {
        const res = await getQuestion({ CourseID: assessmentItem?.courseID });
        if (res?.data?.success) {
          fullScreenPage()
          setIsActive(true);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  function fullScreenPage() {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    }
  }

  return (
    <HomeLayout>
      <SoftBox mt={3}>
        <SoftTypography variant="h3" fontWeight="bold" color="info" textGradient>Important Information </SoftTypography>
        <SoftTypography variant="body2" fontWeight="regular" color="text">Do not refresh or move to another page. And you dont have permission to change screen size if you do so your test will be cancelled.</SoftTypography>
        <SoftBox mt={2}>
          <SoftButton disabled={assessLoading || questionLoading} color="dark" onClick={startCountdown}>{questionLoading ? "Starting" : "Start Test"}</SoftButton>
        </SoftBox>
      </SoftBox>
    </HomeLayout>
  );
}

export default Test;