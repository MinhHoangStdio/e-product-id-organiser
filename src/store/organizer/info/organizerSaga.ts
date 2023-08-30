import { call, fork, put, takeLatest, all } from "redux-saga/effects";
import { alertActions } from "../../alert/alertSlice";
import { Action } from "../../../types/actions";
import { organizerActions } from "./organizerSlice";
import organizerApi from "../../../api/organizer";
import { layoutActions } from "../../layout/layoutSlice";

function* handleGetOrganizer(action: Action) {
  try {
    const response: { data: any } = yield call(
      organizerApi.getListOrganizer,
      {}
    );
    localStorage.setItem("organizer_id", JSON.stringify(response.data));
    yield put(organizerActions.getOrganizerSuccess(response.data));
  } catch (error) {
    yield put(organizerActions.getOrganizerFailed());
    yield put(
      alertActions.showAlert({
        text: "Không thể lấy thông tin tổ chức",
        type: "error",
      })
    );
  }
}

function* handleCreateOrganizer(action: Action) {
  try {
    const params = action.payload;
    yield put(layoutActions.startLayoutLoading());
    const response: { data: any } = yield call(
      organizerApi.createOrganizer,
      params
    );
    yield put(layoutActions.endLayoutLoading());
    yield put(organizerActions.createOrganizerSuccess());
    yield put(
      alertActions.showAlert({
        text: "Tạo tổ chức thành công",
        type: "success",
      })
    );
    yield put(organizerActions.getOrganizer());
    yield put(layoutActions.closeModalOrganizer());
  } catch (error) {
    yield put(layoutActions.endLayoutLoading());
    yield put(organizerActions.createOrganizerFailed());
    yield put(
      alertActions.showAlert({
        text: "Tạo tổ chức thất bại",
        type: "error",
      })
    );
  }
}

function* watchLoginFlow() {
  yield all([
    takeLatest(organizerActions.getOrganizer.type, handleGetOrganizer),
    takeLatest(organizerActions.createOrganizer.type, handleCreateOrganizer),
  ]);
}

export function* organizerSaga() {
  yield fork(watchLoginFlow);
}
