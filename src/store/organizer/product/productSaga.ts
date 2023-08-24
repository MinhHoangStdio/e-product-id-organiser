import { call, fork, put, takeLatest, all } from "redux-saga/effects";
import { alertActions } from "../../alert/alertSlice";
import { Action } from "../../../types/actions";
import { productActions } from "./productSlice";
import productApi from "../../../api/product";
import { layoutActions } from "../../layout/layoutSlice";
import { Product } from "../../../types/product";
import { Pagination } from "../../../types/pagination";

function* handleGetListProducts(action: Action) {
  try {
    let params;
    if (action.payload.limit) {
      params = action.payload;
    } else {
      params = { page: 1, limit: 8 };
    }
    const response: { data: { data: Product[]; paginate: Pagination } } =
      yield call(productApi.getListProducts, params);
    yield put(productActions.getListProductsSuccess(response.data));
  } catch (error) {
    yield put(productActions.getListProductsFailed());
    yield put(
      alertActions.showAlert({
        text: "Cannot get list products",
        type: "error",
      })
    );
  }
}

function* handleCreateProduct(action: Action) {
  try {
    yield put(layoutActions.startLayoutLoading());
    const formdata: any = new FormData();
    action.payload.formData.forEach((file: File) =>
      formdata.append("files", file)
    );
    const listImagesUrl: { data: any } = yield call(
      productApi.upload,
      formdata
    );
    const response: { data: any } = yield call(productApi.createProduct, {
      ...action.payload.params,
      images: listImagesUrl.data.image,
    });
    yield put(layoutActions.endLayoutLoading());
    yield put(productActions.createProductSuccess());
    yield put(
      alertActions.showAlert({
        text: "Create a new product success",
        type: "success",
      })
    );
    yield put(layoutActions.closeModalProduct());
    yield put(productActions.getListProducts({}));
    yield put(productActions.resetSelectedProduct());
    action.payload.onReset();
  } catch (error) {
    yield put(layoutActions.endLayoutLoading());
    yield put(productActions.createProductFailed());
    yield put(
      alertActions.showAlert({
        text: "Create a new product failed",
        type: "error",
      })
    );
  }
}

function* handleEditProduct(action: Action) {
  try {
    yield put(layoutActions.startLayoutLoading());
    const formdata: any = new FormData();
    action.payload.formData.forEach((file: File) =>
      formdata.append("files", file)
    );
    const listImagesUrl: { data: any } | null = action.payload.formData.length
      ? yield call(productApi.upload, formdata)
      : null;
    const response: { data: any } = yield call(
      productApi.editProduct,
      {
        ...action.payload.params,
        images: listImagesUrl
          ? [...action.payload.productImages, ...listImagesUrl.data.image]
          : [...action.payload.productImages],
      },
      action.payload.productId
    );
    yield put(layoutActions.endLayoutLoading());
    yield put(productActions.editProductSuccess());
    yield put(
      alertActions.showAlert({
        text: "Edit product success",
        type: "success",
      })
    );
    yield put(productActions.getListProducts({}));
    if (action.payload.listImgWillDelete.length) {
      yield call(productApi.deleteImg, {
        images: action.payload.listImgWillDelete,
      });
    }

    action.payload.onReset();
  } catch (error) {
    yield put(layoutActions.endLayoutLoading());
    yield put(productActions.editProductFailed());
    yield put(
      alertActions.showAlert({
        text: "Edit product failed",
        type: "error",
      })
    );
  }
}

function* handleDeleteProduct(action: Action) {
  try {
    const id = action.payload;
    const response: { data: any } = yield call(productApi.removeProduct, id);
    yield put(productActions.removeProductSuccess());
    yield put(
      alertActions.showAlert({
        text: "Remove product success",
        type: "success",
      })
    );
    yield put(productActions.getListProducts({}));
  } catch (error) {
    yield put(productActions.removeProductFailed());
    yield put(
      alertActions.showAlert({
        text: "Remove product failed",
        type: "error",
      })
    );
  }
}

function* handleGetDetailProduct(action: Action) {
  try {
    const id = action.payload;

    const response: { data: Product } = yield call(
      productApi.getDetailProduct,
      id
    );

    yield put(productActions.getDetailProductSuccess(response.data));
  } catch (error) {
    yield put(productActions.getDetailProductFailed());
    yield put(
      alertActions.showAlert({
        text: "Cannot get detail product",
        type: "error",
      })
    );
  }
}

function* watchLoginFlow() {
  yield all([
    takeLatest(productActions.createProduct.type, handleCreateProduct),
    takeLatest(productActions.editProduct.type, handleEditProduct),
    takeLatest(productActions.removeProduct.type, handleDeleteProduct),
    takeLatest(productActions.getListProducts.type, handleGetListProducts),
    takeLatest(productActions.getDetailProduct.type, handleGetDetailProduct),
  ]);
}

export function* productSaga() {
  yield fork(watchLoginFlow);
}
