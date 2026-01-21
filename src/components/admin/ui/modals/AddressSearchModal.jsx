import React, { useState } from "react";
import AdminModal from "../AdminModal";
import { Button, FormInput } from "../AdminUI.styles";
import { loadKakaoSDK, isKakaoSDKReady } from "../../../../utils/kakaoMaps";
import { toast } from "react-toastify";

const AddressSearchModal = ({ open, onClose, onSelectAddress }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  // 카카오맵 SDK 로드 확인 및 대기
  const waitForKakaoSDK = async () => {
    if (isKakaoSDKReady()) {
      return;
    }
    try {
      await loadKakaoSDK();
    } catch (error) {
      console.error("[AddressSearchModal] 카카오맵 SDK 로드 실패:", error);
      throw new Error("카카오맵 SDK를 불러올 수 없습니다. 페이지를 새로고침해주세요.");
    }
  };

  // 카카오맵 키워드 검색 실행
  const executeKakaoSearch = async () => {
    if (!searchKeyword.trim()) {
      toast.warning("검색어를 입력해주세요.");
      return;
    }

    setSearching(true);
    setSearchResults([]);

    try {
      await waitForKakaoSDK();

      if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
        toast.error("카카오맵 SDK가 로드되지 않았습니다. 페이지를 새로고침해주세요.");
        setSearching(false);
        return;
      }

      const places = new window.kakao.maps.services.Places();

      places.keywordSearch(
        searchKeyword.trim(),
        (data, status) => {
          setSearching(false);

          if (status === window.kakao.maps.services.Status.OK) {
            setSearchResults(data || []);
            if (!data || data.length === 0) {
              toast.info("검색 결과가 없습니다.");
            }
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            toast.info("검색 결과가 없습니다.");
            setSearchResults([]);
          } else if (status === window.kakao.maps.services.Status.ERROR) {
            toast.error("검색 중 오류가 발생했습니다.");
            setSearchResults([]);
          }
        },
        {}
      );
    } catch (error) {
      console.error("카카오맵 검색 오류:", error);
      toast.error(error.message || "카카오맵 SDK를 불러올 수 없습니다. 페이지를 새로고침해주세요.");
      setSearching(false);
    }
  };

  const handleClose = () => {
    setSearchKeyword("");
    setSearchResults([]);
    onClose();
  };

  return (
    <AdminModal
      open={open}
      title="주소 검색"
      onClose={handleClose}
      footer={
        <>
          <Button type="button" onClick={handleClose}>
            닫기
          </Button>
        </>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <FormInput
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !searching) {
                executeKakaoSearch();
              }
            }}
            placeholder="장소명 또는 주소를 입력하세요 (예: 경복궁, 제주도)"
            style={{ flex: 1 }}
          />
          <Button
            type="button"
            onClick={executeKakaoSearch}
            disabled={searching || !searchKeyword.trim()}
          >
            {searching ? "검색 중..." : "검색"}
          </Button>
        </div>

        {searchResults.length > 0 && (
          <div
            style={{
              maxHeight: "400px",
              overflowY: "auto",
              border: "1px solid rgba(15, 23, 42, 0.12)",
              borderRadius: "0.75rem",
              padding: "0.5rem",
            }}
          >
            {searchResults.map((place, index) => (
              <div
                key={index}
                onClick={() => onSelectAddress(place)}
                style={{
                  padding: "0.75rem",
                  marginBottom: "0.5rem",
                  border: "1px solid rgba(15, 23, 42, 0.08)",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(99, 102, 241, 0.08)";
                  e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
                  e.currentTarget.style.borderColor = "rgba(15, 23, 42, 0.08)";
                }}
              >
                <div style={{ fontWeight: "600", marginBottom: "0.25rem", color: "#0f172a" }}>
                  {place.place_name || "장소명 없음"}
                </div>
                <div style={{ fontSize: "0.85rem", color: "rgba(15, 23, 42, 0.7)" }}>
                  {place.road_address_name ? (
                    <>
                      <div>📍 {place.road_address_name}</div>
                      {place.address_name && place.road_address_name !== place.address_name && (
                        <div style={{ marginTop: "0.25rem", color: "rgba(15, 23, 42, 0.5)" }}>
                          (지번) {place.address_name}
                        </div>
                      )}
                    </>
                  ) : (
                    <div>📍 {place.address_name || "주소 없음"}</div>
                  )}
                  {place.phone && (
                    <div style={{ marginTop: "0.25rem", color: "rgba(15, 23, 42, 0.6)" }}>
                      📞 {place.phone}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {searching && (
          <div style={{ textAlign: "center", padding: "2rem", color: "rgba(15, 23, 42, 0.6)" }}>
            검색 중...
          </div>
        )}

        {!searching && searchResults.length === 0 && searchKeyword && (
          <div style={{ textAlign: "center", padding: "2rem", color: "rgba(15, 23, 42, 0.6)" }}>
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </AdminModal>
  );
};

export default AddressSearchModal;
