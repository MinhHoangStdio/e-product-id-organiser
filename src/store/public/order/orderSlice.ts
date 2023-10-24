import { createSlice } from "@reduxjs/toolkit";

interface orderState {
  loadingCreateOrder: boolean;
}
const initialState: orderState = {
  loadingCreateOrder: false,
};

const orderSlice = createSlice({
  name: "public order",
  initialState,
  reducers: {
    createOrder(state, action) {
      state.loadingCreateOrder = true;
    },
    createOrderSuccess(state) {
      state.loadingCreateOrder = false;
    },
    createOrderFailed(state) {
      state.loadingCreateOrder = false;
    },
  },
});

// Actions
export const publicOrderActions = orderSlice.actions;
// Reducer
const publicOrderReducer = orderSlice.reducer;
export default publicOrderReducer;
