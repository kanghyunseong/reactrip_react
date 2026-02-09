// SchedulePage.jsx
import React, { useState, useEffect } from 'react';
import Header from '../layout/Header.jsx';
import DrawerNavigator from '../layout/DrawerNavigator.jsx'
import { useNavigate } from 'react-router-dom';
import { axiosAuth } from '../../api/api.js';
import PageWrapper from '../layout/PageWrapper.jsx';
import * as S from './SchedulePage.styles.js';

const SchedulePage = () => {
    const [schedules, setSchedules] = useState([]);
    const [pageInfo, setPageInfo] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    
    const navigate = useNavigate();

    useEffect(() => {
        fetchSchedules(currentPage);
    }, [currentPage]);

    // 스케줄 목록 조회
    const fetchSchedules = async (page) => {
        try {
            setLoading(true);
            const response = await axiosAuth.getList(`/api/schedules?page=${page}`);
            
            const scheduleData = response.data?.schedules || response.schedules || [];
            const pageData = response.data?.pageInfo || response.pageInfo || null;
            
            setSchedules(scheduleData);
            setPageInfo(pageData);
        } catch (err) {
            if (err.response?.status === 401 || err.response?.status === 403) {
                alert('로그인이 필요합니다.');
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    // 페이지 변경
    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    // 스케줄 상세로 이동
    const handleScheduleClick = (scheduleNo) => {
        navigate(`/schedules/${scheduleNo}`);
    };

    // 스케줄 작성으로 이동
    const handleCreateSchedule = () => {
        navigate('/schedules/create');
    };

    if (loading && schedules.length === 0) {
        return (
            <>
                <Header/>
                <DrawerNavigator/>
                <PageWrapper>
                    <S.LoadingContainer>로딩 중...</S.LoadingContainer>
                </PageWrapper>
            </>
        );
    }

    return (
        <>
            <Header/>
            <DrawerNavigator/>
            <PageWrapper>
                <S.ScheduleContainer>
                    <S.ContentWrapper>
                        <S.PageHeader>
                            <S.PageTitle>내 여행 일정</S.PageTitle>
                            <S.CreateButton onClick={handleCreateSchedule}>
                                + 새 일정 만들기
                            </S.CreateButton>
                        </S.PageHeader>

                        {/* 스케줄 목록 */}
                        {schedules.length === 0 ? (
                            <S.EmptyMessage>
                                <p>아직 작성한 여행 일정이 없습니다.</p>
                                <S.CreateButton onClick={handleCreateSchedule}>
                                    첫 일정 만들기
                                </S.CreateButton>
                            </S.EmptyMessage>
                        ) : (
                            <>
                                <S.ScheduleGrid>
                                    {schedules.map((schedule) => (
                                        <S.ScheduleCard
                                            key={schedule.scheduleNo}
                                            onClick={() => handleScheduleClick(schedule.scheduleNo)}
                                        >
                                            <S.CardHeader>
                                                <S.ScheduleTitle>{schedule.scheduleName}</S.ScheduleTitle>
                                            </S.CardHeader>
                                            
                                            <S.CardBody>
                                                <S.InfoRow>
                                                    <S.InfoIcon>📅</S.InfoIcon>
                                                    <S.InfoText>
                                                        {schedule.travelStart} ~ {schedule.travelEnd || '미정'}
                                                    </S.InfoText>
                                                </S.InfoRow>
                                                
                                                <S.InfoRow>
                                                    <S.InfoIcon>👥</S.InfoIcon>
                                                    <S.InfoText>{schedule.headCount}명</S.InfoText>
                                                </S.InfoRow>
                                                
                                                {schedule.description && (
                                                    <S.Description>
                                                        {schedule.description.length > 80
                                                            ? schedule.description.substring(0, 80) + '...'
                                                            : schedule.description}
                                                    </S.Description>
                                                )}
                                            </S.CardBody>
                                            
                                            <S.CardFooter>
                                                <S.CreatedDate>
                                                    {new Date(schedule.createdDate).toLocaleDateString('ko-KR')}
                                                </S.CreatedDate>
                                            </S.CardFooter>
                                        </S.ScheduleCard>
                                    ))}
                                </S.ScheduleGrid>

                                {/* 페이지네이션 */}
                                {pageInfo && (
                                  <S.Pagination>
                                      <S.PageButton
                                          onClick={() => handlePageChange(currentPage - 1)}
                                          disabled={currentPage === 1}
                                      >
                                          이전
                                      </S.PageButton>
                                      
                                      {Array.from({ length: pageInfo.endPage - pageInfo.startPage + 1 }, (_, i) => {
                                          const pageNum = pageInfo.startPage + i;
                                          return (
                                              <S.PageNumber
                                                  key={pageNum}
                                                  onClick={() => handlePageChange(pageNum)}
                                                  $active={currentPage === pageNum}  // ← $active로 변경
                                              >
                                                  {pageNum}
                                              </S.PageNumber>
                                          );
                                      })}
                                      
                                      <S.PageButton
                                          onClick={() => handlePageChange(currentPage + 1)}
                                          disabled={currentPage === pageInfo.maxPage}
                                      >
                                          다음
                                      </S.PageButton>
                                  </S.Pagination>
                                )}
                            </>
                        )}
                    </S.ContentWrapper>
                </S.ScheduleContainer>
            </PageWrapper>
        </>
    );
};

export default SchedulePage;