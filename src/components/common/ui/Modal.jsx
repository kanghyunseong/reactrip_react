import React from "react";
import {
  ModalOverlay,
  ModalCard,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter,
} from "./CommonUI.styles";

const Modal = ({
  open,
  title,
  children,
  footer,
  onClose,
}) => {
  if (!open) return null;

  return (
    <ModalOverlay
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <ModalCard>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <ModalClose type="button" onClick={onClose} aria-label="닫기">
            ✕
          </ModalClose>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
        {footer ? <ModalFooter>{footer}</ModalFooter> : null}
      </ModalCard>
    </ModalOverlay>
  );
};

export default Modal;
