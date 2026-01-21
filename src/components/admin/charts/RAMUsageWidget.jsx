import React, { useState, useEffect } from "react";
import { ChartContainer, ChartTitle, DataDisplay, DataValue, PercentageDisplay } from "./RAMUsageWidget.styles";

const RAMUsageWidget = () => {
  const [ramUsage, setRamUsage] = useState(0);

  // 리얼타임 데이터 수신
  useEffect(() => {
    // TODO: 라즈베리파이에서 RAM 사용률을 받아오는 로직 구현
    // 예시: WebSocket 연결 또는 setInterval로 API 호출
    
    const interval = setInterval(() => {
      // 실제 구현 시 여기에 API 호출 또는 WebSocket 메시지 처리
      // 임시 더미 데이터 (0-100% 범위)
      setRamUsage(Math.floor(Math.random() * 100));
    }, 1000); // 1초마다 업데이트

    return () => clearInterval(interval);
  }, []);

  return (
    <ChartContainer>
      <ChartTitle>RAM Usage</ChartTitle>
      <DataDisplay>
        <PercentageDisplay>
          <DataValue>{ramUsage}%</DataValue>
        </PercentageDisplay>
      </DataDisplay>
    </ChartContainer>
  );
};

export default RAMUsageWidget;
