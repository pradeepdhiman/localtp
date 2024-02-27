

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";

// Authentication layout components
import Footer from "layouts/authentication/components/Footer";
import SoftButton from "components/SoftButton";
import { useNavigate } from "react-router-dom";
import HomePagelayout from "examples/LayoutContainers/HomePageLayout";
import CustomeNavbar from "examples/Navbars/CustomeNavbar";
import styles from "../style.module.css"

import curved9 from "assets/images/banners/vecteezy_arabic-business-man-at-meeting_12107251.jpg"
import curved10 from "assets/images/partners/ALN-UAE-ACH-LOGO-White.png"
import curved11 from "assets/images/partners/Adili-Logo-180x60-1.png"
import curved12 from "assets/images/partners/rakicc-logo-white.svg"
import curved13 from "assets/images/banners/happy-muslim-woman-home-during-online-lesson-technologies-remote-education-ethnicity-concept.jpg"

function HomeLayout({ color, header, title, description, image, top, children }) {
  const navigate = useNavigate()


  return (
    <HomePagelayout background="white" >
      <SoftBox className={styles.absolutenavbox}><CustomeNavbar /></SoftBox>
      {/* <DefaultNavbar /> */}
      <Grid container className={styles.container} sx={{
        backgroundImage: `url(${image}) `,
        backgroundSize: "cover",
      }}>
        <Grid item xs={12} className={styles.gridbox}>
          <SoftBox p={3} className={styles.bannerContentbox}>
            <SoftBox mb={1}>
              <SoftTypography variant="h1" fontWeight="bold" color="white">
                About us
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </Grid>
      </Grid>
      <SoftBox mb={6}></SoftBox>

      <Grid container spacing={2} alignItems="center">
        <Grid xs={12} sm={6} >
          <SoftBox className={styles.fluidImage} component="img" src={curved9} alt={curved9} />
        </Grid>
        <Grid xs={12} sm={6}>
          <SoftBox ml={3}>
            <SoftTypography variant="body2" fontWeight="regular" color="dark">
              Compliance360, is a leading training partner in the United Arab Emirates.  We recognized the growing need for businesses to integrate AML/CFT and Compliance trainings into their operations in order to stay competitive and legally compliant in today's fast-paced markets in which the legal and regulatory regimes impact businesses and business operations. <br></br>

              We understand the challenges companies face when it comes to Compliance certain key regulatory regimes. We strive to bridge that gap with our tailor-made training. <br></br>

              Since our inception, we have worked with a diverse range of clients in various industries, helping them streamline their training requirements, increase awareness and efficiency, enhance their overall business performance, and implementing systems to enhance regulatory compliance.<br></br>

              Our goal is to be your trusted partner on your AML/CFT and Compliance training journey, helping you stay ahead of the game and achieve success in today's ever-evolving business landscape.
            </SoftTypography>
          </SoftBox>
        </Grid>
      </Grid>




      <Grid container spacing={2} alignItems="center" className={styles.darkContainer} px={3} py={6} mt={3}>
        <Grid xs={12} sm={12} mb={3}>
          <SoftBox ml={3}>
            <SoftTypography variant="h2" fontWeight="regular" color="white" className={styles.centerHeading}>
              Our Partners
            </SoftTypography>
            <SoftTypography variant="body2" fontWeight="regular" color="white" className={styles.centerHeading}>
              We are partnered with
            </SoftTypography>
          </SoftBox>
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <SoftBox className={styles.flexBox}>
            <SoftBox className={styles.fluidFix} component="img" src={curved10} alt={curved10} />
            <SoftBox>
              <SoftTypography variant="h6" fontWeight="regular" color="white" className={styles.centerHeading}>
                Anjarwalla Collins & Haidermota
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <SoftBox className={styles.flexBox}>
            <SoftBox className={styles.fluidFix} component="img" src={curved11} alt={curved11} />
            <SoftBox>
              <SoftTypography variant="h6" fontWeight="regular" color="white" className={styles.centerHeading}>
                Adilzone Corporate Services LLC
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <SoftBox className={styles.flexBox}>
            <SoftBox className={styles.fluidFix} component="img" src={curved12} alt={curved12} />
            <SoftBox>
              <SoftTypography variant="h6" fontWeight="regular" color="white" className={styles.centerHeading}>
                RAKICC
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </Grid>
      </Grid>

      <Grid container  mt={4}>
      <Grid xs={12}  >
          <SoftBox mb={3}>
            <SoftTypography className={styles.centerHeading} variant="h2" fontWeight="bold" color="dark">
              Other Services
            </SoftTypography>
          </SoftBox>
        </Grid>
        <Grid xs={12} sm={6} className={styles.darkbox}>
          <SoftBox p={4}>
            <SoftBox mb={1}>
              <SoftTypography variant="h4" fontWeight="bold" color="white">
                GoAML & Reporting
              </SoftTypography>
            </SoftBox>
            <SoftTypography variant="body2" fontWeight="regular" color="white">
              The goAML system was developed by the United Nations Office on Drugs and Crime (UNODC) to combat money laundering and the financing of terrorism. It is considered an integrated system used by the Financial Intelligence Unit (FIU) to efficiently analyze and distribute Suspicious Transaction Reports (STRs). Many financial intelligence units worldwide are using it, and the UAE is the first Gulf country to apply this modern system.<br></br>

              The financial institutions (FIs) DNFBPs, and RHP were required to register on the goAML portal and file STRs and Suspicious Activity Reports (SAR). Adilzone Corporate Services LLC offers services and support to facilitate goAML registration and reporting for their clients, ensuring a smooth and hassle-free compliance process.<br></br>

              The UAE FIU analyses suspicious transactions and activities involving money laundering, terrorism financing, and related criminal activities based on data and reports that collaborate and share knowledge to detect and act against such actions.<br></br>

              Dealers in Precious Metals & Stones (DPMS) Reporting: About the Federal Decree-Law No. (20) of 2018 on Anti-Money Laundering and Combating the Financing of Terrorism and financing of criminal organizations, and the powers to issue instructions granted by Article (44) Section 2 of Cabinet Decision No. (10) of 2019 concerning the implementing regulation of decree law no. (20) of 2018 on anti-money laundering and combating the financing of terrorism and criminal organizations, the following transactions must report to the GoAML platform as ‘Dealers in Precious Metals and Stones Report’ (DPMSR).
            </SoftTypography>
            <SoftBox
              component="ul"
              sx={{
                mt: 3,
                mb: 0,
                ml: 2
              }}
            >
              <SoftBox component="li" px={2} lineHeight={1} color="white">
                <SoftTypography variant="button" fontWeight="regular" color="white">
                  Transactions with resident individuals – Cash transactions equal to or exceeding AED 55,000
                </SoftTypography>
              </SoftBox>
              <SoftBox component="li" px={2} lineHeight={1} color="white">
                <SoftTypography variant="button" fontWeight="regular" color="white">
                  Transactions with non-resident individuals – Cash transactions equal to or exceeding AED 55,000
                </SoftTypography>
              </SoftBox>
              <SoftBox component="li" px={2} lineHeight={1} color="white">
                <SoftTypography variant="button" fontWeight="regular" color="white">
                  Transactions with entities/companies – transactions equal to or exceeding AED 55,000 in cash or through wire transfer.
                </SoftTypography>
              </SoftBox>
            </SoftBox>
            <SoftBox mt={2}>
              <SoftTypography variant="body2" fontWeight="regular" color="white">
                Also, the records of all documents related to transactions must be maintained for five years.<br></br><br></br>

                We provide an automated reporting solution for the DPMSR transactions with a systematic KYC Process, Risk Assessment, Screening verifications, and centralized document management. It will be your comprehensive tool for regulatory audit purposes.
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </Grid>
        <Grid xs={12} sm={6} className={styles.redBox}>
          <SoftBox p={4}>
            <SoftBox mb={1}>
              <SoftTypography variant="h4" fontWeight="bold" color="white">
                AML Audit
              </SoftTypography>
            </SoftBox>
            <SoftTypography variant="body2" fontWeight="regular" color="white">
              An independent AML audit is a fact-finding process. It is not a financial audit but a test to see whether the organization has an appropriate AML Compliance program. The AML Audit will be conducted by on-site visit and off-site as well.<br></br>

              This Internal Audit charter aims to ensure better management of an enterprise by improving its governance, risk management, management controls, and compliance with the Ministry of Economy, Central Bank of UAE, UAE Federal Government, and Global Competent authorities.<br></br>

              Our objective is to bring a systematic, disciplined approach to evaluating and improving the effectiveness of the risk management, controls, and governance process.<br></br>

              The scope of work of Internal Audit encompasses the examination and evaluation of the adequacy, existence, and effectiveness of the system of internal control, risk management framework, and corporate governance of the organization, which includes;
            </SoftTypography>
            <SoftBox
              component="ul"
              sx={{
                mt: 3,
                mb: 0,
                ml: 2
              }}
            >
              <SoftBox component="li" px={2} lineHeight={1} color="white">
                <SoftTypography variant="button" fontWeight="regular" color="white">
                  Evaluation of the effectiveness of the AML Policy, Procedures, and Controls
                </SoftTypography>
              </SoftBox>
              <SoftBox component="li" px={2} lineHeight={1} color="white">
                <SoftTypography variant="button" fontWeight="regular" color="white">
                  Evaluation of the effectiveness of the Transaction Monitoring Function
                </SoftTypography>
              </SoftBox>
              <SoftBox component="li" px={2} lineHeight={1} color="white">
                <SoftTypography variant="button" fontWeight="regular" color="white">
                  Evaluation of the effectiveness of sanction screening controls
                </SoftTypography>
              </SoftBox>
              <SoftBox component="li" px={2} lineHeight={1} color="white">
                <SoftTypography variant="button" fontWeight="regular" color="white">
                  Analyzing reports prepared by the Compliance department / MLRO / Compliance Officer
                </SoftTypography>
              </SoftBox>
              <SoftBox component="li" px={2} lineHeight={1} color="white">
                <SoftTypography variant="button" fontWeight="regular" color="white">
                  Effectiveness of training given to the front-line executives and Senior Management
                </SoftTypography>
              </SoftBox>
              <SoftBox component="li" px={2} lineHeight={1} color="white">
                <SoftTypography variant="button" fontWeight="regular" color="white">
                  ML/TF Risk Assessment
                </SoftTypography>
              </SoftBox>
              <SoftBox component="li" px={2} lineHeight={1} color="white">
                <SoftTypography variant="button" fontWeight="regular" color="white">
                  CPD Training Completion level of Compliance Department staff
                </SoftTypography>
              </SoftBox>
              <SoftBox component="li" px={2} lineHeight={1} color="white">
                <SoftTypography variant="button" fontWeight="regular" color="white">
                  Quality testing of Suspicious Transaction Report and Suspicious Activity Report
                </SoftTypography>
              </SoftBox>
            </SoftBox>
          </SoftBox>
        </Grid>
        <Grid xs={12} sm={6} className={styles.redBox}>
          <SoftBox p={4}>
            <SoftBox mb={1}>
              <SoftTypography variant="h4" fontWeight="bold" color="white">
                Record Retention
              </SoftTypography>
            </SoftBox>
            <SoftTypography variant="body2" fontWeight="regular" color="white">
              An AML audit ensures that the organization has comprehensive internal policies, procedures, systems, and controls. This can be broken down into three key components – side-by-side walkthroughs to observe how functions work in practice and testing to determine whether procedures have been followed. Interviews with relevant persons to gauge personal knowledge, as well as the culture of compliance in the firm.<br></br>

              We will conduct the quality and effectiveness Internal Audit on the organization’s internal control, risk management, and governance system and processes, thereby helping the Board of Directors / Shareholders/partners/Owner and Senior Management protect their organization and its reputation. Furthermore, our Internal Auditor will use risk-based approaches to determine their work plans and actions. Please connect for a free consultation and book your gap analysis audit.
              Guidance For the Setup Compliance Team<br></br>

              We assist you in building your compliance team as per the regulatory expectations with the concept of five elements;
            </SoftTypography>
            <SoftBox
              component="ul"
              sx={{
                mt: 3,
                mb: 0,
                ml: 2
              }}
            >
              <SoftBox component="li" px={2} lineHeight={1} color="white">
                <SoftTypography variant="button" fontWeight="regular" color="white">
                  Designing the AML/CFT Policies, Procedures, and Controls:
                </SoftTypography>
              </SoftBox>
              <SoftBox component="li" px={2} lineHeight={1} color="white">
                <SoftTypography variant="button" fontWeight="regular" color="white">
                  The AML/CFT Policy will be designed according to the business activity to be easily understood to maintain compliance while performing job functions.  The procedure and controls will be validated regularly, and the policy will be updated with the recent AML/CFT laws.
                </SoftTypography>
              </SoftBox>
              <SoftBox component="li" px={2} lineHeight={1} color="white">
                <SoftTypography variant="button" fontWeight="regular" color="white">
                  Designating a Compliance Officer, Compliance Committee & Audit Committee:
                </SoftTypography>
              </SoftBox>
              <SoftBox component="li" px={2} lineHeight={1} color="white">
                <SoftTypography variant="button" fontWeight="regular" color="white">
                  A Compliance Officer will be assigned to verify the day-to-day AML compliance program to prevent, detect, and report non-compliance matters.
                </SoftTypography>
              </SoftBox>
            </SoftBox>
            <SoftBox mt={2}>
              <SoftTypography variant="body2" fontWeight="regular" color="white">The committees will conduct regular meetings to evaluate the effectiveness of the Compliance Department, system, and procedures. The recommendations will be reported with the meeting minutes to the board of directors/shareholders/partners/owner.</SoftTypography>
            </SoftBox>
          </SoftBox>
        </Grid>
        <Grid xs={12} sm={6} className={styles.darkbox}>
          <SoftBox p={4}>
            <SoftBox mb={1}>
              <SoftTypography variant="h4" fontWeight="bold" color="white">
                Training and Awareness
              </SoftTypography>
            </SoftBox>
            <SoftTypography variant="body2" fontWeight="regular" color="white">
              Regular training will be arranged for the key members and senior management to achieve the robust AML Compliance Culture within the organization. Employees should understand that the company wants them to do the right thing, and compliance improves the company and keeps it from getting entangled in lawsuits or regulatory actions.
            </SoftTypography>
          </SoftBox>
        </Grid>
        <Grid xs={12} sm={6} className={styles.darkbox}>
          <SoftBox p={4}>
            <SoftBox mb={1}>
              <SoftTypography variant="h4" fontWeight="bold" color="white">
                Independent Audit, Monitoring, and Reporting
              </SoftTypography>
            </SoftBox>
            <SoftTypography variant="body2" fontWeight="regular" color="white">
              Compliance programs are not “one size fits all” – they must be customized. Our audit team will conduct an independent audit to identify the key risk areas within your organization and design a comprehensive compliance framework with necessary recommendations. It is not only identifying the gap. Our experts will continue monitoring the AML Compliance implementation so that your esteemed organization achieves the best AML practices in the region.
            </SoftTypography>
          </SoftBox>
        </Grid>
        <Grid xs={12} sm={6} className={styles.redBox}>
          <SoftBox p={4}>
            <SoftBox mb={1}>
              <SoftTypography variant="h4" fontWeight="bold" color="white">
                Identify, Assess, and Corrective Action
              </SoftTypography>
            </SoftBox>
            <SoftTypography variant="body2" fontWeight="regular" color="white">
              Developing a method for tracking and responding to compliance issues, thoroughly documenting and investigating, enforcing corrective action, and tracking the resolution of complaints are effective ways to address offenses. Acting promptly to detect violations and taking appropriate disciplinary action is pertinent to maintaining an effective compliance program.<br></br>
              <br></br>Workforce Supply For the Compliance Function<br></br><br></br>
              We take care of your AML Compliance with our professionals. Our company provides well-experienced Compliance Executives to handle your AML Compliance queries such as;
            </SoftTypography>
            <SoftBox
              component="ul"
              sx={{
                mt: 3,
                mb: 0,
                ml: 2
              }}
            >
              <SoftBox component="li" px={2} lineHeight={1} color="white">
                <SoftTypography variant="button" fontWeight="regular" color="white">
                  KYC verifications
                </SoftTypography>
              </SoftBox>
              <SoftBox component="li" px={2} lineHeight={1} color="white">
                <SoftTypography variant="button" fontWeight="regular" color="white">
                  Sanction Screening of Involved parties
                </SoftTypography>
              </SoftBox>
              <SoftBox component="li" px={2} lineHeight={1} color="white">
                <SoftTypography variant="button" fontWeight="regular" color="white">
                  Risk Assessment of the client
                </SoftTypography>
              </SoftBox>
              <SoftBox component="li" px={2} lineHeight={1} color="white">
                <SoftTypography variant="button" fontWeight="regular" color="white">
                  Conduct Enhanced Due Diligence
                </SoftTypography>
              </SoftBox>
              <SoftBox component="li" px={2} lineHeight={1} color="white">
                <SoftTypography variant="button" fontWeight="regular" color="white">
                  Ongoing monitoring
                </SoftTypography>
              </SoftBox>
              <SoftBox component="li" px={2} lineHeight={1} color="white">
                <SoftTypography variant="button" fontWeight="regular" color="white">
                  Document Management
                </SoftTypography>
              </SoftBox>
              <SoftBox component="li" px={2} lineHeight={1} color="white">
                <SoftTypography variant="button" fontWeight="regular" color="white">
                  Record Retention Procedures
                </SoftTypography>
              </SoftBox>
            </SoftBox>
          </SoftBox>
        </Grid>
      </Grid>



      <Footer />
    </HomePagelayout>
  );
}

// Setting default values for the props of HomeLayout
HomeLayout.defaultProps = {
  header: "",
  title: "",
  description: "",
  color: "info",
  top: 7,
};

// Typechecking props for the HomeLayout
HomeLayout.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  header: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  top: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default HomeLayout;
