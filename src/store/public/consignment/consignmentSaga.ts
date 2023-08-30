import { call, fork, put, takeLatest, all } from "redux-saga/effects";
import { alertActions } from "../../alert/alertSlice";
import { Action } from "../../../types/actions";
import { ConsignmentDetail } from "../../../types/consignment";
import { publicConsignmentActions } from "./consignmentSlice";
import publicConsignmentApi from "../../../api/public/consignment";

function* handleGetConsignmentDetail(action: Action) {
  try {
    const id = action.payload;

    const response: { data: ConsignmentDetail } = yield call(
      publicConsignmentApi.getDetailConsignment,
      id
    );

    yield put(
      publicConsignmentActions.getConsignmentDetailSuccess(response.data)
    );
  } catch (error) {
    yield put(publicConsignmentActions.getConsignmentDetailFailed());
    yield put(
      alertActions.showAlert({
        text: "Không thể lấy thông tin lô hàng",
        type: "error",
      })
    );
  }
}

function* watchLoginFlow() {
  yield all([
    takeLatest(
      publicConsignmentActions.getConsignmentDetail.type,
      handleGetConsignmentDetail
    ),
  ]);
}

export function* publicConsignmentSaga() {
  yield fork(watchLoginFlow);
}
