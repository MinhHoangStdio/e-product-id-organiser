import axiosClient from "../axiosClient";

const productApi = {
  upload(formData: any) {
    const url = "/products/uploads";
    return axiosClient.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  getListProducts(params: any) {
    const url = "/products/";
    return axiosClient.get(url, { params });
  },
  createProduct(params: any) {
    const url = "/products/";
    return axiosClient.post(url, params);
  },
};

export default productApi;
