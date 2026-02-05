import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * 여행지 필터(지역, 테마) 데이터를 가져오는 훅
 * 페이지 마운트 시 1번만 실행되며, 병렬 요청으로 최적화
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
        
        // 병렬 요청으로 동시 실행
        const [regionsRes, themesRes] = await Promise.all([
          axios.get('/api/places/regions'),
          axios.get('/api/places/themes')
        ]);
        
        setRegions(regionsRes.data || []);
        setThemes(themesRes.data || []);
        setError(null);
      } catch (err) {
        console.error('필터 데이터 로딩 실패:', err);
        setError(err.message || '필터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, []); // 빈 배열 = 컴포넌트 마운트 시 1번만 실행

  return { regions, themes, loading, error };
};