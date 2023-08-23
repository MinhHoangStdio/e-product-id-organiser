import { createSlice } from "@reduxjs/toolkit";
import { Pagination } from "../../../types/pagination";

interface chainsState {
  listChains: any[];
  pagination: Pagination | null;
  loadingGetListChains: boolean;
  loadingCreateChains: boolean;
  loadingRemoveChains: boolean;
  isUpload: boolean;
  temporarylistImgUrl: any;
  listImgUrl: any[];
}

const initialState: chainsState = {
  listChains: [],
  pagination: null,
  loadingGetListChains: false,
  loadingCreateChains: false,
  loadingRemoveChains: false,
  isUpload: false,
  temporarylistImgUrl: [],
  listImgUrl: [],
};

const chainsSlice = createSlice({
  name: "chains",
  initialState,
  reducers: {
    getListChains(state, action) {
      state.loadingGetListChains = true;
    },
    getListChainsSuccess(state, action) {
      state.listChains = action.payload.data;
      state.pagination = action.payload.paginate;
      state.loadingGetListChains = true;
    },
    getListChainsFailed(state) {
      state.loadingGetListChains = true;
    },

    uploadImages(state, action) {
      state.isUpload = true;
    },
    uploadImagesSuccess(state, action) {
      state.isUpload = false;
      state.listImgUrl = action.payload;
    },
    uploadImagesFailed(state) {
      state.isUpload = false;
    },

    settemporarylistImgUrl(state, action) {
      state.temporarylistImgUrl = action.payload;
    },
    plusTemporaryListImgUrl(state, action) {
      state.temporarylistImgUrl = [
        ...state.temporarylistImgUrl,
        ...action.payload,
      ];
    },
    deleteATemporaryImgUrl(state, action) {
      state.temporarylistImgUrl = [...state.temporarylistImgUrl].filter(
        (item) => item.preview !== action.payload.preview
      );
    },
    resetTemporarylistImgUrl(state) {
      state.temporarylistImgUrl = [];
    },

    createChains(state, action) {
      state.loadingCreateChains = true;
    },
    createChainsSuccess(state) {
      state.loadingCreateChains = false;
    },
    createChainsFailed(state) {
      state.loadingCreateChains = false;
    },

    removeChains(state, action) {
      state.loadingRemoveChains = true;
    },
    removeChainsSuccess(state) {
      state.loadingRemoveChains = false;
    },
    removeChainsFailed(state) {
      state.loadingRemoveChains = false;
    },
  },
});

// Actions
export const chainsActions = chainsSlice.actions;
// Reducer
const chainsReducer = chainsSlice.reducer;
export default chainsReducer;
