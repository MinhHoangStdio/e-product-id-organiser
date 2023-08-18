import { all } from "redux-saga/effects";
import { alertSaga } from "./alert/alertSaga";
import { authSaga } from "./auth/authSaga";
import { productSaga } from "./product/productSaga";

export default function* rootSaga() {
  yield all([alertSaga(), authSaga(), productSaga()]);
}
