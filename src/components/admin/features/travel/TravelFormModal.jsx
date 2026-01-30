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
import { THEME_OPTIONS } from "../../../../constants/constants";

const empty = {
  travelNo: "",
  travelName: "",
  travelAddress: "",
  mapX: "",
  mapY: "",
  travelStatus: "N",
  regionNo: "",
  themeNo: "",
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
    let s = String(token).trim().replace(/\s+/g, "");

    // 주소 축약 토큰 매핑 (카카오: "경기", "경남" 등)
    const abbr = {
      서울: "서울",
      부산: "부산",
      대구: "대구",
      인천: "인천",
      광주: "광주",
      대전: "대전",
      울산: "울산",
      세종: "세종",
      경기: "경기",
      강원: "강원",
      충북: "충청북",
      충남: "충청남",
      전북: "전라북",
      전남: "전라남",
      경북: "경상북",
      경남: "경상남",
      제주: "제주",
    };
    if (abbr[s]) s = abbr[s];

    // "서울특별시" / "경기도" / "제주특별자치도" → 공통 비교 키
    s = s.replace(/특별자치도|특별자치시|광역시|특별시/g, "");
    s = s.replace(/(도|시)$/g, "");

    return s;
  };

  useEffect(() => {
    if (!open) return;
    const from = initialValue || {};
    setForm({
      ...empty,
      ...from,
      regionNo: from.regionNo != null ? String(from.regionNo) : "",
      themeNo: from.themeNo != null ? String(from.themeNo) : "",
    });
    setFile(null);
    setErrors({});
  }, [open, initialValue]);

  const handleSelectAddress = (place) => {
    const y = place.y || ""; // 위도
    const x = place.x || ""; // 경도
    const placeName = (place?.place_name || "").trim();
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
      // 등록(create)에서는 장소명을 자동으로 채워주고,
      // 수정(edit)에서는 사용자가 이미 입력한 값이 있으면 덮어쓰지 않는다.
      travelName: mode === "edit" && String(prev.travelName || "").trim() ? prev.travelName : (placeName || prev.travelName),
      travelAddress: fullAddress,
      mapY: y,
      mapX: x,
      regionNo: matched?.regionNo ?? prev.regionNo,
    }));

    setShowAddressSearch(false);
  };

  // regions 로딩이 주소 선택보다 늦어도 자동 매칭되게 보강
  useEffect(() => {
    if (!open) return;
    if (!form?.travelAddress) return;
    if (String(form?.regionNo || "").trim()) return;
    if (!Array.isArray(regions) || regions.length === 0) return;

    const firstToken = normalizeRegionToken(String(form.travelAddress).split(" ")[0]);
    if (!firstToken) return;

    const matched = regions.find((r) => normalizeRegionToken(r?.regionName) === firstToken);
    if (!matched?.regionNo) return;

    setForm((prev) => {
      if (String(prev.regionNo || "").trim()) return prev;
      return { ...prev, regionNo: matched.regionNo };
    });
  }, [open, regions, form.travelAddress, form.regionNo]);

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

          <Field>
            <Label>테마</Label>
            <Select
              value={form.themeNo ?? ""}
              onChange={(e) => setForm((p) => ({ ...p, themeNo: e.target.value || undefined }))}
            >
              {THEME_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </Select>
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

