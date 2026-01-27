import React from "react";
import Modal from "../../../common/ui/Modal";
import { Button } from "../../ui/AdminUI.styles";
import { LoadingContainer, EmptyContainer } from "./CommentDetailModal.styles";
import CommentDetailContent from "./CommentDetailContent";
import { useCommentDetail } from "./hooks/useCommentDetail";

const CommentDetailModal = ({ open, commentNo, onClose }) => {
  const { loading, detail, error } = useCommentDetail(commentNo, open);

  if (!open) return null;

  return (
    <Modal
      open={open}
      title="댓글 상세 정보"
      onClose={onClose}
      footer={
        <Button type="button" onClick={onClose}>
          닫기
        </Button>
      }
    >
      {loading ? (
        <LoadingContainer>
          <div>로딩 중...</div>
        </LoadingContainer>
      ) : error || !detail ? (
        <EmptyContainer>
          <div>{error || "데이터를 불러올 수 없습니다."}</div>
        </EmptyContainer>
      ) : (
        <CommentDetailContent detail={detail} />
      )}
    </Modal>
  );
};

export default CommentDetailModal;
