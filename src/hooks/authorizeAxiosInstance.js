import axios from "axios";
import { jwtDecode } from "jwt-decode";


function createAxiosInstance(baseURL) {

  const instance = axios.create({
    baseURL,
    timeout: 1000 * 60 * 10, // 10 phút
    withCredentials: false,
  });

  // Token refresh guard
  let isRefreshing = false;
  let refreshSubscribers = [];

  function onRefreshed(newToken) {
    refreshSubscribers.forEach((callback) => callback(newToken));
    refreshSubscribers = [];
  }

  // Request Interceptor
  async function refreshTokenFunc() {
    try {
      const token = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL_LOGIN}/api/v1/RefreshToken/refreshToken`,
        { token, refreshToken },
        {
          headers: {
            Authorization: "",
          },
        }
      );

      const { token: newAccessToken, refreshToken: newRefreshToken } = res.data.data;

      localStorage.setItem("accessToken", newAccessToken);
      localStorage.setItem("refreshToken", newRefreshToken);

      console.log("Refresh token thành công:", { newAccessToken, newRefreshToken });

      return newAccessToken;
    } catch (err) {
      console.error("Refresh token thất bại:", err);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return null;
    }
  }


  // Request Interceptor
  instance.interceptors.request.use(
    async function (config) {
      if (typeof window !== "undefined") {
        let accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          try {
            const decoded = jwtDecode(accessToken);

            const exp = decoded.exp * 1000; // convert to ms
            const now = Date.now();

            const timeLeft = exp - now;

            if (timeLeft < 60000 && !isRefreshing) {
              isRefreshing = true;

              const newToken = await refreshTokenFunc();
              isRefreshing = false;

              if (newToken) {
                accessToken = newToken;
                onRefreshed(newToken);
              }
            } else if (timeLeft < 60000 && isRefreshing) {
              // Đợi token mới nếu đang trong quá trình refresh
              await new Promise((resolve) => {
                refreshSubscribers.push((newToken) => {
                  config.headers.Authorization = `Bearer ${newToken}`;
                  resolve();
                });
              });
              return config;
            }

            config.headers.Authorization = `Bearer ${accessToken}`;
          } catch (e) {
            console.error("Lỗi giải mã token:", e);
          }
        }
      }

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      if (error.response) {
        const status = error.response.status;
        const errorData = error.response.data;

        switch (status) {
          case 401:
            console.error(errorData?.mess || "Phiên đăng nhập hết hạn!");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            setTimeout(() => (window.location.href = "/login"), 1000);
            break;
          case 403:
            window.location.href = "/Page403";
            break;
          case 404:
            console.error("Không tìm thấy tài nguyên!");
            break;
          case 400:
            Array.isArray(errorData)
              ? errorData.forEach((err) => console.error(err))
              : console.error("Lỗi xác thực!");
            break;
          case 409:
            console.error(errorData?.mess || "Xung đột dữ liệu!");
            break;
          case 500:
            console.error(
              "Lỗi máy chủ: " +
              (errorData.errorDetails?.join(", ") || "Sự cố không mong muốn.")
            );
            break;
          default:
            console.error(errorData?.error || "Đã xảy ra lỗi hệ thống!");
        }
      } else if (error.request) {
        console.error("Không thể kết nối đến server. Vui lòng kiểm tra mạng.");
      } else {
        console.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      }

      return Promise.reject(error);
    }
  );

  return instance;
}

const loginAPI = createAxiosInstance(process.env.NEXT_PUBLIC_BASE_URL_LOGIN);
// const dataTestAPI = createAxiosInstance(process.env.NEXT_PUBLIC_BASE_URL_DATA);
const dataTestAPI = createAxiosInstance(process.env.NEXT_PUBLIC_BASE_URL_DATA);

export { loginAPI, dataTestAPI };
