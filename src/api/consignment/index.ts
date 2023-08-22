import axiosClient from "../axiosClient";

const consignmentApi = {
  getListConsignments(params: any) {
    const url = "/consignments/";
    return axiosClient.get(url, { params });
  },
  createConsignment(params: any) {
    const url = "/consignments/";
    return axiosClient.post(url, params);
  },
  removeConsignment(id: any) {
    const url = `/consignments/${id}`;
    return axiosClient.delete(url);
  },
};

export default consignmentApi;
