import { createSlice } from "@reduxjs/toolkit";
import { ConsignmentDetail } from "../../../types/consignment";

interface consignmentState {
  consignmentDetail?: ConsignmentDetail;
  loadingConsignmentDetail: boolean;
  isFetchedData: boolean;
}

const initialState: consignmentState = {
  consignmentDetail: undefined,
  loadingConsignmentDetail: false,
  isFetchedData: false,
};

const publicConsignmentSlice = createSlice({
  name: "public consignment",
  initialState,
  reducers: {
    getConsignmentDetail(state, action) {
      state.loadingConsignmentDetail = true;
    },
    getConsignmentDetailSuccess(state, action) {
      state.consignmentDetail = action.payload;
      state.loadingConsignmentDetail = false;
      state.isFetchedData = true;
    },
    getConsignmentDetailFailed(state) {
      state.loadingConsignmentDetail = false;
      state.isFetchedData = true;
    },
  },
});

// Actions
export const publicConsignmentActions = publicConsignmentSlice.actions;
// Reducer
const publicConsignmentReducer = publicConsignmentSlice.reducer;
export default publicConsignmentReducer;
