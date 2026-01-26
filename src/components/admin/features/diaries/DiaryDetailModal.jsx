import React from "react";
import Modal from "../../../common/ui/Modal";
import { Button } from "../../ui/AdminUI.styles";
import { LoadingContainer, EmptyContainer } from "./DiaryDetailModal.styles";
import DiaryDetailContent from "./DiaryDetailContent";
import { useDiaryDetail } from "./hooks/useDiaryDetail";

const DiaryDetailModal = ({ open, diaryNo, onClose }) => {
  const { loading, detail, error } = useDiaryDetail(diaryNo, open);

  if (!open) return null;

  return (
    <Modal
      open={open}
      title="일기 상세 정보"
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
        <DiaryDetailContent detail={detail} />
      )}
    </Modal>
  );
};

export default DiaryDetailModal;
