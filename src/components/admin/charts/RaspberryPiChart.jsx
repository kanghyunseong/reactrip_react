import React, { useState, useEffect } from "react";
import { ChartContainer, ChartTitle, ChartControls, ChevronButton, DotsContainer, DataDisplay, DataItem, DataLabel, DataValue } from "./RaspberryPiChart.styles";
import { imgChevronLeft, imgChevronRight, imgDots } from "../../../constants/constants";

const RaspberryPiChart = () => {
  const [realTimeData, setRealTimeData] = useState({
    paris: 0,
    bangkok: 0,
    sanFrancisco: 0,
    total: 0,
  });

  // 리얼타임 데이터 수신 (예시: WebSocket 또는 API polling)
  useEffect(() => {
    // TODO: 라즈베리파이에서 리얼타임 데이터를 받아오는 로직 구현
    // 예시: WebSocket 연결 또는 setInterval로 API 호출
    
    // 임시 더미 데이터 (실제로는 API나 WebSocket에서 받아옴)
    const interval = setInterval(() => {
      // 실제 구현 시 여기에 API 호출 또는 WebSocket 메시지 처리
      setRealTimeData({
        paris: Math.floor(Math.random() * 500) + 200,
        bangkok: Math.floor(Math.random() * 400) + 150,
        sanFrancisco: Math.floor(Math.random() * 300) + 100,
        total: Math.floor(Math.random() * 800) + 400,
      });
    }, 1000); // 1초마다 업데이트 (실제 구현 시 적절한 간격으로 조정)

    return () => clearInterval(interval);
  }, []);

  return (
    <ChartContainer>
      <ChartTitle>
        <h3>Raspberry Pi</h3>
        <h3>RealTime</h3>
      </ChartTitle>
      <ChartControls>
        <ChevronButton>
          <img src={imgChevronLeft} alt="prev" />
        </ChevronButton>
        <DataDisplay>
          <DataItem>
            <DataLabel>Paris</DataLabel>
            <DataValue>{realTimeData.paris}</DataValue>
          </DataItem>
          <DataItem>
            <DataLabel>Bangkok</DataLabel>
            <DataValue>{realTimeData.bangkok}</DataValue>
          </DataItem>
          <DataItem>
            <DataLabel>San Francisco</DataLabel>
            <DataValue>{realTimeData.sanFrancisco}</DataValue>
          </DataItem>
          <DataItem>
            <DataLabel>Total</DataLabel>
            <DataValue>{realTimeData.total}</DataValue>
          </DataItem>
        </DataDisplay>
        <ChevronButton>
          <img src={imgChevronRight} alt="next" />
        </ChevronButton>
      </ChartControls>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px", paddingLeft: "50px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#FF6B6B" }}></div>
          <span style={{ fontSize: "14px", color: "#000" }}>Paris</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#4ECDC4" }}></div>
          <span style={{ fontSize: "14px", color: "#000" }}>Bangkok</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#9B59B6" }}></div>
          <span style={{ fontSize: "14px", color: "#000" }}>San Francisco</span>
        </div>
      </div>
      <DotsContainer>
        <img src={imgDots} alt="dots" />
      </DotsContainer>
    </ChartContainer>
  );
};

export default RaspberryPiChart;
