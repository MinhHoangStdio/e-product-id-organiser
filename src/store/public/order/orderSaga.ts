import { call, fork, put, takeLatest, all } from "redux-saga/effects";
import { alertActions } from "../../alert/alertSlice";
import { Action } from "../../../types/actions";
import { orderActions } from "./orderSlice";
import publicOrderApi from "../../../api/public/order";

function* handleCreateOrder(action: Action) {
  try {
    console.log(`⚡️[log]: †††††† >>>> ~ action.payload: `, action.payload);
    const { params, onReset } = action.payload;
    const response: { data: any } = yield call(publicOrderApi.createOrder, {
      ...params,
    });
    yield put(orderActions.createOrderSuccess());
    yield put(
      alertActions.showAlert({
        text: "Tạo yêu cầu mua lại thành công",
        type: "success",
      })
    );
    onReset();
  } catch (error: any) {
    yield put(orderActions.createOrderFailed());
    if (error?.response?.status !== 403) {
      yield put(
        alertActions.showAlert({
          text: `${error?.response?.data?.message}` || "Lỗi",
          type: "error",
        })
      );
    }
  }
}

function* watchLoginFlow() {
  yield all([takeLatest(orderActions.createOrder.type, handleCreateOrder)]);
}

export function* orderSaga() {
  yield fork(watchLoginFlow);
}
