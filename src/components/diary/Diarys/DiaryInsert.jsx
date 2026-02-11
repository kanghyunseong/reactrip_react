import { useRef, useState, useEffect, useContext } from "react";
import "./DiaryWrite.css";
import { axiosAuth, axiosPublic } from "../../../api/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const DiaryInsert = () => {
  const { auth } = useContext(AuthContext);
  const fileRef = useRef(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [region, setRegion] = useState("");
  const [theme, setTheme] = useState("");
  const [scheduleList, setScheduleList] = useState([]);
  const [selectedScheduleNo, setSelectedScheduleNo] = useState("");
  const [scheduleLoading, setScheduleLoading] = useState(false);
  const navigate = useNavigate();

  // 로그인 시 내 스케줄 목록 로드 (일기와 연결할 일정 선택용)
  useEffect(() => {
    const userNo = localStorage.getItem("userNo");
    if (!userNo || userNo === "0") return;

    const fetchSchedules = async () => {
      setScheduleLoading(true);
      try {
        const res = await axiosAuth.getList("/api/schedules?page=1");
        const list = res?.data?.schedules ?? res?.schedules ?? [];
        setScheduleList(Array.isArray(list) ? list : []);
      } catch (e) {
        console.warn("스케줄 목록 로드 실패:", e);
        setScheduleList([]);
      } finally {
        setScheduleLoading(false);
      }
    };
    fetchSchedules();
  }, []);

  const handleFiles = (files) => {
  const fileArray = Array.from(files);

  const imageFiles = fileArray.filter(file =>
    file.type.startsWith("image/")
  );

   setImageFiles(prev => [...prev, ...imageFiles]);

  const readers = imageFiles.map(file => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  });

  Promise.all(readers).then(images => {
    setPreviews(prev => [...prev, ...images]);
  });
};

  const handleSubmit = async () => {
  if (title.trim() === "") {
    alert("제목을 입력해주세요.");
    return;
  }

  if (content.trim() === "") {
    alert("내용을 입력해주세요.");
    return;
  }
    if (region === "") {
     alert("지역을 선택해주세요.");
     return;
   }

      if (theme === "") {
     alert("테마를 선택해주세요.");
     return;
   }
  
    if (imageFiles.length === 0) {
    alert("이미지를 1만 등록해주세요.");
    return;
    }

    const userNo = localStorage.getItem("userNo");
    if (!userNo || userNo === "0") {
      alert("로그인 후 이용해주세요.");
      navigate("/login");
      return;
    }

    try {
    // 이미지 업로드
    const data = new FormData();
    imageFiles.forEach((file) => data.append("file", file));

    const imgRes = await axiosPublic.post(
      "/api/diarys/upload/diary-image",
      data
    );
    const imageUrls = Array.isArray(imgRes) ? imgRes : imgRes?.data ?? [];
    const imageUrl = imageUrls[0] ?? "";

    const diaryRes = await axiosPublic.post("/api/diarys/insert", {
      diaryTitle: title,
      diaryContent: content,
      regionNo: Number(region) || 0,
      themeNo: Number(theme) || 0,
      memberNo: Number(userNo),
      scheduleNo: Number(selectedScheduleNo) || 0,
      travelNo: 0,
      imageUrl,
    });
    const diaryNo = diaryRes?.data ?? diaryRes;

    alert("게시글이 등록되었습니다.");
    navigate(`/diarys/detail/${diaryNo}`);
  } catch (err) {
    console.error("일기 등록 실패:", err?.response?.data ?? err);
    alert(err?.response?.data?.message ?? "등록 중 오류가 발생했습니다.");
  }
  };

  const handleCancel = () => {
     alert("취소 되었습니다.");
     navigate(`/diarys`);
  };
  
  return (
    <div className="diary-container">
      <div className="diary-form">

        {/* 왼쪽 */}
        <div className="left">
          <label>일기 제목 *</label>
          <input 
            type="text" 
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)} />

          <label>일기 내용 *</label>
          <textarea 
            placeholder="내용을 입력해주세요."
            value={content}
            onChange={(e) => setContent(e.target.value)} />

          <div className="select-row">
            <select value={region} onChange={(e) => setRegion(e.target.value)}>
              <option value="">지  역</option>
              <option value="1">서  울</option>
              <option value="2">인  천</option>
              <option value="3">경  기</option>
              <option value="4">세  종</option>
              <option value="5">강원도</option>
              <option value="6">제주도</option>
              <option value="7">충청남도</option>
              <option value="8">충청북도</option>
              <option value="9">전라남도</option>
              <option value="10">전라북도</option>
              <option value="11">경상남도</option>
              <option value="12">경상북도</option>
            </select>

            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="">테    마</option>
              <option value="1">호 캉 스</option>
              <option value="2">전통 문화</option>
              <option value="3">액티 비티</option>
              <option value="4">자연/풍경</option>
              <option value="5">바다/해변</option>
              <option value="6">캠핑/차박</option>
              <option value="7">전시/공연</option>
              <option value="8">계절 꽃놀이</option>
              <option value="9">식도락/맛집</option>
              <option value="10">기타</option>
            </select>
          </div>

          <label>연결할 일정 (선택)</label>
          <select
            className="schedule-select"
            value={selectedScheduleNo}
            onChange={(e) => setSelectedScheduleNo(e.target.value)}
            disabled={scheduleLoading}
          >
            <option value="">선택 안 함</option>
            {scheduleList.map((s) => (
              <option key={s.scheduleNo} value={s.scheduleNo}>
                {s.scheduleName || `일정 ${s.scheduleNo}`}
                {s.travelStart ? ` (${s.travelStart}${s.travelEnd ? ` ~ ${s.travelEnd}` : ""})` : ""}
              </option>
            ))}
          </select>
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
                  className="remove-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviews(previews.filter((_, i) => i !== idx));
                    setImageFiles(prev => prev.filter((_, i) => i !== idx));
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

      {/* 🔹 버튼 영역 (완전히 분리) */}
      <div className="right-buttons">
        <button className="submit" onClick={handleSubmit}>등록</button>
       
        <button className="cancel" onClick={handleCancel}>취소</button>
      </div>

    </div>
  </div>
</div>
  );
};

export default DiaryInsert;
