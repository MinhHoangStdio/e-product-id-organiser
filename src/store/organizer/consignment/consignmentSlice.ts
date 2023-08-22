import { createSlice } from "@reduxjs/toolkit";
import { Pagination } from "../../../types/pagination";
import { Consignment } from "../../../types/consignment";

interface consignmentState {
  listConsignments: Consignment[];
  pagination: Pagination | null;
  loadingGetConsignments: boolean;
  loadingCreateConsignment: boolean;
  loadingRemoveConsignment: boolean;
  //   consignmentSelected: Product | null;
}

const initialState: consignmentState = {
  listConsignments: [],
  pagination: null,
  loadingGetConsignments: false,
  loadingCreateConsignment: false,
  loadingRemoveConsignment: false,
  //   consignmentSelected
};

const consignmentSlice = createSlice({
  name: "consignment",
  initialState,
  reducers: {
    getListConsignments(state, action) {
      state.loadingGetConsignments = true;
    },
    getListConsignmentsSuccess(state, action) {
      state.listConsignments = action.payload;
      //   state.pagination = action.payload.paginate;
      state.loadingGetConsignments = true;
    },
    getListConsignmentsFailed(state) {
      state.loadingGetConsignments = true;
    },

    createConsignment(state, action) {
      state.loadingCreateConsignment = true;
    },
    createConsignmentSuccess(state) {
      state.loadingCreateConsignment = false;
    },
    createConsignmentFailed(state) {
      state.loadingCreateConsignment = false;
    },

    removeConsignment(state, action) {
      state.loadingRemoveConsignment = true;
    },
    removeConsignmentSuccess(state) {
      state.loadingRemoveConsignment = false;
    },
    removeConsignmentFailed(state) {
      state.loadingRemoveConsignment = false;
    },

    // selectedConsignment(state, action) {
    //   state.consignmentSelected = action.payload;
    // },
    // resetSelectedConsignment(state) {
    //   state.consignmentSelected = null;
    // },
  },
});

// Actions
export const consignmentActions = consignmentSlice.actions;
// Reducer
const consignmentReducer = consignmentSlice.reducer;
export default consignmentReducer;
