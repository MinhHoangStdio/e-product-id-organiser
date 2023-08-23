import { createSlice } from "@reduxjs/toolkit";
import { Organizer } from "../../../types/organizer";
import { getOrganizer } from "../../../utils/auth";

interface OrganizerState {
  userOrganizer: Organizer | null;
  loadingGetOrganizer: boolean;
  loadingCreateOrganizer: boolean;
}

const organizer = getOrganizer();

const initialState: OrganizerState = {
  userOrganizer: organizer || null,
  loadingGetOrganizer: false,
  loadingCreateOrganizer: false,
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

    createOrganizer(state, action) {
      state.loadingCreateOrganizer = true;
    },
    createOrganizerSuccess(state) {
      state.loadingCreateOrganizer = false;
    },
    createOrganizerFailed(state) {
      state.loadingCreateOrganizer = false;
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
