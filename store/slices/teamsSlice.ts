import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { ITeamMember } from "@/types";
import { getTeams } from "@/lib/utils";

//Thunk part
export const fetchTeamMembers = createAsyncThunk(
  "fetchTeamMembers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getTeams();
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error?.message || "Failed to fetch",
      );
    }
  },
);

interface TeamsState {
  teams: ITeamMember[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    pageCount: number;
  };
}
const initialState: TeamsState = {
  teams: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    pageSize: 6,
    total: 0,
    pageCount: 1,
  },
};

const teamsSlice = createSlice({
  name: "teams",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = action.payload;
        state.pagination = {
          page: action.payload.meta.page,
          pageSize: action.payload.meta.pageSize,
          total: action.payload.meta.total,
          pageCount: action.payload.meta.pageCount,
        };
      })
      .addCase(fetchTeamMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectTeams = (state: RootState) => state.teams.teams;
export const selectTeamsError = (state: RootState) => state.teams.error;
export const selectTeamsLoading = (state: RootState) => state.teams.loading;

export default teamsSlice.reducer;
