import axios, { AxiosError, AxiosResponse } from "axios";

const instance: any = axios.create({
  baseURL: "https://user-todo-jgbn.onrender.com/api/v1/",
  timeout: 60000,
});

instance.interceptors.request.use(
  function (config: any) {
    //const accessToken: any = getCookie("access_token");
    const accessToken: any = localStorage.getItem("access_token") || "";

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error: AxiosError) {
    const element: any = document.getElementById("loader");
    element.style.display = "none";

    // Do something with request error
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  async function (response: AxiosResponse) {
    const data: any = response?.data;
    const statusCode = response?.data?.status?.code;
    const detail = data?.status?.detail;
    if (statusCode === 403 || statusCode === 400) {
      if (detail) {
        for (var key in detail) {
          if (detail.hasOwnProperty(key)) {
            if (!detail[0]) {
              alert(detail[key][0]);
            } else {
              alert(detail[0]);
            }
          }
        }
      } else {
        const message = data.status?.message;
        alert(message);
      }
    } else if (statusCode === 401) {
      const message = data.status?.message;
      alert(message);
    }
    return data;
  },
  async function (error: AxiosError) {
    const response: any = error?.response;
    if (response) {
      const errorData = response?.data?.errors;
      const status: any = response?.status;
      if (status === 400) {
        if (errorData) {
          for (const key in errorData) {
            if (errorData.hasOwnProperty(key)) {
              if (!errorData[0]) {
                alert(errorData[key][0]);
              } else {
                alert(errorData[0]);
              }
            }
          }
        }
      }
    }
    return Promise.reject(error);
  }
);

export { instance };
