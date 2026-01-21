import { useState, useEffect } from "react";
import { axiosAuth, axiosPublic } from "../../../api/api";

const useRegions = (open, initialValue) => {
  const [regions, setRegions] = useState([]);
  const [loadingRegions, setLoadingRegions] = useState(false);

  useEffect(() => {
    if (!open) return;

    const fetchRegions = async () => {
      try {
        setLoadingRegions(true);
        const possibleEndpoints = [
          "/api/admin/travel/regions",
          "/api/admin/region",
          "/api/admin/region/list",
          "/api/region",
          "/api/region/list",
        ];

        let regionList = [];

        for (const endpoint of possibleEndpoints) {
          try {
            console.log(`[useRegions] 지역 목록 API 시도 (인증): ${endpoint}`);
            let response = await axiosAuth.getList(endpoint);

            const isSuccess = response.success === "요청성공" || response.success === true;

            if (isSuccess && response.data) {
              if (Array.isArray(response?.data?.data)) {
                regionList = response.data.data;
              } else if (Array.isArray(response?.data)) {
                regionList = response.data;
              } else if (Array.isArray(response?.data?.list)) {
                regionList = response.data.list;
              } else if (Array.isArray(response)) {
                regionList = response;
              }

              if (regionList.length > 0) {
                console.log(`[useRegions] 지역 목록 로드 성공 (${endpoint}):`, regionList);
                break;
              }
            }
          } catch (e) {
            if (e.response?.status === 401 || e.message?.includes('401')) {
              try {
                console.log(`[useRegions] 지역 목록 API 재시도 (Public): ${endpoint}`);
                let response = await axiosPublic.getList(endpoint);
                const isSuccess = response.success === "요청성공" || response.success === true;

                if (isSuccess && response.data) {
                  if (Array.isArray(response?.data?.data)) {
                    regionList = response.data.data;
                  } else if (Array.isArray(response?.data)) {
                    regionList = response.data;
                  } else if (Array.isArray(response?.data?.list)) {
                    regionList = response.data.list;
                  } else if (Array.isArray(response)) {
                    regionList = response;
                  }

                  if (regionList.length > 0) {
                    console.log(`[useRegions] 지역 목록 로드 성공 (Public, ${endpoint}):`, regionList);
                    break;
                  }
                }
              } catch (publicError) {
                console.log(`[useRegions] 지역 목록 API 실패 (Public, ${endpoint}):`, publicError.message);
              }
            } else {
              console.log(`[useRegions] 지역 목록 API 실패 (${endpoint}):`, e.message);
            }
          }
        }

        // initialValue에 regionName이 있으면 목록에 추가 (수정 모드에서 기존 지역이 목록에 없을 경우 대비)
        if (initialValue?.regionNo && initialValue?.regionName) {
          const exists = regionList.some(
            r => String(r.regionNo || r.id) === String(initialValue.regionNo)
          );
          if (!exists) {
            regionList.push({
              regionNo: initialValue.regionNo,
              regionName: initialValue.regionName,
            });
            console.log("[useRegions] initialValue의 지역 정보를 목록에 추가:", initialValue);
          }
        }

        // 유효한 지역 필터링 및 정렬 (대문자 키도 처리)
        const validRegions = Array.from(new Map(regionList
          .map(region => {
            // 대문자 키를 소문자 camelCase로 정규화
            if (region.REGIONNO || region.REGIONNAME) {
              return {
                regionNo: region.REGIONNO || region.regionNo || region.id,
                regionName: region.REGIONNAME || region.regionName || region.name,
              };
            }
            return region;
          })
          .filter(region => {
            const hasId = region && (region.regionNo || region.id);
            if (!hasId) {
              console.warn("[useRegions] 유효하지 않은 지역 데이터:", region);
              return false;
            }
            return true;
          })
          .sort((a, b) => {
            const nameA = (a.regionName || a.name || "").toLowerCase();
            const nameB = (b.regionName || b.name || "").toLowerCase();
            const noA = Number(a.regionNo || a.id || 0);
            const noB = Number(b.regionNo || b.id || 0);

            if (nameA && nameB) return nameA.localeCompare(nameB);
            if (nameA) return -1;
            if (nameB) return 1;
            return noA - noB;
          })
          .map(r => [String(r.regionNo || r.id), r]) // 중복 제거를 위한 Map 키-값 쌍
        ).values()); // Map의 값들만 다시 배열로

        console.log(`[useRegions] 필터링 및 중복 제거 후 지역 목록 (${validRegions.length}개):`, validRegions);

        if (validRegions.length > 0) {
          setRegions(validRegions);
        } else {
          console.warn("[useRegions] 지역 목록을 불러올 수 없습니다.");
        }
      } catch (error) {
        console.error("[useRegions] 지역 목록 조회 실패:", error);
      } finally {
        setLoadingRegions(false);
      }
    };

    fetchRegions();
  }, [open, initialValue]);

  return { regions, loadingRegions };
};

export default useRegions;
