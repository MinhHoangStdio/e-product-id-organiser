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

function* handleGetDetailOrder(action: Action) {
  try {
    const id = action.payload;

    const response: { data: Order } = yield call(orderApi.getDetailOrder, id);

    yield put(orderActions.getDetailOrderSuccess(response.data));
  } catch (error) {
    yield put(orderActions.getDetailOrderFailed());
    yield put(
      alertActions.showAlert({
        text: "Không thể lấy thông tin chi tiết đơn hàng",
        type: "error",
      })
    );
  }
}

function* handleCompleteOrder(action: Action) {
  try {
    const { orderId } = action.payload;
    const response: { data: any } = yield call(orderApi.completeOrder, orderId);
    yield put(orderActions.getDetailOrder(orderId));
    yield put(orderActions.completeOrderSuccess());
    yield put(
      alertActions.showAlert({
        text: "Xác nhận hoàn thành đơn hàng thành công",
        type: "success",
      })
    );
  } catch (error: any) {
    yield put(orderActions.completeOrderFailed());
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
  yield all([
    takeLatest(orderActions.getDetailOrder.type, handleGetDetailOrder),
  ]);
  yield all([takeLatest(orderActions.completeOrder.type, handleCompleteOrder)]);
}

export function* orderSaga() {
  yield fork(watchLoginFlow);
}
