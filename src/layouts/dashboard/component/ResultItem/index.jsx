
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import ResultItemInfo from "./ResultItemInfo";


function ResultItem({ dataList = [] }) {
    return (
        <Card id="delete-account">
            {/* <SoftBox pt={3} px={2}>
                <SoftTypography variant="h6" fontWeight="medium">
                    Completed Course Information
                </SoftTypography>
            </SoftBox> */}
            <SoftBox pt={1} pb={2} px={2}>
                <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                    {dataList?.length && dataList?.map(item => <ResultItemInfo key={item?.candidateAssesmentID}
                        name={item?.applicantName}
                        coursename={item?.courseName}
                        date={item?.assesmentDate}
                        questionnumber={item?.totalQuestions}
                        correctanswer={item?.correctAnswers}
                        result={item?.result}
                    />)}
                    {/* <ResultItemInfo
                        name="oliver liam"
                        company="viking burrito"
                        email="oliver@burrito.com"
                        vat="FRB1235476"
                    />
                    <ResultItemInfo
                        name="lucas harper"
                        company="stone tech zone"
                        email="lucas@stone-tech.com"
                        vat="FRB1235476"
                    />
                    <ResultItemInfo
                        name="ethan james"
                        company="fiber notion"
                        email="ethan@fiber.com"
                        vat="FRB1235476"
                        noGutter
                    /> */}
                </SoftBox>
            </SoftBox>
        </Card>
    );
}

export default ResultItem;
