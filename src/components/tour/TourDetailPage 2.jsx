import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../layout/Header";
import { axiosPublic } from "../../api/api";
import { loadKakaoSDK, isKakaoSDKReady } from "../../utils/kakaoMaps";
import {
  PageContainer,
  ContentWrapper,
  BackButton,
  DetailCard,
  ImageSection,
  MainImage,
  MapContainer,
  InfoSection,
  Title,
  Region,
  Description,
  InfoRow,
  InfoLabel,
  InfoValue,
  LoadingSpinner,
  ErrorMessage,
} from "./TourDetailPage.styles";

export default function TourDetailPage() {
  const { travelNo } = useParams(); // URL에서 travelNo 추출
  const navigate = useNavigate();
  const mapRef = useRef(null);

  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // travelNo가 유효한 숫자일 때만 API 호출 (빈 값, "undefined", 0 등은 백엔드 검증 오류 유발)
  const isValidTravelNo = (value) => {
    if (value == null || value === "") return false;
    const num = Number(value);
    return Number.isInteger(num) && num > 0;
  };

  // 여행지 상세 정보 조회
  useEffect(() => {
    if (!isValidTravelNo(travelNo)) {
      setLoading(false);
      setError("잘못된 여행지 번호입니다.");
      return;
    }

    const fetchDestination = async () => {
      try {
        setLoading(true);
        setError(null);

        // API 호출: GET /api/places/{travelNo}
        const response = await axiosPublic.getList(`/api/places/${travelNo}`);

        console.log("📥 상세 조회 응답:", response);

        // 응답 데이터 처리
        if (response) {
          setDestination(response);
        } else {
          setError("여행지 정보를 찾을 수 없습니다.");
        }
      } catch (err) {
        console.error("❌ 상세 조회 실패:", err);
        setError("여행지 정보를 불러오는데 실패했습니다.");
        toast.error("여행지 정보를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [travelNo]);

  // 카카오 지도 초기화
  useEffect(() => {
    if (!destination || !mapRef.current) return;

    const latitude = destination.location?.latitude || destination.mapY;
    const longitude = destination.location?.longitude || destination.mapX;

    if (!latitude || !longitude) {
      console.warn("⚠️ 위치 정보 없음");
      return;
    }

    // 카카오맵 SDK 로드 및 지도 초기화
    const initMap = async () => {
      try {
        // SDK 로드
        await loadKakaoSDK();

        // SDK 준비 확인
        if (!isKakaoSDKReady()) {
          console.error("❌ 카카오맵 SDK 로드 실패");
          return;
        }

        const { kakao } = window;
        const container = mapRef.current;

        // 지도 생성
        const options = {
          center: new kakao.maps.LatLng(latitude, longitude),
          level: 3, // 확대 레벨
        };

        const map = new kakao.maps.Map(container, options);

        // 마커 표시
        const markerPosition = new kakao.maps.LatLng(latitude, longitude);
        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);

        // 인포윈도우 표시
        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="padding:5px;font-size:12px;">${destination.travelName}</div>`,
        });
        infowindow.open(map, marker);

        console.log("✅ 카카오맵 초기화 완료");
      } catch (error) {
        console.error("❌ 카카오맵 초기화 실패:", error);
      }
    };

    initMap();
  }, [destination]);

  // 뒤로가기
  const handleBack = () => {
    navigate(-1);
  };

  // 이미지 URL 처리
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    if (imageUrl.startsWith("http")) return imageUrl;
    // TODO: AWS S3 URL로 변환 필요시
    return imageUrl;
  };

  // 로딩 중
  if (loading) {
    return (
      <PageContainer>
        <Header />
        <ContentWrapper>
          <LoadingSpinner>
            <div className="spinner"></div>
            <p>여행지 정보를 불러오는 중...</p>
          </LoadingSpinner>
        </ContentWrapper>
      </PageContainer>
    );
  }

  // 에러 발생
  if (error) {
    return (
      <PageContainer>
        <Header />
        <ContentWrapper>
          <ErrorMessage>
            <p>{error}</p>
            <button onClick={handleBack}>목록으로 돌아가기</button>
          </ErrorMessage>
        </ContentWrapper>
      </PageContainer>
    );
  }

  // 데이터 없음
  if (!destination) {
    return (
      <PageContainer>
        <Header />
        <ContentWrapper>
          <ErrorMessage>
            <p>여행지 정보를 찾을 수 없습니다.</p>
            <button onClick={handleBack}>목록으로 돌아가기</button>
          </ErrorMessage>
        </ContentWrapper>
      </PageContainer>
    );
  }

  const imageUrl = getImageUrl(destination.travelImage);

  return (
    <PageContainer>
      <Header />

      <ContentWrapper>
        <BackButton onClick={handleBack}>← 돌아가기</BackButton>

        <DetailCard>
          {/* 왼쪽: 이미지 & 지도 */}
          <ImageSection>
            {imageUrl ? (
              <MainImage src={imageUrl} alt={destination.travelName} />
            ) : (
              <MainImage
                as="div"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#2a2a2a",
                  color: "#666",
                }}
              >
                이미지 없음
              </MainImage>
            )}

            {/* 카카오 지도 */}
            <MapContainer ref={mapRef} />
          </ImageSection>

          {/* 오른쪽: 상세 정보 */}
          <InfoSection>
            <Title>{destination.travelName || "여행지 이름"}</Title>
            
            <Region>
              📍 {destination.regionName || "지역 정보 없음"} 
              {destination.location?.themeName && ` · ${destination.location.themeName}`}
            </Region>

            <Description>
              {destination.travelContent || "상세 설명이 없습니다."}
            </Description>

            {/* 추가 정보 */}
            <InfoRow>
              <InfoLabel>주소</InfoLabel>
              <InfoValue>{destination.travelAddress || "-"}</InfoValue>
            </InfoRow>

            <InfoRow>
              <InfoLabel>조회수</InfoLabel>
              <InfoValue>{destination.count || 0}</InfoValue>
            </InfoRow>

            {destination.location?.latitude && destination.location?.longitude && (
              <InfoRow>
                <InfoLabel>위치</InfoLabel>
                <InfoValue>
                  위도: {destination.location.latitude}, 경도: {destination.location.longitude}
                </InfoValue>
              </InfoRow>
            )}
          </InfoSection>
        </DetailCard>
      </ContentWrapper>
    </PageContainer>
  );
}