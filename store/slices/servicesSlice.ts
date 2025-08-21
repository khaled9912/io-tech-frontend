// store/slices/servicesSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { IServiceItem } from '@/types';
import { getServices } from '@/lib/utils';

export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async ({ locale }: { locale: string }, { rejectWithValue }) => {
    try {
      const res = await getServices(locale);
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error?.message || 'Failed to fetch');
    }
  }
);

const servicesSlice = createSlice({
  name: 'services',
  initialState: {
    services: [] as IServiceItem[],
    singleService: null as IServiceItem | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectServices = (state: RootState) => state.services.services;
export const selectService = (state: RootState) => state.services.singleService;
export const selectServicesLoading = (state: RootState) => state.services.loading;
export const selectServicesError = (state: RootState) => state.services.error;

export default servicesSlice.reducer;
