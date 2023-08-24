import axiosClient from "../axiosClient";
import axiosWithOrganizer from "../axiosWithOrganizer";

const consignmentApi = {
  getListConsignments(params: any) {
    const url = "/consignments/";
    return axiosWithOrganizer.get(url, { params });
  },
  createConsignment(params: any) {
    const url = "/consignments/";
    return axiosWithOrganizer.post(url, params);
  },
  removeConsignment(id: any) {
    const url = `/consignments/${id}`;
    return axiosWithOrganizer.delete(url);
  },
  getDetailConsignment(id: any) {
    const url = `/consignments/${id}`;
    return axiosWithOrganizer.get(url);
  },
};

export default consignmentApi;
