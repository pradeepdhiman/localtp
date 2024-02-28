

import HomeLayout from "./components/homelayout";
import SoftTypography from "components/SoftTypography";
import { Card } from "@mui/material";
import SoftBox from "components/SoftBox";


function PrivacyPolicy() {



  return (
    <HomeLayout>
      <Card>
        <SoftBox p={3}>
          <SoftBox mb={2} >
            <SoftTypography variant="h4" fontWeight="bold" color="text" textGradient>
              lorem ipsum term one.
            </SoftTypography>
          </SoftBox>
          <SoftBox>
            <SoftTypography variant="body2" fontWeight="regular" color="text">Lorem ipsume doller site amet dummy content pufjh fjhp provi  kd kemari</SoftTypography>
          </SoftBox>
        </SoftBox>
        <SoftBox p={3}>
          <SoftBox mb={2} >
            <SoftTypography variant="h4" fontWeight="bold" color="text" textGradient>
              Lorem ipsum terms two.
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

export default PrivacyPolicy;
