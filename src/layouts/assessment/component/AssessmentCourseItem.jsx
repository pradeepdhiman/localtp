import { Box, Card, Grid } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import wavesWhite from "assets/images/shapes/waves-white.svg";
import rocketWhite from "assets/images/illustrations/rocket-white.png";
import SoftProgress from "components/SoftProgress";
import { useDispatch } from "react-redux";
import { setAssessmentItem } from "utils/commonSlice";
import { useNavigate } from "react-router-dom";

const AssessmentCourseItem = ({ itemData = {} }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    function starthandler() {
        dispatch(setAssessmentItem(itemData))
        navigate('/test');
    }

    return (
        <Card>
            <SoftBox p={2}>
                <Grid container spacing={3} direction="column">
                    <Grid item xs={12} lg={5} sx={{ position: "relative", ml: "auto" }} >
                        <SoftBox
                            height="100%"
                            display="grid"
                            justifyContent="center"
                            alignItems="center"
                            bgColor="info"
                            borderRadius="lg"
                            variant="gradient"
                        >
                            <SoftBox
                                component="img"
                                src={wavesWhite}
                                alt="waves"
                                display="block"
                                position="absolute"
                                left={0}
                                width="100%"
                                height="100%"
                            />
                            <SoftBox component="img" src={rocketWhite} alt="rocket" width="100%" pt={3} />
                        </SoftBox>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <SoftBox display="flex" flexDirection="column" height="100%">
                            <SoftBox pt={1} mb={0.5}>
                                <SoftTypography variant="body2" color="text" fontWeight="medium">
                                    {itemData?.courseStatusName}
                                </SoftTypography>
                            </SoftBox>
                            <SoftTypography variant="h5" fontWeight="bold" gutterBottom>
                                {itemData?.courseName}
                            </SoftTypography>
                            {/* <SoftBox mb={2}>
                                <SoftTypography variant="body2" color="text">
                                    From colors, cards, typography to complex elements
                                </SoftTypography>
                            </SoftBox> */}
                            <SoftBox width="100%" textAlign="left" mt={2} >
                                <SoftProgress value={100} color="error" variant="gradient" label={false} />
                            </SoftBox>
                            <Box mt={2}><SoftButton onClick={starthandler} size="small" color="info" variant="outlined">Take Assessment</SoftButton></Box>
                        </SoftBox>
                    </Grid>
                </Grid>
            </SoftBox>
        </Card >
    );
}

export default AssessmentCourseItem;