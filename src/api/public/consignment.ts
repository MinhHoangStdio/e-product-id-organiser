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
  createProductViews(productId: any) {
    const url = `/products/${productId}/product-views`;
    return axiosPublic.post(url);
  },
};

export default publicConsignmentApi;
