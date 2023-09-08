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

function* handleGetDetailOrganizer() {
  const id = JSON.parse(localStorage.getItem("organizer_id") as string).id;
  try {
    const response: { data: any } = yield call(
      organizerApi.getDetailOrganizer,
      id
    );

    yield put(organizerActions.getDetailOrganizerSuccess(response.data));
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

function* handleGetListValidMember() {
  try {
    const response: { data: any } = yield call(organizerApi.getListValidMember);
    yield put(organizerActions.getListValidMemberSuccess(response.data));
  } catch (error) {
    yield put(organizerActions.getListValidMemberFailed());
    yield put(
      alertActions.showAlert({
        text: "Không thể lấy danh sách thành viên",
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

function* handleAddMember(action: Action) {
  const organizerId = JSON.parse(
    localStorage.getItem("organizer_id") as string
  ).id;
  const membersId = action.payload.listUser;
  try {
    const response: { data: any } = yield call(
      organizerApi.addMember,
      membersId,
      organizerId
    );
    yield put(organizerActions.addMemberSuccess());
    yield call(handleGetDetailOrganizer);
    action.payload.onNext();
    yield put(
      alertActions.showAlert({
        text: "Thêm thành viên thành công",
        type: "success",
      })
    );
  } catch (error) {
    yield put(organizerActions.getOrganizerFailed());
    yield put(
      alertActions.showAlert({
        text: "Thêm thành viên thất bại",
        type: "error",
      })
    );
  }
}

function* handleRemoveMember(action: Action) {
  const organizerId = JSON.parse(
    localStorage.getItem("organizer_id") as string
  ).id;
  const memberId = action.payload;
  try {
    const response: { data: any } = yield call(
      organizerApi.removeMember,
      memberId,
      organizerId
    );
    yield put(organizerActions.removeMemberSuccess());
    yield call(handleGetDetailOrganizer);
    yield call(handleGetListValidMember);

    yield put(
      alertActions.showAlert({
        text: "Xóa thành viên thành công",
        type: "success",
      })
    );
  } catch (error) {
    yield put(organizerActions.getOrganizerFailed());
    yield put(
      alertActions.showAlert({
        text: "Xóa thành viên thất bại",
        type: "error",
      })
    );
  }
}

function* watchLoginFlow() {
  yield all([
    takeLatest(organizerActions.getOrganizer.type, handleGetOrganizer),
    takeLatest(
      organizerActions.getListValidMember.type,
      handleGetListValidMember
    ),
    takeLatest(
      organizerActions.getDetailOrganizer.type,
      handleGetDetailOrganizer
    ),
    takeLatest(organizerActions.createOrganizer.type, handleCreateOrganizer),
    takeLatest(organizerActions.addMember.type, handleAddMember),
    takeLatest(organizerActions.removeMember.type, handleRemoveMember),
  ]);
}

export function* organizerSaga() {
  yield fork(watchLoginFlow);
}
