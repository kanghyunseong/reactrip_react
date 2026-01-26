import { useRef, useState } from "react";
import "./DiaryWrite.css";

const DiaryInsert = () => {
  const fileRef = useRef(null);
  const [previews, setPreviews] = useState([]);
  const [imageFile, setImageFile] = useState(null); // ✅ 추가
  const [isDragOver, setIsDragOver] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleFiles = (files) => {
  const fileArray = Array.from(files);

  const imageFiles = fileArray.filter(file =>
    file.type.startsWith("image/")
  );

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

  const isValid =
  title.trim().length > 0 &&
  content.trim().length > 0 &&
  previews.length > 0;

  return (
    <div className="diary-container">
      <div className="diary-form">

        {/* 왼쪽 */}
        <div className="left">
          <label>일기 제목 *</label>
          <input 
            type="text" 
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)} />

          <label>일기 내용 *</label>
          <textarea 
            placeholder="내용을 입력해주세요."
            value={content}
            onChange={(e) => setContent(e.target.value)} />

          <div className="select-row">
            <select>
              <option>지  역</option>
              <option>서  울</option>
              <option>인  천</option>
              <option>경  기</option>
              <option>세  종</option>
              <option>강원도</option>
              <option>제주도</option>
              <option>충청남도</option>
              <option>충청북도</option>
              <option>전라남도</option>
              <option>전라북도</option>
              <option>경상남도</option>
              <option>경상북도</option>
            </select>

            <select>
              <option>테    마</option>
              <option>호 캉 스</option>
              <option>전통 문화</option>
              <option>액티 비티</option>
              <option>자연/풍경</option>
              <option>바다/해변</option>
              <option>캠핑/차박</option>
              <option>전시/공연</option>
              <option>계절 꽃놀이</option>
              <option>식도락/맛집</option>
              <option>기타</option>
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
        <button className="submit" disabled={!isValid}>  등록</button>
       
        <button className="cancel">취소</button>
      </div>

    </div>
  </div>
</div>
  );
};

export default DiaryInsert;
