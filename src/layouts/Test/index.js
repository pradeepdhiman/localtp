
import curved9 from "assets/images/curved-images/homeBanner.png";
import HomeLayout from "./components/homelayout";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import { useEffect, useRef, useState } from "react";
import { Card, Checkbox, Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup } from "@mui/material";
import { authUser } from "utils/utils";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";
import { useCourseAssessMutation, useGetCourseQuestionListMutation, useSubmitAssessmentMutation } from "../../utils/functions";
import moment from "moment";


function Test() {

  const { assessmentItem } = useSelector(state => state.common);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [answeerlist, setAnsweerlist] = useState([]);
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState(600);
  const [attemptCount, setAttemptCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [getQuestion, { data: question, isLoading: questionLoading }] = useGetCourseQuestionListMutation();
  const [courseAssess, { data: assessResp, isLoading: assessLoading }] = useCourseAssessMutation();
  const [submitAssessment, { data: submitRes, isLoading: submitLoading }] = useSubmitAssessmentMutation();


  const handleContextMenu = (e) => e.preventDefault();
  let user = authUser();
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    async function fetchQuestion() {
      try {
        await courseAssess({ id: assessmentItem?.courseID });
        const quesRes = await getQuestion({ CourseID: assessmentItem?.courseID });
        setIsRunning(true);
      } catch (err) {
        console.log(err);
      }
    }
    if (assessmentItem?.courseID) {
      fetchQuestion()
    }
  }, [assessmentItem])



  useEffect(() => {
    let timer;
    
    if (isRunning) {
      timer = setInterval(() => {
        setTimeRemaining(prevTime => (prevTime > 0 ? prevTime - 1 : clearInterval(timer)));
      }, 1000);
    }
  
    return () => {
      clearInterval(timer);
      if (timeRemaining === 0 && answeerlist?.length) {
        submitAssessmentData();
      }
    };
  }, [isRunning, timeRemaining]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const nextHandler = async () => {
    if (!answer) return;

    let newVal = {
      detailID: 0,
      candidateAssesmentID: 0,
      questionID: parseInt(question?.data[activeQuestionIndex].questionID),
      applicantAnswer: answer,
      correctAnswer: question?.data[activeQuestionIndex].correctAnswer,
      weightage: "",
      weightageScored: "",
      result: "",
      grade: "",
      createdById: parseInt(user?.applicantId),
      remarks: ""
    }
    setAnsweerlist(prev => ([...prev, newVal]))
    setAnswer("")

    if (activeQuestionIndex === assessResp?.data?.numberofQuestions - 1) {
      return
    }

    setActiveQuestionIndex(activeQuestionIndex + 1)

  };


  const submitAssessmentData = async () => {
    const sendAbleData = {
      candidateAssesmentID: 0,
      applicantID: parseInt(user?.applicantId),
      coursesAssesmentID: parseInt(assessResp?.data?.assessmentID),
      assesmentDate: moment(),
      createdById: parseInt(user?.applicantId),
      remarks: "",
      candidateAssesmentDeatilList: answeerlist,
    };

    try {
      const res = await submitAssessment(sendAbleData);
      if (res?.data?.success) {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Error submitting assessment:", err);
    }
  };
  useEffect(() => {
    if (answeerlist?.length === assessResp?.data?.numberofQuestions) {
      submitAssessmentData();
    }
  }, [answeerlist, assessResp, submitAssessmentData]);


  function answerChangeHandler(e) {
    const val = e.target.value
    setAnswer(val)
  }

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isRunning) {
        const message = 'Are you sure you want to leave? Your progress will be lost.';
        event.returnValue = message;
        return message;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden && isRunning) {
        handleAttempt('minimize');
      }
    };

    const handleResize = () => {
      if (isRunning) {
        handleAttempt('resize');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
    };
  }, [isRunning, attemptCount]);

  const handleAttempt = (action) => {
    setAttemptCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    if (attemptCount === 1) {
      Swal.fire({
        icon: 'error',
        title: 'Test Canceled',
        text: 'You have exceeded the allowed attempts. Your test is canceled. Please retry next time.',
      }).then(() => {
        navigate("/dashboard");
      });
    } else if (attemptCount > 1) {
      setAttemptCount(0);
    }
  }, [attemptCount]);


  return (
    <SoftBox onContextMenu={handleContextMenu} p={3} sx={{
      position: "fixed",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      background: "white",
      zIndex: 1201,
    }}>
      <Card elevation={3}>
        <SoftBox py={3} px={3} sx={{ display: "flex", justifyContent: "space-between", alignItem: "center" }}>
          <SoftTypography variant="h5" fontWeight="bold" color="text">
            Advance Javascript
          </SoftTypography>
          <SoftTypography variant="h6" fontWeight="bold" color="error">
            {formatTime(timeRemaining)}
          </SoftTypography>
        </SoftBox>
        <Divider sx={{ margin: 0, width: "100%" }} />
        <SoftBox py={3} px={3}>
          <Grid container gap={2} direction="column" alignItems="flex-start">
            <Grid item>
              <SoftTypography><b>Question :- </b> {question?.data[activeQuestionIndex]?.questionTitle} </SoftTypography>
            </Grid>
            <Grid item>
              {questionLoading || assessLoading && <SoftBarLoader />}
              {(question && question.data.length) && (
                <FormControl>
                  <RadioGroup value={answer} onChange={answerChangeHandler}>
                    {Object.entries(question.data[activeQuestionIndex]).map(([key, value]) => (
                      key.startsWith('option') && (
                        <FormControlLabel
                          key={key}
                          value={value}
                          control={<Radio />}
                          label={value}
                        />
                      )
                    ))}
                  </RadioGroup>
                </FormControl>
              )}

            </Grid>

          </Grid>
        </SoftBox>
        <SoftBox py={3} px={3} sx={{ display: "flex", justifyContent: "space-between", alignItem: "center" }}>
          <SoftTypography
            variant="text"
            fontWeight="bold"
            sx={{ cursor: "poiner", userSelect: "none", fontSize: "15px" }}
          >
            {activeQuestionIndex + 1} &nbsp; of &nbsp;{assessResp?.data?.numberofQuestions || 0}
          </SoftTypography>
          <SoftButton disabled={!answer} onClick={nextHandler} color="info">{submitLoading ? "Loading..." : "Next"}</SoftButton>
          {/* {activeQuestionIndex + 1 !== assessResp?.data?.numberofQuestions && <SoftButton disabled={!answer} onClick={nextHandler} color="info">Next</SoftButton>}
          {activeQuestionIndex + 1 === assessResp?.data?.numberofQuestions && <SoftButton disabled={!answer} onClick={submitTesthandler} color="info">Submit</SoftButton>} */}
        </SoftBox>
      </Card>
    </SoftBox>
  );
}

export default Test;
