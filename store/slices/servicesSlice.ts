import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { IServiceItem } from "@/types";
import { getServiceById, getServices } from "@/lib/utils";

//Thunk part
export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async ({ locale }: { locale: string }, { rejectWithValue }) => {
    try {
      const res = await getServices(locale);
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error?.message || "Failed to fetch",
      );
    }
  },
);

export const fetchSingleService = createAsyncThunk(
  "services/fetchSingleService",
  async ({
    id,
    locale,
    page,
    pageSize,
  }: {
    id: string;
    locale: string;
    page: number;
    pageSize: number;
  }) => {
    const response = await getServiceById(id, locale, page, pageSize);
    return response.data;
  },
);

const servicesSlice = createSlice({
  name: "services",
  initialState: {
    services: [] as IServiceItem[],
    singleService: null as IServiceItem | null,
    listLoading: false,
    listError: null as string | null,
    singleLoading: false,
    singleError: null as string | null,
    pagination: {
      page: 1,
      pageSize: 5,
      pageCount: 1,
      total: 0,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.listLoading = true;
        state.listError = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.listLoading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.listLoading = false;
        state.listError = action.payload as string;
      });

    builder
      .addCase(fetchSingleService.pending, (state) => {
        state.singleLoading = true;
        state.singleError = null;
      })
      .addCase(fetchSingleService.fulfilled, (state, action) => {
        state.singleLoading = false;
        state.singleService = action.payload;
        state.pagination = action.payload.meta?.pagination || state.pagination;
      })
      .addCase(fetchSingleService.rejected, (state, action) => {
        state.singleLoading = false;
        state.singleError = action.payload as string;
      });
  },
});

// selectors
export const selectServices = (state: RootState) => state.services.services;
export const selectServicesLoading = (state: RootState) =>
  state.services.listLoading;
export const selectServicesError = (state: RootState) =>
  state.services.listError;

export const selectSingleService = (state: RootState) =>
  state.services.singleService;
export const selectSingleServiceLoading = (state: RootState) =>
  state.services.singleLoading;
export const selectSingleServiceError = (state: RootState) =>
  state.services.singleError;
export const selectSingleServicePagination = (state: any) =>
  state.services.pagination;
export default servicesSlice.reducer;
