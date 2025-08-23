import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { ITeamMember } from "@/types";
import { getTeams } from "@/lib/utils";

//Thunk part
export const fetchTeamMembers = createAsyncThunk(
  "teams/fetchTeamMembers",
  async (
    {
      page = 1,
      pageSize = 5,
      locale,
    }: { page?: number; pageSize?: number; locale?: string },
    { rejectWithValue },
  ) => {
    try {
      const res = await getTeams(page, pageSize, locale);
      return res.data;
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
    pageCount: number;
    total: number;
  };
}
const initialState: TeamsState = {
  teams: [],
  pagination: { page: 1, pageSize: 5, pageCount: 1, total: 0 },
  loading: false,
  error: null,
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
        state.teams = action.payload.data;
        state.pagination = action.payload.meta?.pagination || state.pagination;
      })
      .addCase(fetchTeamMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectTeams = (state: RootState) => state.teams.teams;
export const selectTeamsPagination = (state: RootState) =>
  state.teams.pagination;
export const selectTeamsError = (state: RootState) => state.teams.error;
export const selectTeamsLoading = (state: RootState) => state.teams.loading;

export default teamsSlice.reducer;
