import { call, fork, put, takeLatest, all } from "redux-saga/effects";
import { alertActions } from "../../alert/alertSlice";
import { Action } from "../../../types/actions";
import productApi from "../../../api/product";
import { layoutActions } from "../../layout/layoutSlice";
import { Product } from "../../../types/product";
import { Pagination } from "../../../types/pagination";
import { chainsActions } from "./chainsSlice";
import chainsApi from "../../../api/chains";
import { consignmentActions } from "../consignment/consignmentSlice";

// function* handleGetListProducts(action: Action) {
//   try {
//     let params;
//     if (action.payload.limit) {
//       params = action.payload;
//     } else {
//       params = { page: 1, limit: 8 };
//     }
//     const response: { data: { data: Product[]; paginate: Pagination } } =
//       yield call(productApi.getListProducts, params);
//     yield put(productActions.getListProductsSuccess(response.data));
//   } catch (error) {
//     yield put(productActions.getListProductsFailed());
//     yield put(
//       alertActions.showAlert({
//         text: "Cannot get list products",
//         type: "error",
//       })
//     );
//   }
// }

function* handleCreateChains(action: Action) {
  try {
    yield put(layoutActions.startLayoutLoading());
    const formdata: any = new FormData();
    action.payload.formData.forEach((file: File) =>
      formdata.append("files", file)
    );
    const listImagesUrl: { data: any } = yield call(chainsApi.upload, formdata);
    const response: { data: any } = yield call(chainsApi.createChains, {
      ...action.payload.params,
      payload: action.payload.metadata,
      images: listImagesUrl.data.image,
    });
    yield put(layoutActions.endLayoutLoading());
    yield put(chainsActions.createChainsSuccess());
    yield put(
      alertActions.showAlert({
        text: "Create a new chains success",
        type: "success",
      })
    );
    yield put(consignmentActions.resetSelectedConsignment());
    action.payload.onReset();
    // yield put(chainsActions.getListChains({}));
  } catch (error) {
    yield put(layoutActions.endLayoutLoading());
    yield put(chainsActions.createChainsFailed());
    yield put(
      alertActions.showAlert({
        text: "Create a new chains failed",
        type: "error",
      })
    );
  }
}

// function* handleEditProduct(action: Action) {
//   try {
//     yield put(layoutActions.startLayoutLoading());
//     const formdata: any = new FormData();
//     action.payload.formData.forEach((file: File) =>
//       formdata.append("files", file)
//     );
//     const listImagesUrl: { data: any } | null = action.payload.formData.length
//       ? yield call(productApi.upload, formdata)
//       : null;
//     const response: { data: any } = yield call(
//       productApi.editProduct,
//       {
//         ...action.payload.params,
//         images: listImagesUrl
//           ? [...action.payload.productImages, ...listImagesUrl.data.image]
//           : [...action.payload.productImages],
//       },
//       action.payload.productId
//     );
//     yield put(layoutActions.endLayoutLoading());
//     yield put(productActions.editProductSuccess());
//     yield put(
//       alertActions.showAlert({
//         text: "Edit product success",
//         type: "success",
//       })
//     );
//     yield put(layoutActions.closeModalProduct());
//     yield put(productActions.getListProducts({}));
//     yield put(productActions.resetSelectedProduct());
//     action.payload.onReset();
//   } catch (error) {
//     yield put(layoutActions.endLayoutLoading());
//     yield put(productActions.editProductFailed());
//     yield put(
//       alertActions.showAlert({
//         text: "Edit product failed",
//         type: "error",
//       })
//     );
//   }
// }

function* handleDeleteChains(action: Action) {
  try {
    const { chainId, consignmentId } = action.payload;
    const response: { data: any } = yield call(chainsApi.removeChains, chainId);
    yield put(consignmentActions.getConsignmentDetail(consignmentId));
    yield put(chainsActions.removeChainsSuccess());
    yield put(
      alertActions.showAlert({
        text: "Remove chains success",
        type: "success",
      })
    );
  } catch (error) {
    yield put(chainsActions.removeChainsFailed());
    yield put(
      alertActions.showAlert({
        text: "Remove chains failed",
        type: "error",
      })
    );
  }
}

function* watchLoginFlow() {
  yield all([
    takeLatest(chainsActions.createChains.type, handleCreateChains),
    takeLatest(chainsActions.removeChains.type, handleDeleteChains),
    // takeLatest(productActions.editProduct.type, handleEditProduct),
    // takeLatest(productActions.getListProducts.type, handleGetListProducts),
  ]);
}

export function* chainsSaga() {
  yield fork(watchLoginFlow);
}
