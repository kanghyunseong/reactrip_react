/**
 * 카카오맵 SDK 로드 유틸리티
 */

let kakaoSDKLoaded = false;
let kakaoSDKLoading = false;
let loadPromise = null;

// Vite에서는 기본적으로 VITE_ prefix가 붙은 env만 클라이언트로 노출됩니다.
// - 권장: VITE_KAKAO_APP_KEY
// - fallback: /config.js가 주입하는 window.ENV.KAKAO_APP_KEY
const readKeySync = () => {
  const fromVite =
    import.meta?.env?.VITE_KAKAO_APP_KEY ||
    import.meta?.env?.VITE_KAKAO_MAPS_APP_KEY ||
    import.meta?.env?.VITE_KAKAO_APPKEY;

  const fromWindow =
    window?.ENV?.KAKAO_APP_KEY || window?.ENV?.VITE_KAKAO_APP_KEY;

  // 사용자가 임시로 KAKAO_APP_KEY를 넣었을 가능성도 있어서 마지막 fallback
  const legacy = import.meta?.env?.KAKAO_APP_KEY;

  return fromVite || fromWindow || legacy;
};

const ensureConfigLoadedAndGetKey = async () => {
  // 먼저 동기적으로 읽어보고
  let key = readKeySync();
  if (key) return key;

  // window.ENV가 아직 없으면 /config.js를 강제로 로드해본다.
  // (index.html에서 로드 순서 이슈가 있거나, 모듈 로딩이 늦는 경우 대비)
  try {
    // Vite가 번들링 시 경로 해석을 하지 않도록 @vite-ignore 사용
    await import(/* @vite-ignore */ "/config.js");
  } catch (e) {
    // 무시: dev/prod 환경에 따라 import가 막힐 수 있음
  }

  key = readKeySync();
  return key;
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
  loadPromise = new Promise((resolve, reject) => {
    // KAKAO_APP_KEY 확인 (필요 시 /config.js를 동적 로드)
    ensureConfigLoadedAndGetKey().then((key) => {
      if (!key) {
        console.error("[KakaoMaps] 키 로드 실패. 현재 상태:", {
          "import.meta.env.VITE_KAKAO_APP_KEY": import.meta?.env?.VITE_KAKAO_APP_KEY,
          "window.ENV 존재": !!window?.ENV,
          "window.ENV": window?.ENV,
        });
        reject(
          new Error(
            "KAKAO_APP_KEY가 설정되지 않았습니다. (.env의 VITE_KAKAO_APP_KEY 또는 /config.js의 window.ENV.KAKAO_APP_KEY 확인)"
          )
        );
        return;
      }

      // 이미 로드되어 있는지 확인
      if (
        window.kakao &&
        window.kakao.maps &&
        window.kakao.maps.services &&
        typeof window.kakao.maps.services.Places === "function"
      ) {
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

      // SDK를 libraries=services와 함께 한 번에 로드
      // autoload=false를 명시하여 라이브러리 로드 완료를 kakao.maps.load()에서 보장받음
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${encodeURIComponent(
        key
      )}&libraries=services&autoload=false`;

      script.onload = () => {
        console.log("[KakaoMaps] SDK 스크립트 로드 완료 (autoload=false)");

        // 기본 SDK가 준비될 때까지 대기
        const waitForBaseSDK = (attempts = 0) => {
          if (window.kakao && window.kakao.maps && typeof window.kakao.maps.load === "function") {
            console.log("[KakaoMaps] 기본 SDK 및 load 함수 준비 완료");
            
            // autoload=false를 썼으므로 반드시 kakao.maps.load()를 호출해야 함
            window.kakao.maps.load(() => {
              console.log("[KakaoMaps] kakao.maps.load() 콜백 실행 - services 확인 시작");
              
              // services가 초기화될 때까지 대기 (내부적으로 다시 로드될 수 있음)
              const checkServices = (attempts = 0) => {
                if (window.kakao && window.kakao.maps && window.kakao.maps.services && typeof window.kakao.maps.services.Places === 'function') {
                  console.log("[KakaoMaps] SDK services 초기화 최종 완료");
                  kakaoSDKLoaded = true;
                  kakaoSDKLoading = false;
                  loadPromise = null;
                  resolve();
                  return;
                }

                if (attempts >= 150) {
                  console.error("[KakaoMaps] services 초기화 실패. 최종 상태:", {
                    kakao: !!window.kakao,
                    maps: !!(window.kakao && window.kakao.maps),
                    'maps 속성들': window.kakao && window.kakao.maps ? Object.keys(window.kakao.maps) : '없음',
                    services: !!(window.kakao && window.kakao.maps && window.kakao.maps.services),
                  });
                  kakaoSDKLoading = false;
                  loadPromise = null;
                  reject(new Error("카카오맵 SDK services 초기화 시간 초과"));
                  return;
                }

                setTimeout(() => checkServices(attempts + 1), 100);
              };

              setTimeout(() => checkServices(0), 100);
            });
          } else {
            if (attempts >= 100) {
              console.error("[KakaoMaps] 기본 SDK load 함수 로드 실패");
              kakaoSDKLoading = false;
              loadPromise = null;
              reject(new Error("카카오맵 기본 SDK 로드 시간 초과"));
              return;
            }
            setTimeout(() => waitForBaseSDK(attempts + 1), 100);
          }
        };

        waitForBaseSDK(0);
      };

      script.onerror = () => {
        console.error("[KakaoMaps] SDK 로드 실패");
        kakaoSDKLoading = false;
        loadPromise = null;
        reject(new Error("카카오맵 SDK 로드 실패"));
      };

      document.head.appendChild(script);
    });
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
