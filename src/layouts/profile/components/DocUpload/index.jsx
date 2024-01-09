import { Card } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";

const DocUpload = () => {
    return (
        <Card>
            {/* <SoftBox p={2} sx={{ display: "flex", justifyContent: "flex-start", alignItem: "center", gap:"16px" }}>
                
                
                
            </SoftBox> */}
            <Grid container xs={12} sm={6} md={4}>
                <Grid item><SoftInput type="file" /></Grid>
                <Grid item><SoftInput type="text" /></Grid>
                <Grid item><SoftButton variant="outlined" color="dark">Upload</SoftButton></Grid>
            </Grid>
        </Card>
    );
}

export default DocUpload;