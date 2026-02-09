import { useState, useEffect } from 'react';
import { axiosPublic } from '../api/api';

/** API 응답이 배열이 아닐 때 배열로 정규화 (백엔드가 { data: [] } 형태일 수 있음) */
const toArray = (value) => {
  if (Array.isArray(value)) return value;
  if (value?.data != null) return Array.isArray(value.data) ? value.data : [];
  return [];
};

/** 필터 API 실패 시 콘솔에 상태코드·서버 응답을 읽기 쉽게 출력 */
function logFilterFailure(endpoint, err) {
  const status = err?.response?.status;
  const data = err?.response?.data;
  console.warn(`[useFilters] ${endpoint} 실패:`, {
    status: status ?? '(네트워크 오류)',
    message: err?.message,
    serverResponse: data != null ? (typeof data === 'object' ? JSON.stringify(data) : data) : undefined,
  });
  if (err?.stack) console.warn(err.stack);
}

/**
 * 여행지 필터(지역, 테마) 데이터를 가져오는 훅.
 * 500 등 서버 오류 시 빈 배열로 폴백하여 목록 화면은 동작하도록 함.
 */
export const useFilters = () => {
  const [regions, setRegions] = useState([]);
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilters = async () => {
      setLoading(true);
      setError(null);

      // regions/themes 각각 실패해도 나머지는 사용 (allSettled)
      const [regionsSettled, themesSettled] = await Promise.allSettled([
        axiosPublic.getList('/api/places/regions'),
        axiosPublic.getList('/api/places/themes'),
      ]);

      const regionsRes = regionsSettled.status === 'fulfilled' ? regionsSettled.value : null;
      const themesRes = themesSettled.status === 'fulfilled' ? themesSettled.value : null;

      setRegions(toArray(regionsRes));
      setThemes(toArray(themesRes));

      // 실패한 요청이 있으면 로그. 둘 다 실패할 때만 error 상태로 화면에 표시
      const regionsFailed = regionsSettled.status === 'rejected';
      const themesFailed = themesSettled.status === 'rejected';

      if (regionsFailed) logFilterFailure('/api/places/regions', regionsSettled.reason);
      if (themesFailed) logFilterFailure('/api/places/themes', themesSettled.reason);

      if (regionsFailed && themesFailed) {
        setError(
          '서버 오류로 필터를 불러오지 못했습니다. 백엔드(/api/places/regions, /api/places/themes)를 확인해주세요.'
        );
      }

      setLoading(false);
    };

    fetchFilters();
  }, []);

  return { regions, themes, loading, error };
};