import React from "react";
import { useNavigate } from "react-router-dom";
import { Field } from "../../ui/AdminUI.styles";
import { Badge } from "../../../common/ui/CommonUI.styles";
import {
  DetailGrid,
  DetailRow,
  DetailLabel,
  DetailValue,
  ContentBox,
  LinkButton,
} from "./CommentDetailModal.styles";

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

const CommentDetailContent = ({ detail }) => {
  const navigate = useNavigate();

  if (!detail) return null;

  const handleDiaryClick = () => {
    if (detail.diaryNo) {
      navigate(`/admin/diaries`);
    }
  };

  return (
    <DetailGrid>
      <DetailRow>
        <DetailLabel>번호</DetailLabel>
        <DetailValue>{detail.commentNo || "-"}</DetailValue>
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
          {detail.commentStatus === "N" ? (
            <Badge $variant="success">활성</Badge>
          ) : (
            <Badge $variant="danger">삭제됨</Badge>
          )}
        </DetailValue>
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
        <DetailLabel>일기 번호</DetailLabel>
        <DetailValue>
          {detail.diaryNo ? (
            <LinkButton type="button" onClick={handleDiaryClick}>
              {detail.diaryNo} (클릭하여 일기 관리로 이동)
            </LinkButton>
          ) : (
            "-"
          )}
        </DetailValue>
      </DetailRow>

      <DetailRow>
        <DetailLabel>일기 제목</DetailLabel>
        <DetailValue style={{ fontWeight: 600 }}>
          {detail.diaryTitle || "-"}
        </DetailValue>
      </DetailRow>

      <Field>
        <DetailLabel>댓글 내용</DetailLabel>
        <ContentBox>{detail.commentContent || "내용이 없습니다."}</ContentBox>
      </Field>
    </DetailGrid>
  );
};

export default CommentDetailContent;
