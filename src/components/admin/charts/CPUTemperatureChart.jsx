import React, { useState, useEffect } from "react";
import { ChartContainer, ChartTitle, ChartControls, ChevronButton, DotsContainer, LegendContainer, LegendItem, DataDisplay, DataValue } from "./CPUTemperatureChart.styles";
import { imgChevronLeft, imgChevronRight, imgDots } from "../../../constants/constants";

const CPUTemperatureChart = () => {
  const [cpuTemperature, setCpuTemperature] = useState(0);
  const [projectData, setProjectData] = useState({
    kfc: 0,
    fiat: 0,
    klm: 0,
    aeroflot: 0,
    lukoil: 0,
    americanExpress: 0,
    daimler: 0,
  });

  // 리얼타임 데이터 수신 (예시: WebSocket 또는 API polling)
  useEffect(() => {
    // TODO: 라즈베리파이에서 CPU 온도 및 프로젝트 데이터를 받아오는 로직 구현
    // 예시: WebSocket 연결 또는 setInterval로 API 호출
    
    const interval = setInterval(() => {
      // 실제 구현 시 여기에 API 호출 또는 WebSocket 메시지 처리
      setCpuTemperature(Math.floor(Math.random() * 20) + 40); // 40-60도 범위
      setProjectData({
        kfc: Math.floor(Math.random() * 20) + 10,
        fiat: Math.floor(Math.random() * 20) + 15,
        klm: Math.floor(Math.random() * 20) + 12,
        aeroflot: Math.floor(Math.random() * 20) + 14,
        lukoil: Math.floor(Math.random() * 20) + 8,
        americanExpress: Math.floor(Math.random() * 20) + 10,
        daimler: Math.floor(Math.random() * 20) + 11,
      });
    }, 1000); // 1초마다 업데이트

    return () => clearInterval(interval);
  }, []);

  return (
    <ChartContainer>
      <ChartTitle>CPU Temperature History</ChartTitle>
      <ChartControls>
        <ChevronButton>
          <img src={imgChevronLeft} alt="prev" />
        </ChevronButton>
        <DataDisplay>
          <div style={{ textAlign: "center" }}>
            <DataValue style={{ fontSize: "48px", fontWeight: "bold", color: "#2f80ed" }}>
              {cpuTemperature}°C
            </DataValue>
            <p style={{ fontSize: "16px", color: "#000", margin: "10px 0 0 0" }}>Projects by account</p>
          </div>
        </DataDisplay>
        <ChevronButton>
          <img src={imgChevronRight} alt="next" />
        </ChevronButton>
      </ChartControls>
      <LegendContainer>
        <LegendItem>
          <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#EB5757" }}></div>
          <span>KFC: {projectData.kfc}</span>
        </LegendItem>
        <LegendItem>
          <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#EAAB00" }}></div>
          <span>FIAT-Chrysler LLC: {projectData.fiat}</span>
        </LegendItem>
        <LegendItem>
          <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#2D9CDB" }}></div>
          <span>KLM: {projectData.klm}</span>
        </LegendItem>
        <LegendItem>
          <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#4CD964" }}></div>
          <span>Aeroflot: {projectData.aeroflot}</span>
        </LegendItem>
        <LegendItem>
          <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#BB6BD9" }}></div>
          <span>Lukoil: {projectData.lukoil}</span>
        </LegendItem>
        <LegendItem>
          <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#00B2A9" }}></div>
          <span>American Express: {projectData.americanExpress}</span>
        </LegendItem>
        <LegendItem>
          <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#A84069" }}></div>
          <span>Daimler: {projectData.daimler}</span>
        </LegendItem>
      </LegendContainer>
      <DotsContainer>
        <img src={imgDots} alt="dots" />
      </DotsContainer>
    </ChartContainer>
  );
};

export default CPUTemperatureChart;
