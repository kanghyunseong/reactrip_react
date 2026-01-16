import React, { useState, useEffect } from "react";
import axios from "axios";

const DiaryList = () => {
  const [diarys, setDiarys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await axios
            .get("http://localhost:8081/api/diarys", {
        });
        // 백엔드 Map 구조에서 diaryList만 추출
        setDiarys(response.data.diary);
        console.log(response.data.diary);
      } catch (error) {
        console.error("목록 로드 실패:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDiaries();
  }, []);

  if (loading) return <p>다이어리를 불러오는 중입니다...</p>;

  return (
    <>

    </>
  );
};

export default DiaryList;
