import { call, delay, fork, put, takeLatest, all } from "redux-saga/effects";
import { authActions } from "./authSlice";
import authApi from "../../api/auth";
import { alertActions } from "../alert/alertSlice";
import { ResponseLoginAdmin } from "../../types/user";
import { Action } from "../../types/actions";
import { layoutActions } from "../layout/layoutSlice";

function* handleLogin(action: Action) {
  try {
    const { params, onNavigate } = action.payload;
    const response: ResponseLoginAdmin = yield call(authApi.login, params);
    console.log(response);
    localStorage.setItem("access_token", JSON.stringify(response.data.token));
    localStorage.setItem("current_user", JSON.stringify(response.data.user));
    yield put(authActions.loginSuccess(response.data.user));
    onNavigate?.();

    // yield call(getBasicInfo);
  } catch (error) {
    // localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
    yield put(authActions.loginFailed());
    yield put(
      alertActions.showAlert({
        text: "The username or password you entered did not match our records. Please try again.",
        type: "error",
      })
    );
  }
}

function* handleRegister(action: Action) {
  try {
    const params = action.payload;
    const response: ResponseLoginAdmin = yield call(authApi.register, params);
    console.log(response);
    yield put(authActions.registerSuccess());
    yield put(
      alertActions.showAlert({
        text: "Register success!",
        type: "success",
      })
    );
    yield put(layoutActions.changeAuthState());
  } catch (error) {
    yield put(authActions.loginFailed());
    yield put(
      alertActions.showAlert({
        text: "Register failed!",
        type: "error",
      })
    );
  }
}

function* handleLogout(action: Action) {
  yield delay(500);
  localStorage.removeItem("access_token");
  localStorage.removeItem("current_user");

  action.payload.onNavigate?.();
}

function* watchLoginFlow() {
  yield all([
    takeLatest(authActions.login.type, handleLogin),
    takeLatest(authActions.register.type, handleRegister),
    takeLatest(authActions.logout.type, handleLogout),
  ]);
}

export function* authSaga() {
  yield fork(watchLoginFlow);
}
