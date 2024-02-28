
import Grid from "@mui/material/Grid";


// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import Settings from "./components/Settings";
import ProfileEdit from "./components/ProfileEditForm";
import { authUser } from "utils/utils";
import { useGetProfileQuery } from "utils/functions";
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";
import { useDispatch, useSelector } from "react-redux";
import { setProfileInfo } from "./profileSlice";
import { useEffect, useState } from "react";
import { Stack, Tab, Tabs } from "@mui/material";
import SoftButton from "components/SoftButton";
import DocUpload from "./components/DocUpload";
import SoftTypography from "components/SoftTypography";
import { useGetApplicantQuery } from "utils/functions";

const formInfo = {
  title: "profile information",
  description: "Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).",
  info: {
    fullName: "Alec M. Thompson",
    mobile: "(44) 123 1234 123",
    email: "alecthompson@mail.com",
    location: "USA",
  }
}


function Overview() {
  let user = authUser()
  const { profileInfo = {} } = useSelector(state => state.profile)
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [tabValue, setTabValue] = useState(0);
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  // const { data: { data: profile } = {}, isError: profileErr, isLoading: profileLoading } = useGetProfileQuery({ id: user?.applicantId }) || {};
  const { data: { data: profile } = {}, isError: profileErr, isLoading: profileLoading, refetch: refreshProfile } = useGetApplicantQuery({ id: user?.applicantId })

  function editClickhandler() {
    if (Object.keys(profileInfo).length) {
      dispatch(setProfileInfo({}));
    } else {
      dispatch(setProfileInfo(profile));
    }
  }

  useEffect(() => {
    async function reloadProfile() {
      try {
        await refreshProfile()
      } catch (err) { console.log(err) }
    }
    reloadProfile()
  }, [profileInfo?.applicantID])

  function toogleSetting() {
    // dispatch(setProfileInfo({}))
    setShow(!show)
  }
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  return (
    <DashboardLayout>
      {profileLoading ? <SoftBarLoader /> : <>
        <Header name={profile?.firstName + " " + profile?.lastName} email={profile?.userEmail} showAction={toogleSetting} />

        <SoftBox mt={4} mb={3}>
          <Grid container spacing={3} >
            <Grid item xs={12} md={6}>
              <ProfileInfoCard
                title="profile information"
                description=""
                info={{
                  fullName: profile?.firstName + " " + profile?.lastName,
                  mobile: profile?.phone,
                  email: profile?.email,
                  nationality: profile?.nationalityName,
                }}
                action={{ route: "", tooltip: "Edit Profile", edithandler: editClickhandler }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <SoftBox >
                <DocUpload />
              </SoftBox>
            </Grid>
            {profileInfo?.applicantID && <Grid item xs={12} xl={12}>
              <ProfileEdit title="Edit Profile" info={formInfo} formFields={profile} />
            </Grid>}
            {show && <Grid item xs={12} xl={6}>
              <Settings />
            </Grid>}
          </Grid>
        </SoftBox>
      </>
      }
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
