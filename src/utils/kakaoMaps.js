/**
 * 카카오맵 SDK 로드 유틸리티
 */

let kakaoSDKLoaded = false;
let kakaoSDKLoading = false;
let loadPromise = null;

// window.ENV에 값이 있는지 확인 (서버 배포 시 config.js에서 주입됨)
const KAKAO_URL = window.ENV?.KAKAO_URL || "https://dapi.kakao.com/v2/maps/sdk.js";

/**
 * 환경 변수 및 window.ENV에서 카카오 앱 키를 읽어옵니다.
 */
const readKeySync = () => {
  // 1. window.ENV (런타임 주입 설정) - 최우선
  const fromWindow = window?.ENV?.VITE_KAKAO_APP_KEY;

  // 2. Vite 환경 변수 (빌드 시점 설정)
  const fromVite =
    window.ENV?.VITE_KAKAO_APP_KEY ||
    window.ENV?.VITE_KAKAO_MAPS_APP_KEY ||
    window.ENV?.VITE_KAKAO_APPKEY;

  // 3. 기타 레거시 키
  const legacy = import.meta?.env?.KAKAO_APP_KEY;

  return fromWindow || fromVite || legacy;
};

/**
 * 키 획득 (index.html의 <script src="/config.js"> 가 window.ENV 를 설정하므로 별도 import 불필요)
 */
const ensureConfigLoadedAndGetKey = async () => {
  return readKeySync();
};

/**
 * 카카오맵 SDK를 로드합니다. (기존 199줄 로직 유지)
 */
export const loadKakaoSDK = () => {
  // 이미 로드 완료된 경우
  if (kakaoSDKLoaded && window.kakao && window.kakao.maps && window.kakao.maps.services) {
    return Promise.resolve();
  }

  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = new Promise((resolve, reject) => {
    // 기존의 정교한 키 획득 대기 로직
    ensureConfigLoadedAndGetKey().then((key) => {
      if (!key) {
        console.error("[KakaoMaps] 키 로드 실패. 현재 상태:", {
          "import.meta.env": import.meta?.env?.VITE_KAKAO_APP_KEY,
          "window.ENV": window?.ENV,
        });
        reject(
          new Error("KAKAO_APP_KEY가 설정되지 않았습니다. (/config.js 또는 .env 확인)")
        );
        return;
      }

      // 중복 로드 방지 체크
      if (
        window.kakao &&
        window.kakao.maps &&
        window.kakao.maps.services &&
        typeof window.kakao.maps.services.Places === "function"
      ) {
        console.log("[KakaoMaps] SDK가 이미 존재합니다.");
        kakaoSDKLoaded = true;
        resolve();
        return;
      }

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
      console.log("[KakaoMaps] SDK 로드 시작 (Key: " + key.substring(0, 5) + "...)");

      const script = document.createElement("script");
      // autoload=false를 사용하여 로드 완료 시점을 수동 제어
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${encodeURIComponent(
        key
      )}&libraries=services&autoload=false`;

      script.onload = () => {
        console.log("[KakaoMaps] Script 로드 완료");

        const waitForBaseSDK = (attempts = 0) => {
          if (window.kakao && window.kakao.maps && typeof window.kakao.maps.load === "function") {
            window.kakao.maps.load(() => {
              console.log("[KakaoMaps] kakao.maps.load() 실행");
              
              const checkServices = (attempts = 0) => {
                if (window.kakao?.maps?.services?.Places) {
                  console.log("[KakaoMaps] 모든 서비스 모듈 초기화 완료");
                  kakaoSDKLoaded = true;
                  kakaoSDKLoading = false;
                  loadPromise = null;
                  resolve();
                  return;
                }

                if (attempts >= 150) {
                  console.error("[KakaoMaps] 서비스 초기화 타임아웃");
                  kakaoSDKLoading = false;
                  loadPromise = null;
                  reject(new Error("카카오맵 서비스 초기화 실패"));
                  return;
                }
                setTimeout(() => checkServices(attempts + 1), 100);
              };
              checkServices(0);
            });
          } else {
            if (attempts >= 100) {
              kakaoSDKLoading = false;
              loadPromise = null;
              reject(new Error("기본 SDK 로드 타임아웃"));
              return;
            }
            setTimeout(() => waitForBaseSDK(attempts + 1), 100);
          }
        };
        waitForBaseSDK(0);
      };

      script.onerror = () => {
        console.error("[KakaoMaps] SDK 로드 에러");
        kakaoSDKLoading = false;
        loadPromise = null;
        reject(new Error("카카오맵 SDK 로드 실패"));
      };

      document.head.appendChild(script);
    });
  });

  return loadPromise;
};

export const isKakaoSDKReady = () => {
  return !!(
    window.kakao?.maps?.services?.Places &&
    typeof window.kakao.maps.services.Places === 'function'
  );
};