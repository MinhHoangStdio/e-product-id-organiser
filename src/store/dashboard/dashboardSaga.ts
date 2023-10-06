import { all, fork, put, call, takeLatest } from "redux-saga/effects";
import { dashboardAction } from "./dashboardSlice";
import { Action } from "../../types/actions";
import dashboardApi from "../../api/dashboard";
import {
  ConsignmentStatistic,
  MemberStatistic,
  ProductStatistic,
} from "../../types/dashboard";
import { alertActions } from "../alert/alertSlice";

function* handleGetProductStatistic(action: Action) {
  try {
    const response: { data: ProductStatistic } = yield call(
      dashboardApi.getStatisticProducts,
      action.payload
    );
    yield put(dashboardAction.getProductStatisticSuccess(response.data));
  } catch (error) {
    yield put(dashboardAction.getProductStatisticFailed());
    yield put(
      alertActions.showAlert({
        text: "Không thể lấy thống kê sản phẩm",
        type: "error",
      })
    );
  }
}

function* handleGetConsignmentStatistic(action: Action) {
  try {
    const response: { data: ConsignmentStatistic } = yield call(
      dashboardApi.getStatisticConsignments,
      action.payload
    );
    yield put(dashboardAction.getConsignmentStatisticSuccess(response.data));
  } catch (error) {
    yield put(dashboardAction.getConsignmentStatisticFailed());
    yield put(
      alertActions.showAlert({
        text: "Không thể lấy thống kê lô hàng",
        type: "error",
      })
    );
  }
}

function* handleGetMemberStatistic(action: Action) {
  try {
    const response: { data: MemberStatistic } = yield call(
      dashboardApi.getStatisticMembers,
      action.payload
    );
    yield put(dashboardAction.getMemberStatisticSuccess(response.data));
  } catch (error) {
    yield put(dashboardAction.getMemberStatisticFailed());
    yield put(
      alertActions.showAlert({
        text: "Không thể lấy thống kê thành viên",
        type: "error",
      })
    );
  }
}

function* dashboardFlow() {
  yield all([
    takeLatest(
      dashboardAction.getProductStatistic.type,
      handleGetProductStatistic
    ),
    takeLatest(
      dashboardAction.getConsignmentStatistic.type,
      handleGetConsignmentStatistic
    ),
    takeLatest(
      dashboardAction.getMemberStatistic.type,
      handleGetMemberStatistic
    ),
  ]);
}

export function* dashboardSaga() {
  yield fork(dashboardFlow);
}
