import React, { useState, useEffect } from "react";
import axios from "axios";

const DiaryList = () => {
  const [diarys, setDiarys] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDiarys = async () => {
      try {
        const response = await axios.get('/api/diarys', {
          params: { page : 1, size : 5 }
        });

      setDiarys(response.data.diaryList);
      setLoading(false);

      } catch(error) {
        console.log("목록", error);
        setLoading(false);
     } 
    };

    getDiarys();
  }, []);

  if(loading) return <div>데이터 불러오는 중...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>📖 여행 다이어리 목록 (테스트)</h1>
      <hr />
      {/* 데이터가 없을 경우를 대비한 안전장치 */}
      {diarys && diarys.length > 0 ? (
        diarys.map((diary) => (
          <div key={diary.diaryNo} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
            <h3>{diary.diaryTitle}</h3>
            <p>{diary.diaryContent.substring(0, 50)}...</p>
            <small>조회수: {diary.count} | 작성일: {diary.createdDate}</small>
          </div>
        ))
      ) : (
        <p>게시글이 없습니다.</p>
      )}
    </div>
  );
};

export default DiaryList;
