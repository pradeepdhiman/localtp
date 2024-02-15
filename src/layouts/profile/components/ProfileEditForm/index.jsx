import { Card, Grid } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import { Controller, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { fields } from "layouts/profile/constant";
import { schema } from "layouts/profile/constant";
import { authUser } from "utils/utils";
import { useUpdateProfileMutation } from "utils/functions";
import { toastHandler } from "utils/utils";
import moment from "moment";
import SoftAddAbleAutoSelect from "examples/AddAbleAutoSelect";
import { useEffect, useState } from "react";
import { useMasterListByTypeQuery } from "utils/functions";
import { masterType } from "common/constant";
import { useGetApplicantQuery } from "utils/functions";
import { formatDateFields } from "utils/utils";
import { useUpdateApplicantMutation } from "utils/functions";
import { useDispatch } from "react-redux";
import { setProfileInfo } from "layouts/profile/profileSlice";



const ProfileEdit = ({ title, info, formFields }) => {

    const [designation, setDesignation] = useState({});
    const [qualification, setQualification] = useState({});
    const [nationality, setNationality] = useState({});
    const [docType, setDocType] = useState({});
    const dispatch = useDispatch()
    const { data: qualificationList, isLoading: qualificationErr, refetch: refreshQualification } = useMasterListByTypeQuery({ TypeID: masterType.Qualification })
    const { data: desigList, isLoading: desigErr, refetch: refreshDesg } = useMasterListByTypeQuery({ TypeID: masterType.Designation })
    const { data: nationalityList, isLoading: nationalityErr } = useMasterListByTypeQuery({ TypeID: masterType.Nationality })
    const { data: docTypeList, isLoading: docErr } = useMasterListByTypeQuery({ TypeID: masterType.DocumentType })

    const { data: applicantData, isLoading: appliLoading, isError: appliErr } = useGetApplicantQuery({ id: formFields?.applicantID })
    const [updateProfile, { data: resUpdate, isError: errUpdate, isLoading: loadingUpdate }] = useUpdateApplicantMutation()



    const { register, handleSubmit, setValue, reset, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: formatDateFields(applicantData?.data, fields) || {}
    });

    useEffect(() => {
        if (qualificationList?.success && desigList?.success && nationalityList?.success && applicantData?.success) {
            const { qualification, designation, nationality } = applicantData.data;

            const foundQualification = qualificationList.data.find(item => item.masterCodeID === qualification);
            const foundDesignation = desigList.data.find(item => item.masterCodeID === designation);
            const foundNationality = nationalityList.data.find(item => item.masterCodeID === nationality);

            if (foundQualification) setQualification(foundQualification);
            if (foundDesignation) setDesignation(foundDesignation);
            if (foundNationality) setNationality(foundNationality);

            // Set form values here
            setValue("qualification", qualification);
            setValue("designation", designation);
            setValue("nationality", nationality);
            reset(formatDateFields(applicantData?.data, fields))
        }
    }, [qualificationList, desigList, nationalityList, applicantData, setValue]);


    const user = authUser()


    const submitFormData = async (data) => {
        console.log(data)

        let files = data.file;
        const formData = new FormData();
        formData.append("ApplicantID", parseInt(applicantData?.data?.applicantID));
        formData.append("FirstName", data?.firstName);
        formData.append("LastName", data?.lastName);
        formData.append("Email", data?.email);
        formData.append("Phone", data?.phone);
        formData.append("Address", data?.address);
        formData.append("Qualification", qualification?.masterCodeID);
        formData.append("Designation", designation?.masterCodeID);
        formData.append("DOB", moment(data?.dob).format("YYYY-MM-DD"));
        formData.append("Nationality", parseInt(nationality?.masterCodeID));
        formData.append("CompanyName", data?.companyName);
        formData.append("CompanyContactNumber", data?.companyContactNumber);
        formData.append("CompanyAddress", data?.companyAddress);
        formData.append("DocumentTypeID", docType?.masterCodeID);
        for (let i = 0; i < files.length; i++) {
            formData.append(`SupportFile`, files[i]);
        }
        formData.append("Status", parseInt(applicantData?.data?.status));
        formData.append("UpdatedById", parseInt(applicantData?.data?.applicantID));
        formData.append("Remarks", data?.remarks);


        try {
            const res = await updateProfile(formData)
            toastHandler(res)
            if (res?.data?.success) {
                reset()
                setQualification({})
                setDesignation({})
                setNationality({})
                setDocType({})
                dispatch(setProfileInfo({}));
            }
        } catch (err) {
            console.log(err)
        }

    };

    const qualificationSelectHandler = (event, newValue) => {
        setValue('qualification', parseInt(newValue.masterCodeID));
        setQualification(newValue)
    };

    const designationSelectHandler = (event, newValue) => {
        setValue('designation', parseInt(newValue.masterCodeID));
        setDesignation(newValue)
    };

    const nationalitySelectHandler = (event, newValue) => {
        setValue('nationality', parseInt(newValue.masterCodeID));
        setNationality(newValue)
    };
    const docTypeHandler = (event, newValue) => {
        setValue('nationality', parseInt(newValue.masterCodeID));
        setDocType(newValue)
    };

    return (<Card sx={{ height: "100%" }}>
        <SoftBox pt={2} px={2}>
            <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                {title}
            </SoftTypography>
        </SoftBox>
        <SoftBox p={2}>
            <SoftBox component="form"
                role="form"
                onSubmit={handleSubmit(submitFormData)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} >
                        <Controller
                            name="firstName"
                            control={control}
                            render={({ field }) => (
                                <SoftBox mb={2}>
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            First name
                                        </SoftTypography>
                                    </SoftBox>
                                    <SoftInput
                                        type="text"
                                        {...field}
                                        placeholder="First Name"
                                    />
                                    {errors.firstName && (
                                        <SoftTypography component="label" variant="caption" color="error">
                                            {errors.firstName.message}
                                        </SoftTypography>
                                    )}
                                </SoftBox>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <Controller
                            name="lastName"
                            control={control}
                            render={({ field }) => (
                                <SoftBox mb={2}>
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            LastName
                                        </SoftTypography>
                                    </SoftBox>
                                    <SoftInput
                                        type="text"
                                        {...field}
                                        placeholder="LastName"
                                    />
                                    {errors.lastName && (
                                        <SoftTypography component="label" variant="caption" color="error">
                                            {errors.lastName.message}
                                        </SoftTypography>
                                    )}
                                </SoftBox>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <SoftBox mb={2}>
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            Email
                                        </SoftTypography>
                                    </SoftBox>
                                    <SoftInput
                                        type="text"
                                        {...field}
                                        placeholder="Email"
                                    />
                                    {errors.email && (
                                        <SoftTypography component="label" variant="caption" color="error">
                                            {errors.email.message}
                                        </SoftTypography>
                                    )}
                                </SoftBox>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => (
                                <SoftBox mb={2}>
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            Phone
                                        </SoftTypography>
                                    </SoftBox>
                                    <SoftInput
                                        type="number"
                                        {...field}
                                        placeholder="Phone"
                                    />
                                    {errors.phone && (
                                        <SoftTypography component="label" variant="caption" color="error">
                                            {errors.phone.message}
                                        </SoftTypography>
                                    )}
                                </SoftBox>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <Controller
                            name="address"
                            control={control}
                            render={({ field }) => (
                                <SoftBox mb={2}>
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            Address
                                        </SoftTypography>
                                    </SoftBox>
                                    <SoftInput
                                        type="text"
                                        {...field}
                                        placeholder="Address"
                                    />
                                    {errors.address && (
                                        <SoftTypography component="label" variant="caption" color="error">
                                            {errors.address.message}
                                        </SoftTypography>
                                    )}
                                </SoftBox>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <Controller
                            name="dob"
                            control={control}
                            render={({ field }) => (
                                <SoftBox mb={2}>
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            Date of birth
                                        </SoftTypography>
                                    </SoftBox>
                                    <SoftInput
                                        type="date"
                                        {...field}
                                        placeholder="Date of birth"
                                    />
                                    {errors.dob && (
                                        <SoftTypography component="label" variant="caption" color="error">
                                            {errors.dob.message}
                                        </SoftTypography>
                                    )}
                                </SoftBox>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <Controller
                            name="companyName"
                            control={control}
                            render={({ field }) => (
                                <SoftBox mb={2}>
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            Company name
                                        </SoftTypography>
                                    </SoftBox>
                                    <SoftInput
                                        type="text"
                                        {...field}
                                        placeholder="Company name"
                                    />
                                    {errors.companyName && (
                                        <SoftTypography component="label" variant="caption" color="error">
                                            {errors.companyName.message}
                                        </SoftTypography>
                                    )}
                                </SoftBox>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <Controller
                            name="companyContactNumber"
                            control={control}
                            render={({ field }) => (
                                <SoftBox mb={2}>
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            Company contact number
                                        </SoftTypography>
                                    </SoftBox>
                                    <SoftInput
                                        type="number"
                                        {...field}
                                        placeholder="Company contact number"
                                    />
                                    {errors.companyContactNumber && (
                                        <SoftTypography component="label" variant="caption" color="error">
                                            {errors.companyContactNumber.message}
                                        </SoftTypography>
                                    )}
                                </SoftBox>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <Controller
                            name="companyAddress"
                            control={control}
                            render={({ field }) => (
                                <SoftBox mb={2}>
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            Company address
                                        </SoftTypography>
                                    </SoftBox>
                                    <SoftInput
                                        type="text"
                                        {...field}
                                        placeholder="Company address"
                                    />
                                    {errors.companyAddress && (
                                        <SoftTypography component="label" variant="caption" color="error">
                                            {errors.companyAddress.message}
                                        </SoftTypography>
                                    )}
                                </SoftBox>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <SoftBox mb={2}>
                            <SoftBox mb={1} ml={0.5}>
                                <SoftTypography component="label" variant="caption" fontWeight="bold">
                                    Qualification
                                </SoftTypography>
                            </SoftBox>
                            <SoftAddAbleAutoSelect
                                dataList={qualificationList?.data || []}
                                selectedValue={qualification}
                                selectHandler={qualificationSelectHandler}
                                label={null}
                                placeholder="Select Qualification"
                                isEditable={false}
                            />
                            {errors.qualification && (
                                <SoftTypography component="label" variant="caption" color="error">
                                    {errors.qualification.message}
                                </SoftTypography>
                            )}
                        </SoftBox>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <SoftBox mb={2}>
                            <SoftBox mb={1} ml={0.5}>
                                <SoftTypography component="label" variant="caption" fontWeight="bold">
                                    Designation
                                </SoftTypography>
                            </SoftBox>
                            <SoftAddAbleAutoSelect
                                dataList={desigList?.data || []}
                                selectedValue={designation}
                                selectHandler={designationSelectHandler}
                                label={null}
                                placeholder="Select Designation"
                                isEditable={false}
                            />
                            {errors.designation && (
                                <SoftTypography component="label" variant="caption" color="error">
                                    {errors.designation.message}
                                </SoftTypography>
                            )}
                        </SoftBox>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <SoftBox mb={2}>
                            <SoftBox mb={1} ml={0.5}>
                                <SoftTypography component="label" variant="caption" fontWeight="bold">
                                    Nationality
                                </SoftTypography>
                            </SoftBox>
                            <SoftAddAbleAutoSelect
                                dataList={nationalityList?.data || []}
                                selectedValue={nationality}
                                selectHandler={nationalitySelectHandler}
                                label={null}
                                placeholder="Select Nationality"
                                isEditable={false}
                            />
                            {errors.nationality && (
                                <SoftTypography component="label" variant="caption" color="error">
                                    {errors.nationality.message}
                                </SoftTypography>
                            )}
                        </SoftBox>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <SoftBox mb={2}>
                            <SoftBox mb={1} ml={0.5}>
                                <SoftTypography component="label" variant="caption" fontWeight="bold">
                                    Document Type
                                </SoftTypography>
                            </SoftBox>
                            <SoftAddAbleAutoSelect
                                dataList={docTypeList?.data || []}
                                selectedValue={docType}
                                selectHandler={docTypeHandler}
                                label={null}
                                placeholder="Document Type"
                                isEditable={false}
                            />
                            {errors.DocumentTypeID && (
                                <SoftTypography component="label" variant="caption" color="error">
                                    {errors.DocumentTypeID.message}
                                </SoftTypography>
                            )}
                        </SoftBox>
                    </Grid>
                    <Grid item xs={6}  >
                        <SoftBox>
                            <SoftBox mb={1} ml={0.5}>
                                <SoftTypography component="label" variant="caption" fontWeight="bold">
                                    Select Files
                                </SoftTypography>
                            </SoftBox>
                            <input
                                multiple
                                type="file"
                                {...register('file', { required: 'File is required' })}
                                error={Boolean(errors.file)}
                                helperText={errors.file?.message}
                            />
                            {errors.file && (
                                <SoftTypography component="label" variant="caption" color="error">
                                    {errors.file.message}
                                </SoftTypography>
                            )}
                        </SoftBox>
                        {/* <Controller
                            name="file"
                            control={control}
                            render={({ field }) => (
                                <SoftBox mb={2}>
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            Support File
                                        </SoftTypography>
                                    </SoftBox>
                                    <input
                                        multiple
                                        type="file"
                                        {...field}
                                        placeholder="Support File"
                                    />
                                    {errors.supportFile && (
                                        <SoftTypography component="label" variant="caption" color="error">
                                            {errors.supportFile.message}
                                        </SoftTypography>
                                    )}
                                </SoftBox>
                            )}
                        /> */}
                    </Grid>
                    <Grid item xs={12}  >
                        <Controller
                            name="remarks"
                            control={control}
                            render={({ field }) => (
                                <SoftBox mb={2}>
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            remarks
                                        </SoftTypography>
                                    </SoftBox>
                                    <SoftBox>
                                        <textarea rows={3} cols={3} style={{ border: "none", resize: "none", width: "100%", border: "0.0625rem solid #d2d6da", borderRadius: "10px", overflow: "hidden", padding: "10px", fontFamily: "Roboto,Helvetica,Arial,sans-serif" }}
                                            type="text"
                                            {...field}
                                            placeholder="Remarks"
                                        />
                                    </SoftBox>
                                    {errors.remarks && (
                                        <SoftTypography component="label" variant="caption" color="error">
                                            {errors.remarks.message}
                                        </SoftTypography>
                                    )}
                                </SoftBox>
                            )}
                        />
                    </Grid>

                </Grid>


                <SoftBox mt={4} mb={1}>
                    <SoftButton variant="gradient" color="info" type="submit" fullWidth>
                        {(loadingUpdate) ? 'Loading..' : 'Update'}
                    </SoftButton>
                </SoftBox>
            </SoftBox>
        </SoftBox>


    </Card >);
}

export default ProfileEdit;