
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
import { useGetCourseQuestionMutation } from "utils/functions";

const initialQuestion = [
  {
    id: "1",
    question: "lorem ipsume doller sit amete 1",
    options: [
      "Answer 1", "Answer 2", "Answer 3", "Answer 4"
    ]
  },
  {
    id: "2",
    question: "lorem ipsume doller sit amete 2",
    options: [
      "Answer 1", "Answer 2", "Answer 3", "Answer 4"
    ]
  }
]


function AssessmentTest() {
  const { assessmentItem } = useSelector(state => state.common)
  const [testStarted, setTestStarted] = useState(false)
  const [questions, setQuestions] = useState(initialQuestion);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [answeerlist, setAnsweerlist] = useState([]);
  const [answer, setAnswer] = useState("");
  const [seconds, setSeconds] = useState(600);
  const [timerRunning, setTimerRunning] = useState(false);
  const [behave, setBehave] = useState(0);
  const navigate = useNavigate();

  const [getQuestion, { data: question, isLoading: questionLoading }] = useGetCourseQuestionMutation()


  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  let user = authUser()
  const MySwal = withReactContent(Swal)

  async function startTestHandler() {
    Swal.fire({
      icon: "warning",
      title: "Important Notes",
      text: "Please refrain from refreshing or minimizing the screen. Any ongoing tests will be automatically canceled if you perform these actions. Your cooperation is appreciated to ensure the accuracy and completion of the testing process. Thank you.",
      confirmButtonText: "Start Test",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await getQuestion({ id: assessmentItem?.courseID });
          setTestStarted(!testStarted);
          setSeconds(600);
          setTimerRunning(true);
        } catch (err) {
          console.log(err);
        }
      }
    });
  }


  function submitHandler() {
    if (!answer) return
    const id = questions[activeQuestionIndex].id
    setAnsweerlist(prev => ([...prev, { id: id, answer }]))
    if (questions[activeQuestionIndex + 1]) {
      setAnswer("")
      setActiveQuestionIndex(activeQuestionIndex + 1)
    }
  }

  useEffect(() => {
    let intervalId;

    const handleBeforeUnload = (event) => {
      const message = "Are you sure you want to leave? Your progress will be lost.";
      event.returnValue = message;
      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      // dashboard/assessment
    };
  }, [timerRunning]);



  const finelSubmitHandler = () => {


  };

  const visibilityChangeHandler = () => {
    if (document.hidden) {
      setBehave(prev => {
        const nextValue = prev + 1;

        let msg = "";
        if (nextValue === 1) {
          msg = "You are not allowed to mimimized tab. If you do it again your test will be cenceled.";
        } else if (nextValue === 2) {
          msg = "You have broken the rule of the test. Try next time.";
        }

        Swal.fire({
          icon: "info",
          title: "Window Resized",
          text: msg,
        }).then((result) => {
          if (result.isConfirmed && nextValue === 2) {
            navigate('/dashboard/assessment');
          }
        });

        return nextValue;
      });

    }
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", visibilityChangeHandler);

    return () => {
      document.removeEventListener("visibilitychange", visibilityChangeHandler);
    };
  }, []);

  const handleResize = () => {
    if (
      window.innerWidth !== initialWindowSize.current.width ||
      window.innerHeight !== initialWindowSize.current.height
    ) {
      setBehave(prev => {
        const nextValue = prev + 1;

        let msg = "";
        if (nextValue === 1) {
          msg = "You are not allowed to resize the window. If you do it again your test will be canceled.";
        } else if (nextValue === 2) {
          msg = "You have broken the rule of the test. Try next time.";
        }

        Swal.fire({
          icon: "info",
          title: "Window Resized",
          text: msg,
        }).then((result) => {
          if (result.isConfirmed && nextValue === 2) {
            navigate('/dashboard/assessment');
          }
        });

        return nextValue;
      });
    }
  };

  const initialWindowSize = useRef({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <>
      {!testStarted && <HomeLayout>
        {/* <SoftAlert>Thanks for submission</SoftAlert> */}
        <SoftBox mt={3}>
          <SoftTypography variant="h3" fontWeight="bold" color="info" textGradient>Welcome to Assessment Test</SoftTypography>
          <SoftTypography variant="body2" fontWeight="regular" color="text">Do not refresh or move to another page while test.</SoftTypography>
          <SoftBox mt={2}>
            <SoftButton color="dark" onClick={startTestHandler}>Start Test</SoftButton>
          </SoftBox>
        </SoftBox>
      </HomeLayout>}
      {testStarted && <SoftBox onContextMenu={handleContextMenu} p={3} sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        // zIndex: 9999,
      }}>
        <Card elevation={3}>
          <SoftBox py={3} px={3} sx={{ display: "flex", justifyContent: "space-between", alignItem: "center" }}>
            <SoftTypography variant="h5" fontWeight="bold" color="text">
              Advance Javascript
            </SoftTypography>
            <SoftTypography variant="h6" fontWeight="bold" color="error">
              {Math.floor(seconds / 60)}:{seconds % 60} Minutes
            </SoftTypography>
          </SoftBox>
          <Divider sx={{ margin: 0, width: "100%" }} />
          <SoftBox py={3} px={3}>
            <Grid container gap={2} direction="column" alignItems="flex-start">
              <Grid item>
                <SoftTypography><b>Question :- </b> {question?.data?.questionTitle} </SoftTypography>
              </Grid>
              <Grid item>
                <FormControl>
                  <RadioGroup
                    name="radio-buttons-group"
                    onChange={(e) => setAnswer(e.target.value)}
                    value={answer}
                  >
                    {(question && question?.data) && (
                      <>
                        <FormControlLabel value={question?.data?.optionA} control={<Radio />} label={question?.data?.optionA} />
                        <FormControlLabel value={question?.data?.optionB} control={<Radio />} label={question?.data?.optionB} />
                        <FormControlLabel value={question?.data?.optionC} control={<Radio />} label={question?.data?.optionC} />
                        <FormControlLabel value={question?.data?.optionD} control={<Radio />} label={question?.data?.optionD} />
                        <FormControlLabel value={question?.data?.optionE} control={<Radio />} label={question?.data?.optionE} />
                      </>
                    )}
                  </RadioGroup>
                </FormControl>

              </Grid>

            </Grid>
          </SoftBox>
          <SoftBox py={3} px={3} sx={{ display: "flex", justifyContent: "space-between", alignItem: "center" }}>
            <SoftTypography
              variant="text"
              fontWeight="bold"
              sx={{ cursor: "poiner", userSelect: "none", fontSize: "15px" }}
            >
              1 &nbsp; of &nbsp;25
            </SoftTypography>
            <SoftButton onClick={submitHandler} color="info">Submit</SoftButton>
          </SoftBox>
        </Card>
      </SoftBox>}
    </>
  );
}

export default AssessmentTest;
