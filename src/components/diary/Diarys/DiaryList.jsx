import React, { useState, useEffect } from "react";
import axios from "axios";
import { listStyles } from "./DiaryList.styles";
import Pagination from "../Pagination/Pagination";


const DiaryList = () => {
  const [diarys, setDiarys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({
        startPage: 1,
        endPage: 1,
        totalPage: 1
    });

  useEffect(() => {
    const fetchDiaries = async () => {
      setLoading(true);
      try {
      const size = 5;
      const offset = (currentPage - 1) * size;

      console.log("offset" + offset );
      console.log("size" + size );
      console.log("currentPage : " + currentPage );
      const response = await axios
            .get("http://localhost:8081/api/diarys", {
              params: { page: currentPage, size },
        });
        // 백엔드 Map 구조에서 diaryList만 추출
        setDiarys(response.data.diary || []);
        //console.log(response.data.diary);
        console.log(response.data);

      const serverCurrentPage = Number(response.data.currentPage ?? currentPage);
      const totalCnt = Number(response.data.totalCnt ?? 0);
      
      const totalPage = Math.max(1, Math.ceil(totalCnt / size));
      const blockSize = 5;
      const startPage = Math.floor((serverCurrentPage - 1) / blockSize) * blockSize + 1;
      const endPage = Math.min(startPage + blockSize - 1, totalPage);
      console.log("startPage",  startPage);
      console.log("endPage",  endPage);
      console.log("totalPage",  totalPage);
      setPageInfo({ startPage, endPage, totalPage });
      } catch (error) {
        console.error("목록 로드 실패:", error);

      } finally {
        setLoading(false);
      }
    };
    fetchDiaries();
  }, [currentPage]);

  if (loading) return <p style={{ textAlign: "center", padding: "20px" }}>다이어리를 불러오는 중입니다...</p>;

  return (
    <div style={listStyles.listWrapper}>
      {diarys.length === 0 ? (
        <p>작성된 다이어리가 없습니다.</p>
      ) : (
        diarys.map((item) => (
          <div key={item.diaryNo} style={listStyles.listItem}>
            {/* 썸네일 이미지 영역 */}
            <div style={listStyles.thumbnailBox}>
              <img 
                src={item.thumbnailUrl || "https://us.123rf.com/450wm/oculo/oculo2004/oculo200400003/143645399-no-image-available-icon.jpg"} 
                alt="썸네일" 
                style={listStyles.thumbnailImg} 
              />
            </div>

            {/* 본문 텍스트 영역 */}
            <div style={listStyles.listMain}>
              <h3 style={listStyles.listTitle}>{item.diaryTitle}</h3>
              <p style={listStyles.listText}>{item.diaryContent}</p>
              <span style={listStyles.listDate}>작성일자:{item.createdDate} / 조회수 : {item.count} / 작성자 :{item.writeName}</span>
            </div>
            
            <div style={listStyles.arrow}>&rarr;</div>
        
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