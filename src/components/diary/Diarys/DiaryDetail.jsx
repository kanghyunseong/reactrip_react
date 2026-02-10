import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './Detail.css';
import { axiosPublic } from "../../../api/api";
import { AuthContext } from "../../../context/AuthContext";


export default function DiaryDetail() {
  const { auth } = useContext(AuthContext);
  console.log("login : " + auth.userNo);
  console.log("login : " + auth.userName);
  const { diaryNo } = useParams();
  const navigate = useNavigate();

  const [diary, setDiary] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const Default_Image = "/logoImg.png";
  
  useEffect(() => {
    axiosPublic
      .getActual(`/api/diarys/${diaryNo}`)
      .then((data) => {
        console.log("상세조회 : ", data);
        setDiary(data);

        getCommentList(data.diaryNo);
      })
      .catch((e) => {
        console.error(e);
        alert("일기 조회 실패");
      });
  }, [diaryNo]);

  const getCommentList = (diaryNo, pageNum = 1) => {
    axiosPublic
      .getActual(`/api/diarys/${diaryNo}/comments`, {
        params: { page: pageNum, size: 5 }
      })
      .then((data) => {
        // console.log("댓글:", res.data);

        setComments(data.listVo ?? []);
        setPage(data?.page ?? 1);
        setTotalPage(data.totalPage ?? 1);
      })
      .catch((e) => {
        console.error(e);
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
    .post(`/api/diarys/${diaryNo}/comments`, {
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

  const imageList = Array.isArray(diary.imageUrls) && diary.imageUrls.length > 0
    ? diary.imageUrls.filter(Boolean)
    : [Default_Image];

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
      <div className="diary-detail-inner">
        {/* 왼쪽: 본문 */}
        <div className="diary-content">
          <p className="writer">
            작성자: {diary.memberName} · 작성일: {diary.createdDate}
          </p>
          <h2 className="title">{diary.diaryTitle}</h2>
          <p className="content">{diary.diaryContent}</p>
          <hr className="divider" />

          {/* 댓글 입력 */}
          <div className="comment-input">
            <textarea
              placeholder="댓글을 입력하세요"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            />
            <button onClick={handleCommentSubmit}>등록</button>
          </div>

          <div className="button-group">
            <button onClick={() => navigate("/diarys")}>목록</button>
            {auth.userNo === diary.memberNo && (
              <>
                <button>수정</button>
                <button>삭제</button>
              </>
            )}
            <button>❤️ 좋아요</button>
          </div>
        </div>

        {/* 오른쪽: 이미지 + 댓글 목록 */}
        <div className="diary-image">

          <div className="image-slider">
            <img
              src={imageList[currentImageIndex]}
              alt="일기 이미지"
              className="slider-image"
            />
            {imageList.length > 1 && (
              <>
                <button className="arrow left" onClick={prevImage}>‹</button>
                <button className="arrow right" onClick={nextImage}>›</button>
              </>
            )}
          </div>

          <div className="comment-section">
            <h4 className="comment-title">
              댓글 <span>{comments?.length || 0}</span>
            </h4>
            {comments?.length === 0 ? (
              <div className="no-comment">작성된 댓글이 없습니다.</div>
            ) : (
              comments.map((item) => (
                <div key={item.commentNo} className="comment-item">
                  <div className="comment-avatar" />
                  <div className="comment-body">
                    <div className="comment-header">
                      <span className="comment-writer">{item.commentWriteName}</span>
                      <span className="comment-date">{item.createdDate}</span>
                    </div>
                    <p className="comment-content">{item.commentContent}</p>
                  </div>
                </div>
              ))
            )}
            {totalPage > 1 && (
              <div className="comment-pagination">
                <button disabled={page === 1} onClick={() => changePage(page - 1)}>이전</button>
                {Array.from({ length: totalPage }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    className={num === page ? "active" : ""}
                    onClick={() => changePage(num)}
                  >
                    {num}
                  </button>
                ))}
                <button disabled={page === totalPage} onClick={() => changePage(page + 1)}>다음</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
