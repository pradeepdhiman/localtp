import { Card } from "@mui/material";
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



const ProfileEdit = ({ title, info, formFields }) => {

    const [updateProfile, { data: resUpdate, isError: errUpdate, isLoading: loadingUpdate }] = useUpdateProfileMutation()

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: formFields
    });

    const user = authUser()


    const submitFormData = async (data) => {
        let newData = {
            ...data,
            updatedById: parseInt(user.id),
            updatedDate: new Date()
        }
        console.log("form data", data)
        try {
            const res = await updateProfile(newData)
            console.log(res)
        } catch (err) {
            console.log(err)
        }

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
                {Object.keys(fields).map((fieldName) => (
                    fields[fieldName].hidden ? null : (
                        <SoftBox key={fieldName} mb={2}>
                            <Controller
                                name={fieldName}
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <SoftInput
                                            type={fields[fieldName].type || "text"}
                                            {...field}
                                            placeholder={fields[fieldName].placeholder}
                                        />
                                        {errors[fieldName] && (
                                            <SoftTypography
                                                component="label"
                                                variant="caption"
                                                color="error"
                                            >
                                                {errors[fieldName]?.message}
                                            </SoftTypography>
                                        )}
                                    </>
                                )}
                            />
                        </SoftBox>
                    )
                ))}
                <SoftBox mt={4} mb={1}>
                    <SoftButton variant="gradient" color="dark" type="submit" fullWidth>
                        Update
                    </SoftButton>
                </SoftBox>
            </SoftBox>
        </SoftBox>

    </Card >);
}

export default ProfileEdit;