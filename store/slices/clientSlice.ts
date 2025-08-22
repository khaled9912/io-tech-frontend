import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { IClient } from "@/types";
import { getClients } from "@/lib/utils";

//Thunk part
export const fetchClients = createAsyncThunk(
  "fetchClients",
  async (_, thunkAPI) => {
    try {
      const res = await getClients();
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error?.message || "Failed to fetch",
      );
    }
  },
);

const clientSlice = createSlice({
  name: "clients",
  initialState: {
    clients: [] as IClient[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectClients = (state: RootState) => state.clients.clients;
export const selectClientsError = (state: RootState) => state.clients.error;
export const selectClientsLoading = (state: RootState) => state.clients.loading;

export default clientSlice.reducer;
