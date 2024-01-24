
import HomeLayout from "./components/homelayout";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { saveObject } from "utils/utils";


function AssessmentTest() {
  const navigate = useNavigate();
  const { assessmentItem } = useSelector(state => state.common);

  

  const MySwal = withReactContent(Swal);
  const startTestHandler = async () => {
    const result = await MySwal.fire({
      icon: 'warning',
      title: 'Important Notes',
      text: 'Please refrain from refreshing or minimizing the screen. Any ongoing tests will be automatically canceled if you perform these actions. Your cooperation is appreciated to ensure the accuracy and completion of the testing process. Thank you.',
      confirmButtonText: 'Start Test',
      showCancelButton: true,
    });

    if (result.isConfirmed) {
      try {
        navigate('/test');
        // saveObject("assesItem", JSON.stringify(assessmentItem))
        // window.open('/test', '_blank');
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <HomeLayout>
      <SoftBox mt={3}>
        <SoftTypography variant="h3" fontWeight="bold" color="info" textGradient>Welcome to Assessment Test</SoftTypography>
        <SoftTypography variant="body2" fontWeight="regular" color="text">Do not refresh or move to another page while test.</SoftTypography>
        <SoftBox mt={2}>
          <SoftButton color="dark" onClick={startTestHandler}>Start Test</SoftButton>
        </SoftBox>
      </SoftBox>
    </HomeLayout>
  );
}

export default AssessmentTest;
