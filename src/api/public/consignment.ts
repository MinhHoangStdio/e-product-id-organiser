import axiosPublic from "../axiosPublic";

const publicConsignmentApi = {
  getDetailConsignment(id: any) {
    const url = `/consignments/${id}`;
    return axiosPublic.get(url);
  },
  getDetailOrganizer(id: any) {
    const url = `/organizations/${id}`;
    return axiosPublic.get(url);
  },
  updateViewCount(productId: any) {
    const url = `/products/${productId}/update-view-count`;
    return axiosPublic.patch(url);
  },
};

export default publicConsignmentApi;
