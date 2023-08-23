import axiosClient from "../axiosClient";
import axiosWithOrganizer from "../axiosWithOrganizer";

const chainsApi = {
  upload(formData: any) {
    const url = "/chains/uploads";
    return axiosClient.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  getListChains(params: any) {
    const url = "/chains/";
    return axiosWithOrganizer.get(url, { params });
  },
  createChains(params: any) {
    const url = "/chains/";
    return axiosWithOrganizer.post(url, params);
  },
  //   editChain(params: any, id: any) {
  //     const url = `/Chains/${id}`;
  //     return axiosWithOrganizer.put(url, params);
  //   },
  removeChains(id: any) {
    const url = `/chains/${id}`;
    return axiosWithOrganizer.delete(url);
  },
};

export default chainsApi;
