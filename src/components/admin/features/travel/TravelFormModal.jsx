import React, { useEffect, useState } from "react";
import Modal from "../../../common/ui/Modal";
import FileUpload from "../../../common/ui/FileUpload";
import AddressSearchModal from "./AddressSearchModal";
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
} from "../../ui/AdminUI.styles";
import { toast } from "react-toastify";
import { getImageUrl } from "../../../../utils/imageUrl";

const empty = {
  travelNo: "",
  travelName: "",
  travelAddress: "",
  mapX: "",
  mapY: "",
  travelStatus: "N",
  regionNo: "",
  travelContent: "",
};

const TravelFormModal = ({ open, mode = "create", initialValue, onClose, onSubmit }) => {
  const [form, setForm] = useState(empty);
  const [file, setFile] = useState(null);
  const [showAddressSearch, setShowAddressSearch] = useState(false);
  const { regions, loading: loadingRegions } = useRegions(open, initialValue);
  const [errors, setErrors] = useState({});

  const normalizeRegionToken = (token) => {
    if (!token) return "";
    const travelToken = String(token).trim();
    if (travelToken.endsWith("특별자치도")) return travelToken.replace("특별자치도", "도");
    return travelToken;
  };

  useEffect(() => {
    if (!open) return;
    setForm({ ...empty, ...(initialValue || {}) });
    setFile(null);
    setErrors({});
  }, [open, initialValue]);

  const handleSelectAddress = (place) => {
    const y = place.y || ""; // 위도
    const x = place.x || ""; // 경도
    const fullAddress = place.road_address_name
      ? `${place.road_address_name} ${place.place_name}`.trim()
      : `${place.address_name} ${place.place_name}`.trim();

    // region 자동 매칭
    const addressToken = normalizeRegionToken(
      (place?.road_address_name || place?.address_name || "").split(" ")[0]
    );
    const matched = (regions || []).find((r) => normalizeRegionToken(r?.regionName) === addressToken);

    setForm((prev) => ({
      ...prev,
      travelAddress: fullAddress,
      mapY: y,
      mapX: x,
      regionNo: matched?.regionNo ?? prev.regionNo,
    }));

    setShowAddressSearch(false);
  };

  const validate = () => {
    const next = {};
    if (!String(form.travelName || "").trim()) next.travelName = "여행지명을 입력해주세요.";
    if (!String(form.regionNo || "").trim()) next.regionNo = "지역을 선택해주세요.";
    if (!String(form.travelAddress || "").trim()) next.travelAddress = "주소를 입력해주세요.";
    if (!String(form.mapX || "").trim() || !String(form.mapY || "").trim()) next.map = "위치(좌표)가 필요합니다.";
    if (!String(form.travelContent || "").trim()) next.travelContent = "설명을 입력해주세요.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const title = mode === "edit" ? "여행지 수정" : "여행지 등록";

  return (
    <>
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
                if (!validate()) {
                  toast.error("필수 입력값을 확인해주세요.");
                  return;
                }
                onSubmit?.(form, file);
              }}
            >
              저장
            </ToolbarPrimaryButton>
          </>
        }
      >
        <FormGrid>
          <Field>
            <Label>여행지명</Label>
            <FormInput
              value={form.travelName || ""}
              onChange={(e) => setForm((p) => ({ ...p, travelName: e.target.value }))}
              placeholder="예) 남산타워"
            />
            {errors.travelName ? <Help $danger>{errors.travelName}</Help> : null}
          </Field>

          <Field>
            <Label>지역</Label>
            <Select
              value={form.regionNo || ""}
              onChange={(e) => setForm((p) => ({ ...p, regionNo: e.target.value }))}
              disabled={loadingRegions}
            >
              <option value="">{loadingRegions ? "불러오는 중..." : "지역 선택"}</option>
              {(regions || []).map((r) => (
                <option key={r.regionNo} value={r.regionNo}>
                  {r.regionName}
                </option>
              ))}
            </Select>
            {errors.regionNo ? <Help $danger>{errors.regionNo}</Help> : null}
          </Field>

          <Field style={{ gridColumn: "1 / -1" }}>
            <Label>주소</Label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <FormInput value={form.travelAddress || ""} readOnly placeholder="주소 검색을 통해 입력" />
              <Button type="button" onClick={() => setShowAddressSearch(true)}>
                검색
              </Button>
            </div>
            {errors.travelAddress ? <Help $danger>{errors.travelAddress}</Help> : null}
          </Field>

          <Field>
            <Label>경도(X)</Label>
            <FormInput value={form.mapX || ""} readOnly placeholder="주소 검색 시 자동 입력" />
          </Field>

          <Field>
            <Label>위도(Y)</Label>
            <FormInput value={form.mapY || ""} readOnly placeholder="주소 검색 시 자동 입력" />
          </Field>

          {errors.map ? (
            <Field style={{ gridColumn: "1 / -1" }}>
              <Help $danger>{errors.map}</Help>
            </Field>
          ) : null}

          <Field style={{ gridColumn: "1 / -1" }}>
            <Label>설명</Label>
            <Textarea
              value={form.travelContent || ""}
              onChange={(e) => setForm((p) => ({ ...p, travelContent: e.target.value }))}
              placeholder="여행지 설명을 입력하세요"
            />
            {errors.travelContent ? <Help $danger>{errors.travelContent}</Help> : null}
          </Field>

          <Field style={{ gridColumn: "1 / -1" }}>
            <Label>이미지</Label>
            <FileUpload
              preview={getImageUrl(form.travelImage || form.image)}
              onFileChange={(f) => setFile(f)}
              previewSize="6.25rem"
            />
          </Field>
        </FormGrid>
      </Modal>

      <AddressSearchModal
        open={showAddressSearch}
        onClose={() => setShowAddressSearch(false)}
        onSelect={handleSelectAddress}
      />
    </>
  );
};

export default TravelFormModal;

