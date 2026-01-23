import React, { useState, useEffect } from "react";
import axios from "axios";
import { listStyles } from "./DiaryList.styles";
import Pagination from "../Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import { axiosPublic } from "../../../api/api";

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

  useEffect(() => {
    const fetchDiaries = async () => {
      setLoading(true);
      try {
        const size = 5;

        const res = await axiosPublic.getActual(
          `/api/diarys?page=${currentPage}&size=5`,
          {
            params: { page: currentPage, size: 5 },
          }
        );

        console.log("목록 : ", res);

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

  // ✅ 클릭 시 화면 이동만!
  const handleClick = (diaryNo) => {
    navigate(`/diarys/detail/${diaryNo}`);
  };

  if (loading) {
    return (
      <p style={{ textAlign: "center", padding: "20px" }}>
        다이어리를 불러오는 중입니다...
      </p>
    );
  }

  return (
    <div style={listStyles.listWrapper}>
      <button>일 기 작 성</button>
      {diarys.length === 0 ? (
        <p>작성된 다이어리가 없습니다.</p>
      ) : (
        diarys.map((item) => (
          <div key={item.diaryNo} style={listStyles.listItem}>
            {/* 썸네일 */}
            <div
              style={listStyles.thumbnailBox}
              onClick={() => handleClick(item.diaryNo)}
              >
              <img
                src={
                  item.thumbnailUrl ||
                  "https://us.123rf.com/450wm/oculo/oculo2004/oculo200400003/143645399-no-image-available-icon.jpg"
                }
                alt="썸네일"
                style={listStyles.thumbnailImg}
              />
            </div>

            {/* 본문 */}
            <div
              style={listStyles.listMain}
              onClick={() => handleClick(item.diaryNo)}
            >
              <h3 style={listStyles.listTitle}>{item.diaryTitle}</h3>
              <p style={listStyles.listText}>{item.diaryContent}</p>
              <span style={listStyles.listDate}>
                작성일자: {item.createdDate} / 작성자: {item.memberName} /
                조회수: {item.count}
              </span>
            </div>

            <div
              style={listStyles.arrow}
              onClick={() => handleClick(item.diaryNo)}
            >
              →
            </div>
          </div>
        ))
      )}

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageInfo={pageInfo}
      />
    </div>
  );
};

export default DiaryList;
