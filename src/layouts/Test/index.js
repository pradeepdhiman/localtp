import React, { useState, useEffect } from 'react';
import SoftBox from 'components/SoftBox';
import { useNavigate } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import HomeLayout from './components/homelayout';
import SoftTypography from 'components/SoftTypography';
import SoftButton from 'components/SoftButton';
import { useGetCourseQuestionListMutation } from 'utils/functions';
import { useCourseAssessMutation } from 'utils/functions';
import { useSubmitAssessmentMutation } from 'utils/functions';
import { getObject } from 'utils/utils';
import { useCourseAssessListMutation } from 'utils/functions';
import { useRandomQuestionMutation } from 'utils/functions';
import { useSelector } from 'react-redux';
import { authUser } from 'utils/utils';
import { Card, Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material';
import SoftBarLoader from 'components/SoftLoaders/SoftBarLoader';
import moment from 'moment';

const Test = () => {
  const { assessmentItem } = useSelector(state => state.common);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [changeAttamp, setChangeAttamp] = useState(0);
  const navigate = useNavigate();
  const [time, setTime] = useState(600);
  const [isActive, setIsActive] = useState(false);
  var MySwal = withReactContent(Swal);
  const [answeerlist, setAnsweerlist] = useState([]);
  const [answer, setAnswer] = useState('');
  const [assessmentSubmitted, setAssessmentSubmitted] = useState(false);

  const [getQuestion, { data: question, isLoading: questionLoading }] = useRandomQuestionMutation();
  const [courseAssess, { data: assessResp, isLoading: assessLoading }] = useCourseAssessListMutation();
  // const [courseAssess, { data: assessResp, isLoading: assessLoading }] = useCourseAssessMutation();
  const [submitAssessment, { data: submitRes, isLoading: submitLoading }] = useSubmitAssessmentMutation();

  const handleContextMenu = (e) => e.preventDefault();
  let user = authUser();

  useEffect(() => {
    const assessmentItem = JSON.parse(getObject("assesItem"));

    async function fetchAssessmentInfo() {
      if (!Object.keys(assessmentItem).length) return;

      try {
        const res = await courseAssess({ CourseID: assessmentItem?.courseID });
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    }

    fetchAssessmentInfo();
    console.log(assessmentItem);
  }, []);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const startCountdown = async () => {
    if (!assessmentItem) {
      navigate("/dashboard/assessment")
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
        try {
          const res = await getQuestion({ CourseID: assessmentItem?.courseID })
          if (res?.data?.success) {
            gotFullscreen()
            setIsActive(true);
          }
        } catch (err) { console.log(err) }
      } catch (err) {
        console.log(err);
      }
    }

  };

  const resetCountdown = () => {
    setIsActive(false);
    setTime(600);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  function answerChangeHandler(e) {
    const val = e.target.value
    setAnswer(val)
  }

  const nextHandler = async (check) => {
    if (!answer) return;
    let newVal = {
      detailID: 0,
      candidateAssesmentID: 0,
      questionID: parseInt(question?.data?.questionID),
      applicantAnswer: answer,
      createdById: parseInt(user?.applicantId),
      remarks: ""
    }
    setAnsweerlist(prev => ([...prev, newVal]))
    setAnswer("")

    if (check === "submit") {
      return
    }

    try {
      const res = await getQuestion({ CourseID: assessmentItem?.courseID })
    } catch (err) { console.log(err) }

  };


  const submitAssessmentData = async () => {
    const sendAbleData = {
      candidateAssesmentID: 0,
      courseID: parseInt(assessmentItem?.courseID),
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
        resetCountdown()
        exitFullscreen()
        MySwal.fire({
          icon: 'info',
          title: 'Assessment result',
          text: `Dear ${res?.data?.data?.applicantName}, you have attempted ${res?.data?.data?.totalQuestions} questions. Correct answers: ${res?.data?.data?.correctAnswers}`,
          confirmButtonText: 'Ok',
          showCancelButton: true,
        }).then(result => {
          if (result.isConfirmed) {
            try {
              navigate("/dashboard");
            } catch (err) {
              console.log(err);
            }
          }
        });
      }
    } catch (err) {
      console.error("Error submitting assessment:", err);
    }
  };

  useEffect(() => {
    if (submitLoading || assessmentSubmitted) return;

    if (answeerlist && assessResp && assessResp.data) {
      const { numberofQuestions } = assessResp.data;

      if (answeerlist.length === parseInt(numberofQuestions)) {
        submitAssessmentData();
        setAssessmentSubmitted(true);
      }
    }
  }, [answeerlist, assessResp, submitAssessmentData]);



  // Below down change screen functionality 



  const gotFullscreen = () => {
    const element = document.documentElement;

    if (!isFullscreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };



  const handleFullscreenChange = () => {
    setIsFullscreen(!!document.fullscreenElement);
    if (!document.fullscreenElement) {
      setChangeAttamp(prev => prev + 1);
    }
  };

  useEffect(() => {
    if (changeAttamp > 1) {
      alert("Your test is cancelled. Please try next time");
      navigate("/dashboard")
    }

    if (changeAttamp === 1) {
      const userConfirmed = window.confirm("You are not allowed to resize, minimize, or change tab. If you do so, your test will be canceled");

      if (userConfirmed) {
        gotFullscreen()
      } else {
        navigate("/dashboard")
      }
    }
  }, [changeAttamp]);


  const handleVisibilityChange = () => {
    if (document.hidden) {
      if (isActive) {
        setChangeAttamp(prev => prev + 1)
      }
    }
  };

  const handleKeyDown = (event) => {
    if (isFullscreen) {
      if (event.key === 'Escape' || event.key === 'Esc' || event.code === 'Escape') {
        exitFullscreen();
      }
      if (event.key === 'F12' || event.code === 'F12') {
        event.preventDefault();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, [isFullscreen]);


  return (
    <>
      {!isActive ? <HomeLayout>
        <SoftBox mt={3}>
          <SoftTypography variant="h3" fontWeight="bold" color="info" textGradient>Important Information </SoftTypography>
          <SoftTypography variant="body2" fontWeight="regular" color="text">Do not refresh or move to another page. And you dont have permission to change screen size if you do so your test will be cancelled.</SoftTypography>
          <SoftBox mt={2}>
            <SoftButton disabled={assessLoading || questionLoading} color="dark" onClick={startCountdown}>{questionLoading ? "Starting" : "Start Test"}</SoftButton>
          </SoftBox>
        </SoftBox>
      </HomeLayout> : <SoftBox onContextMenu={handleContextMenu} p={3} sx={{
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
              {assessResp?.data?.courseName}
            </SoftTypography>
            <SoftTypography variant="h6" fontWeight="bold" color="error">
              {formatTime(time)}
            </SoftTypography>
          </SoftBox>
          <Divider sx={{ margin: 0, width: "100%" }} />
          {questionLoading ? <SoftBarLoader /> : <SoftBox py={3} px={3}>
            <Grid container gap={2} direction="column" alignItems="flex-start">
              <Grid item>
                <SoftTypography><b>Question :- </b> {question?.data?.questionTitle} </SoftTypography>
              </Grid>
              <Grid item>
                <FormControl>
                  <RadioGroup value={answer} onChange={answerChangeHandler}>
                    {(question && Object.keys(question).length) && Object.entries(question?.data).map(([key, value]) => (
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

              </Grid>

            </Grid>
          </SoftBox>}
          <SoftBox py={3} px={3} sx={{ display: "flex", justifyContent: "space-between", alignItem: "center" }}>
            <SoftTypography
              variant="text"
              fontWeight="bold"
              sx={{ cursor: "poiner", userSelect: "none", fontSize: "15px" }}
            >
              {answeerlist?.length + 1} &nbsp; of &nbsp;{assessResp?.data?.numberofQuestions || 0}
            </SoftTypography>
            {answeerlist?.length + 1 === parseInt(assessResp?.data?.numberofQuestions) ?
              <SoftButton disabled={!answer} onClick={() => nextHandler("submit")} color="info">{submitLoading ? "Loading..." : "Submit Test"}</SoftButton> :
              <SoftButton disabled={!answer} onClick={nextHandler} color="info">{submitLoading ? "Loading..." : "Next"}</SoftButton>
            }


          </SoftBox>
        </Card>
      </SoftBox>}
    </>
  )
};

export default Test;
