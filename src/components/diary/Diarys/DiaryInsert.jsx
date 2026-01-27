import { useRef, useState } from "react";
import "./DiaryWrite.css";
import axios from "axios";
import { axiosPublic } from "../../../api/api";
import { useNavigate } from "react-router-dom";

const DiaryInsert = () => {
  const fileRef = useRef(null);
  const [imageFiles, setImageFiles] = useState([]); // ✅ 추가
  const [previews, setPreviews] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [region, setRegion] = useState("");
  const [theme, setTheme] = useState("");
  const navigate = useNavigate();

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

   if (region.trim() === "") {
    alert("지역을 선택해주세요.");
    return;
  }

     if (theme.trim() === "") {
    alert("테마를 선택해주세요.");
    return;
  }

    if (imageFiles.length === 0) {
    alert("이미지를 최소 1장 등록해주세요.");
    return;
    }

    try {
    // 이미지 업로드
    const formData = new FormData();
    imageFiles.forEach(file => {
      formData.append("images", file);
    });

    const imgRes = await axiosPublic.post(
      "/api/diarys/upload/diary-image",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    const imageUrls = imgRes.data; // ✅ S3 URL 리스트

    // 글 등록
    const diaryRes = await axiosPublic.post("/diarys", {
      title,
      content,
      region,
      theme
    });

    const diaryNo = diaryRes.data.diaryNo;

    // 이미지 DB 저장
    await axiosPublic.post("/diarys/upload/images", {
      diaryNo,
      imageUrls
    });
  
        alert("게시글이 등록되었습니다.");
        navigate(`/diarys/${diaryNo}`);
  } catch(err) {
    console.error(err);
    console.error("response", err.diaryRes);
    alert("등록 중 오류가 발생했습니다.");
    }
  };

  const handleCancel = () => {
     alert("취소 되었습니다.");
  };
  
  // const isValid =
  // title.trim().length > 0 &&
  // content.trim().length > 0 &&
  // previews.length > 0;

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
              <option value="서울">서  울</option>
              <option value="인천">인  천</option>
              <option value="경기">경  기</option>
              <option value="세종">세  종</option>
              <option value="강원도">강원도</option>
              <option value="제주도">제주도</option>
              <option value="충청남도">충청남도</option>
              <option value="충청북도">충청북도</option>
              <option value="전라남도">전라남도</option>
              <option value="전라북도">전라북도</option>
              <option value="경상남도">경상남도</option>
              <option value="경상북도">경상북도</option>
            </select>

            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="">테    마</option>
              <option value="호캉스">호 캉 스</option>
              <option value="전통 문화">전통 문화</option>
              <option value="액티 비티">액티 비티</option>
              <option value="자연/풍경">자연/풍경</option>
              <option value="바다/해변">바다/해변</option>
              <option value="캠핑/차박">캠핑/차박</option>
              <option value="전시/공연">전시/공연</option>
              <option value="계절 꽃놀이">계절 꽃놀이</option>
              <option value="식도락/맛집">식도락/맛집</option>
              <option value="기타">기타</option>
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
