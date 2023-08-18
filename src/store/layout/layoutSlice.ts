import { createSlice } from "@reduxjs/toolkit";

interface LayoutType {
  theme: "dark" | "light";
  isCollapseSidebar: boolean;
  authState: "login" | "register";
  isOpenProductModal: boolean;
  isLayoutLoading: boolean;
}

const initialState: LayoutType = {
  theme: "light",
  isCollapseSidebar: false,
  authState: "login",
  isOpenProductModal: false,
  isLayoutLoading: false,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    changeTheme(state, action) {
      state.theme = action.payload;
    },
    toggleCollapseSidebar(state) {
      state.isCollapseSidebar = !state.isCollapseSidebar;
    },
    changeAuthState(state) {
      if (state.authState == "login") {
        state.authState = "register";
      } else {
        state.authState = "login";
      }
    },

    openModalProduct(state) {
      state.isOpenProductModal = true;
    },
    closeModalProduct(state) {
      state.isOpenProductModal = false;
    },

    startLayoutLoading(state) {
      state.isLayoutLoading = true;
    },
    endLayoutLoading(state) {
      state.isLayoutLoading = false;
    },
  },
});

// Actions
export const layoutActions = layoutSlice.actions;
// Reducer
const layoutReducer = layoutSlice.reducer;
export default layoutReducer;
