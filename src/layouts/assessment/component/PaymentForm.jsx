import { Card, Grid, Icon, TextField } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm } from "react-hook-form";
import { useGetAppliedCourseQuery } from "utils/functions";
import { authUser } from "utils/utils";
import { useState } from "react";
import moment from "moment";
import SoftTypography from "components/SoftTypography";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { toastHandler } from "utils/utils";
import { useReAsspaymentProofMutation } from "utils/functions";
import CloseIcon from '@mui/icons-material/Close';

const PaymentForm = (props) => {
    const { activeAssess, exit } = props
    const user = authUser();
    const [sendpaymentproof, { data: proofData, isError: proofErr, isLoading: proofLoading }] = useReAsspaymentProofMutation()
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();


    const MySwal = withReactContent(Swal)


    const submithandler = async (data) => {
        const file = data.file[0];
        const { reassessmentID, applicantID, courseID } = activeAssess;

        const formData = new FormData();

        formData.append("ReassessmentID", parseInt(reassessmentID))
        formData.append("ApplicantID", parseInt(applicantID))
        formData.append("CourseID", parseInt(courseID))
        formData.append("ReceiptImage", file, file.name)
        formData.append("ReceiptID", "4545454")
        formData.append("ReceiptDate", moment().format('YYYY-MM-DD'))
        formData.append("AmountPaid", data?.amount)

        try {
            const response = await sendpaymentproof(formData);
            toastHandler(response)
            if (response.data.success) {
                Swal.fire({
                    title: "Successfully send!",
                    text: "Your course will activate within 24 hours."
                })
                reset()
                exit()
            } else {
                console.error("Submission failed");
            }
        } catch (error) {
            console.error("Error sending request:", error);
        }
    };



    return (
        <Card>
            <SoftBox pt={3} px={3} sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                <SoftTypography variant="h6" fontWeight="medium">
                    {activeAssess?.courseName} fee payment
                </SoftTypography>
                <Icon
                    sx={{
                        fontWeight: "bold",
                        color: ({ palette: { error } }) => error.main,
                        cursor: "pointer",
                        mt: -0.5,
                    }}
                    onClick={() => exit()}
                >
                    <CloseIcon />
                </Icon>
            </SoftBox>
            <SoftBox p={2} >
                <form onSubmit={handleSubmit(submithandler)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <SoftInput
                                        value={activeAssess?.courseName}
                                        readonly
                                        type="text"
                                        {...register('assesscourse', { required: 'Re-Assessment is required' })}
                                        error={Boolean(errors.assesscourse)}
                                        helperText={errors.assesscourse?.message}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <SoftInput
                                        type="file"
                                        {...register('file', { required: 'File is required' })}
                                        error={Boolean(errors.file)}
                                        helperText={errors.file?.message}
                                    />
                                    {errors?.file && <SoftTypography color="error" variant="caption">{errors.file?.message}</SoftTypography>}
                                </Grid>
                                <Grid item xs={4}>
                                    <SoftInput
                                        type="number"
                                        placeholder="Amount"
                                        {...register('amount', { required: 'Amount is required' })}
                                        error={Boolean(errors.amount)}
                                        helperText={errors.amount?.message}
                                    />
                                    {errors?.amount && <SoftTypography color="error" variant="caption">{errors.amount?.message}</SoftTypography>}
                                </Grid>
                                <Grid item xs={4}>
                                    <SoftButton disabled={proofLoading} type="submit" variant="outlined" color="dark">
                                        {proofLoading ? "Uploading..." : "Upload"}
                                    </SoftButton>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                </form>
            </SoftBox>
        </Card>
    );
};

export default PaymentForm;
