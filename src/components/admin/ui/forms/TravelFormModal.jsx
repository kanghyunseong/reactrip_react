import React, { useEffect, useState } from "react";
import AdminModal from "../AdminModal";
import FileUpload from "../FileUpload";
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
import useRegions from "../../../../hooks/admin/useRegions";
import AddressSearchModal from "../modals/AddressSearchModal";

const empty = {
  travelNo: "",
  travelName: "",
  travelAddress: "",
  mapX: "",
  mapY: "",
  travelStatus: "N",
  regionNo: "",
  travelContent: "",
  travelImage: "",
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

const TravelFormModal = ({
  open,
  mode = "create",
  initialValue,
  onClose,
  onSubmit,
}) => {
  const [form, setForm] = useState(empty);
  const [file, setFile] = useState(null);
  const { regions, loadingRegions } = useRegions(open, initialValue);
  const [showAddressSearch, setShowAddressSearch] = useState(false);

  useEffect(() => {
    if (!open) return;
    const formData = { ...empty, ...(initialValue || {}) };
    if (formData.travelImage) {
      formData.travelImage = getImageUrl(formData.travelImage);
    }
    setForm(formData);
    setFile(null);
  }, [open, initialValue, regions]);

  const validateForm = () => {
    if (!form.travelName || !form.travelName.trim()) {
      alert("여행지명을 입력해주세요.");
      return false;
    }
    if (!form.regionNo || !form.regionNo.toString().trim()) {
      alert("지역을 선택해주세요.");
      return false;
    }
    if (!form.travelAddress || !form.travelAddress.trim()) {
      alert("주소를 입력해주세요.");
      return false;
    }
    return true;
  };

  const handleSelectAddress = (place) => {
    const address = place.address_name || place.road_address_name || "";
    const placeName = place.place_name || "";
    const latitude = place.y || "";
    const longitude = place.x || "";

    const fullAddress = place.road_address_name
      ? `${place.road_address_name} ${placeName}`.trim()
      : `${address} ${placeName}`.trim();

    setForm((prev) => ({
      ...prev,
      travelAddress: fullAddress || address,
      mapX: latitude || prev.mapX,
      mapY: longitude || prev.mapY,
      travelName: prev.travelName || placeName,
    }));
    setShowAddressSearch(false);
  };

  return (
    <AdminModal
      open={open}
      title={mode === "edit" ? "여행지 수정" : "여행지 등록"}
      onClose={onClose}
      footer={
        <>
          <Button type="button" onClick={onClose}>취소</Button>
          <ToolbarPrimaryButton type="button" onClick={() => validateForm() && onSubmit?.(form, file)}>저장</ToolbarPrimaryButton>
        </>
      }
    >
      <FormGrid>
        <Field>
          <Label>여행지명</Label>
          <FormInput value={form.travelName} onChange={(e) => setForm((p) => ({ ...p, travelName: e.target.value }))} placeholder="여행지명을 입력하세요" />
        </Field>
        <Field>
          <Label>지역</Label>
          <Select value={String(form.regionNo || "")} onChange={(e) => setForm((p) => ({ ...p, regionNo: e.target.value }))} disabled={loadingRegions || mode === "edit"}>
            <option value="">지역을 선택하세요</option>
            {regions.map((region) => (
              <option key={region.regionNo || region.id} value={region.regionNo || region.id}>
                {region.regionName || region.name || `지역 ${region.regionNo || region.id}`}
              </option>
            ))}
          </Select>
        </Field>
        <Field style={{ gridColumn: "1 / -1" }}>
          <Label>주소</Label>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <FormInput value={form.travelAddress} readOnly style={{ flex: 1 }} disabled={mode === "edit"} />
            {mode === "create" && <Button type="button" onClick={() => setShowAddressSearch(true)}>주소 검색</Button>}
          </div>
        </Field>
        <Field>
          <Label>위도 (X)</Label>
          <FormInput value={form.mapX} readOnly disabled={mode === "edit"} />
        </Field>
        <Field>
          <Label>경도 (Y)</Label>
          <FormInput value={form.mapY} readOnly disabled={mode === "edit"} />
        </Field>
        <Field>
          <Label>상태</Label>
          <Select value={form.travelStatus} onChange={(e) => setForm((p) => ({ ...p, travelStatus: e.target.value }))}>
            <option value="N">정상</option>
            <option value="Y">비활성</option>
          </Select>
        </Field>
      </FormGrid>
      <Field style={{ marginTop: "1rem" }}>
        <Label>여행지 설명</Label>
        <Textarea value={form.travelContent} onChange={(e) => setForm((p) => ({ ...p, travelContent: e.target.value }))} placeholder="여행지에 대한 자세한 설명을 입력하세요..." />
      </Field>
      <Field style={{ marginTop: "1rem" }}>
        <Label>이미지 업로드</Label>
        <FileUpload onFileChange={setFile} initialPreview={form.travelImage} />
      </Field>
      <AddressSearchModal open={showAddressSearch} onClose={() => setShowAddressSearch(false)} onSelectAddress={handleSelectAddress} />
    </AdminModal>
  );
};

export default TravelFormModal;
