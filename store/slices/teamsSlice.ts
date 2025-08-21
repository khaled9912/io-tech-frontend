import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { ITeamMember } from '@/types';
import { getTeams } from '@/lib/utils';

//Thunk part
export const fetchTeamMembers = createAsyncThunk(
  'fetchTeamMembers',
  async ({ locale }: { locale: string }, { rejectWithValue }) => {
    try {
      const res = await getTeams(locale);
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error?.message || 'Failed to fetch');
    }
  }
);



const teamsSlice = createSlice({
  name: "teams",
  initialState: {
    teams: [] as ITeamMember [],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    clearTeamMembers: (state) => {
      state.teams = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = action.payload;
      })
      .addCase(fetchTeamMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearTeamMembers } = teamsSlice.actions;

export const selectTeams = (state: RootState) => state.teams.teams;
export const selectTeamsError = (state: RootState) => state.teams.error;
export const selectTeamsLoading = (state: RootState) => state.teams.loading;


export default teamsSlice.reducer;
