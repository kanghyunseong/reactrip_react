import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosAuth } from "../../../api/api";
import "./DiaryWrite.css";

const REGION_OPTIONS = [
  { value: "", label: "지  역" },
  { value: 1, label: "서  울" },
  { value: 2, label: "인  천" },
  { value: 3, label: "경  기" },
  { value: 4, label: "세  종" },
  { value: 5, label: "강원도" },
  { value: 6, label: "제주도" },
  { value: 7, label: "충청남도" },
  { value: 8, label: "충청북도" },
  { value: 9, label: "전라남도" },
  { value: 10, label: "전라북도" },
  { value: 11, label: "경상남도" },
  { value: 12, label: "경상북도" },
];
const THEME_OPTIONS = [
  { value: "", label: "테    마" },
  { value: 1, label: "호 캉 스" },
  { value: 2, label: "전통 문화" },
  { value: 3, label: "액티 비티" },
  { value: 4, label: "자연/풍경" },
  { value: 5, label: "바다/해변" },
  { value: 6, label: "캠핑/차박" },
  { value: 7, label: "전시/공연" },
  { value: 8, label: "계절 꽃놀이" },
  { value: 9, label: "식도락/맛집" },
  { value: 10, label: "기타" },
];

const DiaryInsert = () => {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [previews, setPreviews] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [regionNo, setRegionNo] = useState("");
  const [themeNo, setThemeNo] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    const imageOnly = fileArray.filter((file) => file.type.startsWith("image/"));
    if (imageOnly.length === 0) return;

    setImageFiles((prev) => [...prev, ...imageOnly]);
    const readers = imageOnly.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then((images) => {
      setPreviews((prev) => [...prev, ...images]);
    });
  };

  const removePreview = (idx) => {
    setPreviews((prev) => prev.filter((_, i) => i !== idx));
    setImageFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const isValid =
    title.trim().length > 0 &&
    content.trim().length > 0 &&
    imageFiles.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || submitting) return;
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("로그인 후 이용해주세요.");
      navigate("/login");
      return;
    }
    setSubmitting(true);
    try {
      const memberNo = parseInt(localStorage.getItem("userNo"), 10) || 0;
      const dataPart = {
        diaryTitle: title,
        diaryContent: content,
        memberNo: memberNo || undefined,
        scheduleNo: 0,
        travelNo: 0,
        regionNo: regionNo ? Number(regionNo) : null,
        themeNo: themeNo ? Number(themeNo) : null,
      };
      const formData = new FormData();
      formData.append("data", new Blob([JSON.stringify(dataPart)], { type: "application/json" }));
      imageFiles.forEach((file) => formData.append("images", file));
      await axiosAuth.postFormData("/api/diarys", formData);
      toast.success("일기가 등록되었습니다.");
      navigate("/diarys");
    } catch (err) {
      console.error("일기 등록 실패:", err);
      const msg = err.response?.data?.message ?? err.message ?? "일기 등록에 실패했습니다.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/diarys");
  };

  return (
    <div className="diary-container">
      <form className="diary-form" onSubmit={handleSubmit}>

        {/* 왼쪽 */}
        <div className="left">
          <label>일기 제목 *</label>
          <input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>일기 내용 *</label>
          <textarea
            placeholder="내용을 입력해주세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="select-row">
            <select value={regionNo} onChange={(e) => setRegionNo(e.target.value)}>
              {REGION_OPTIONS.map((opt) => (
                <option key={opt.value || "region-all"} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <select value={themeNo} onChange={(e) => setThemeNo(e.target.value)}>
              {THEME_OPTIONS.map((opt) => (
                <option key={opt.value || "theme-all"} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 오른쪽 */}
        <div className="right">
               {/* 🔹 이미지 영역 wrapper (레이아웃용) */}
      <div className="image-area">

        {/* 🔹 실제 드래그 앤 드롭 기능 박스 */}
        <div
          className={`image-box ${isDragOver ? "dragover" : ""}`}
          onClick={() => fileRef.current.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragOver(false);
            handleFiles(e.dataTransfer.files);
          }}
        >
          {previews.length === 0 && (
            <span className="placeholder">
              이미지를 드래그하거나 클릭하세요
            </span>
          )}

          {/* 🔥 여러 장 미리보기 */}
          <div className="preview-grid">
            {previews.map((img, idx) => (
              <div key={idx} className="preview-item">
                <img src={img} alt="" />
                <button
                  type="button"
                  className="remove-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    removePreview(idx);
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <input
            type="file"
            multiple
            accept="image/*"
            ref={fileRef}
            hidden
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      </div>
        </div>

        {/* 🔹 버튼 영역 (완전히 분리) */}
        <div className="right-buttons">
          <button type="submit" className="submit" disabled={!isValid || submitting}>
            {submitting ? "등록 중..." : "등록"}
          </button>
          <button type="button" className="cancel" onClick={handleCancel}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default DiaryInsert;
