import axiosPublic from "../axiosPublic";

const publicOrderApi = {
  createOrder(params: any) {
    const url = `/orders`;
    return axiosPublic.post(url, params);
  },
};

export default publicOrderApi;
