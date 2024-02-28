

import HomeLayout from "./components/homelayout";
import SoftTypography from "components/SoftTypography";
import { Card } from "@mui/material";
import SoftBox from "components/SoftBox";
import curved9 from "assets/images/banners/faq-banner.webp"

function Faq() {



  return (
    <HomeLayout image={curved9} title="FAQ">
      <Card>
        <SoftBox p={3}>
          <SoftBox mb={2} >
            <SoftTypography variant="h4" fontWeight="bold" color="text" textGradient>
              How to buy a course?.
            </SoftTypography>
          </SoftBox>
          <SoftBox>
            <SoftTypography variant="body2" fontWeight="regular" color="text">Lorem ipsume doller site amet dummy content pufjh fjhp provi  kd kemari</SoftTypography>
          </SoftBox>
        </SoftBox>
        <SoftBox p={3}>
          <SoftBox mb={2} >
            <SoftTypography variant="h4" fontWeight="bold" color="text" textGradient>
              How to pay?.
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

export default Faq;
