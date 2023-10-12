import { createSlice } from "@reduxjs/toolkit";
import { Statistics } from "../../types/dashboard";

interface IDashboard {
  loadingStatistic: boolean;
  statistic: Statistics | null;
}

const initialState: IDashboard = {
  loadingStatistic: false,
  statistic: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    getStatistic(state, action) {
      state.loadingStatistic = true;
    },
    getStatisticSuccess(state, action) {
      state.loadingStatistic = false;
      state.statistic = action.payload;
    },
    getStatisticFailed(state) {
      state.loadingStatistic = false;
      state.statistic = {} as Statistics;
    },
  },
});

// Actions
export const dashboardAction = dashboardSlice.actions;

// Reducer
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
