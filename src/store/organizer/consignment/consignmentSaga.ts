import { call, fork, put, takeLatest, all } from "redux-saga/effects";
import { alertActions } from "../../alert/alertSlice";
import { Action } from "../../../types/actions";
import { layoutActions } from "../../layout/layoutSlice";
import { Pagination } from "../../../types/pagination";
import { Consignment, ConsignmentDetail } from "../../../types/consignment";
import consignmentApi from "../../../api/consignment";
import { consignmentActions } from "./consignmentSlice";

function* handleGetListConsignments(action: Action) {
  try {
    let params;
    if (action.payload.limit) {
      params = action.payload;
    } else {
      params = { page: 1, limit: 8 };
    }
    const response: { data: { data: Consignment[]; paginate: Pagination } } =
      yield call(consignmentApi.getListConsignments, params);
    yield put(consignmentActions.getListConsignmentsSuccess(response.data));
  } catch (error: any) {
    yield put(consignmentActions.getListConsignmentsFailed());
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

function* handleCreateConsignment(action: Action) {
  try {
    const { params, onReset, metadata } = action.payload;
    yield put(layoutActions.startLayoutLoading());
    const response: { data: any } = yield call(
      consignmentApi.createConsignment,
      { ...params, payload: metadata }
    );
    yield put(layoutActions.endLayoutLoading());
    yield put(consignmentActions.createConsignmentSuccess());
    yield put(
      alertActions.showAlert({
        text: "Tạo lô hàng mới thành công",
        type: "success",
      })
    );
    yield put(consignmentActions.getListConsignments({}));
    onReset();
  } catch (error: any) {
    yield put(layoutActions.endLayoutLoading());
    yield put(consignmentActions.createConsignmentFailed());
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

function* handleDeleteConsignment(action: Action) {
  try {
    const id = action.payload;
    const response: { data: any } = yield call(
      consignmentApi.removeConsignment,
      id
    );
    yield put(consignmentActions.removeConsignmentSuccess());
    yield put(
      alertActions.showAlert({
        text: "Xóa lô hàng thành công",
        type: "success",
      })
    );
    yield put(consignmentActions.getListConsignments({}));
  } catch (error: any) {
    yield put(consignmentActions.removeConsignmentFailed());
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

function* handleGetConsignmentDetail(action: Action) {
  try {
    const id = action.payload;

    const response: { data: ConsignmentDetail } = yield call(
      consignmentApi.getDetailConsignment,
      id
    );

    yield put(consignmentActions.getConsignmentDetailSuccess(response.data));
  } catch (error: any) {
    yield put(consignmentActions.getConsignmentDetailFailed());
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

function* handleDownloadQrCode(action: Action) {
  try {
    const id = action.payload;

    const response: { data: any } = yield call(
      consignmentApi.downloadQrCode,
      id
    );
    const blob = new Blob([response.data], { type: "image/png" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log({ response });

    yield put(consignmentActions.downloadQrCodeSuccess());
    yield put(
      alertActions.showAlert({
        text: "Tải mã QR thành công",
        type: "success",
      })
    );
  } catch (error: any) {
    yield put(consignmentActions.downloadQrCodeFailed());
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
    takeLatest(
      consignmentActions.createConsignment.type,
      handleCreateConsignment
    ),
    takeLatest(
      consignmentActions.removeConsignment.type,
      handleDeleteConsignment
    ),
    takeLatest(
      consignmentActions.getListConsignments.type,
      handleGetListConsignments
    ),
    takeLatest(
      consignmentActions.getConsignmentDetail.type,
      handleGetConsignmentDetail
    ),
    takeLatest(consignmentActions.downloadQrCode.type, handleDownloadQrCode),
  ]);
}

export function* consignmentSaga() {
  yield fork(watchLoginFlow);
}
