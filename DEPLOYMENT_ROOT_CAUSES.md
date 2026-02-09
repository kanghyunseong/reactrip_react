# 배포 시 근본적으로 해결해야 할 것

`examplekang.store` 배포에서 발생한 500/Mixed Content 등을 **근본 원인** 기준으로 정리한 문서입니다.

---

## 1. 백엔드: API 경로 매칭 (PlaceController) — 500 "findByTravelNo.travelNo: 유효하지 않은 접근입니다."

### 원인
- `GET /api/places/regions`, `GET /api/places/themes` 요청이 **숫자 전용** 핸들러 `GET /api/places/{travelNo}`에 걸림.
- Spring이 `regions`, `themes`를 path variable로 받고, 숫자 검증에서 실패해 500 반환.

### 해결 (코드 반영 여부 확인)
- **백엔드** `PlaceController.java`에서  
  `@GetMapping("/{travelNo}")` → **`@GetMapping("/{travelNo:[0-9]+}")`** 로 변경되어 있어야 함.
- 숫자만 path variable로 매칭되므로 `/regions`, `/themes`는 전용 메서드로만 처리됨.

### 해야 할 일
- 백엔드 저장소에 위 수정이 **반영·커밋**되어 있는지 확인.
- **examplekang.store에 배포되는 백엔드**가 이 코드로 **재빌드·재배포**되었는지 확인 (GitHub Actions면 해당 브랜치 푸시 후 배포 완료까지 확인).

---

## 2. 백엔드: S3 설정 (일기 이미지 업로드 500)

### 원인
- 일기 이미지 업로드(`POST /api/diarys/upload/diary-image`)가 S3에 저장되는데,  
  **배포 환경**에 AWS 설정이 없거나 잘못되면 `S3Service.fileSave()`에서 예외 → 500.

### 필요한 설정 (백엔드 배포 서버/환경)
`application-private.yml` 또는 **환경 변수**에 다음이 있어야 함:

| 설정 키 | 설명 |
|--------|------|
| `cloud.aws.credentials.access-key` | AWS Access Key |
| `cloud.aws.credentials.secret-key` | AWS Secret Key |
| `cloud.aws.s3.bucket` | S3 버킷 이름 |
| `cloud.aws.region.static` | 리전 (예: ap-northeast-2) |

- `application-private.yml`은 Git에 넣지 않으므로, **배포 파이프라인(GitHub Actions 등)**에서  
  - 파일을 생성하거나  
  - 환경 변수로 위 값들을 주입해야 함.

### 해야 할 일
- 배포 서버(또는 Actions 시크릿)에 위 4가지 값이 **실제로 설정**되어 있는지 확인.
- 없으면 S3 업로드 관련 API는 배포 환경에서 계속 500 발생.

---

## 3. 프론트: FormData 전송 시 Content-Type (이미지 업로드 500 가능성)

### 원인
- `Content-Type: multipart/form-data`만 보내고 **boundary**가 없으면, 서버가 multipart를 파싱하지 못해 500 또는 바인딩 실패.

### 해결 (코드 반영됨)
- `src/api/api.js`에서 **FormData**일 때는 `Content-Type`을 설정하지 않음(undefined).  
  → axios/브라우저가 `multipart/form-data; boundary=...` 를 자동 설정.

### 해야 할 일
- 프론트 **재빌드·재배포** 후 일기 이미지 업로드 다시 테스트.

---

## 4. 프론트: 배포 환경 설정 (config.js / window.ENV)

### 원인
- API 주소·카카오 키 등이 `window.ENV`(또는 `config.js`)에 의존.
- `config.js`는 **Git 제외**되어 있어, 배포 시 **어딘가에서 반드시 제공**해야 함.

### 필요한 값 (배포 시)
- `API_URL`: **https://examplekang.store** (반드시 **https**로 통일 → Mixed Content 방지)
- `CLIENT_URL`: 프론트 주소 (필요 시)
- 카카오 키 등 (맵/로그인 사용 시)

### 해야 할 일
- **배포된 사이트**에서 실제로 로드되는 `config.js` 내용 확인  
  (개발자도구 → Network에서 `config.js` 요청 후 내용 확인).
- `API_URL`이 **https**인지 확인.  
  HTTP면 Mixed Content 경고 및 일부 환경에서 API 차단 가능.

---

## 5. Mixed Content 경고

### 원인
- 페이지는 **HTTPS**인데, 일부 리소스(API, 이미지, 스크립트 등)가 **HTTP**로 요청됨.

### 해결
- `config.js`의 `API_URL`을 **https**로 설정 (위 4번).
- 이미지/스크립트 등 다른 URL도 **http**가 없도록 통일.

---

## 체크리스트 (근본 해결 순서)

| 순서 | 확인 항목 | 담당 |
|------|-----------|------|
| 1 | PlaceController `/{travelNo:[0-9]+}` 반영 후 **백엔드 재배포** | 백엔드 |
| 2 | 배포 환경에 S3 관련 4가지 설정(access-key, secret-key, bucket, region) **존재 여부 확인** | 백엔드/인프라 |
| 3 | 프론트 api.js FormData 시 Content-Type 미설정 반영 후 **프론트 재빌드·재배포** | 프론트 |
| 4 | 배포된 환경에서 **config.js** 로드 여부 및 **API_URL이 https**인지 확인 | 프론트/배포 |
| 5 | 브라우저에서 `/api/places/regions`, `/api/places/themes`, 일기 이미지 업로드 **재테스트** | 공통 |

위 5가지를 모두 만족하면, 지금 겪는 500과 Mixed Content는 **근본적으로** 해소됩니다.
