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
  downloadQrCode(id: any) {
    const url = `/consignments/${id}/download-qr-code`;
    return axiosWithOrganizer.get(url, {
      responseType: "blob", // Để lấy dữ liệu dạng blob
    });
  },
};

export default consignmentApi;
