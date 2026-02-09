import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import styled from "styled-components";

const WS_RASPBERRY_URL = window.ENV?.WS_RASPBERRY_URL || "http://localhost:8081/ws-raspberry";

const WidgetCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem 1.25rem;
  min-width: 220px;
  max-width: 320px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  background: #fff;
`;

const ErrorCard = styled(WidgetCard)`
  border-color: #ffcdd2;
  background: #ffebee;
`;

const Title = styled.h2`
  margin: 0 0 1rem 0;
  font-size: 1.125rem;
  color: #333;
`;

const Status = styled.span`
  font-size: 0.75rem;
  color: ${(p) => (p.$connected ? "#2e7d32" : "#c62828")};
  margin-left: 0.5rem;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const DeviceId = styled.h3`
  margin: 0 0 0.35rem 0;
  font-size: 0.95rem;
  color: #333;
  word-break: break-all;
`;

const Value = styled.p`
  margin: 0.25rem 0;
  font-size: 1.5rem;
  font-weight: 800;
  color: ${(p) => p.$color || "#1976d2"};
`;

const SubValue = styled.p`
  margin: 0.15rem 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: #444;
`;

const Timestamp = styled.small`
  display: block;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #888;
  line-height: 1.35;
`;

const RaspberryPiRealtimeWidget = () => {
  const [deviceData, setDeviceData] = useState({});
  const [connected, setConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const stompRef = useRef(null);

  useEffect(() => {
    setConnectionError(false);
    const socket = new SockJS(WS_RASPBERRY_URL);
    socket.onclose = () => setConnectionError(true);
    socket.onerror = () => setConnectionError(true);

    const stompClient = Stomp.over(socket);
    // 콘솔이 너무 시끄러우면 주석 해제
    // stompClient.debug = () => {};

    stompClient.connect(
      {},
      () => {
        setConnected(true);
        setConnectionError(false);
        stompClient.subscribe("/topic/cpu", (message) => {
          try {
            const data = JSON.parse(message.body);
            const key = data.deviceId || data.hostname || "unknown";
            setDeviceData((prev) => ({ ...prev, [key]: data }));
          } catch (e) {
            console.warn("Raspberry Pi WS parse error", e);
          }
        });
      },
      () => {
        setConnected(false);
        setConnectionError(true);
      }
    );

    stompRef.current = stompClient;
    return () => {
      try {
        if (stompRef.current?.connected) stompRef.current.disconnect();
      } catch (_) {}
      setConnected(false);
    };
  }, []);

  const devices = Object.values(deviceData);

  const formatBytes = (bytes) => {
    const n = Number(bytes);
    if (!Number.isFinite(n) || n <= 0) return "—";
    const gb = n / 1024 ** 3;
    const mb = n / 1024 ** 2;
    if (gb >= 1) return `${gb.toFixed(2)} GB`;
    return `${mb.toFixed(0)} MB`;
  };

  const formatBps = (bps) => {
    const n = Number(bps);
    if (!Number.isFinite(n) || n < 0) return "—";
    if (n >= 1024 ** 2) return `${(n / 1024 ** 2).toFixed(2)} MB/s`;
    if (n >= 1024) return `${(n / 1024).toFixed(1)} KB/s`;
    return `${Math.round(n)} B/s`;
  };

  const formatUptime = (sec) => {
    const n = Number(sec);
    if (!Number.isFinite(n) || n <= 0) return "—";
    const s = Math.floor(n);
    const d = Math.floor(s / 86400);
    const h = Math.floor((s % 86400) / 3600);
    const m = Math.floor((s % 3600) / 60);
    if (d > 0) return `${d}일 ${h}시간 ${m}분`;
    if (h > 0) return `${h}시간 ${m}분`;
    return `${m}분`;
  };

  const titleFor = (metric) => {
    switch (metric) {
      case "cpu":
        return { label: "CPU 사용률", color: "#1976d2" };
      case "temp":
        return { label: "CPU 온도", color: "#ef6c00" };
      case "ram":
        return { label: "RAM 사용률", color: "#6a1b9a" };
      case "disk":
        return { label: "디스크 사용률", color: "#2e7d32" };
      case "net":
        return { label: "네트워크", color: "#1565c0" };
      case "sys":
        return { label: "시스템", color: "#455a64" };
      default:
        return { label: metric, color: "#1976d2" };
    }
  };

  return (
    <div>
      <Title>
        Raspberry Pi Real-time Monitor
        <Status $connected={connected}>
          {connectionError ? "연결 실패" : connected ? "연결됨" : "연결 끊김"}
        </Status>
      </Title>

      <Grid>
        {connectionError && (
          <ErrorCard>
            <DeviceId>서버에 연결할 수 없습니다</DeviceId>
            <Value>—</Value>
            <Timestamp>
              접속 시도: {WS_RASPBERRY_URL}
              <br />
              서버가 실행 중인지 확인하세요. 403 Forbidden이면 백엔드에서 CORS/권한 설정을 확인하세요.
            </Timestamp>
          </ErrorCard>
        )}

        {!connectionError && devices.length === 0 && (
          <WidgetCard>
            <DeviceId>대기 중</DeviceId>
            <Value>—</Value>
            <Timestamp>WebSocket에서 데이터를 기다리는 중입니다.</Timestamp>
          </WidgetCard>
        )}

        {devices.flatMap((device) => {
          const idLine = `ID: ${device.deviceId || "unknown"}${device.hostname ? ` (${device.hostname})` : ""}`;

          const cpu = titleFor("cpu");
          const temp = titleFor("temp");
          const ram = titleFor("ram");
          const disk = titleFor("disk");
          const net = titleFor("net");
          const sys = titleFor("sys");

          const ts = device.timestamp
            ? new Date(device.timestamp).toLocaleTimeString()
            : null;

          return [
            <WidgetCard key={`${idLine}-cpu`}>
              <DeviceId>{idLine}</DeviceId>
              <SubValue>{cpu.label}</SubValue>
              <Value $color={cpu.color}>{device.cpuUsage ?? "—"}%</Value>
              {ts && <Timestamp>Last Update: {ts}</Timestamp>}
            </WidgetCard>,

            <WidgetCard key={`${idLine}-temp`}>
              <DeviceId>{idLine}</DeviceId>
              <SubValue>{temp.label}</SubValue>
              <Value $color={temp.color}>
                {device.cpuTempC != null ? `${device.cpuTempC}°C` : "—"}
              </Value>
              {ts && <Timestamp>Last Update: {ts}</Timestamp>}
            </WidgetCard>,

            <WidgetCard key={`${idLine}-ram`}>
              <DeviceId>{idLine}</DeviceId>
              <SubValue>{ram.label}</SubValue>
              <Value $color={ram.color}>{device.ramUsage ?? "—"}%</Value>
              <SubValue>
                {formatBytes(device.ramUsedBytes)} / {formatBytes(device.ramTotalBytes)}
              </SubValue>
              {ts && <Timestamp>Last Update: {ts}</Timestamp>}
            </WidgetCard>,

            <WidgetCard key={`${idLine}-disk`}>
              <DeviceId>{idLine}</DeviceId>
              <SubValue>{disk.label}</SubValue>
              <Value $color={disk.color}>{device.diskUsage ?? "—"}%</Value>
              <SubValue>
                {formatBytes(device.diskUsedBytes)} / {formatBytes(device.diskTotalBytes)}
              </SubValue>
              {ts && <Timestamp>Last Update: {ts}</Timestamp>}
            </WidgetCard>,

            <WidgetCard key={`${idLine}-net`}>
              <DeviceId>{idLine}</DeviceId>
              <SubValue>{net.label}</SubValue>
              <SubValue>RX: {formatBps(device.netRxBps)}</SubValue>
              <SubValue>TX: {formatBps(device.netTxBps)}</SubValue>
              {ts && <Timestamp>Last Update: {ts}</Timestamp>}
            </WidgetCard>,

            <WidgetCard key={`${idLine}-sys`}>
              <DeviceId>{idLine}</DeviceId>
              <SubValue>{sys.label}</SubValue>
              <SubValue>
                Load: {device.load1 ?? "—"} / {device.load5 ?? "—"} / {device.load15 ?? "—"}
              </SubValue>
              <SubValue>Uptime: {formatUptime(device.uptimeSec)}</SubValue>
              {ts && <Timestamp>Last Update: {ts}</Timestamp>}
            </WidgetCard>,
          ];
        })}
      </Grid>
    </div>
  );
};

export default RaspberryPiRealtimeWidget;

