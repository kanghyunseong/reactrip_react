/**
 * 카카오맵 SDK 로드 유틸리티
 */

let kakaoSDKLoaded = false;
let kakaoSDKLoading = false;
let loadPromise = null;

// 환경 변수에서 KAKAO_APP_KEY를 가져오는 헬퍼 함수
const getKakaoAppKey = async () => {
  const fromVite = import.meta?.env?.VITE_KAKAO_APP_KEY;
  const fromWindow = window?.ENV?.KAKAO_APP_KEY;

  // 우선순위: Vite 환경 변수 -> window.ENV
  if (fromVite) return fromVite;
  if (fromWindow) return fromWindow;

  // window.ENV가 아직 로드되지 않았을 수 있으므로, config.js를 동적으로 import 시도
  try {
    await import('/config.js');
    if (window?.ENV?.KAKAO_APP_KEY) {
      console.log("[KakaoMaps] KAKAO_APP_KEY를 동적 import된 config.js에서 찾았습니다.");
      return window.ENV.KAKAO_APP_KEY;
    }
  } catch (e) {
    console.warn("[KakaoMaps] config.js 동적 import 실패 또는 KAKAO_APP_KEY 없음:", e);
  }

  return null;
};

/**
 * 카카오맵 SDK를 로드합니다.
 * @returns {Promise<void>} SDK 로드 완료 Promise
 */
export const loadKakaoSDK = () => {
  // 이미 로드 완료된 경우
  if (kakaoSDKLoaded && window.kakao && window.kakao.maps && window.kakao.maps.services) {
    return Promise.resolve();
  }

  if (loadPromise) {
    return loadPromise;
  }

  // 새로 로드 시작
  loadPromise = new Promise(async (resolve, reject) => {
    // KAKAO_APP_KEY 확인
    const key = await getKakaoAppKey();
    if (!key) {
      console.error("[KakaoMaps] 키 로드 실패. 현재 상태:", {
        VITE_KAKAO_APP_KEY: import.meta?.env?.VITE_KAKAO_APP_KEY,
        window_ENV: window.ENV,
        window_ENV_KAKAO_APP_KEY: window.ENV?.KAKAO_APP_KEY,
      });
      reject(new Error("KAKAO_APP_KEY가 설정되지 않았습니다. (.env의 VITE_KAKAO_APP_KEY 또는 /config.js의 window.ENV.KAKAO_APP_KEY 확인)"));
      return;
    }

    // 이미 로드되어 있는지 확인 (services까지)
    if (window.kakao && window.kakao.maps && window.kakao.maps.services && typeof window.kakao.maps.services.Places === 'function') {
      console.log("[KakaoMaps] SDK가 이미 로드되어 있습니다.");
      kakaoSDKLoaded = true;
      resolve();
      return;
    }

    // 로드 중이면 대기
    if (kakaoSDKLoading) {
      const checkInterval = setInterval(() => {
        if (kakaoSDKLoaded) {
          clearInterval(checkInterval);
          resolve();
        } else if (!kakaoSDKLoading) {
          clearInterval(checkInterval);
          reject(new Error("SDK 로드 실패"));
        }
      }, 100);
      return;
    }

    kakaoSDKLoading = true;
    console.log("[KakaoMaps] SDK 로드 시작...");

    // SDK를 libraries=services와 autoload=false 파라미터와 함께 로드
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${encodeURIComponent(key)}&libraries=services&autoload=false`;
    script.async = false; // document.write 경고 방지

    script.onload = () => {
      console.log("[KakaoMaps] SDK 스크립트 로드 완료 (autoload=false)");

      // 기본 SDK가 준비되고 kakao.maps.load 함수가 있는지 확인
      const waitForBasicSDKAndLoad = (attempts = 0) => {
        if (window.kakao && window.kakao.maps && typeof window.kakao.maps.load === 'function') {
          console.log("[KakaoMaps] 기본 SDK 및 load 함수 준비 완료");

          // kakao.maps.load를 사용하여 services가 준비될 때까지 대기
          window.kakao.maps.load(() => {
            console.log("[KakaoMaps] kakao.maps.load() 콜백 실행 - services 확인 시작");

            // services가 초기화될 때까지 대기
            const checkServices = (serviceAttempts = 0) => {
              if (window.kakao.maps.services && typeof window.kakao.maps.services.Places === 'function') {
                console.log("[KakaoMaps] SDK services 초기화 최종 완료");
                kakaoSDKLoaded = true;
                kakaoSDKLoading = false;
                loadPromise = null;
                resolve();
                return;
              }

              if (serviceAttempts >= 200) { // 20초 타임아웃
                console.error("[KakaoMaps] services 초기화 실패. SDK 상태:", {
                  kakao: !!window.kakao,
                  maps: !!(window.kakao && window.kakao.maps),
                  'maps 속성들': window.kakao && window.kakao.maps ? Object.keys(window.kakao.maps) : '없음',
                  services: !!(window.kakao && window.kakao.maps && window.kakao.maps.services),
                  Places: !!(window.kakao && window.kakao.maps && window.kakao.maps.services && window.kakao.maps.services.Places),
                });
                kakaoSDKLoading = false;
                loadPromise = null;
                reject(new Error("카카오맵 SDK services 초기화 시간 초과"));
                return;
              }

              setTimeout(() => checkServices(serviceAttempts + 1), 100);
            };
            setTimeout(() => checkServices(0), 500); // 0.5초 후 services 확인 시작
          });
          return;
        }

        if (attempts >= 50) { // 5초 타임아웃
          console.error("[KakaoMaps] 기본 SDK 또는 load 함수 초기화 실패");
          kakaoSDKLoading = false;
          loadPromise = null;
          reject(new Error("카카오맵 기본 SDK 또는 load 함수 초기화 시간 초과"));
          return;
        }

        setTimeout(() => waitForBasicSDKAndLoad(attempts + 1), 100);
      };
      setTimeout(() => waitForBasicSDKAndLoad(0), 300); // 0.3초 후 기본 SDK 확인 시작
    };

    script.onerror = () => {
      console.error("[KakaoMaps] SDK 로드 실패");
      kakaoSDKLoading = false;
      loadPromise = null;
      reject(new Error("카카오맵 SDK 로드 실패"));
    };

    document.head.appendChild(script);
  });

  return loadPromise;
};

/**
 * 카카오맵 SDK가 로드되었는지 확인합니다.
 * @returns {boolean}
 */
export const isKakaoSDKReady = () => {
  return !!(
    window.kakao &&
    window.kakao.maps &&
    window.kakao.maps.services &&
    typeof window.kakao.maps.services.Places === 'function'
  );
};
