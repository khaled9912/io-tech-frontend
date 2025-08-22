import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { postEmailSubscription } from "@/lib/utils";

const initialState = {
  email: "",
  status: "idle",
  message: "",
};

export const subscribeEmail = createAsyncThunk(
  "newsletter/subscribeEmail",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await postEmailSubscription(email);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  },
);

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setFormStatus: (state, action) => {
      state.status = action.payload.status;
      state.message = action.payload.message || "";
    },
    resetForm: () => {
      return initialState;
    },
  },
});

export const { setEmail, setFormStatus, resetForm } = formSlice.actions;

//selector
export const selectEmailMessage = (state: RootState) => state.form.message;
export const selectFormStatus = (state: RootState) => state.form.status;

export default formSlice.reducer;
