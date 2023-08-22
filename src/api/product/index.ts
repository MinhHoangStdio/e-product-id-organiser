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
  editProduct(params: any, id: any) {
    const url = `/products/${id}`;
    return axiosClient.put(url, params);
  },
  removeProduct(id: any) {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },
};

export default productApi;
