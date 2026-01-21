import React, { useEffect, useState } from "react";
import Modal from "../../../common/ui/Modal";
import FileUpload from "../../../common/ui/FileUpload";
import AddressSearchModal from "../modals/AddressSearchModal";
import { useRegions } from "../../../../hooks/admin/useRegions";
import {
  Button,
  ToolbarPrimaryButton,
  FormGrid,
  Field,
  Label,
  FormInput,
  Textarea,
  Select,
  Help,
} from "../AdminUI.styles";
import { toast } from "react-toastify";

const empty = {
  travelNo: "", travelName: "", travelAddress: "",
  mapX: "", mapY: "", travelStatus: "N",
  regionNo: "", travelContent: "",
};

const TravelFormModal = ({ open, mode = "create", initialValue, onClose, onSubmit }) => {
  const [form, setForm] = useState(empty);
  const [file, setFile] = useState(null);
  const [showAddressSearch, setShowAddressSearch] = useState(false);
  const { regions, loading: loadingRegions } = useRegions(open, initialValue);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) return;
    setForm({ ...empty, ...(initialValue || {}) });
    setFile(null);
    setErrors({});
  }, [open, initialValue]);

  const getImageUrl = (path) => {
    if (path == null || path == "") return null;
    if (path.startsWith('http')) return path;
    const baseUrl = window.ENV?.API_URL || "http://localhost:8081";
    return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
  };

  const handleSelectAddress = (place) => {
    const y = place.y || ""; // 위도
    const x = place.x || ""; // 경도
    const fullAddress = place.road_address_name 
      ? `${place.road_address_name} ${place.place_name}`.trim()
      : `${place.address_name} ${place.place_name}`.trim();

    setForm(prev => ({
      ...prev,
      travelAddress: fullAddress,
      mapX: y, mapY: x,
      travelName: prev.travelName || place.place_name,
    }));
    setErrors((p) => ({
      ...p,
      travelAddress: undefined,
      mapX: undefined,
      mapY: undefined,
    }));
    setShowAddressSearch(false);
  };

  const handleSave = () => {
    const ok = (() => {
      const next = {};

      if (!String(form.travelName || "").trim()) next.travelName = "여행지명을 입력해주세요.";
      if (!String(form.regionNo || "").trim()) next.regionNo = "지역을 선택해주세요.";
      if (!String(form.travelAddress || "").trim()) next.travelAddress = "주소 검색으로 주소를 선택해주세요.";
      if (!String(form.mapX || "").trim()) next.mapX = "주소 검색 후 위도/경도가 자동 입력됩니다.";
      if (!String(form.mapY || "").trim()) next.mapY = "주소 검색 후 위도/경도가 자동 입력됩니다.";
      if (!String(form.travelContent || "").trim()) next.travelContent = "여행지 설명을 입력해주세요.";

      setErrors(next);
      if (Object.keys(next).length) {
        toast.error(`필수 항목 누락: ${Object.values(next)[0]}`);
        return false;
      }
      return true;
    })();

    if (!ok) return;
    onSubmit(form, file);
  };

  return (
    <Modal
      open={open}
      title={mode === "edit" ? "여행지 수정" : "여행지 등록"}
      onClose={onClose}
      footer={
        <>
          <Button type="button" onClick={onClose}>취소</Button>
          <ToolbarPrimaryButton type="button" onClick={handleSave}>저장</ToolbarPrimaryButton>
        </>
      }
    >
      <FormGrid>
        <Field>
          <Label>여행지명</Label>
          <FormInput
            value={form.travelName}
            onChange={(e) => {
              const v = e.target.value;
              setForm((p) => ({ ...p, travelName: v }));
              if (errors.travelName) setErrors((p) => ({ ...p, travelName: undefined }));
            }}
            placeholder="예) 부산 해운대"
          />
          {errors.travelName ? <Help>{errors.travelName}</Help> : null}
        </Field>
        
        <Field>
          <Label>지역</Label>
          <Select 
            value={String(form.regionNo || "")} 
            onChange={(e) => {
              const v = e.target.value;
              setForm((p) => ({ ...p, regionNo: v }));
              if (errors.regionNo) setErrors((p) => ({ ...p, regionNo: undefined }));
            }}
            disabled={loadingRegions || mode === "edit"}
          >
            <option value="">지역 선택</option>
            {regions.map(r => (
              <option key={r.regionNo} value={r.regionNo}>{r.regionName}</option>
            ))}
          </Select>
          {errors.regionNo ? <Help>{errors.regionNo}</Help> : null}
        </Field>

        <Field style={{ gridColumn: "1 / -1" }}>
          <Label>주소</Label>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <FormInput value={form.travelAddress} readOnly style={{ flex: 1 }} />
            {mode === "create" && (
              <Button type="button" onClick={() => setShowAddressSearch(true)}>주소 검색</Button>
            )}
          </div>
          {errors.travelAddress ? <Help>{errors.travelAddress}</Help> : null}
        </Field>

        <Field>
          <Label>위도 (X)</Label>
          <FormInput value={form.mapX} readOnly type="number" disabled={mode === "edit"} />
          {errors.mapX ? <Help>{errors.mapX}</Help> : null}
        </Field>
        
        <Field>
          <Label>경도 (Y)</Label>
          <FormInput value={form.mapY} readOnly type="number" disabled={mode === "edit"} />
          {errors.mapY ? <Help>{errors.mapY}</Help> : null}
        </Field>

        <Field>
          <Label>상태</Label>
          <Select value={form.travelStatus} onChange={e => setForm(p => ({ ...p, travelStatus: e.target.value }))}>
            <option value="N">정상</option>
            <option value="Y">비활성</option>
          </Select>
        </Field>
      </FormGrid>

      <Field style={{ marginTop: "1rem" }}>
        <Label>여행지 설명</Label>
        <Textarea
          value={form.travelContent}
          onChange={(e) => {
            const v = e.target.value;
            setForm((p) => ({ ...p, travelContent: v }));
            if (errors.travelContent) setErrors((p) => ({ ...p, travelContent: undefined }));
          }}
          placeholder="간단한 소개/특징/추천 포인트를 적어주세요."
        />
        {errors.travelContent ? <Help>{errors.travelContent}</Help> : null}
      </Field>

      <Field style={{ marginTop: "1rem" }}>
        <Label>이미지 업로드</Label>
        <FileUpload 
          onFileChange={setFile} 
          initialPreview={getImageUrl(initialValue?.travelImage)} 
        />
      </Field>

      <AddressSearchModal 
        open={showAddressSearch} 
        onClose={() => setShowAddressSearch(false)} 
        onSelect={handleSelectAddress} 
      />
    </Modal>
  );
};

export default TravelFormModal;
