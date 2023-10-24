import axiosWithOrganizer from "../axiosWithOrganizer";

const orderApi = {
  getListOrders(params: any) {
    const url = `/orders`;
    return axiosWithOrganizer.get(url, { params });
  },
};

export default orderApi;
