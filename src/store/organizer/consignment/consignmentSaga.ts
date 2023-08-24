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
  } catch (error) {
    yield put(consignmentActions.getListConsignmentsFailed());
    yield put(
      alertActions.showAlert({
        text: "Cannot get list consignments",
        type: "error",
      })
    );
  }
}

function* handleCreateConsignment(action: Action) {
  try {
    const { params, onReset } = action.payload;
    yield put(layoutActions.startLayoutLoading());
    const response: { data: any } = yield call(
      consignmentApi.createConsignment,
      params
    );
    yield put(layoutActions.endLayoutLoading());
    yield put(consignmentActions.createConsignmentSuccess());
    yield put(
      alertActions.showAlert({
        text: "Create a new consignment success",
        type: "success",
      })
    );
    yield put(consignmentActions.getListConsignments({}));
    onReset();
  } catch (error) {
    yield put(layoutActions.endLayoutLoading());
    yield put(consignmentActions.createConsignmentFailed());
    yield put(
      alertActions.showAlert({
        text: "Create a new consignment failed",
        type: "error",
      })
    );
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
        text: "Remove consignment success",
        type: "success",
      })
    );
    yield put(consignmentActions.getListConsignments({}));
  } catch (error) {
    yield put(consignmentActions.removeConsignmentFailed());
    yield put(
      alertActions.showAlert({
        text: "Remove consignment failed",
        type: "error",
      })
    );
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
  } catch (error) {
    yield put(consignmentActions.getConsignmentDetailFailed());
    yield put(
      alertActions.showAlert({
        text: "Cannot get detail consignment",
        type: "error",
      })
    );
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
  ]);
}

export function* consignmentSaga() {
  yield fork(watchLoginFlow);
}
