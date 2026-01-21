import React, { useEffect, useState } from "react";
import Modal from "../../../common/ui/Modal";
import FileUpload from "../../../common/ui/FileUpload";
import {
  Button,
  ToolbarPrimaryButton,
  Field,
  Label,
  FormInput,
  Textarea,
  Help,
} from "../AdminUI.styles";

const empty = {
  noticeNo: "",
  noticeTitle: "",
  noticeContent: "",
  image: "",
};

const NoticeFormModal = ({
  open,
  mode = "create", // create | edit
  initialValue,
  onClose,
  onSubmit,
}) => {
  const [form, setForm] = useState(empty);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (!open) return;
    setForm({ ...empty, ...(initialValue || {}) });
    setFile(null);
  }, [open, initialValue]);

  const title = mode === "edit" ? "공지 수정" : "공지 등록";

  // 이미지 URL 생성 헬퍼
  const getImageUrl = (path) => {
    // 이미지가 없는 경우 null 반환 (미리보기를 띄우지 않기 위함)
    if (path == null || path == "") return null;
    
    if (path.startsWith('http')) return path;
    const baseUrl = window.ENV?.API_URL || "http://localhost:8081";
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${baseUrl}${cleanPath}`;
  };

  return (
    <Modal
      open={open}
      title={title}
      onClose={onClose}
      footer={
        <>
          <Button type="button" onClick={onClose}>
            취소
          </Button>
          <ToolbarPrimaryButton type="button" onClick={() => onSubmit?.(form, file)}>
            저장
          </ToolbarPrimaryButton>
        </>
      }
    >
      <Field>
        <Label>공지 제목</Label>
        <FormInput 
          value={form.noticeTitle} 
          onChange={(e) => setForm((p) => ({ ...p, noticeTitle: e.target.value }))}
          placeholder="공지 제목을 입력하세요"
        />
      </Field>

      <Field style={{ marginTop: "1rem" }}>
        <Label>공지 내용</Label>
        <Textarea
          value={form.noticeContent}
          onChange={(e) => setForm((p) => ({ ...p, noticeContent: e.target.value }))}
          placeholder="공지 내용을 입력하세요..."
        />
      </Field>

      <Field style={{ marginTop: "1rem" }}>
        <Label>이미지 업로드</Label>
        <FileUpload 
          onFileChange={setFile} 
          accept="image/*" 
          maxSize={10 * 1024 * 1024} 
          initialPreview={getImageUrl(initialValue?.image)}
        />
      </Field>
    </Modal>
  );
};

export default NoticeFormModal;
