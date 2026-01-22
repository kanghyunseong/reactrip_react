import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './Detail.css';

export default function DiaryDetail() {
  const { diaryNo } = useParams();
  const navigate = useNavigate();

  const [diary, setDiary] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);



  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/diarys/${diaryNo}`)
      .then((res) => {
        setDiary(res.data);
        getCommentList(res.data.diaryNo);
      })
      .catch((e) => {
        // console.error(e);
        alert("일기 조회 실패");
      });
  }, [diaryNo]);

  const getCommentList = (diaryNo, pageNum = 1) => {
    axios
      .get(`http://localhost:8081/api/diarys/${diaryNo}/comments`, {
        params: { page: pageNum, size: 5 }
      })
      .then((res) => {
        const list = res.data?.listVo ?? [];
        // console.log("댓글:", res.data);

        setComments(res.data?.listVo ?? []);
        setPage(res.data?.page ?? 1);
        setTotalPage(res.data?.totalPage ?? 1);
      })
      .catch((e) => {
        // console.error(e);
        alert("댓글 가져오는도중오류 " + e);
      });
  }

  const changePage = (pageNum) => {
  if (pageNum < 1 || pageNum > totalPage) return;
  getCommentList(diary.diaryNo, pageNum);
};

  const handleCommentSubmit = () => {
  if (!commentContent.trim()) {
    alert("댓글 내용을 입력하세요");
    return;
  }

  axios
    .post(`http://localhost:8081/api/diarys/${diaryNo}/comments`, {
      diaryNo: diary.diaryNo,
      commentContent: commentContent,
    })
    .then(() => {
      setCommentContent("");
      getCommentList(diary.diaryNo, page); // 댓글 새로고침
    })
    .catch((e) => {
      // console.error(e);
      alert("댓글 등록 실패");
    });
};



  if (!diary) return <div style={{ padding: "40px" }}>로딩중...</div>;

  const imageList = diary.imageUrls && diary.imageUrls.length > 0
  ? diary.imageUrls
  : diary.imageUrl
    ? [diary.imageUrl]
    : [
      "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjAxMTZfMTc2%2FMDAxNjQyMzEyMzQ1MjEw.9ikPFxWOhHmgP1Iy2KjpIrHu2REYQ2xlOpoByXTquzkg.DJotPWICgNpoK4g_9ugGcJJwhAqF5NTYfYUNDxeK3wwg.JPEG.hmjgreat%2FIMG_2760.JPG&type=sc960_832",
      "https://us.123rf.com/450wm/oculo/oculo2004/oculo200400003/143645399-no-image-available-icon.jpg"
      ];

  const prevImage = () => {
  setCurrentImageIndex((prev) =>
    prev === 0 ? imageList.length - 1 : prev - 1
  );
};

const nextImage = () => {
  setCurrentImageIndex((prev) =>
    prev === imageList.length - 1 ? 0 : prev + 1
  );
};

  return (
    
    <div className="diary-detail">

  {/* ================= 왼쪽 ================= */}
  <div className="diary-content">
    <p className="writer">
      작성자: {diary.memberName} / 작성일: {diary.createdDate} </p>
   
    <h2 className="title">
      제목 : {diary.diaryTitle}</h2>
   
    <p className="content">
      내용 : {diary.diaryContent}</p>
   
   <hr className="divider" />

   <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

    {/* 댓글 입력 */}
    <div className="comment-input">
      <textarea
        placeholder="댓글을 입력하세요"
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
      />
      <button onClick={handleCommentSubmit}>등록</button>
    </div>

    {/* 버튼 */}
    <div className="button-group">
      <button onClick={() => navigate("/diarys")}>목록</button>
      <button>수정</button>
      <button>삭제</button>
      <button>❤️좋아요</button>
    </div>
  </div>

    {/* ================= 오른쪽 ================= */}
<div className="diary-image">

  {/* 이미지 영역 */}
  <div className="image-wrapper">
    <img
      src={imageList[currentImageIndex]}
      alt="diary"
    />

    {/* 🔥 이미지 여러 장일 때만 버튼 표시 */}
    {imageList.length > 1 && (
      <>
        <button className="image-nav left" onClick={prevImage}>◀</button>
        <button className="image-nav right" onClick={nextImage}>▶</button>
      </>
    )}
  </div>

 {/* 댓글 목록 */}
<div className="comment-section">
  <h4 className="comment-title">
    댓글 <span>{comments?.length || 0}</span>
  </h4>

  {comments?.length === 0 ? (
    <div className="no-comment">작성된 댓글이 없습니다.</div>
  ) : (
    comments.map((item) => (
      <div key={item.commentNo} className="comment-item">
        
        {/* 프로필 */}
        <div className="comment-avatar" />

        {/* 내용 */}
        <div className="comment-body">
          <div className="comment-header">
            <span className="comment-writer">
              {item.commentWriteName}
            </span>
            <span className="comment-date">
              {item.createdDate}
            </span>
          </div>

          <p className="comment-content">
            {item.commentContent}
          </p>
        </div>

      </div>
    ))
  )}
</div>
{/* 댓글 페이징 */}
{totalPage > 1 && (
  <div className="comment-pagination">

    <button
      disabled={page === 1}
      onClick={() => changePage(page - 1)}
    >
      이전
    </button>

    {Array.from({ length: totalPage }, (_, i) => i + 1).map((num) => (
      <button
        key={num}
        className={num === page ? "active" : ""}
        onClick={() => changePage(num)}
      >
        {num}
      </button>
    ))}

    <button
      disabled={page === totalPage}
      onClick={() => changePage(page + 1)}
    >
      다음
    </button>

  </div>
)}
  </div>
</div>

  );
}
