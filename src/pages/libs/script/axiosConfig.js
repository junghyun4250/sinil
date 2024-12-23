import axios from "axios";

const instance = axios.create({
  timeout: 600000,
});

instance.interceptors.request.use(
  function (config) {
    //formdata로 들어올때만 content-type을 multipart로 변경
    config.headers = config.headers ?? {};
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },

  function (error) {
    const code = error.code;

    //timeout의 경우 code값이 ECONNABORTED 으로 옴
    if (code === "ECONNABORTED") {
      console.log("요청이 만료되었습니다.");
    }

    // 상태별 에러 처리
    switch (error.response.status) {
      case 500:
        console.log("서버에러 입니다.");
        break;
      case 404:
        console.log("잘못된 요청입니다.");
        break;
      default:
        console.log("error => " + error.message);
    }

    return Promise.reject(error);
  }
);

export default instance;
