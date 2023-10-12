import axiosClient from "../axiosClient";

const dashboardApi = {
  getStatistics(organizerId: any) {
    const url = `/statistics/${organizerId}`;
    return axiosClient.get(url);
  },
};

export default dashboardApi;
