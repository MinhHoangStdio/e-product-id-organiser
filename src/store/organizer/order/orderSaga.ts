import { call, fork, put, takeLatest, all } from "redux-saga/effects";
import { alertActions } from "../../alert/alertSlice";
import { Action } from "../../../types/actions";
import { orderActions } from "./orderSlice";
import { Pagination } from "../../../types/pagination";
import orderApi from "../../../api/order";
import { Order } from "../../../types/order";

function* handleGetListOrders(action: Action) {
  try {
    const params = action.payload.limit
      ? action.payload
      : { page: 1, limit: 8 };

    const response: { data: { data: Order[]; paginate: Pagination } } =
      yield call(orderApi.getListOrders, params);
    yield put(orderActions.getListOrderSuccess(response.data));
  } catch (error: any) {
    yield put(orderActions.getListOrderFailed());
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
  yield all([takeLatest(orderActions.getListOrder.type, handleGetListOrders)]);
}

export function* orderSaga() {
  yield fork(watchLoginFlow);
}
