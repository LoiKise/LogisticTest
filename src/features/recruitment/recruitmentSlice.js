import { createAsyncThunk } from "@reduxjs/toolkit";
import recruitmentApi from "../../apis/recruitment.api";
import { payloadCreator } from "../../helpers/payloadCreators";

export const getRecruitments = createAsyncThunk(
  "Recruitment/getRecruitments",
  payloadCreator(recruitmentApi.getRecruitments)
);
