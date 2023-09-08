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
  getDetailOrganizer(id: any) {
    const url = `organizations/${id}`;
    return axiosClient.get(url);
  },

  addMember(membersId: any, organizerId: any) {
    const url = `organizations/${organizerId}/add-member`;
    const params = { members: [...membersId] };
    return axiosClient.patch(url, params);
  },

  removeMember(MemberId: any, organizerId: any) {
    const url = `organizations/${organizerId}/remove-member`;
    const params = { members: [...MemberId] };
    return axiosClient.patch(url, params);
  },

  getListValidMember() {
    const url = `/organizations/valid-user`;
    return axiosClient.get(url);
  },
};

export default organizerApi;
