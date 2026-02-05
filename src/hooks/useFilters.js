import { useState, useEffect } from 'react';
import { axiosPublic } from '../api/api';

/**
 * 여행지 필터(지역, 테마) 데이터를 가져오는 훅
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
        console.error('필터 데이터 로딩 실패:', err);
        setError(err.message || '필터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, []);

  return { regions, themes, loading, error };
};