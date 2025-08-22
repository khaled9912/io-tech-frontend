import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LanguageState {
  lang: "en" | "ar";
  direction: "ltr" | "rtl";
}

const initialState: LanguageState = { lang: "en", direction: "ltr" };

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<"en" | "ar">) => {
      state.lang = action.payload;
      state.direction = action.payload === "ar" ? "rtl" : "ltr";
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
