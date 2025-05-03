import axios from "axios";

let authorizeAxiosInstance = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 1000 * 60 * 10, // 10 phút
  withCredentials: true,
});

// Interceptor cho request
authorizeAxiosInstance.interceptors.request.use(
  function (config) {
    if (typeof window !== 'undefined') {
      let accessToken = window.localStorage.getItem("accessToken");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

authorizeAxiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response) {
      const statusCode = error.response.status;
      const errorData = error.response.data;

      switch (statusCode) {
        case 404:
          console.error("Không tìm thấy tài nguyên!");
          break;
        case 400: {
          if (Array.isArray(errorData)) {
            errorData.forEach(err => {
              console.error(err);
            });
          } else {
            console.error("Đã xảy ra lỗi xác thực. Vui lòng kiểm tra lại.");
          }
          break;
        }
        case 409: {
          const mess = errorData?.mess || "Xung đột dữ liệu!";
          console.error(mess);
          break;
        }
        case 500:
          console.error("Lỗi máy chủ: " + (errorData.errorDetails?.join(", ") || "Sự cố không mong muốn."));
          break;
        default:
          console.error(errorData?.error || "Đã xảy ra lỗi hệ thống!");
      }
    } else if (error.request) {
      console.error("Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.");
    } else {
      console.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    }
    return Promise.reject(error);
  }
);

export default authorizeAxiosInstance;