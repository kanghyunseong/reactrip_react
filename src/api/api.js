import axios from "axios";
const API_BASE_URL = window.ENV?.API_URL || "http://localhost:8081";
const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});
// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && !config.headers.noAuth) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      console.log("토큰 포함됨:", config.url, "토큰 길이:", accessToken.length);
    } else if (!config.headers.noAuth) {
      console.warn("토큰 없음:", config.url);
    }
    delete config.headers.noAuth;
    
    console.log("API 요청:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (_error) => Promise.reject(_error)
);
// 응답 인터셉터 - 401 에러 처리
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !error.config?.headers?.noAuth) {
      console.warn("토큰 만료 또는 인증 실패. 로그인 페이지로 이동합니다.");
      // localStorage 정리
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userNo");
      localStorage.removeItem("userName");
      localStorage.removeItem("userId");
      localStorage.removeItem("role");
      localStorage.removeItem("phone");
      localStorage.removeItem("email");
      localStorage.removeItem("birthDay");
      localStorage.removeItem("licenseUrl");
      localStorage.removeItem("provider");
      // 로그인 페이지로 리다이렉트 (현재 경로가 /login이 아닐 때만)
      if (window.location.pathname !== "/login") {
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
/**
 * 헬퍼 함수
 * unwrap: ResponseData<T> 구조에서 T(실제 데이터)만 추출
 * wrap: ResponseData 전체 구조 유지 ({ message, data, success })
 */
const unwrap = (res) =>
  res.data?.data !== undefined ? res.data.data : res.data;
const wrap = (res) => res.data;
const api = {
  get: (url, config = {}) => instance.get(url, config).then(wrap),
  getActual: (url, config = {}) => instance.get(url, config).then(unwrap),
  post: (url, data, config = {}) => {
    const isFormData = data instanceof FormData;
    const isFileObj = data && typeof data === "object" && "file" in data;
    let payload = data;
    let headers = { ...config.headers };
    if (isFileObj && !isFormData) {
      payload = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value === undefined) return;
        if (key === "file") {
          if (value != null && (value instanceof File || value instanceof Blob)) payload.append(key, value);
          return;
        }
        payload.append(key, value === null ? "" : value);
      });
    }
    if (payload instanceof FormData) headers["Content-Type"] = undefined;
    return instance.post(url, payload, { ...config, headers }).then(wrap);
  },
  put: (url, data, config = {}) => {
    const isFormData = data instanceof FormData;
    const isFileObj = data && typeof data === "object" && "file" in data;
    let payload = data;
    let headers = { ...config.headers };
    if (isFileObj && !isFormData) {
      payload = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value === undefined) return;
        if (key === "file") {
          if (value != null && (value instanceof File || value instanceof Blob)) payload.append(key, value);
          return;
        }
        payload.append(key, value === null ? "" : value);
      });
    }
    if (payload instanceof FormData) headers["Content-Type"] = undefined;
    return instance.put(url, payload, { ...config, headers }).then(wrap);
  },
  delete: (url, pk, config = {}) => {
    const finalUrl = pk ? `${url}/${pk}` : url;
    if (config.data) {
      return instance.delete(finalUrl, { data: config.data, ...config }).then(wrap);
    }
    return instance.delete(finalUrl, config).then(wrap);
  },
};

// --------------------------------------------------------
// 실제 Export 영역
// --------------------------------------------------------
export const axiosAuth = {
  // 리스트 조회나 결과 메시지가 필요할 때
  getList: (url) => api.get(url),
  // KPI 지표나 순수 객체 데이터만 필요할 때
  getActual: (url) => api.getActual(url),
  // 등록/수정/삭제
  create: (url, obj, file) => api.post(url, { ...obj, file }),
  createJson: (url, obj) => api.post(url, obj),
  /** multipart/form-data로 FormData 그대로 전송 (예: @RequestPart("data") + @RequestPart("images")) */
  postFormData: (url, formData) =>
    instance
      .post(url, formData, {
        // 기본 Content-Type(application/json)을 제거하여 브라우저가 boundary 포함 헤더를 설정하도록 함
        headers: { "Content-Type": undefined },
      })
      .then(wrap),
  put: (url, obj, file) => api.put(url, { ...obj, file }),
  putJson: (url, obj) => api.put(url, obj),
  delete: (url, pk) => api.delete(url, pk),
  deleteJson: (url) => api.delete(url),
  // DELETE 요청에 body가 필요한 경우
  deleteWithBody: (url, body) => api.delete(url, undefined, { data: body }),
};
export const axiosPublic = {
  post: (url, data) => api.post(url, data, { headers: { noAuth: true } }),
  getList: (url) => api.get(url, { headers: { noAuth: true } }),
  getActual: (url) => api.getActual(url, { headers: { noAuth: true } }),
};