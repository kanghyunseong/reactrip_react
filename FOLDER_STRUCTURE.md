# 프로젝트 폴더 구조

4명이 함께 작업하는 프로젝트를 위한 체계적인 폴더 구조입니다.
**네브바 섹션별로 컴포넌트를 분리**하여 각 팀원이 독립적으로 작업할 수 있도록 구성했습니다.

## 📁 폴더 구조

```
src/
├── components/               # 컴포넌트
│   ├── layout/               # 레이아웃 컴포넌트 (공통)
│   │   ├── Header.jsx        # 헤더 (네비게이션 바)
│   │   ├── Footer.jsx        # 푸터
│   │   └── CustomScrollbar.jsx # 커스텀 스크롤바
│   │
│   ├── common/               # 공통 컴포넌트
│   │   ├── Background.jsx    # 배경 이미지
│   │   ├── ImageCarousel.jsx # 이미지 캐러셀
│   │   ├── Rectangle.jsx    # 사각형 컴포넌트
│   │   └── Sheet.jsx        # 시트 컴포넌트
│   │
│   ├── home/                 # 홈 섹션 (메인 페이지)
│   │   ├── MainPage.jsx      # 메인 페이지
│   │   └── HeroSection.jsx   # 히어로 섹션
│   │
│   ├── about/                # ABOUT 섹션
│   │   └── AboutSection.jsx # 소개 섹션
│   │
│   ├── schedule/             # SCHEDULE 섹션
│   │   └── SchedulePage.jsx # 일정 페이지
│   │
│   ├── tour/                 # TOUR 섹션
│   │   └── TourPage.jsx      # 투어 페이지
│   │
│   ├── roulette/             # ROULETTE 섹션
│   │   └── RoulettePage.jsx  # 룰렛 페이지
│   │
│   ├── diary/                # DIARY 섹션
│   │   └── DiaryPage.jsx    # 일기 페이지
│   │
│   ├── contact/              # CONTACT 섹션
│   │   └── ContactPage.jsx   # 연락처 페이지
│   │
│   └── admin/                # 관리자 컴포넌트 (추후 추가)
│
├── api/                      # API 관련
│   └── api.js                # API 함수들
│
├── utils/                    # 유틸리티 함수
│   └── ProtectedURL.jsx      # 보호된 라우트
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
- Header, Footer, CustomScrollbar 등이 포함됩니다.
- 공통 컴포넌트이므로 수정 시 주의가 필요합니다.

### `components/common/`
- **여러 곳에서 재사용되는 공통 컴포넌트**
- Background, ImageCarousel 등이 포함됩니다.
- 여러 섹션에서 공통으로 사용되는 컴포넌트입니다.

### `components/home/`, `components/about/`, `components/schedule/` 등
- **네브바 섹션별로 분리된 컴포넌트 폴더**
- 각 섹션의 페이지와 관련 컴포넌트들이 포함됩니다.
- 각 팀원이 독립적으로 작업할 수 있도록 구성되었습니다.

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
2. 해당 폴더에 페이지 컴포넌트 생성
3. `App.jsx`에 라우트 추가
4. `components/layout/Header.jsx`에 네비게이션 링크 추가

### 새 컴포넌트 추가하기
- **레이아웃 컴포넌트**: `components/layout/` (모든 페이지에서 사용)
- **공통 컴포넌트**: `components/common/` (여러 섹션에서 재사용)
- **섹션별 컴포넌트**: 해당 섹션 폴더 (예: `components/home/`)

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

### 충돌 해결
- 같은 섹션 내에서 충돌 발생 시: 담당 팀원과 직접 소통
- 공통 컴포넌트 충돌 시: 팀 전체 회의를 통해 해결

## 📌 주의사항

- ✅ **섹션별 폴더 구조를 유지하세요**
- ✅ **공통 컴포넌트 수정 시 팀원들과 상의하세요**
- ✅ **Import 경로는 항상 확인하세요**
- ❌ **다른 섹션의 파일을 임의로 수정하지 마세요**
- ❌ **폴더 구조를 임의로 변경하지 마세요**
