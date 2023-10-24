import { all } from "redux-saga/effects";
import { alertSaga } from "./alert/alertSaga";
import { authSaga } from "./auth/authSaga";
import { productSaga } from "./organizer/product/productSaga";
import { consignmentSaga } from "./organizer/consignment/consignmentSaga";
import { organizerSaga } from "./organizer/info/organizerSaga";
import { chainsSaga } from "./organizer/chains/chainSaga";
import { publicConsignmentSaga } from "./public/consignment/consignmentSaga";
import { dashboardSaga } from "./dashboard/dashboardSaga";
import { publicOrderSaga } from "./public/order/orderSaga";
import { orderSaga } from "./organizer/order/orderSaga";

export default function* rootSaga() {
  yield all([
    alertSaga(),
    authSaga(),
    productSaga(),
    consignmentSaga(),
    organizerSaga(),
    chainsSaga(),
    publicConsignmentSaga(),
    dashboardSaga(),
    publicOrderSaga(),
    orderSaga(),
  ]);
}
