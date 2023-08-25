import axios from "axios";
import history from "../routes/history";
import { getAuth, getOrganizer, handleLogout } from "../utils/auth";

const URL_API_ORGANIZER = import.meta.env.VITE_APP_API_URL_ORGANIZER;

const axiosWithOrganizer = axios.create({
  baseURL: URL_API_ORGANIZER,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosWithOrganizer;

axiosWithOrganizer.defaults.headers.Accept = "application/json";
// Add a request interceptor
axiosWithOrganizer.interceptors.request.use(
  function (config: any) {
    const token = getAuth();
    const organizerId = getOrganizer();
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    if (organizerId.id) {
      config.params = {
        ...config.params,
        organization_id: organizerId.id,
      };
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosWithOrganizer.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error?.response) {
      handleErrorApi(error?.response?.status);
    }
    return Promise.reject(error);
  }
);

const handleErrorApi = (status: number) => {
  switch (status) {
    case 401:
    case 403:
      handleLogout();
      break;

    case 500:
      history.replace("/500");
      break;
  }
};
