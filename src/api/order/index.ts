import axiosWithOrganizer from "../axiosWithOrganizer";

const orderApi = {
  getListOrders(params: any) {
    const url = `/orders`;
    return axiosWithOrganizer.get(url, { params });
  },
  getDetailOrder(id: any) {
    const url = `/orders/${id}`;
    return axiosWithOrganizer.get(url);
  },
  completeOrder(id: any) {
    const url = `/orders/${id}/update-status`;
    return axiosWithOrganizer.patch(url);
  },
};

export default orderApi;
