import { Card } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";

const DocUpload = () => {
    return (
        <Card>
            <SoftBox p={2} sx={{ display: "flex", justifyContent: "flex-start", alignItem: "center", gap:"16px" }}>
                <SoftInput type="file" />
                <SoftButton variant="outlined" color="dark">Upload</SoftButton>
            </SoftBox>
        </Card>
    );
}

export default DocUpload;