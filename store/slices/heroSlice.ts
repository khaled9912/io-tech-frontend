import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISlide } from "@/types/index";
import { getSlides } from "@/lib/utils";
import { RootState } from "../index";

interface SlideState {
  slides: ISlide[];
  logo: ISlide;
  loading: boolean;
  error: string | null | {};
}

const initialState: SlideState = {
  slides: [],
  logo: {} as ISlide,
  loading: false,
  error: null,
};
export const fetchSlides = createAsyncThunk("fetchServices", async () => {
  try {
    const res = await getSlides();
    return res.data.data;
  } catch (err: any) {
    return err.response?.data?.error?.message || "Failed to fetch";
  }
});

const slideSlice = createSlice({
  name: "slides",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSlides.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSlides.fulfilled, (state, action) => {
        state.loading = false;
        state.slides = action.payload;
      })
      .addCase(fetchSlides.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch";
      });
  },
});

export const selectSlides = (state: RootState) =>
  state.slides.slides[0]?.slideImages;
export const selectSlidesLoading = (state: RootState) => state.slides.loading;
export const selectSlidesError = (state: RootState) => state.slides.error;

export default slideSlice.reducer;
