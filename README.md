# ReacTrip Frontend

여행 기록 및 경험 공유 플랫폼 **ReacTrip**의 프론트엔드 저장소입니다.

---

## 목차

- [프로젝트 소개](#-프로젝트-소개)
- [스크린샷](#-스크린샷)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [시작하기](#-시작하기)
- [환경 설정](#-환경-설정)
- [프로젝트 구조](#-프로젝트-구조)
- [협업 및 이슈 관리](#-협업-및-이슈-관리)
- [배포](#-배포)
- [주의사항](#-주의사항)
- [라이선스](#-라이선스)

---

## 프로젝트 소개

### ReacTrip이란?

**ReacTrip**은 여행의 설렘을 기록하고, 지도 위에 그려지는 경로를 시각화하며, 게임처럼 성취감 있는 보상으로 돌아오는 **여행 기록·공유 플랫폼**입니다.

- **기록**: 일정과 일기를 한곳에서 관리하고, 나만의 여행 스토리를 쌓을 수 있습니다.
- **시각화**: 카카오맵과 연동해 여행 경로와 장소를 한눈에 볼 수 있습니다.
- **재미**: 룰렛으로 다음 여행지를 추천받고, 일기와 댓글로 다른 사용자와 소통할 수 있습니다.

### 왜 만들었나요?

- 여행 일정·일기를 흩어진 앱이 아닌 **한 플랫폼**에서 관리하고 싶다는 니즈에서 출발했습니다.
- 팀 프로젝트로 **React 기반 SPA**와 **백엔드 API 연동**, **관리자 기능**, **라즈베리파이 실시간 모니터링**까지 경험하며 실무에 가까운 구조로 설계했습니다.

### 대상 사용자

- 여행을 다니며 일정·일기를 정리하고 싶은 일반 사용자
- 여행지 추천·일정 공유가 필요한 사용자
- 서비스 운영을 위한 관리자(회원/콘텐츠/센서·라즈베리파이 모니터링)

---

## 스크린샷

| 메인 페이지 | 로그인 |
|------------|--------|
| ![메인 페이지](public/mainPage.png) | ![로그인](public/login.png) |

| 회원가입 |
|----------|
| ![회원가입](public/signup.png) |

> 실제 화면에 맞게 캡처 후 `public/`에 이미지를 추가해 교체할 수 있습니다.

---

## 주요 기능

### 사용자 서비스

| 구분 | 설명 |
|------|------|
| **메인** | 히어로 섹션, 스크롤 스냅 소개 영역, 이미지 캐러셀(Swiper) |
| **ABOUT** | ReacTrip 서비스 소개 섹션 |
| **일정(Schedule)** | FullCalendar 기반 일정 캘린더 보기·관리 |
| **투어(Tour)** | 카카오맵 연동 여행지 검색·지도 표시 |
| **룰렛(Roulette)** | 여행지 추천 룰렛 (선택지 랜덤 추천) |
| **일기(Diary)** | 일기 목록·상세·작성·댓글, 이미지 업로드 |
| **연락처(Contact)** | 문의/연락처 페이지 |
| **회원** | 로그인, 회원가입, 마이페이지 |

### 관리자 기능 (Admin)

- **대시보드**: 요약 차트·위젯
- **회원 관리**: 회원 목록·검색
- **일정(Travel) 관리**: 여행 일정 CRUD
- **공지(Notices)**: 공지사항 등록·수정·삭제
- **일기/댓글 관리**: 일기·댓글 목록·상세·검색
- **센서**: 센서 데이터 조회
- **라즈베리파이 모니터링**: WebSocket(SockJS+STOMP) 실시간 CPU/온도 등 차트

관리자 페이지는 `ROLE_ADMIN` 권한이 있을 때만 접근 가능합니다.

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| **코어** | React 19, Vite 7, React Router DOM 7 |
| **스타일** | Styled Components, Tailwind CSS |
| **UI/차트** | Swiper, FullCalendar, Chart.js, react-chartjs-2 |
| **통신** | Axios, SockJS + STOMP (WebSocket) |
| **기타** | React Toastify, @hello-pangea/dnd |

---

## 시작하기

### 요구 사항

- Node.js 18+ (권장: LTS)
- npm 또는 yarn

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (기본: http://localhost:5173)
npm run dev
```

### 빌드 및 미리보기

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과물 미리보기
npm run preview
```

### 린트

```bash
npm run lint
```

---

## 환경 설정

백엔드 API, 클라이언트 URL, 카카오맵·WebSocket 등은 **런타임 설정**으로 관리합니다.

프로젝트 루트의 `index.html`에서 설정 스크립트를 로드하기 전에 `config.js`를 정의합니다.  
실제 배포 시에는 **`public/config.js`** 또는 서버에서 주입하는 방식으로 사용할 수 있습니다.

**로컬 개발용 예시** (`public/config.js` 또는 빌드 시 주입):

```javascript
window.ENV = {
  API_URL: "http://localhost:8081",           // 백엔드 API 베이스 URL
  CLIENT_URL: "http://localhost:5173",       // 프론트엔드 URL
  KAKAO_APP_KEY: "your-kakao-javascript-key", // 카카오맵/로그인 등
  WS_RASPBERRY_URL: "http://localhost:8081/ws-raspberry", // 라즈베리파이 WebSocket
  RASPBERRY_IP: "192.168.x.x",               // (참고용) 라즈베리파이 IP
};
```

- `API_URL`: 백엔드 서버 주소 (API 요청 기본 URL)
- `CLIENT_URL`: 현재 프론트엔드 주소 (리다이렉트 등에 사용)
- `KAKAO_APP_KEY`: 카카오 JavaScript 키 (맵, 로그인 등)
- `WS_RASPBERRY_URL`: 관리자 실시간 모니터용 WebSocket 엔드포인트
- `RASPBERRY_IP`: 참고용 라즈베리파이 IP

> ⚠️ `config.js`는 Git에 올리지 않고, 각 환경별로 별도 설정하는 것을 권장합니다. (`.gitignore`에 포함 가능)

### 백엔드 연동

- 이 프론트엔드는 **백엔드 API 서버**와 함께 동작합니다. 로그인, 일기, 일정, 회원, 공지, 룰렛 등 대부분의 기능이 API를 통해 데이터를 주고받습니다.
- `API_URL`에 백엔드 서버 주소를 넣어주세요. (예: `http://localhost:8081`)
- 백엔드 저장소 및 API 스펙은 별도 문서 또는 백엔드 팀에 문의하세요.

---

## 프로젝트 구조

네비게이션 섹션별로 컴포넌트를 나누어 팀 단위 개발에 맞춰 두었습니다.

```
src/
├── api/                 # API 클라이언트 (axios 등)
├── components/
│   ├── layout/          # Header, Footer, Drawer, HamburgerMenu 등 공통 레이아웃
│   ├── common/          # Background, ImageCarousel, Modal, DataTable 등 공통 UI
│   ├── home/            # 메인 페이지
│   ├── about/           # 소개 섹션
│   ├── schedule/        # 일정 페이지 (FullCalendar)
│   ├── tour/            # 투어(맵) 페이지
│   ├── roulette/        # 룰렛 페이지
│   ├── diary/           # 일기 목록·상세·작성
│   ├── contact/         # 연락처
│   ├── login/           # 로그인
│   ├── signup/          # 회원가입
│   ├── my/              # 마이페이지
│   └── admin/           # 관리자 레이아웃, 대시보드, 회원/일정/공지/일기/댓글/센서, 라즈베리파이 차트
├── constants/           # 전역 상수
├── context/             # AuthContext 등
├── hooks/               # 커스텀 훅 (admin 등)
├── utils/               # ProtectedRoute, 이미지 URL, 카카오맵 유틸 등
├── App.jsx
├── main.jsx
└── index.css
```

- 페이지/섹션별로 `.jsx` + `.styles.js` (styled-components) 분리
- 공통 컴포넌트는 `layout/`, `common/`에서 재사용

자세한 폴더별 설명과 작업 가이드는 **`FOLDER_STRUCTURE.md`**를 참고하세요.

---

## 협업 및 이슈 관리

- **이슈**: 버그는 🐞 버그 리포트, 기능은 ✨ 기능 제안, 리팩터/문서/환경은 🧹 작업 이슈 템플릿 사용
- **제목**: `[BUG]`, `[FEAT]`, `[CHORE]` + 한 줄 요약
- **브랜치**: `feat/이슈번호-기능명`, `fix/이슈번호-요약`
- **PR**: 설명에 `Closes #이슈번호` 포함 시 머지 시 이슈 자동 종료

자세한 규칙은 저장소의 **Issue/PR 템플릿** 및 **`.github/`** 워크플로우를 참고하세요.

---

## 배포

- `npm run build`로 `dist/`에 정적 파일이 생성됩니다.
- Nginx, Apache, Vercel, Netlify 등 정적 호스팅에 `dist` 내용을 올리면 됩니다.
- API 주소·카카오 키 등은 배포 환경에 맞게 `config.js`(또는 서버에서 주입하는 `window.ENV`)로 설정해야 합니다.
- 배포 주소 `https://examplekang.store`
- 지속적으로 수정하고 배포 자동화를 진행중에 있습니다. 

---

## 주의사항

- 섹션별 폴더 구조를 유지하고, 다른 섹션 파일은 임의로 수정하지 않습니다.
- `layout/`, `common/` 수정 시 팀원과 사전에 협의합니다.
- 스타일은 styled-components 기준으로 `.styles.js`에 분리해 유지합니다.

---

## 라이선스

이 프로젝트는 팀 프로젝트로 진행되었습니다.
