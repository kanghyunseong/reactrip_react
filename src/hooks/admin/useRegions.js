import { useState, useEffect } from "react";
import { axiosAuth, axiosPublic } from "../../api/api";

/**
 * 지역 목록을 조회하고 정규화하는 커스텀 훅
 */
export const useRegions = (open, initialValue) => {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(false);

  const isSuccessResponse = (res) => {
    const s = res?.success;
    if (s === true) return true;
    return String(s || "").includes("성공");
  };

  useEffect(() => {
    if (!open) return;

    const fetchRegions = async () => {
      try {
        setLoading(true);
        const possibleEndpoints = [
          "/api/admin/travel/region",
        ];

        let regionList = [];

        for (const endpoint of possibleEndpoints) {
          try {
            const response = await axiosAuth.getList(endpoint);
            const isSuccess = isSuccessResponse(response);

            if (isSuccess) {
              if (Array.isArray(response?.data?.data)) regionList = response.data.data;
              else if (Array.isArray(response?.data)) regionList = response.data;
              else if (Array.isArray(response)) regionList = response;

              if (regionList.length > 0) break;
            }
          } catch (e) {
            if (e.response?.status === 401) {
              try {
                const response = await axiosPublic.getList(endpoint);
                if (isSuccessResponse(response)) {
                  regionList = response.data?.data || response.data || response;
                  if (regionList.length > 0) break;
                }
              } catch (err) { continue; }
            }
          }
        }

        // initialValue 보정
        if (initialValue?.regionNo && initialValue?.regionName) {
          const exists = regionList.some(r => String(r.regionNo || r.id || r.REGIONNO) === String(initialValue.regionNo));
          if (!exists) {
            regionList.push({ regionNo: initialValue.regionNo, regionName: initialValue.regionName });
          }
        }

        // 정규화 및 정렬
        const validRegions = regionList
          .map(r => ({
            regionNo: r.REGIONNO || r.regionNo || r.id,
            regionName: r.REGIONNAME || r.regionName || r.name
          }))
          .filter(r => r.regionNo)
          .sort((a, b) => (a.regionName || "").localeCompare(b.regionName || ""));

        setRegions(validRegions);
      } catch (error) {
        console.error("지역 목록 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegions();
  }, [open, initialValue]);

  return { regions, loading };
};
