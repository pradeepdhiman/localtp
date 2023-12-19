
import curved9 from "assets/images/curved-images/homeBanner.png";
import HomeLayout from "./components/homelayout";
import { Card } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";


function Aboutus() {



  return (
    <HomeLayout
      title="About us"
      description="Lorm ipsum doller sit amet dummy cntent rfjjd remedies parlo gaibi"
      image={curved9}
    >
      <Card>
        <SoftBox p={3}>
          <SoftBox mb={2} >
            <SoftTypography variant="h4" fontWeight="bold" color="text" textGradient>
              We are best Training provider.
            </SoftTypography>
          </SoftBox>
          <SoftBox>
            <SoftTypography variant="body2" fontWeight="regular" color="text">Lorem ipsume doller site amet dummy content pufjh fjhp provi  kd kemari</SoftTypography>
          </SoftBox>
        </SoftBox>
      </Card>
    </HomeLayout>
  );
}

export default Aboutus;
