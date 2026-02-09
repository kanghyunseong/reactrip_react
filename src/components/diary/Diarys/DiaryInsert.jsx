import { useRef, useState, useContext } from "react";
import "./DiaryWrite.css";
import axios from "axios";
import { axiosPublic } from "../../../api/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const DiaryInsert = () => {
  const { auth } = useContext(AuthContext);
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
    console.log("call start !!");
  if (title.trim() === "") {
    alert("제목을 입력해주세요.");
    return;
  }

  if (content.trim() === "") {
    alert("내용을 입력해주세요.");
    return;
  }
  console.log("call start !!" + region);
    if (region === "") {
     alert("지역을 선택해주세요.");
     return;
   }

      if (theme === "") {
     alert("테마를 선택해주세요.");
     return;
   }
  console.log("이미지 갯수 : " + imageFiles.length);
  
    if (imageFiles.length === 0) {
    alert("이미지를 1만 등록해주세요.");
    return;
    }

    try {
      console.log("업로드 !!");
    // 이미지 업로드
    const data = new FormData();
    imageFiles.forEach(file => {
      console.log("file 정보 : "+ {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
      });
      data.append("file", file);
    });

    console.log("업로드2 ---> " + JSON.stringify(data.file));
    const imgRes = await axiosPublic.post(
      "/api/diarys/upload/diary-image",
      data
    );
  console.log("업로드3 !!  --> " + imgRes[0]);
    //const imageUrls = imgRes.data; // ✅ S3 URL 리스트
    const userNo = localStorage.getItem("userNo");
    console.log("login memberNo -->" + JSON.stringify(userNo));
    // 글 등록 
    const diaryRes = await axiosPublic.post("/api/diarys/insert", {
      diaryTitle: title,
      diaryContent: content,
      regionNo: Number(region),
      themeNo: Number(theme),
      memberNo: Number(userNo),
      scheduleNo : 5,
      travelNo :1,
      imageUrl: imgRes[0]
    }
  );
    console.log("등록 완료 : " + diaryRes);
     const diaryNo = diaryRes;

  
        alert("게시글이 등록되었습니다.");
        navigate(`/diarys/detail/${diaryNo}`);
  } catch(err) {
    console.error(err);
    console.error("response", err.diaryRes);
    alert("등록 중 오류가 발생했습니다.");
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
