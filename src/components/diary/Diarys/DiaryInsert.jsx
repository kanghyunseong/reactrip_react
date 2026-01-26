import { useRef, useState } from "react";
import "./DiaryWrite.css";

const DiaryInsert = () => {
  const fileRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null); // ✅ 추가
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드할 수 있습니다.");
      return;
    }

    setImageFile(file); // ✅ 서버 전송용

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="diary-container">
      <div className="diary-form">

        {/* 왼쪽 */}
        <div className="left">
          <label>일기 제목 *</label>
          <input type="text" placeholder="제목" />

          <label>일기 내용 *</label>
          <textarea placeholder="내용을 입력해주세요." />

          <div className="select-row">
            <select>
              <option>지역</option>
              <option>경기</option>
              <option>충청도</option>
              <option>강원도</option>
              <option>전라도</option>
            </select>

            <select>
              <option>테마</option>
              <option>자연</option>
              <option>역사</option>
              <option>감성</option>
              <option>체험</option>
              <option>힐링</option>
            </select>
          </div>
        </div>

        {/* 오른쪽 */}
        <div className="right">
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
              handleFile(e.dataTransfer.files[0]);
            }}
          >
            {!preview && (
              <span className="placeholder">
                이미지를 드래그하거나 클릭하세요
              </span>
            )}
            {preview && <img src={preview} alt="미리보기" />}

            <input
              type="file"
              accept="image/*"
              ref={fileRef}
              hidden
              onChange={(e) => handleFile(e.target.files[0])}
            />
          </div>
        </div>
      </div>

      {/* 버튼 */}
      <div className="button-area">
        <button className="submit">등록</button>
        <button className="cancel">취소</button>
      </div>
    </div>
  );
};

export default DiaryInsert;
