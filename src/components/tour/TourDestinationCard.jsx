import {
  CardContainer,
  CardThumbnail,
  PlaceholderImage,
  CardContent,
  CardTitle,
  CardDescription,
  CardInfo,
  InfoTag,
  ViewCount,
} from "./TourDestinationCard.styles";

export default function TourDestinationCard({ destination, onClick }) {
  // 이미지 URL 처리 (AWS S3 URL)
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    // 이미 전체 URL인 경우
    if (imageUrl.startsWith("http")) return imageUrl;
    // 상대 경로인 경우 AWS S3 URL로 변환 (환경에 맞게 수정 필요)
    // TODO: AWS S3 버킷 URL로 수정
    return imageUrl;
  };

  const imageUrl = getImageUrl(destination.travelImage);

  return (
    <CardContainer onClick={onClick}>
      {/* 썸네일 이미지 */}
      {imageUrl ? (
        <CardThumbnail src={imageUrl} alt={destination.travelName} />
      ) : (
        <PlaceholderImage>
          <span>썸네일</span>
        </PlaceholderImage>
      )}

      {/* 카드 내용 */}
      <CardContent>
        <CardTitle>{destination.travelName || "여행지 이름"}</CardTitle>
        <CardDescription>
          {destination.travelContent || destination.travelAddress || "간단한 설명"}
        </CardDescription>

        <CardInfo>
          {/* 지역 태그 */}
          <InfoTag>
            📍 {destination.regionName || destination.location?.themeName || "자연"}
          </InfoTag>

          {/* 조회수 */}
          <ViewCount>조회수 : {destination.count || 0}</ViewCount>
        </CardInfo>
      </CardContent>
    </CardContainer>
  );
}