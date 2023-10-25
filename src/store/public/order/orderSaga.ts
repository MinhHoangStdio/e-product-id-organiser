import { call, fork, put, takeLatest, all } from "redux-saga/effects";
import { alertActions } from "../../alert/alertSlice";
import { Action } from "../../../types/actions";
import { publicOrderActions } from "./orderSlice";
import publicOrderApi from "../../../api/public/order";

function* handleCreateOrder(action: Action) {
  try {
    const { params, onReset } = action.payload;
    const response: { data: any } = yield call(publicOrderApi.createOrder, {
      ...params,
    });
    yield put(publicOrderActions.createOrderSuccess());
    yield put(
      alertActions.showAlert({
        text: "Tạo yêu cầu mua lại thành công",
        type: "success",
      })
    );
    onReset();
  } catch (error: any) {
    yield put(publicOrderActions.createOrderFailed());
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
  yield all([
    takeLatest(publicOrderActions.createOrder.type, handleCreateOrder),
  ]);
}

export function* publicOrderSaga() {
  yield fork(watchLoginFlow);
}
