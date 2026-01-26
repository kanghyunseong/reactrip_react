import React, { useState, useEffect } from "react";
import { ChartContainer, ChartTitle, DataDisplay, DataValue, TemperatureDisplay } from "./TemperatureWidget2.styles";

export default function TemperatureWidget2() {
  const [temperature, setTemperature] = useState(0);

  // 리얼타임 데이터 수신
  useEffect(() => {
    // TODO: 라즈베리파이에서 온도 데이터를 받아오는 로직 구현
    // 예시: WebSocket 연결 또는 setInterval로 API 호출
    
    const interval = setInterval(() => {
      // 실제 구현 시 여기에 API 호출 또는 WebSocket 메시지 처리
      // 임시 더미 데이터 (온도 범위 예시: 30-70도)
      setTemperature((Math.random() * 40 + 30).toFixed(1));
    }, 1000); // 1초마다 업데이트

    return () => clearInterval(interval);
  }, []);

  return (
    <ChartContainer>
      <ChartTitle>Temperature 2</ChartTitle>
      <DataDisplay>
        <TemperatureDisplay>
          <DataValue>{temperature}°C</DataValue>
        </TemperatureDisplay>
      </DataDisplay>
    </ChartContainer>
  );
}
