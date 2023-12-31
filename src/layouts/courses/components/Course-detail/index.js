

import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { Link, useNavigate, useParams } from "react-router-dom";

import Switch from "@mui/material/Switch";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

import CoverLayout from "layouts/authentication/components/CoverLayout";
import GithubSocial from "layouts/authentication/components/Socials/github";
import Separator from "layouts/authentication/components/Separator";

import curved9 from "assets/images/curved-images/aboutBanner.png";
import { useAuth } from "auth-context/auth.context";
import PageCoverLayoutPlain from "examples/LayoutContainers/PageLayoutCoverPlain";
import { Card, Grid, Pagination, Stack } from "@mui/material";
import BuildByDevelopers from "../BuildByDevelopers";
import Details from "../BuildByDevelopers/details";
import { useGetCourseQuery } from "layouts/courses/functions/query";
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";


function CourseDetail() {
  const navigate = useNavigate();
  const {courseid} = useParams()
  const { data, error, isLoading, isFetching, isSuccess } = useGetCourseQuery(courseid)
  const { data: course } = data || {};

  return (
    <PageCoverLayoutPlain>
      <SoftBox mb={3}>
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12}>
          {(isLoading && isFetching) && <SoftBarLoader />}
            {course && <Details course={course} />}
          </Grid>
        </Grid>
      </SoftBox>
    </PageCoverLayoutPlain>
  );
}

export default CourseDetail;
