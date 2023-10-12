import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ConsignmentStatistic,
  MemberStatistic,
  ProductStatistic,
} from "../../types/dashboard";

interface IDashboard {
  loadingProductStatictis: boolean;
  loadingConsignmentStatictis: boolean;
  loadingMemberStatictis: boolean;
  productStatistic: ProductStatistic | null;
  consignmentStatistic: ConsignmentStatistic | null;
  memberStatistic: MemberStatistic | null;
}

const initialState: IDashboard = {
  loadingProductStatictis: false,
  loadingConsignmentStatictis: false,
  loadingMemberStatictis: false,
  productStatistic: null,
  consignmentStatistic: null,
  memberStatistic: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    getProductStatistic(state, action) {
      state.loadingProductStatictis = true;
    },
    getProductStatisticSuccess(state, action) {
      state.loadingProductStatictis = false;
      state.productStatistic = action.payload;
    },
    getProductStatisticFailed(state) {
      state.loadingProductStatictis = false;
      state.productStatistic = {} as ProductStatistic;
    },

    getConsignmentStatistic(state, action) {
      state.loadingConsignmentStatictis = true;
    },
    getConsignmentStatisticSuccess(state, action) {
      state.loadingConsignmentStatictis = false;
      state.consignmentStatistic = action.payload;
    },
    getConsignmentStatisticFailed(state) {
      state.loadingConsignmentStatictis = false;
      state.consignmentStatistic = {} as ConsignmentStatistic;
    },

    getMemberStatistic(state, action) {
      state.loadingMemberStatictis = true;
    },
    getMemberStatisticSuccess(state, action) {
      state.loadingMemberStatictis = false;
      state.memberStatistic = action.payload;
    },
    getMemberStatisticFailed(state) {
      state.loadingMemberStatictis = false;
      state.memberStatistic = {} as MemberStatistic;
    },
  },
});

// Actions
export const dashboardAction = dashboardSlice.actions;

// Reducer
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
