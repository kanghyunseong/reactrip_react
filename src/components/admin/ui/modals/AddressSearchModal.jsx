import React, { useState } from "react";
import Modal from "../../../common/ui/Modal";
import { Button, FormInput } from "../AdminUI.styles";
import { loadKakaoSDK, isKakaoSDKReady } from "../../../../utils/kakaoMaps";
import { toast } from "react-toastify";

const AddressSearchModal = ({ open, onClose, onSelect }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const executeKakaoSearch = async () => {
    if (!searchKeyword.trim()) return;
    setSearching(true);

    try {
      if (!isKakaoSDKReady()) await loadKakaoSDK();
      
      const places = new window.kakao.maps.services.Places();
      places.keywordSearch(searchKeyword.trim(), (data, status) => {
        setSearching(false);
        if (status === window.kakao.maps.services.Status.OK) {
          setSearchResults(data || []);
        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
          toast.info("검색 결과가 없습니다.");
          setSearchResults([]);
        } else {
          toast.error("검색 중 오류가 발생했습니다.");
        }
      });
    } catch (error) {
      console.error("카카오맵 검색 오류:", error);
      toast.error("카카오맵을 불러올 수 없습니다.");
      setSearching(false);
    }
  };

  return (
    <Modal
      open={open}
      title="주소 검색"
      onClose={onClose}
      footer={<Button type="button" onClick={onClose}>닫기</Button>}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <FormInput
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && executeKakaoSearch()}
            placeholder="장소명 또는 주소를 입력하세요"
            style={{ flex: 1 }}
          />
          <Button type="button" onClick={executeKakaoSearch} disabled={searching}>
            {searching ? "검색 중..." : "검색"}
          </Button>
        </div>

        {searchResults.length > 0 && (
          <div style={{ maxHeight: "400px", overflowY: "auto", border: "1px solid rgba(15,23,42,0.1)", borderRadius: "0.75rem", padding: "0.5rem" }}>
            {searchResults.map((place, index) => (
              <div
                key={index}
                onClick={() => onSelect(place)}
                style={{ padding: "0.75rem", marginBottom: "0.5rem", border: "1px solid rgba(15,23,42,0.05)", borderRadius: "0.5rem", cursor: "pointer" }}
              >
                <div style={{ fontWeight: "600" }}>{place.place_name}</div>
                <div style={{ fontSize: "0.85rem", color: "rgba(15,23,42,0.6)" }}>
                  {place.road_address_name || place.address_name}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AddressSearchModal;
