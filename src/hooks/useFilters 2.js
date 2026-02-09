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
      try {
        setLoading(true);
        
        // 병렬 요청
        const [regionsRes, themesRes] = await Promise.all([
          axiosPublic.getList('/api/places/regions'),
          axiosPublic.getList('/api/places/themes')
        ]);
        
        setRegions(regionsRes || []);
        setThemes(themesRes || []);
        setError(null);
      } catch (err) {
        console.warn('필터 API 실패, 빈 목록으로 계속 진행:', err?.response?.data?.message || err.message);
        setRegions([]);
        setThemes([]);
        setError(null); // 화면 차단 없이 필터만 비어 있게
      } finally {
        setLoading(false);
      }

      setLoading(false);
    };

    fetchFilters();
  }, []);

  return { regions, themes, loading, error };
};