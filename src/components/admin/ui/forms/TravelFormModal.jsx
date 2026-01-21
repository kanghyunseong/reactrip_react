import React, { useEffect, useState } from "react";
import AdminModal from "../AdminModal";
import FileUpload from "../FileUpload";
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
} from "../AdminUI.styles";

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

  useEffect(() => {
    if (!open) return;
    setForm({ ...empty, ...(initialValue || {}) });
    setFile(null);
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
          <ToolbarPrimaryButton type="button" onClick={() => onSubmit(form, file)}>저장</ToolbarPrimaryButton>
        </>
      }
    >
      <FormGrid>
        <Field>
          <Label>여행지명</Label>
          <FormInput value={form.travelName} onChange={e => setForm(p => ({ ...p, travelName: e.target.value }))} />
        </Field>
        
        <Field>
          <Label>지역</Label>
          <Select 
            value={String(form.regionNo || "")} 
            onChange={e => setForm(p => ({ ...p, regionNo: e.target.value }))}
            disabled={loadingRegions || mode === "edit"}
          >
            <option value="">지역 선택</option>
            {regions.map(r => (
              <option key={r.regionNo} value={r.regionNo}>{r.regionName}</option>
            ))}
          </Select>
        </Field>

        <Field style={{ gridColumn: "1 / -1" }}>
          <Label>주소</Label>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <FormInput value={form.travelAddress} readOnly style={{ flex: 1 }} />
            {mode === "create" && (
              <Button type="button" onClick={() => setShowAddressSearch(true)}>주소 검색</Button>
            )}
          </div>
        </Field>

        <Field>
          <Label>위도 (X)</Label>
          <FormInput value={form.mapX} readOnly type="number" disabled={mode === "edit"} />
        </Field>
        
        <Field>
          <Label>경도 (Y)</Label>
          <FormInput value={form.mapY} readOnly type="number" disabled={mode === "edit"} />
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
        <Textarea value={form.travelContent} onChange={e => setForm(p => ({ ...p, travelContent: e.target.value }))} />
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
    </AdminModal>
  );
};

export default TravelFormModal;
