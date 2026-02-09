// ScheduleDetail.jsx
import React, { useState, useEffect } from 'react';
import Header from '../layout/Header.jsx';
import DrawerNavigator from '../layout/DrawerNavigator.jsx'
import { useNavigate } from 'react-router-dom';
import { useParams} from 'react-router-dom';
import { axiosAuth } from '../../api/api.js';
import * as S from './SchedulePage.styles.js';
import PageWrapper from '../layout/PageWrapper.jsx';

const ScheduleDetail = () => {
    const { scheduleNo } = useParams();
    const navigate = useNavigate();
    
    const [schedule, setSchedule] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchScheduleDetail();
    }, [scheduleNo]);

    // 스케줄 상세 조회
    const fetchScheduleDetail = async () => {
        try {
            const response = await axiosAuth.getActual(`/api/schedules/${scheduleNo}`);
            
            console.log('상세 조회 응답:', response);
            
            setSchedule(response);
        } catch (err) {
            console.error('조회 실패:', err);
            if (err.response?.status === 401 || err.response?.status === 403) {
                alert('로그인이 필요합니다.');
                navigate('/login');
            } else {
                alert('일정을 찾을 수 없습니다.');
                navigate('/schedules');
            }
        } finally {
            setLoading(false);
        }
    };

    // 수정
    const handleEdit = () => {
        navigate(`/schedules/${scheduleNo}/edit`);
    };

    // 삭제
    const handleDelete = async () => {
        if (!window.confirm('정말 삭제하시겠습니까?')) {
            return;
        }
        
        try {
            await axiosAuth.delete(`/api/schedules`, scheduleNo);
            alert('일정이 삭제되었습니다.');
            navigate('/schedule');
        } catch (err) {
            console.error('삭제 실패:', err);
            alert(err.response?.data?.message || '삭제에 실패했습니다.');
        }
    };

    // 목록으로
    const handleBack = () => {
        navigate('/schedule');
    };

    if (loading) {
        return <S.LoadingContainer>로딩 중...</S.LoadingContainer>;
    }

    if (!schedule) {
        return <S.ErrorContainer>일정을 찾을 수 없습니다.</S.ErrorContainer>;
    }

    return (
        <>
            <Header/>
            <DrawerNavigator/>
            <PageWrapper>
                <S.ScheduleContainer>
                    <S.ContentWrapper>
                        <S.DetailHeader>
                            <S.PageTitle>{schedule.scheduleName}</S.PageTitle>
                            <S.ButtonGroup>
                                <S.EditButton onClick={handleEdit}>수정</S.EditButton>
                                <S.DeleteButton onClick={handleDelete}>삭제</S.DeleteButton>
                            </S.ButtonGroup>
                        </S.DetailHeader>

                        <S.DetailContent>
                            <S.DetailSection>
                                <S.DetailLabel>📅 여행 기간</S.DetailLabel>
                                <S.DetailValue>
                                    {schedule.travelStart} ~ {schedule.travelEnd || '미정'}
                                </S.DetailValue>
                            </S.DetailSection>

                            <S.DetailSection>
                                <S.DetailLabel>👥 인원</S.DetailLabel>
                                <S.DetailValue>{schedule.headCount}명</S.DetailValue>
                            </S.DetailSection>

                            {schedule.description && (
                                <S.DetailSection>
                                    <S.DetailLabel>📝 설명</S.DetailLabel>
                                    <S.DetailDescription>{schedule.description}</S.DetailDescription>
                                </S.DetailSection>
                            )}

                            <S.DetailSection>
                                <S.DetailLabel>🕐 작성일</S.DetailLabel>
                                <S.DetailValue>
                                    {new Date(schedule.createdDate).toLocaleDateString('ko-KR')}
                                </S.DetailValue>
                            </S.DetailSection>
                        </S.DetailContent>

                        <S.BackButton onClick={handleBack}>목록으로</S.BackButton>
                    </S.ContentWrapper>
                </S.ScheduleContainer>
            </PageWrapper>
        </>
    );
};

export default ScheduleDetail;