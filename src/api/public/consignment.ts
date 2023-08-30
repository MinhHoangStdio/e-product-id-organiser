import axiosPublic from "../axiosPublic";

const publicConsignmentApi = {
  getDetailConsignment(id: any) {
    const url = `/consignments/${id}`;
    return axiosPublic.get(url);
  },
};

export default publicConsignmentApi;
