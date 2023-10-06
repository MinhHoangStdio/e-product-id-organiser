import axiosClient from "../axiosClient";

const dashboardApi = {
  getStatisticProducts(organizerId: any) {
    const url = `/statistics/${organizerId}/products`;
    return axiosClient.get(url);
  },
  getStatisticConsignments(organizerId: any) {
    const url = `/statistics/${organizerId}/consignments`;
    return axiosClient.get(url);
  },
  getStatisticMembers(organizerId: any) {
    const url = `/statistics/${organizerId}/members`;
    return axiosClient.get(url);
  },
};

export default dashboardApi;
