import React from "react";
import { Field } from "../../ui/AdminUI.styles";
import { Badge } from "../../../common/ui/CommonUI.styles";
import { getImageUrl } from "../../../../utils/imageUrl";
import {
  DetailGrid,
  DetailRow,
  DetailLabel,
  DetailValue,
  ContentBox,
  ImageGrid,
  ImageItem,
  Image,
  ImagePlaceholder,
} from "./DiaryDetailModal.styles";

const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  try {
    const date = new Date(dateStr);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateStr;
  }
};

const DiaryDetailContent = ({ detail }) => {
  if (!detail) return null;

  return (
    <DetailGrid>
      <DetailRow>
        <DetailLabel>번호</DetailLabel>
        <DetailValue>{detail.diaryNo || "-"}</DetailValue>
      </DetailRow>

      <DetailRow>
        <DetailLabel>제목</DetailLabel>
        <DetailValue style={{ fontWeight: 600, fontSize: "1.1rem" }}>
          {detail.diaryTitle || "-"}
        </DetailValue>
      </DetailRow>

      <DetailRow>
        <DetailLabel>작성자</DetailLabel>
        <DetailValue>{detail.memberName || "-"}</DetailValue>
      </DetailRow>

      <DetailRow>
        <DetailLabel>이메일</DetailLabel>
        <DetailValue>{detail.email || "-"}</DetailValue>
      </DetailRow>

      <DetailRow>
        <DetailLabel>상태</DetailLabel>
        <DetailValue>
          {detail.diaryStatus === "N" ? (
            <Badge $variant="success">활성</Badge>
          ) : (
            <Badge $variant="danger">삭제됨</Badge>
          )}
        </DetailValue>
      </DetailRow>

      <DetailRow>
        <DetailLabel>조회수</DetailLabel>
        <DetailValue>{detail.count || 0}</DetailValue>
      </DetailRow>

      <DetailRow>
        <DetailLabel>작성일</DetailLabel>
        <DetailValue>{formatDate(detail.createdDate)}</DetailValue>
      </DetailRow>

      {detail.updatedDate && (
        <DetailRow>
          <DetailLabel>수정일</DetailLabel>
          <DetailValue>{formatDate(detail.updatedDate)}</DetailValue>
        </DetailRow>
      )}

      <DetailRow>
        <DetailLabel>일정 번호</DetailLabel>
        <DetailValue>{detail.scheduleNo || "-"}</DetailValue>
      </DetailRow>

      <DetailRow>
        <DetailLabel>여행지 번호</DetailLabel>
        <DetailValue>{detail.travelNo || "-"}</DetailValue>
      </DetailRow>

      <Field>
        <DetailLabel>내용</DetailLabel>
        <ContentBox>{detail.diaryContent || "내용이 없습니다."}</ContentBox>
      </Field>

      {detail.images && detail.images.length > 0 && (
        <Field>
          <DetailLabel>이미지 ({detail.images.length}장)</DetailLabel>
          <ImageGrid>
            {detail.images.map((img, idx) => {
              const imageUrl = getImageUrl(img.imageUrl || img.url);
              return (
                <ImageItem
                  key={img.imageNo || idx}
                  onClick={() => imageUrl && window.open(imageUrl, "_blank")}
                  title={img.originalName || `이미지 ${idx + 1}`}
                >
                  {imageUrl ? (
                    <Image src={imageUrl} alt={img.originalName || `일기 이미지 ${idx + 1}`} />
                  ) : (
                    <ImagePlaceholder>이미지 없음</ImagePlaceholder>
                  )}
                </ImageItem>
              );
            })}
          </ImageGrid>
        </Field>
      )}
    </DetailGrid>
  );
};

export default DiaryDetailContent;
