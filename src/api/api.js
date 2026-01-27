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
    // FormData 처리 (파일 업로드 대응)
    // 데이터 객체에 'file' 키가 존재하거나 이미 FormData인 경우 멀티파트로 처리
    const isFile = (data && 'file' in data) || data instanceof FormData;
    let payload = data;
    let headers = { ...config.headers };
    if (isFile && !(data instanceof FormData)) {
      payload = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          // value가 null인 경우(특히 파일) 전송하지 않음
          // 하지만 전체 요청은 multipart/form-data 형식이 됨
          if (value !== null) {
            payload.append(key, value);
          }
        }
      });
      headers["Content-Type"] = "multipart/form-data";
    }
    return instance.post(url, payload, { ...config, headers }).then(wrap);
  },
  put: (url, data, config = {}) => {
    // FormData 처리 (파일 업로드 대응) - POST와 동일
    const isFile = (data && 'file' in data) || data instanceof FormData;
    let payload = data;
    let headers = { ...config.headers };
    if (isFile && !(data instanceof FormData)) {
      payload = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          payload.append(key, value === null ? "" : value);
        }
      });
      headers["Content-Type"] = "multipart/form-data";
    }

    return instance.put(url, payload, { ...config, headers }).then(wrap);
  },
  delete: (url, pk, config = {}) => {
    const finalUrl = pk ? `${url}/${pk}` : url;
    if (config.data) {
      return instance.delete(finalUrl, { data: config.data, ...config }).then(wrap);
    }
    return instance.delete(finalUrl, config).then(wrap);
  },
    return instance.put(url, payload, { ...config, headers }).then(wrap);
  },
  delete: (url, pk, config = {}) =>
    instance.delete(pk ? `${url}/${pk}` : url, config).then(wrap),
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