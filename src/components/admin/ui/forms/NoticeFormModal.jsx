import React, { useEffect, useState } from "react";
import AdminModal from "../AdminModal";
import FileUpload from "../FileUpload";
import {
  Button,
  ToolbarPrimaryButton,
  Field,
  Label,
  FormInput,
  Textarea,
} from "../AdminUI.styles";

const empty = {
  noticeNo: "",
  noticeTitle: "",
  noticeContent: "",
  image: "",
};

// 이미지 URL 생성 헬퍼
const getImageUrl = (path) => {
  if (path == null || path == "") return null;
  if (path.startsWith('http')) return path;
  const baseUrl = window.ENV?.API_URL || "http://localhost:8081";
  if (path.startsWith('/uploads/') && baseUrl.endsWith('/')) {
    return `${baseUrl.slice(0, -1)}${path}`;
  }
  return `${baseUrl}${path}`;
};

const NoticeFormModal = ({
  open,
  mode = "create",
  initialValue,
  onClose,
  onSubmit,
}) => {
  const [form, setForm] = useState(empty);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (!open) return;
    const formData = { ...empty, ...(initialValue || {}) };
    if (formData.image) {
      formData.image = getImageUrl(formData.image);
    }
    setForm(formData);
    setFile(null);
  }, [open, initialValue]);

  const title = mode === "edit" ? "공지 수정" : "공지 등록";

  return (
    <AdminModal
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
          initialPreview={form.image}
        />
      </Field>
    </AdminModal>
  );
};

export default NoticeFormModal;
