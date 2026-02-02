import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../layout/Header";
import TourSearchBar from "./TourSearchBar";
import TourFilterPanel from "./TourFilterPanel";
import TourDestinationCard from "./TourDestinationCard";
import { axiosPublic } from "../../api/api";
import {
  PageContainer,
  ContentWrapper,
  HeaderSection,
  Title,
  Subtitle,
  BackButton,
  MainContent,
  CardGrid,
  LoadingSpinner,
  ErrorMessage,
  EmptyMessage,
  PaginationWrapper,
  PageButton,
  PageNumber,
  PageDots,
} from "./TourListPage.styles";

export default function TourListPage() {
  const navigate = useNavigate();

  // 상태 관리
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 검색/필터 파라미터
  const [keyword, setKeyword] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);

  // 페이지네이션 - TODO: 백엔드에서 pagination 정보(totalPages, totalCount 등)를 받아오면 실제 값으로 교체 필요
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10); // 임시 값
  const pageSize = 10;

  // API 호출 함수 - filters 파라미터로 즉시 값 받기
  const fetchDestinations = async (page = 1, filters = {}) => {
    try {
      setLoading(true);
      setError(null);

      // 파라미터로 받은 값 우선 사용, 없으면 state 값 사용
      const searchKeyword = filters.keyword !== undefined ? filters.keyword : keyword;
      const searchRegion = filters.regionNo !== undefined ? filters.regionNo : selectedRegion;
      const searchTheme = filters.themeNo !== undefined ? filters.themeNo : selectedTheme;

      // 쿼리 파라미터 구성
      const params = new URLSearchParams();
      if (searchKeyword.trim()) params.append("keyword", searchKeyword.trim());
      if (searchRegion) params.append("regionNo", searchRegion);
      if (searchTheme) params.append("themeNo", searchTheme);
      params.append("page", page);
      params.append("size", pageSize);

      // API 호출: GET /api/places
      const response = await axiosPublic.getList(`/api/places?${params.toString()}`);

      // 응답 데이터 처리
      if (Array.isArray(response)) {
        setDestinations(response);
        // TODO: 백엔드에서 pagination 정보를 받아오면 아래 주석 해제하고 사용
        // if (response.pageInfo) {
        //   setTotalPages(response.pageInfo.maxPage || 1);
        // }
      } else {
        setDestinations([]);
      }
    } catch (err) {
      console.error("조회된 여행지가 없습니다. 여행지 목록 조회 실패:", err);
      setError("조회된 여행지가 없습니다.");
      // TODO: 에러 처리 - toast 메시지나 에러 UI 개선 필요
      toast.error("조회된 여행지가 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 초기 데이터 로드
  useEffect(() => {
    fetchDestinations(1);
  }, []);

  // 검색 버튼 클릭 핸들러
  const handleSearch = () => {
    setCurrentPage(1);
    // 현재 keyword 값을 직접 전달
    fetchDestinations(1, { keyword });
  };

  // 필터 변경 핸들러 (즉시 반영)
  const handleRegionChange = (regionNo) => {
    setSelectedRegion(regionNo);
    setCurrentPage(1);
    // 새로운 값을 직접 전달하여 즉시 반영
    fetchDestinations(1, { regionNo });
  };

  const handleThemeChange = (themeNo) => {
    setSelectedTheme(themeNo);
    setCurrentPage(1);
    // 새로운 값을 직접 전달하여 즉시 반영
    fetchDestinations(1, { themeNo });
  };

  // 초기화 버튼 핸들러
  const handleReset = () => {
    setKeyword("");
    setSelectedRegion(null);
    setSelectedTheme(null);
    setCurrentPage(1);
    // 초기화된 값을 직접 전달
    fetchDestinations(1, { keyword: "", regionNo: null, themeNo: null });
  };

  // 카드 클릭 핸들러 - 상세 페이지로 이동
  const handleCardClick = (travelNo) => {
    navigate(`/tour/${travelNo}`);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    fetchDestinations(page);
    // 페이지 변경 시 스크롤 맨 위로
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 페이지네이션 버튼 렌더링
  const renderPagination = () => {
    const pageNumbers = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    // Previous 버튼
    pageNumbers.push(
      <PageButton
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ← Previous
      </PageButton>
    );

    // 첫 페이지
    if (startPage > 1) {
      pageNumbers.push(
        <PageNumber
          key={1}
          onClick={() => handlePageChange(1)}
          $active={currentPage === 1}
        >
          1
        </PageNumber>
      );
      if (startPage > 2) {
        pageNumbers.push(<PageDots key="dots-start">...</PageDots>);
      }
    }

    // 페이지 번호들
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PageNumber
          key={i}
          onClick={() => handlePageChange(i)}
          $active={currentPage === i}
        >
          {i}
        </PageNumber>
      );
    }

    // 마지막 페이지
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<PageDots key="dots-end">...</PageDots>);
      }
      pageNumbers.push(
        <PageNumber
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          $active={currentPage === totalPages}
        >
          {totalPages}
        </PageNumber>
      );
    }

    // Next 버튼
    pageNumbers.push(
      <PageButton
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next →
      </PageButton>
    );

    return pageNumbers;
  };

  return (
    <PageContainer>
      <Header />

      <ContentWrapper>
        <HeaderSection>
          <BackButton onClick={() => navigate(-1)}>← 돌아가기</BackButton>
          <div>
            <Title>다음 여행지를 찾아볼까요?</Title>
            <Subtitle>새로운 곳을 탐험해보시다!</Subtitle>
          </div>
        </HeaderSection>

        <TourSearchBar
          keyword={keyword}
          onKeywordChange={setKeyword}
          onSearch={handleSearch}
        />

        <MainContent>
          <CardGrid>
            {/* 로딩 상태 */}
            {loading && (
              <LoadingSpinner>
                {/* TODO: 로딩 스피너 UI 개선 가능 */}
                <div className="spinner"></div>
                <p>여행지를 불러오는 중...</p>
              </LoadingSpinner>
            )}

            {/* 에러 상태 */}
            {error && !loading && (
              <ErrorMessage>
                {/* TODO: 에러 메시지 UI 개선 가능 */}
                <p>{error}</p>
                <button onClick={() => fetchDestinations(currentPage)}>
                  다시 시도
                </button>
              </ErrorMessage>
            )}

            {/* 데이터 없음 */}
            {!loading && !error && destinations.length === 0 && (
              <EmptyMessage>
                {/* TODO: 빈 상태 UI 개선 가능 */}
                <p>검색 결과가 없습니다.</p>
                <button onClick={handleReset}>전체 목록 보기</button>
              </EmptyMessage>
            )}

            {/* 여행지 카드 목록 */}
            {!loading &&
              !error &&
              destinations.length > 0 &&
              destinations.map((destination) => (
                <TourDestinationCard
                  key={destination.travelNo}
                  destination={destination}
                  onClick={() => handleCardClick(destination.travelNo)}
                />
              ))}
          </CardGrid>

          <TourFilterPanel
            selectedRegion={selectedRegion}
            selectedTheme={selectedTheme}
            onRegionChange={handleRegionChange}
            onThemeChange={handleThemeChange}
            onReset={handleReset}
          />
        </MainContent>

        {/* 페이지네이션 */}
        {!loading && destinations.length > 0 && (
          <PaginationWrapper>{renderPagination()}</PaginationWrapper>
        )}
      </ContentWrapper>
    </PageContainer>
  );
}