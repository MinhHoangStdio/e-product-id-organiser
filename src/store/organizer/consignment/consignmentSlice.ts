import { createSlice } from "@reduxjs/toolkit";
import { Pagination } from "../../../types/pagination";
import { Consignment, ConsignmentDetail } from "../../../types/consignment";

interface consignmentState {
  listConsignments: Consignment[];
  pagination: Pagination | null;
  loadingGetConsignments: boolean;
  loadingCreateConsignment: boolean;
  loadingRemoveConsignment: boolean;
  consignmentSelected: Consignment | null;
  consignmentDetail?: ConsignmentDetail;
  loadingConsignmentDetail: boolean;
}

const initialState: consignmentState = {
  listConsignments: [],
  pagination: null,
  loadingGetConsignments: false,
  loadingCreateConsignment: false,
  loadingRemoveConsignment: false,
  consignmentSelected: null,
  consignmentDetail: undefined,
  loadingConsignmentDetail: false,
};

const consignmentSlice = createSlice({
  name: "consignment",
  initialState,
  reducers: {
    getListConsignments(state, action) {
      state.loadingGetConsignments = true;
    },
    getListConsignmentsSuccess(state, action) {
      state.listConsignments = action.payload.data;
      state.pagination = action.payload.paginate;
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

    selectedConsignment(state, action) {
      state.consignmentSelected = action.payload;
    },
    resetSelectedConsignment(state) {
      state.consignmentSelected = null;
    },

    getConsignmentDetail(state, action) {
      state.loadingConsignmentDetail = true;
    },
    getConsignmentDetailSuccess(state, action) {
      state.consignmentDetail = action.payload;
      state.loadingConsignmentDetail = false;
    },
    getConsignmentDetailFailed(state) {
      state.loadingConsignmentDetail = false;
    },

    reset(state) {
      state.listConsignments = [];
    },
  },
});

// Actions
export const consignmentActions = consignmentSlice.actions;
// Reducer
const consignmentReducer = consignmentSlice.reducer;
export default consignmentReducer;
