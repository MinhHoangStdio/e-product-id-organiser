import { createSlice } from "@reduxjs/toolkit";
import {
  ConsignmentDetail,
  PublicOrganizerDetail,
} from "../../../types/consignment";

interface consignmentState {
  consignmentDetail?: ConsignmentDetail;
  loadingConsignmentDetail: boolean;
  isFetchedData: boolean;
  publicOrganizer?: PublicOrganizerDetail;
}

const initialState: consignmentState = {
  consignmentDetail: undefined,
  loadingConsignmentDetail: false,
  isFetchedData: false,
  publicOrganizer: undefined,
};

const publicConsignmentSlice = createSlice({
  name: "public consignment",
  initialState,
  reducers: {
    getConsignmentDetail(state, action) {
      state.loadingConsignmentDetail = true;
    },
    getConsignmentDetailSuccess(state, action) {
      state.consignmentDetail = action.payload.consignment;
      state.publicOrganizer = action.payload.organizer;
      state.loadingConsignmentDetail = false;
      state.isFetchedData = true;
    },
    getConsignmentDetailFailed(state) {
      state.loadingConsignmentDetail = false;
      state.isFetchedData = true;
    },
    resetPublicConsignment(state) {
      state.isFetchedData = false;
    },
  },
});

// Actions
export const publicConsignmentActions = publicConsignmentSlice.actions;
// Reducer
const publicConsignmentReducer = publicConsignmentSlice.reducer;
export default publicConsignmentReducer;
