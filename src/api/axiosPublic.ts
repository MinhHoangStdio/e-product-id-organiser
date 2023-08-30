import axios from "axios";
import history from "../routes/history";
import { handleLogout } from "../utils/auth";

const URL_API_ORGANIZER = import.meta.env.VITE_APP_API_URL_PUBLIC;

const axiosPublic = axios.create({
  baseURL: URL_API_ORGANIZER,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosPublic;

axiosPublic.defaults.headers.Accept = "application/json";

// Add a response interceptor
axiosPublic.interceptors.response.use(
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
