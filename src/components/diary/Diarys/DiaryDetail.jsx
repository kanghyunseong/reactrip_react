import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { detailStyles } from "./Detail.styles";

export default function DiaryDetail() {
  const { diaryNo } = useParams();
  const navigate = useNavigate();

  const [diary, setDiary] = useState(null);

  useEffect(() => {
    axios
      .post("http://localhost:8081/api/diarys/detail", {
        diaryNo: diaryNo,
      })
      .then((res) => {
        setDiary(res.data);
      })
      .catch((e) => {
        console.error(e);
        alert("일기 조회 실패");
      });
  }, [diaryNo]);

  if (!diary) return <div style={{ padding: "40px" }}>로딩중...</div>;

  return (
    <div style={detailStyles.page}>
      <div style={detailStyles.wrapper}>
        <div style={detailStyles.layout}>

        {/* ================= 왼쪽 영역 ================= */}
        <div style={detailStyles.leftSection}>
          <h2 style={detailStyles.title}>{diary.diaryTitle}</h2>

          <div style={detailStyles.content}>
            {diary.diaryContent}
          </div>

          <div style={detailStyles.author}>
            작성자: {diary.memberName}
          </div>

          <div style={detailStyles.footer}>
            <div style={detailStyles.buttonGroup}>
              <button
                style={detailStyles.button}
                onClick={() => navigate("/diarys")}
              >
                목록
              </button>
              <button style={detailStyles.button}>수정</button>
              <button style={detailStyles.deleteButton}>삭제</button>
            </div>

            <button style={detailStyles.likeButton}>
              ❤️ 좋아요
            </button>
          </div>
        </div>
      </div>
        {/* ================= 오른쪽 영역 ================= */}
        <div style={detailStyles.rightSection}>
            <div style={detailStyles.imageBox}>
          {/* 이미지 */}
          <img
            src={
              diary.imageUrl ||
              "https://us.123rf.com/450wm/oculo/oculo2004/oculo200400003/143645399-no-image-available-icon.jpg"
            }
            alt="diary"
            style={detailStyles.image}
          />
          <div style={detailStyles.imageCaption} />
          {/* 댓글 영역 (UI 미리보기용) */}
          <div style={detailStyles.commentBox}>
            <h4 style={detailStyles.commentTitle}>댓글</h4>

            <div style={detailStyles.comment}>
              작성자 : {diary.comment}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
