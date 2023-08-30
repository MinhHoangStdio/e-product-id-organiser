import { call, fork, put, takeLatest, all } from "redux-saga/effects";
import { alertActions } from "../../alert/alertSlice";
import { Action } from "../../../types/actions";
import { productActions } from "./productSlice";
import productApi from "../../../api/product";
import { layoutActions } from "../../layout/layoutSlice";
import { Category, Product } from "../../../types/product";
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

function* handleGetAllListProducts(action: Action) {
  try {
    const response: { data: { data: Product[]; paginate: Pagination } } =
      yield call(productApi.getListProducts, { limit: 100, page: 1 });
    yield put(productActions.getAllListProductsSuccess(response.data));
  } catch (error) {
    yield put(productActions.getAllListProductsFailed());
    yield put(
      alertActions.showAlert({
        text: "Cannot get list products",
        type: "error",
      })
    );
  }
}

function* handleGetListCategories(action: Action) {
  try {
    const response: { data: { data: Category[]; paginate: Pagination } } =
      yield call(productApi.getListCategories);
    yield put(productActions.getAllListCategoriesSuccess(response.data));
  } catch (error) {
    yield put(productActions.getAllListCategoriesFailed());
    yield put(
      alertActions.showAlert({
        text: "Cannot get list categories",
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
    if (action.payload.formData.length) {
      const listImagesUrl: { data: any } = yield call(
        productApi.upload,
        formdata
      );
      const response: { data: any } = yield call(productApi.createProduct, {
        ...action.payload.params,
        images: listImagesUrl.data.image,
        payload: action.payload.metadata,
      });
    } else {
      const response: { data: any } = yield call(productApi.createProduct, {
        ...action.payload.params,
        images: [],
        payload: action.payload.metadata,
      });
    }

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
        payload: action.payload.metadata,
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

function* handleSendRequestProduct(action: Action) {
  try {
    const id = action.payload;
    const response: { data: Product } = yield call(
      productApi.requestProduct,
      id
    );
    yield put(productActions.requestProductSuccess());
    yield put(productActions.getDetailProduct(id));
    yield put(
      alertActions.showAlert({
        text: "Gửi yêu cầu thành công",
        type: "success",
      })
    );
  } catch (error) {
    yield put(productActions.requestProductFailed());
    yield put(
      alertActions.showAlert({
        text: "Gửi yêu cầu thất bại",
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
    takeLatest(
      productActions.getAllListCategories.type,
      handleGetListCategories
    ),
    takeLatest(
      productActions.getAllListProducts.type,
      handleGetAllListProducts
    ),
    takeLatest(productActions.getDetailProduct.type, handleGetDetailProduct),
    takeLatest(productActions.requestProduct.type, handleSendRequestProduct),
  ]);
}

export function* productSaga() {
  yield fork(watchLoginFlow);
}
