import React, { useState, useEffect } from "react";
import Pagination from "../Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import { axiosPublic } from "../../../api/api";
import "./DiaryWrite.css";
import "./DiaryList.css";

const DiaryList = () => {
  const [diarys, setDiarys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({
    startPage: 1,
    endPage: 1,
    totalPage: 1,
  });

  const navigate = useNavigate();

  const handleWrite = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인 후 이용해주세요.");
      navigate("/login");
      return;
    }
    navigate("/diarys/insert");
  };

  useEffect(() => {
    const fetchDiaries = async () => {
      setLoading(true);
      try {
        const size = 5;
        const res = await axiosPublic.getActual(
          `/api/diarys?page=${currentPage}&size=5`,
          { params: { page: currentPage, size: 5 } }
        );
        setDiarys(res.diary ?? []);

        const serverCurrentPage = Number(res.currentPage ?? currentPage);
        const totalCnt = Number(res.totalCnt ?? 0);
        const totalPage = Math.max(1, Math.ceil(totalCnt / size));
        const blockSize = 5;
        const startPage =
          Math.floor((serverCurrentPage - 1) / blockSize) * blockSize + 1;
        const endPage = Math.min(startPage + blockSize - 1, totalPage);
        setPageInfo({ startPage, endPage, totalPage });
      } catch (error) {
        console.error("목록 로드 실패:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDiaries();
  }, [currentPage]);

  const handleClick = (diaryNo) => {
    navigate(`/diarys/detail/${diaryNo}`);
  };

  if (loading) {
    return (
      <div className="diary-list-page">
        <p className="diary-list-empty">다이어리를 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="diary-list-page">
      <div className="diary-list-header">
        <span className="diary-list-spacer" />
        <button className="diary-list-write-btn" onClick={handleWrite}>
          일기 작성
        </button>
      </div>

      <div className="diary-list-inner">
        {diarys.length === 0 ? (
          <p className="diary-list-empty">작성된 다이어리가 없습니다.</p>
        ) : (
          diarys.map((item) => (
            <div
              key={item.diaryNo}
              className="diary-card"
              onClick={() => handleClick(item.diaryNo)}
            >
              <div className="diary-card-thumb">
                <img
                  src={item.thumbnailUrl || item.imageUrl}
                  alt="썸네일"
                />
              </div>
              <div className="diary-card-body">
                <h3 className="diary-card-title">{item.diaryTitle}</h3>
                <p className="diary-card-preview">{item.diaryContent}</p>
                <span className="diary-card-meta">
                  {item.createdDate} · {item.memberName} · 조회 {item.count}
                </span>
              </div>
              <span className="diary-card-arrow">→</span>
            </div>
          ))
        )}
      </div>

      {diarys.length > 0 && (
        <div className="diary-pagination">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageInfo={pageInfo}
          />
        </div>
      )}
    </div>
  );
};

export default DiaryList;
