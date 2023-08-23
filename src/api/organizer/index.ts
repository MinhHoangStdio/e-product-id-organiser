import axiosClient from "../axiosClient";

const organizerApi = {
  createOrganizer(params: any) {
    const url = "/organizations/";
    return axiosClient.post(url, params);
  },
  getListOrganizer(params: any) {
    const url = `/organizations`;
    return axiosClient.get(url, { params });
  },
};

export default organizerApi;
