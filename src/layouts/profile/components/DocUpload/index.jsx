import { Card, Grid } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm } from "react-hook-form";
import { useGetAppliedCourseQuery } from "utils/functions";
import { authUser } from "utils/utils";
import { useState } from "react";
import { usePaymentProofMutation } from "utils/functions";
import moment from "moment";
import SoftTypography from "components/SoftTypography";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const DocUpload = () => {
    const user = authUser();
    const [selectedCourse, setSelectedCourse] = useState(null);
    // const { data: appliedCourse, isError: appliedError, isLoading: appliedLoading } = useGetAppliedCourseQuery({ ApplicantID: user?.id });
    const { data: appliedCourse, isError: appliedError, isLoading: appliedLoading } = useGetAppliedCourseQuery({ ApplicantID: user?.applicantId });
    const [sendpaymentproof, { data: proofData, isError: proofErr, isLoading: proofLoading }] = usePaymentProofMutation()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const handleCourseSelect = (event, newValue) => {
        setSelectedCourse(newValue);
    };

    const MySwal = withReactContent(Swal)

    const submithandler = async (data) => {
        const file = data.file[0];
        const binaryData = await readFileAsync(file);
        const { applicantCourseID, applicantID, courseID, receiptID } = appliedCourse?.data;

        const formData = new FormData();
        formData.append("ApplicantCourseID", applicantCourseID);
        formData.append("ApplicantID", user?.id || applicantID);
        // formData.append("ApplicantID", user?.applicantId || applicantID);
        formData.append("CourseID", courseID);
        formData.append("ReceiptImage", file, file.name);
        formData.append("ReceiptID", receiptID);
        formData.append("ReceiptDate", moment().format('DD-MM-YYYY'));
        formData.append("AmountPaid", data.amount);

        try {
            const response = await sendpaymentproof(formData);

            if (response.data.success) {
                Swal.fire({
                    title: "Successfully send!",
                    text: "Your course will activate within 24 hours."
                })
                reset()
            } else {
                console.error("Submission failed");
            }
        } catch (error) {
            console.error("Error sending request:", error);
        }
    };



    const readFileAsync = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;

            reader.readAsBinaryString(file);
        });
    };

    return (
        <Card>
            <SoftBox p={2} >
                <form onSubmit={handleSubmit(submithandler)}>
                    <Grid container spacing={2}>
                        {/* <Grid xs={12} item>
                        <Autocomplete
                            disablePortal
                            disableClearable
                            id="combo-box-demo"
                            value={selectedCourse}
                            onChange={handleCourseSelect}
                            options={appliedCourse?.data || []}
                            getOptionLabel={(option) => option?.courseID}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField  {...params} />}
                        />
                    </Grid> */}
                        <Grid item xs={6}>
                            <SoftBox display="flex" py={1} pr={2}>
                                <SoftTypography variant="button" fontWeight="regular" color="text">
                                    Payment on the below detail then take screeshot and upload.
                                </SoftTypography>
                            </SoftBox>
                            <SoftBox display="flex" py={1} pr={2}>
                                <SoftTypography variant="button" fontWeight="bold" textTransform="capitalize">
                                    Name: &nbsp;
                                </SoftTypography>
                                <SoftTypography variant="button" fontWeight="regular" color="text">
                                    &nbsp;Training Portal
                                </SoftTypography>
                            </SoftBox>
                            <SoftBox display="flex" py={1} pr={2}>
                                <SoftTypography variant="button" fontWeight="bold" textTransform="capitalize">
                                    Bank: &nbsp;
                                </SoftTypography>
                                <SoftTypography variant="button" fontWeight="regular" color="text">
                                    &nbsp;Uae Bank
                                </SoftTypography>
                            </SoftBox>
                            <SoftBox display="flex" py={1} pr={2}>
                                <SoftTypography variant="button" fontWeight="bold" textTransform="capitalize">
                                    Branch: &nbsp;
                                </SoftTypography>
                                <SoftTypography variant="button" fontWeight="regular" color="text">
                                    &nbsp;Uae Bank
                                </SoftTypography>
                            </SoftBox>
                            <SoftBox display="flex" py={1} pr={2}>
                                <SoftTypography variant="button" fontWeight="bold" textTransform="capitalize">
                                    ISFC/MICR: &nbsp;
                                </SoftTypography>
                                <SoftTypography variant="button" fontWeight="regular" color="text">
                                    &nbsp;HDFC48000
                                </SoftTypography>
                            </SoftBox>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} >
                                    <SoftInput type="file" {...register('file', { required: 'File is required' })} />
                                </Grid>
                                <Grid item xs={12} >
                                    <SoftInput type="number" placeholder="Amount" {...register('amount', { required: 'Amount is required' })} />
                                </Grid>
                                <Grid item xs={12} >
                                    <SoftButton disabled={proofLoading} type="submit" variant="outlined" color="dark" >Upload</SoftButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </SoftBox>
        </Card>
    );
};

export default DocUpload;
