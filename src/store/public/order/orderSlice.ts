import { createSlice } from "@reduxjs/toolkit";

interface orderState {
  loadingCreateOrder: boolean;
}
const initialState: orderState = {
  loadingCreateOrder: false,
};

const orderSlice = createSlice({
  name: "consignment",
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
export const orderActions = orderSlice.actions;
// Reducer
const orderReducer = orderSlice.reducer;
export default orderReducer;
