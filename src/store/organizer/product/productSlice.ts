import { createSlice } from "@reduxjs/toolkit";
import { Category, Product } from "../../../types/product";
import { Pagination } from "../../../types/pagination";

interface productState {
  listProducts: Product[] | null;
  isFetchProducts: boolean;
  listAllProducts: Product[];
  listCategories: Category[];
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
  detailProduct?: Product;
  loadingDetailProduct: boolean;
  loadingRequestProduct: boolean;
}

const initialState: productState = {
  listProducts: [],
  isFetchProducts: false,
  listAllProducts: [],
  listCategories: [],
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
  detailProduct: {} as Product,
  loadingDetailProduct: false,
  loadingRequestProduct: false,
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
      state.loadingGetProducts = false;
      state.isFetchProducts = true;
    },
    getListProductsFailed(state) {
      state.loadingGetProducts = false;
      state.listProducts = null;
      state.isFetchProducts = true;
    },
    userNoHaveOrganizer(state) {
      state.isFetchProducts = true;
    },

    getAllListProducts(state) {
      state.loadingGetProducts = true;
    },
    getAllListProductsSuccess(state, action) {
      state.listAllProducts = action.payload.data;
      state.loadingGetProducts = false;
    },
    getAllListProductsFailed(state) {
      state.loadingGetProducts = false;
    },

    getAllListCategories(state) {
      state.loadingGetProducts = true;
    },
    getAllListCategoriesSuccess(state, action) {
      state.listCategories = action.payload.data;
      state.loadingGetProducts = false;
    },
    getAllListCategoriesFailed(state) {
      state.loadingGetProducts = false;
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

    getDetailProduct(state, action) {
      state.loadingDetailProduct = true;
    },
    getDetailProductSuccess(state, action) {
      state.detailProduct = action.payload;
      state.loadingDetailProduct = false;
    },
    getDetailProductFailed(state) {
      state.loadingDetailProduct = false;
      state.detailProduct = undefined;
    },
    resetDetailProduct(state) {
      state.detailProduct = {} as Product;
    },

    requestProduct(state, action) {
      state.loadingRequestProduct = true;
    },
    requestProductSuccess(state) {
      state.loadingRequestProduct = false;
    },
    requestProductFailed(state) {
      state.loadingRequestProduct = false;
    },

    reset(state) {
      state.listAllProducts = [];
      state.listProducts = [];
    },
  },
});

// Actions
export const productActions = productSlice.actions;
// Reducer
const productReducer = productSlice.reducer;
export default productReducer;
