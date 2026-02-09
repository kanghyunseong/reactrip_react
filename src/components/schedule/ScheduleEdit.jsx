// ScheduleEdit.jsx
import React, { useState, useEffect } from 'react';
import Header from '../layout/Header.jsx';
import DrawerNavigator from '../layout/DrawerNavigator.jsx'
import { useParams, useNavigate } from 'react-router-dom';
import { axiosAuth } from '../../api/api.js';
import PageWrapper from '../layout/PageWrapper.jsx';
import * as S from './SchedulePage.styles.js';

const ScheduleEdit = () => {
    const { scheduleNo } = useParams();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        scheduleName: '',
        description: '',
        headCount: 1,
        travelStart: '',
        travelEnd: ''
    });
    
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchScheduleDetail();
    }, [scheduleNo]);

    // 기존 데이터 조회
    const fetchScheduleDetail = async () => {
        try {
            const response = await axiosAuth.getActual(`/api/schedules/${scheduleNo}`);
            
            setFormData({
                scheduleName: response.scheduleName || '',
                description: response.description || '',
                headCount: response.headCount || 1,
                travelStart: response.travelStart || '',
                travelEnd: response.travelEnd || ''
            });
        } catch (err) {
            alert('일정을 찾을 수 없습니다.');
            navigate('/schedules');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validate = () => {
        const newErrors = {};
        
        if (!formData.scheduleName.trim()) {
            newErrors.scheduleName = '제목을 입력해주세요.';
        } else if (formData.scheduleName.length < 2) {
            newErrors.scheduleName = '제목은 2자 이상 입력해주세요.';
        } else if (formData.scheduleName.length > 100) {
            newErrors.scheduleName = '제목은 100자 이하로 입력해주세요.';
        }
        
        if (formData.description && formData.description.length > 2000) {
            newErrors.description = '설명은 2000자 이하로 입력해주세요.';
        }
        
        if (!formData.headCount || formData.headCount < 1) {
            newErrors.headCount = '인원은 최소 1명 이상이어야 합니다.';
        } else if (formData.headCount > 100) {
            newErrors.headCount = '인원은 최대 100명까지 가능합니다.';
        }
        
        if (!formData.travelStart) {
            newErrors.travelStart = '시작일을 선택해주세요.';
        }
        
        if (formData.travelEnd && formData.travelStart) {
            if (new Date(formData.travelEnd) < new Date(formData.travelStart)) {
                newErrors.travelEnd = '종료일은 시작일보다 이후여야 합니다.';
            }
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validate()) {
            return;
        }
        
        try {
            await axiosAuth.putJson(`/api/schedules/${scheduleNo}`, formData);
            
            alert('수정되었습니다.');
            navigate(`/schedules/${scheduleNo}`);
        } catch (err) {
            alert(err.response?.data?.message || '수정에 실패했습니다.');
        }
    };

    const handleCancel = () => {
        navigate(`/schedules/${scheduleNo}`);
    };

    if (loading) {
        return <S.LoadingContainer>로딩 중...</S.LoadingContainer>;
    }

    return (
        <>  
            <Header/>
            <DrawerNavigator/>
            <PageWrapper>
                <S.ScheduleContainer>
                    <S.ContentWrapper>
                        <S.PageTitle>여행 일정 수정</S.PageTitle>
                        
                        <S.Form onSubmit={handleSubmit}>
                            {/* 제목 */}
                            <S.FormGroup>
                                <S.Label>제목 *</S.Label>
                                <S.Input
                                    type="text"
                                    name="scheduleName"
                                    value={formData.scheduleName}
                                    onChange={handleChange}
                                    placeholder="여행 일정 제목을 입력하세요"
                                    error={errors.scheduleName}
                                />
                                {errors.scheduleName && <S.ErrorText>{errors.scheduleName}</S.ErrorText>}
                            </S.FormGroup>

                            {/* 설명 */}
                            <S.FormGroup>
                                <S.Label>설명</S.Label>
                                <S.Textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="여행 일정에 대한 설명을 입력하세요"
                                    rows="5"
                                    error={errors.description}
                                />
                                {errors.description && <S.ErrorText>{errors.description}</S.ErrorText>}
                            </S.FormGroup>

                            {/* 인원 */}
                            <S.FormGroup>
                                <S.Label>인원 *</S.Label>
                                <S.Input
                                    type="number"
                                    name="headCount"
                                    value={formData.headCount}
                                    onChange={handleChange}
                                    min="1"
                                    max="100"
                                    error={errors.headCount}
                                />
                                {errors.headCount && <S.ErrorText>{errors.headCount}</S.ErrorText>}
                            </S.FormGroup>

                            {/* 날짜 */}
                            <S.DateGroup>
                                <S.FormGroup>
                                    <S.Label>시작일 *</S.Label>
                                    <S.Input
                                        type="date"
                                        name="travelStart"
                                        value={formData.travelStart}
                                        onChange={handleChange}
                                        error={errors.travelStart}
                                    />
                                    {errors.travelStart && <S.ErrorText>{errors.travelStart}</S.ErrorText>}
                                </S.FormGroup>

                                <S.FormGroup>
                                    <S.Label>종료일</S.Label>
                                    <S.Input
                                        type="date"
                                        name="travelEnd"
                                        value={formData.travelEnd}
                                        onChange={handleChange}
                                        min={formData.travelStart}
                                        error={errors.travelEnd}
                                    />
                                    {errors.travelEnd && <S.ErrorText>{errors.travelEnd}</S.ErrorText>}
                                </S.FormGroup>
                            </S.DateGroup>

                            {/* 버튼 */}
                            <S.ButtonGroup>
                                <S.CancelButton type="button" onClick={handleCancel}>
                                    취소
                                </S.CancelButton>
                                <S.SubmitButton type="submit">
                                    수정하기
                                </S.SubmitButton>
                            </S.ButtonGroup>
                        </S.Form>
                    </S.ContentWrapper>
                </S.ScheduleContainer>
            </PageWrapper>
        </>
    );
};

export default ScheduleEdit;