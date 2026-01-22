# ReacTrip Frontend

여행 기록 및 경험 공유 플랫폼 ReacTrip의 프론트엔드 프로젝트입니다.

## 🚀 프로젝트 소개

ReacTrip은 여행의 설렘을 기록하고, 지도 위에 그려지는 경로를 시각화하며, 게임처럼 성취감 있는 보상으로 돌아오는 여행 플랫폼입니다.

## 🛠️ 기술 스택

- **React 19.2.0** - UI 라이브러리
- **Vite 7.2.4** - 빌드 도구
- **React Router DOM 7.12.0** - 라우팅
- **Styled Components 6.3.5** - CSS-in-JS 스타일링
- **Swiper 12.0.3** - 이미지 캐러셀
- **Axios 1.13.2** - HTTP 클라이언트
- **React Toastify 11.0.5** - 알림 메시지

## 📦 설치 및 실행

### 의존성 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

### 빌드
```bash
npm run build
```

### 빌드 미리보기
```bash
npm run preview
```

## 📁 프로젝트 폴더 구조

4명이 함께 작업하는 프로젝트를 위한 체계적인 폴더 구조입니다.
**네브바 섹션별로 컴포넌트를 분리**하여 각 팀원이 독립적으로 작업할 수 있도록 구성했습니다.

```
src/
├── components/               # 컴포넌트
│   ├── layout/               # 레이아웃 컴포넌트 (공통)
│   │   ├── Header.jsx        # 헤더 (네비게이션 바)
│   │   ├── Header.styles.js  # 헤더 스타일
│   │   ├── Footer.jsx        # 푸터
│   │   ├── Footer.styles.js  # 푸터 스타일
│   │   ├── HamburgerMenu.jsx # 햄버거 메뉴
│   │   ├── HamburgerMenu.styles.js
│   │   ├── DrawerNavigator.jsx # 드로어 네비게이터
│   │   ├── DrawerNavigator.styles.js
│   │   └── CustomScrollbar.jsx # 커스텀 스크롤바
│   │
│   ├── common/               # 공통 컴포넌트
│   │   ├── Background.jsx    # 배경 이미지
│   │   ├── Background.styles.js
│   │   ├── ImageCarousel.jsx # 이미지 캐러셀
│   │   ├── ImageCarousel.styles.js
│   │   ├── Rectangle.jsx     # 사각형 컴포넌트
│   │   └── Sheet.jsx         # 시트 컴포넌트
│   │
│   ├── home/                 # 홈 섹션 (메인 페이지)
│   │   ├── MainPage.jsx      # 메인 페이지
│   │   ├── MainPage.styles.js
│   │   ├── HeroSection.jsx   # 히어로 섹션
│   │   └── HeroSection.styles.js
│   │
│   ├── about/                # ABOUT 섹션
│   │   ├── AboutSection.jsx  # 소개 섹션
│   │   └── AboutSection.styles.js
│   │
│   ├── schedule/             # SCHEDULE 섹션
│   │   ├── SchedulePage.jsx  # 일정 페이지
│   │   └── SchedulePage.styles.js
│   │
│   ├── tour/                 # TOUR 섹션
│   │   ├── TourPage.jsx      # 투어 페이지
│   │   └── TourPage.styles.js
│   │
│   ├── roulette/             # ROULETTE 섹션
│   │   ├── RoulettePage.jsx  # 룰렛 페이지
│   │   └── RoulettePage.styles.js
│   │
│   ├── diary/                # DIARY 섹션
│   │   ├── DiaryPage.jsx    # 일기 페이지
│   │   └── DiaryPage.styles.js
│   │
│   ├── contact/              # CONTACT 섹션
│   │   ├── ContactPage.jsx   # 연락처 페이지
│   │   └── ContactPage.styles.js
│   │
│   ├── login/                # 로그인 페이지
│   │   ├── LoginPage.jsx
│   │   └── LoginPage.styles.js
│   │
│   ├── signup/               # 회원가입 페이지
│   │   ├── SignUpPage.jsx
│   │   └── SignUpPage.styles.js
│   │
│   └── admin/                # 관리자 컴포넌트 (추후 추가)
│
├── api/                      # API 관련
│   └── api.js                # API 함수들
│
├── utils/                    # 유틸리티 함수
│   └── ProtectedURL.jsx       # 보호된 라우트
│
├── constants/                # 상수
│   └── constants.js          # 이미지 URL 등 상수
│
├── context/                  # React Context
│   └── AuthContext.jsx       # 인증 컨텍스트
│
├── assets/                   # 정적 자산
│   └── react.svg
│
├── App.jsx                   # 메인 App 컴포넌트
├── App.css                   # App 스타일
├── main.jsx                  # 진입점
└── index.css                 # 전역 스타일
```

## 📝 폴더별 설명

### `components/layout/`
- **모든 페이지에서 공통으로 사용되는 레이아웃 컴포넌트**
- Header, Footer, HamburgerMenu, DrawerNavigator 등이 포함됩니다.
- 공통 컴포넌트이므로 수정 시 주의가 필요합니다.

### `components/common/`
- **여러 곳에서 재사용되는 공통 컴포넌트**
- Background, ImageCarousel 등이 포함됩니다.
- 여러 섹션에서 공통으로 사용되는 컴포넌트입니다.

### `components/home/`, `components/about/`, `components/schedule/` 등
- **네브바 섹션별로 분리된 컴포넌트 폴더**
- 각 섹션의 페이지와 관련 컴포넌트들이 포함됩니다.
- 각 팀원이 독립적으로 작업할 수 있도록 구성되었습니다.
- 각 컴포넌트는 `.jsx` 파일과 `.styles.js` 파일로 분리되어 있습니다.

### `api/`
- API 호출 관련 함수들을 포함합니다.
- 백엔드와의 통신 로직이 여기에 있습니다.

### `utils/`
- 유틸리티 함수들을 포함합니다.
- ProtectedRoute, 헬퍼 함수 등이 포함됩니다.

### `constants/`
- 프로젝트 전역에서 사용되는 상수들을 포함합니다.
- 이미지 URL, API 엔드포인트 등이 포함됩니다.

### `context/`
- React Context를 사용하는 파일들을 포함합니다.
- 전역 상태 관리에 사용됩니다.

## 🔄 작업 가이드

### 새 섹션 추가하기
1. `components/` 폴더에 새 섹션 폴더 생성 (예: `components/newsection/`)
2. 해당 폴더에 페이지 컴포넌트와 스타일 파일 생성
3. `App.jsx`에 라우트 추가
4. `components/layout/Header.jsx`에 네비게이션 링크 추가

### 새 컴포넌트 추가하기
- **레이아웃 컴포넌트**: `components/layout/` (모든 페이지에서 사용)
- **공통 컴포넌트**: `components/common/` (여러 섹션에서 재사용)
- **섹션별 컴포넌트**: 해당 섹션 폴더 (예: `components/home/`)

### 스타일 파일 분리
- 모든 컴포넌트는 `.jsx` 파일과 `.styles.js` 파일로 분리되어 있습니다.
- 스타일은 `styled-components`를 사용합니다.

### Import 경로 규칙
- 같은 섹션 내: `./ComponentName`
- 다른 섹션: `../sectionName/ComponentName`
- 공통 컴포넌트: `../common/ComponentName` 또는 `../layout/ComponentName`
- 상수/유틸: `../../constants` 또는 `../../utils`

## 👥 협업 가이드

### 섹션별 작업 분담
- 각 팀원은 하나의 섹션을 담당하여 작업합니다.
- 예: 팀원 A → `components/home/`, 팀원 B → `components/about/` 등

### 작업 시 주의사항
1. **자신의 섹션 폴더에서만 작업**: 다른 섹션의 파일은 수정하지 않습니다.
2. **공통 컴포넌트 수정 시**: `components/layout/` 또는 `components/common/` 수정 시 팀원들과 상의합니다.
3. **브랜치 전략**: 각 섹션별로 브랜치를 생성하여 작업합니다.
4. **커밋 메시지**: 섹션명을 포함하여 작성 (예: `[home] 메인 페이지 스타일 수정`)

## 🧾 GitHub Issues 사용 가이드

팀 작업은 **이슈 기반**으로 진행합니다. 작업 시작 전/후로 이슈 상태를 업데이트해주세요.

### 이슈 만들기(필수)
- **버그**: `Issues` → `New issue` → **🐞 버그 리포트**
- **기능**: `Issues` → `New issue` → **✨ 기능 제안**
- **리팩터/문서/설정**: `Issues` → `New issue` → **🧹 작업(리팩터/문서/환경)**

### 제목 규칙
- **버그**: `[BUG] 한 줄 요약`
- **기능**: `[FEAT] 한 줄 요약`
- **작업**: `[CHORE] 한 줄 요약`

### 라벨 규칙(권장)
- **bug**: 버그
- **enhancement**: 기능/개선
- **chore**: 리팩터/문서/환경
- **frontend / backend**: 작업 위치(가능하면 붙이기)
- **priority:high / medium / low**: 급한 정도(가능하면)

### 진행 흐름(추천)
- **Backlog**: 이슈 생성(설명/AC 작성)
- **In Progress**: 작업 시작 시 담당자/브랜치 연결
- **Done**: PR 머지 후 이슈 닫기(해결 방법/주의사항 코멘트 남기기)

### 이슈 작성 팁(시간 절약)
- **버그는 “재현 방법” + “기대/실제 동작” + “로그/스크린샷”**이 있으면 수정 속도가 확 올라갑니다.
- **기능은 “완료 기준(AC)”**을 체크리스트로 적어두면 PR 리뷰가 쉬워집니다.

### 브랜치/커밋/PR 연결(권장)
- 브랜치명 예시:
  - `feat/123-roulette`
  - `fix/124-fileupload-doubleclick`
- 커밋 메시지 예시:
  - `[roulette] 룰렛 UI 추가 (#123)`
  - `[admin] 멤버 검색 토스트 중복 수정 (#124)`
- PR 설명에 **`Closes #이슈번호`**를 적으면 머지 시 이슈가 자동으로 닫힙니다.

### 충돌 해결
- 같은 섹션 내에서 충돌 발생 시: 담당 팀원과 직접 소통
- 공통 컴포넌트 충돌 시: 팀 전체 회의를 통해 해결

## 📌 주의사항

- ✅ **섹션별 폴더 구조를 유지하세요**
- ✅ **공통 컴포넌트 수정 시 팀원들과 상의하세요**
- ✅ **Import 경로는 항상 확인하세요**
- ✅ **스타일 파일은 별도 `.styles.js` 파일로 분리하세요**
- ❌ **다른 섹션의 파일을 임의로 수정하지 마세요**
- ❌ **폴더 구조를 임의로 변경하지 마세요**

## 🌐 환경 설정

프로젝트 루트에 `config.js` 파일을 생성하여 환경 변수를 설정할 수 있습니다.

```javascript
window.ENV = {
  API_URL: "http://localhost:8081",
  CLIENT_URL: "http://localhost:5173",
};
```

## 📄 라이선스

이 프로젝트는 팀 프로젝트입니다.
