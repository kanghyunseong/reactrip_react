const ENV = window.ENV = {
  API_URL: "https://examplekang.store",
  CLIENT_URL: "https://examplekang.store",
  VITE_KAKAO_APP_KEY: "539f1788e476505490b4540f73f84a47",
  // API_URL: "http://localhost:8081",
  /** 라즈베리파이 WebSocket 엔드포인트 (라즈베리파이 IP로 변경) */
  // 실시간 모니터는 "웹소켓 서버가 떠있는 곳"으로 연결해야 합니다.
  // 라즈베리파이가 메트릭을 로컬 백엔드로 POST하고, 로컬 백엔드가 /topic/cpu로 브로드캐스트하는 구조라면
  // 여기 값은 로컬 백엔드 ws 주소(= localhost:8081)가 맞습니다.
  WS_RASPBERRY_URL: "https://examplekang.store/ws-raspberry",
  KAKAO_APP_KEY: "539f1788e476505490b4540f73f84a47",
  /** 라즈베리파이 메트릭 수집기(에이전트) IP (참고용) */
  RASPBERRY_IP: "192.168.151.26",
};
