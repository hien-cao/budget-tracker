import axios from "axios";
import { jwtDecode } from "jwt-decode";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/v1/api",
  timeout: 5 * 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (
      config.url.indexOf("/user/login") >= 0 ||
      config.url.indexOf("/user/signup") >= 0
    ) {
      return config;
    }

    const accessToken = axiosInstance.getLocalAccessToken();
    const decoded = jwtDecode(accessToken);
    config.headers["x-client-id"] = decoded.userId;
    config.headers["authorization"] = accessToken;

    if (config.url.indexOf("/user/handleRefreshToken") >= 0) {
      const refreshToken = axiosInstance.getLocalRefreshToken();
      config.headers["x-rtoken-id"] = refreshToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    const config = response.config;
    const statusCode = response.status;
    if (
      (config.url.indexOf("/login") >= 0 ||
        config.url.indexOf("/signup") >= 0 ||
        config.url.indexOf("/handleRefreshToken")) >= 0 &&
      statusCode === 201
    ) {
      const { accessToken, refreshToken } = response.data.metadata.tokens;
      axiosInstance.setLocalAccessToken(accessToken);
      axiosInstance.setLocalRefreshToken(refreshToken);

      // no need to check expired tokens
      return response;
    }
    return response;
  },
  async (error) => {
    if (
      error.response.data.code === 401 &&
      error.response.data.message === "Access token expired"
    ) {
      const config = error.response.config;
      const handleRefreshTokenResponse = await handleRefreshToken();
      const { accessToken, refreshToken } =
        handleRefreshTokenResponse.data.metadata.tokens;
      axiosInstance.setLocalAccessToken(accessToken);
      axiosInstance.setLocalRefreshToken(refreshToken);
      config.headers["x-client-id"] = accessToken;
      return axiosInstance(config);
    }
    return Promise.reject(error);
    // TODO: handle expired refreshToken
  }
);

axiosInstance.getLocalAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  return JSON.parse(accessToken);
};

axiosInstance.getLocalRefreshToken = () => {
  const refreshToken = localStorage.getItem("refreshToken");
  return JSON.parse(refreshToken);
};

axiosInstance.setLocalAccessToken = (accessToken) => {
  localStorage.setItem("accessToken", JSON.stringify(accessToken));
};

axiosInstance.setLocalRefreshToken = (refreshToken) => {
  localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
};

axiosInstance.clearLocalTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

async function handleRefreshToken() {
  return await axiosInstance.post("/user/handleRefreshToken");
}

export default axiosInstance;
