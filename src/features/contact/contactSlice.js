import { createAsyncThunk } from "@reduxjs/toolkit";
import contactApi from "../../apis/contact.api";

export const contact = createAsyncThunk("/contact", async (data, thunkAPI) => {
  try {
    const res = await contactApi.contact(data);
    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
