import { createSlice } from "@reduxjs/toolkit";
import {
  Organizer,
  OrganizerDetail,
  ValidMember,
} from "../../../types/organizer";
import { getOrganizer } from "../../../utils/auth";

interface OrganizerState {
  userOrganizer: Organizer | null;
  detailOrganizer: OrganizerDetail;
  loadingGetOrganizer: boolean;
  loadingCreateOrganizer: boolean;
  loadingGetListValidMember: boolean;
  listValidMember: ValidMember[];
  loadingGetDetailOrganizer: boolean;
  loadingRemoveMember: boolean;
  loadingAddMember: boolean;
}

const organizer = getOrganizer();

const initialState: OrganizerState = {
  userOrganizer: organizer || null,
  detailOrganizer: {} as OrganizerDetail,
  loadingGetDetailOrganizer: false,
  loadingGetOrganizer: false,
  loadingCreateOrganizer: false,
  loadingGetListValidMember: false,
  listValidMember: [],
  loadingRemoveMember: false,
  loadingAddMember: false,
};
const organizerSlice = createSlice({
  name: "organizer",
  initialState,
  reducers: {
    getOrganizer(state) {
      state.loadingGetOrganizer = true;
    },
    getOrganizerSuccess(state, action) {
      state.userOrganizer = action.payload;
      state.loadingGetOrganizer = false;
    },
    getOrganizerFailed(state) {
      state.loadingGetOrganizer = false;
    },

    getDetailOrganizer(state) {
      state.loadingGetDetailOrganizer = true;
    },
    getDetailOrganizerSuccess(state, action) {
      state.detailOrganizer = action.payload;
      state.loadingGetDetailOrganizer = false;
    },
    getDetailOrganizerFailed(state) {
      state.loadingGetDetailOrganizer = false;
    },

    createOrganizer(state, action) {
      state.loadingCreateOrganizer = true;
    },
    createOrganizerSuccess(state) {
      state.loadingCreateOrganizer = false;
    },
    createOrganizerFailed(state) {
      state.loadingCreateOrganizer = false;
    },

    getListValidMember(state) {
      state.loadingGetListValidMember = true;
    },
    getListValidMemberSuccess(state, action) {
      state.listValidMember = action.payload;
      state.loadingGetListValidMember = false;
    },
    getListValidMemberFailed(state) {
      state.loadingGetListValidMember = false;
    },

    addMember(state, action) {
      state.loadingAddMember = true;
    },
    addMemberSuccess(state) {
      state.loadingAddMember = false;
    },
    addMemberFailed(state) {
      state.loadingAddMember = false;
    },

    removeMember(state, action) {
      state.loadingRemoveMember = true;
    },
    removeMemberSuccess(state) {
      state.loadingRemoveMember = false;
    },
    removeMemberFailed(state) {
      state.loadingRemoveMember = false;
    },
    resetOrganizer(state) {
      state.userOrganizer = null;
    },
  },
});

// Actions
export const organizerActions = organizerSlice.actions;
// Reducer
const organizerReducer = organizerSlice.reducer;
export default organizerReducer;
