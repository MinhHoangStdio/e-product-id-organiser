import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../../types/product";
import { Pagination } from "../../../types/pagination";

interface productState {
  listProducts: Product[];
  pagination: Pagination | null;
  loadingGetProducts: boolean;
  isUpload: boolean;
  listImgUrl: any;
  temporarylistImgUrl: any;
  loadingCreateProduct: boolean;
  loadingEditProduct: boolean;
  loadingRemoveProduct: boolean;
  productSelected: Product | null;
  listImgWillDelete: any[];
}

const initialState: productState = {
  listProducts: [],
  pagination: null,
  loadingGetProducts: false,
  isUpload: false,
  listImgUrl: [],
  temporarylistImgUrl: [],
  loadingCreateProduct: false,
  loadingEditProduct: false,
  loadingRemoveProduct: false,
  productSelected: null,
  listImgWillDelete: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getListProducts(state, action) {
      state.loadingGetProducts = true;
    },
    getListProductsSuccess(state, action) {
      state.listProducts = action.payload.data;
      state.pagination = action.payload.paginate;
      state.loadingGetProducts = true;
    },
    getListProductsFailed(state) {
      state.loadingGetProducts = true;
    },

    uploadImages(state, action) {
      state.isUpload = true;
    },
    uploadImagesSuccess(state, action) {
      state.isUpload = false;
      state.listImgUrl = action.payload;
    },
    uploadImagesFailed(state) {
      state.isUpload = false;
    },

    settemporarylistImgUrl(state, action) {
      state.temporarylistImgUrl = action.payload;
    },
    plusTemporaryListImgUrl(state, action) {
      state.temporarylistImgUrl = [
        ...state.temporarylistImgUrl,
        ...action.payload,
      ];
    },
    deleteATemporaryImgUrl(state, action) {
      state.temporarylistImgUrl = [...state.temporarylistImgUrl].filter(
        (item) => item.preview !== action.payload.preview
      );
    },
    resetTemporarylistImgUrl(state) {
      state.temporarylistImgUrl = [];
    },

    setListImgWillDelete(state, action) {
      state.listImgWillDelete = action.payload;
    },
    resetListImgWillDelete(state) {
      state.listImgWillDelete = [];
    },
    plusListImgWillDelete(state, action) {
      state.listImgWillDelete = [...state.listImgWillDelete, action.payload];
    },

    createProduct(state, action) {
      state.loadingCreateProduct = true;
    },
    createProductSuccess(state) {
      state.loadingCreateProduct = false;
    },
    createProductFailed(state) {
      state.loadingCreateProduct = false;
    },

    editProduct(state, action) {
      state.loadingEditProduct = true;
    },
    editProductSuccess(state) {
      state.loadingEditProduct = false;
    },
    editProductFailed(state) {
      state.loadingEditProduct = false;
    },

    removeProduct(state, action) {
      state.loadingRemoveProduct = true;
    },
    removeProductSuccess(state) {
      state.loadingRemoveProduct = false;
    },
    removeProductFailed(state) {
      state.loadingRemoveProduct = false;
    },

    selectedProduct(state, action) {
      state.productSelected = action.payload;
    },
    resetSelectedProduct(state) {
      state.productSelected = null;
    },
  },
});

// Actions
export const productActions = productSlice.actions;
// Reducer
const productReducer = productSlice.reducer;
export default productReducer;
