import React, { useEffect, useState } from "react";
import Modal from "../../../common/ui/Modal";
import FileUpload from "../../../common/ui/FileUpload";
import { Button, ToolbarPrimaryButton, Field, Label, FormInput, Textarea, Help } from "../../ui/AdminUI.styles";
import { getImageUrl } from "../../../../utils/imageUrl";

const empty = {
  noticeNo: "",
  noticeTitle: "",
  noticeContent: "",
  image: "",
};

const NoticeFormModal = ({ open, mode = "create", initialValue, onClose, onSubmit }) => {
  const [form, setForm] = useState(empty);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (!open) return;
    setForm({ ...empty, ...(initialValue || {}) });
    setFile(null);
  }, [open, initialValue]);

  const title = mode === "edit" ? "공지 수정" : "공지 등록";
  const payload = {...form};
  if (mode === "edit" && !file) delete payload.noticeImage;

  const validate = () => {
    if (!String(form.noticeTitle || "").trim()) return "제목을 입력해주세요.";
    if (!String(form.noticeContent || "").trim()) return "내용을 입력해주세요.";
    return null;
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
          <ToolbarPrimaryButton
            type="button"
            onClick={() => {
              const err = validate();
              if (err) return;
              onSubmit?.(payload, file);
            }}
          >
            저장
          </ToolbarPrimaryButton>
        </>
      }
    >
      <div style={{ display: "grid", gap: "1rem" }}>
        <Field>
          <Label>제목</Label>
          <FormInput
            value={form.noticeTitle || ""}
            onChange={(e) => setForm((p) => ({ ...p, noticeTitle: e.target.value }))}
            placeholder="공지 제목"
          />
        </Field>

        <Field>
          <Label>내용</Label>
          <Textarea
            value={form.noticeContent || ""}
            onChange={(e) => setForm((p) => ({ ...p, noticeContent: e.target.value }))}
            placeholder="공지 내용을 입력하세요"
          />
        </Field>

        <Field>
          <Label>이미지</Label>
          <FileUpload
              preview={getImageUrl(form.noticeImage || form.image)}
              onFileChange={(f) => setFile(f)}
              previewSize="6.25rem"
            />
          <Help>이미지는 선택사항입니다.</Help>
        </Field>
      </div>
    </Modal>
  );
};

export default NoticeFormModal;

