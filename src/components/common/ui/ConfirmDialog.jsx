import React from "react";
import Modal from "./Modal";
import { Button, DangerButton, ModalText } from "./CommonUI.styles";

const ConfirmDialog = ({
  open,
  title = "확인",
  description,
  confirmLabel = "확인",
  cancelLabel = "취소",
  danger = false,
  onConfirm,
  onClose,
}) => {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onClose}
      footer={
        <>
          <Button type="button" onClick={onClose}>
            {cancelLabel}
          </Button>
          {danger ? (
            <DangerButton type="button" onClick={onConfirm}>
              {confirmLabel}
            </DangerButton>
          ) : (
            <Button type="button" onClick={onConfirm}>
              {confirmLabel}
            </Button>
          )}
        </>
      }
    >
      {description ? <ModalText>{description}</ModalText> : null}
    </Modal>
  );
};

export default ConfirmDialog;

