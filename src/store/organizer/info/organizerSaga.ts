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
    console.log(response.data.data[0]);
    localStorage.setItem("organizer_id", JSON.stringify(response.data.data[0]));
    yield put(organizerActions.getOrganizerSuccess(response.data.data[0]));
  } catch (error) {
    yield put(organizerActions.getOrganizerFailed());
    yield put(
      alertActions.showAlert({
        text: "Cannot get Organizer",
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
        text: "Create a new organizer success",
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
        text: "Create a new consignment failed",
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
