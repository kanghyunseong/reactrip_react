import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosAuth } from '../../api/api.js';
import * as S from './MyPage.styles';

const MyPage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // 각 필드별 편집 상태
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [isEditingBirthday, setIsEditingBirthday] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    
    // 편집 중인 값들
    const [editName, setEditName] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editPhone, setEditPhone] = useState('');
    const [editBirthday, setEditBirthday] = useState('');
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newMemberPwd: '',
        confirmPassword: ''
    });
    
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            
            if (!token) {
                navigate('/login');
                return;
            }
            
            const response = await axiosAuth.getActual('/api/members/mypage');
            setUserInfo(response);
            setError(null);
        } catch (err) {
            
            if (err.response?.status === 401 || err.response?.status === 403) {
                alert('로그인이 필요합니다.');
                navigate('/login');
            } else {
                setError('사용자 정보를 불러오는데 실패했습니다.');
            }
        } finally {
            setLoading(false);
        }
    };

    // 이미지 선택
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // 파일 크기 검증 (5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('파일 크기는 5MB 이하만 가능합니다.');
                return;
            }
            
            // 이미지 파일 검증
            if (!file.type.startsWith('image/')) {
                alert('이미지 파일만 업로드 가능합니다.');
                return;
            }
            
            setSelectedImage(file);
            
            // 미리보기
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // 이미지 업로드
    const handleUploadImage = async () => {
        if (!selectedImage) {
            alert('이미지를 선택해주세요.');
            return;
        }
        
        try {
            const formData = new FormData();
            formData.append('imageFile', selectedImage);
            
            const token = localStorage.getItem('accessToken');
            
            // fetch API 사용 (가장 확실한 방법)
            const response = await fetch('http://localhost:8081/api/members/mypage/image', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                    // Content-Type 헤더 제거 - 브라우저가 자동 설정
                },
                body: formData
            });
            
            const result = await response.json();
            
            if (response.ok) {
                alert(result.message || '프로필 이미지가 변경되었습니다.');
                setSelectedImage(null);
                setPreviewImage(null);
                fetchUserInfo(); // 정보 새로고침
            } else {
                alert(result.message || '이미지 업로드에 실패했습니다.');
            }
        } catch (err) {
            console.error('이미지 업로드 실패:', err);
            alert('이미지 업로드에 실패했습니다.');
        }
    };


    // ========== 이름 변경 ==========
    const handleEditName = () => {
        setEditName(userInfo.memberName);
        setIsEditingName(true);
    };

    const handleSaveName = async () => {
        if (!editName || editName.trim().length < 2) {
            alert('이름은 2자 이상 입력해주세요.');
            return;
        }

        if (editName.length > 20) {
            alert('이름은 20자 이하로 입력해주세요.');
            return;
        }

        try {
            // const response = await axiosAuth.put('/api/members/mypage/name', {
            //     memberName: editName
            // });
            const response = await axiosAuth.put(
                `/api/members/mypage/name?memberName=${encodeURIComponent(editName)}`
            );
            alert(response.message || '이름이 변경되었습니다.');
            setIsEditingName(false);
            fetchUserInfo();
        } catch (err) {
            alert(err.response?.data?.message || '이름 변경에 실패했습니다.');
        }
    };

    const handleCancelName = () => {
        setIsEditingName(false);
        setEditName('');
    };

    // ========== 이메일 변경 ==========
    const handleEditEmail = () => {
        setEditEmail(userInfo.email);
        setIsEditingEmail(true);
    };

    const handleSaveEmail = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(editEmail)) {
            alert('올바른 이메일 형식을 입력해주세요.');
            return;
        }

        try {
            // const response = await axiosAuth.put('/api/members/mypage/email', {
            //     email: editEmail
            // });
            const response = await axiosAuth.put(
                `/api/members/mypage/email?email=${encodeURIComponent(editEmail)}`
            );
            alert(response.message || '이메일이 변경되었습니다.');
            setIsEditingEmail(false);
            fetchUserInfo();
        } catch (err) {
            alert(err.response?.data?.message || '이메일 변경에 실패했습니다.');
        }
    };

    const handleCancelEmail = () => {
        setIsEditingEmail(false);
        setEditEmail('');
    };

    // ========== 전화번호 변경 ==========
    const handleEditPhone = () => {
        setEditPhone(userInfo.phone);
        setIsEditingPhone(true);
    };

    const handleSavePhone = async () => {
        const phoneRegex = /^01[0-9]{8,9}$/;
        
        if (!phoneRegex.test(editPhone.replace(/-/g, ''))) {
            alert('올바른 전화번호 형식을 입력해주세요. (예: 01012345678)');
            return;
        }

        try {
            // const response = await axiosAuth.put('/api/members/mypage/phone', {
            //     phone: editPhone
            // });
            const response = await axiosAuth.put(
                `/api/members/mypage/phone?phone=${encodeURIComponent(editPhone)}`
            );

            alert(response.message || '전화번호가 변경되었습니다.');
            setIsEditingPhone(false);
            fetchUserInfo();
        } catch (err) {
            alert(err.response?.data?.message || '전화번호 변경에 실패했습니다.');
        }
    };

    const handleCancelPhone = () => {
        setIsEditingPhone(false);
        setEditPhone('');
    };

    // ========== 생년월일 변경 ==========
    const handleEditBirthday = () => {
        setEditBirthday(userInfo.birthDay);
        setIsEditingBirthday(true);
    };

    const handleSaveBirthday = async () => {
        const birthdayRegex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
        
        if (!birthdayRegex.test(editBirthday)) {
            alert('생년월일은 8자리 숫자로 입력해주세요. (예: 2000-01-01)');
            return;
        }

        try {

            const response = await axiosAuth.put(
                `/api/members/mypage/birthday?birthday=${encodeURIComponent(editBirthday)}`
            );
            alert(response.message || '생년월일이 변경되었습니다.');
            setIsEditingBirthday(false);
            fetchUserInfo();
        } catch (err) {
            alert(err.response?.data?.message || '생년월일 변경에 실패했습니다.');
        }
    };

    const handleCancelBirthday = () => {
        setIsEditingBirthday(false);
        setEditBirthday('');
    };

    // ========== 비밀번호 변경 ==========
    const handleEditPassword = () => {
        setIsEditingPassword(true);
    };

    const handlePasswordChange = (e) => {
        setPasswordForm({
            ...passwordForm,
            [e.target.name]: e.target.value
        });
    };

    const handleSavePassword = async () => {
        if (!passwordForm.currentPassword) {
            alert('현재 비밀번호를 입력해주세요.');
            return;
        }
        
        if (!passwordForm.newMemberPwd) {
            alert('새 비밀번호를 입력해주세요.');
            return;
        }
        
        if (passwordForm.newMemberPwd !== passwordForm.confirmPassword) {
            alert('새 비밀번호가 일치하지 않습니다.');
            return;
        }
        
        const passwordRegex = /^[a-zA-Z0-9]{5,20}$/;
        if (!passwordRegex.test(passwordForm.newMemberPwd)) {
            alert('비밀번호는 영문, 숫자 5~20자로 입력해주세요.');
            return;
        }

        try {
            const response = await axiosAuth.put('/api/members/mypage/password', passwordForm);
            
            alert(response.message || '비밀번호가 변경되었습니다.');
            setIsEditingPassword(false);
            setPasswordForm({
                currentPassword: '',
                newMemberPwd: '',
                confirmPassword: ''
            });
        } catch (err) {
            alert(err.response?.data?.message || '비밀번호 변경에 실패했습니다.');
        }
    };

    const handleCancelPassword = () => {
        setIsEditingPassword(false);
        setPasswordForm({
            currentPassword: '',
            newMemberPwd: '',
            confirmPassword: ''
        });
    };

    // ========== 로그아웃 ==========
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('memberId');
        localStorage.removeItem('memberName');
        localStorage.removeItem('role');
        navigate('/login');
    };

    if (loading) {
        return <S.LoadingContainer>로딩 중...</S.LoadingContainer>;
    }
    
    if (error) {
        return <S.ErrorContainer>{error}</S.ErrorContainer>;
    }
    
    if (!userInfo) {
        return <div>데이터가 없습니다.</div>;
    }

    return (
        <S.MyPageContainer>
            <S.ContentWrapper>
                <S.PageTitle>마이페이지</S.PageTitle>
                
                <S.ProfileSection>
                    <S.ProfileImageWrapper>
                            <S.ProfileImage 
                                src={previewImage || userInfo.image || '/default-profile.png'} 
                                alt="프로필" 
                            />
                            <input 
                                type="file" 
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                                id="imageUpload"
                            />
                            <label 
                                htmlFor="imageUpload"
                                style={{
                                    marginTop: '10px',
                                    padding: '8px 16px',
                                    background: '#4a90e2',
                                    color: 'white',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    fontSize: '0.9rem'
                                }}
                            >
                                이미지 선택
                            </label>
                            {selectedImage && (
                                <button 
                                    onClick={handleUploadImage}
                                    style={{
                                        marginTop: '10px',
                                        padding: '8px 16px',
                                        background: '#4CAF50',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    업로드
                                </button>
                            )}
                        </S.ProfileImageWrapper>
                    
                    <S.ProfileInfo>
                        {/* 아이디 (변경 불가) */}
                        <S.InfoRow>
                            <S.InfoLabel>아이디</S.InfoLabel>
                            <S.InfoValue>{userInfo.memberId}</S.InfoValue>
                        </S.InfoRow>
                        
                        {/* 이름 */}
                        <S.InfoRow>
                            <S.InfoLabel>이름</S.InfoLabel>
                            {isEditingName ? (
                                <div style={{ 
                                    display: 'flex', 
                                    gap: '10px', 
                                    flex: 1,
                                    alignItems: 'center'
                                }}>
                                    <input 
                                        type="text" 
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        placeholder="이름을 입력하세요"
                                        style={inputStyle}
                                    />
                                    <button onClick={handleSaveName} style={saveButtonStyle}>저장</button>
                                    <button onClick={handleCancelName} style={cancelButtonStyle}>취소</button>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flex: 1 }}>
                                    <S.InfoValue>{userInfo.memberName}</S.InfoValue>
                                    <button onClick={handleEditName} style={editButtonStyle}>변경</button>
                                </div>
                            )}
                        </S.InfoRow>
                        
                        {/* 이메일 */}
                        <S.InfoRow>
                            <S.InfoLabel>이메일</S.InfoLabel>
                            {isEditingEmail ? (
                                <div style={{ 
                                    display: 'flex', 
                                    gap: '10px', 
                                    flex: 1,
                                    alignItems: 'center'
                                }}>
                                    <input 
                                        type="email" 
                                        value={editEmail}
                                        onChange={(e) => setEditEmail(e.target.value)}
                                        placeholder="이메일을 입력하세요"
                                        style={inputStyle}
                                    />
                                    <button onClick={handleSaveEmail} style={saveButtonStyle}>저장</button>
                                    <button onClick={handleCancelEmail} style={cancelButtonStyle}>취소</button>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flex: 1 }}>
                                    <S.InfoValue>{userInfo.email}</S.InfoValue>
                                    <button onClick={handleEditEmail} style={editButtonStyle}>변경</button>
                                </div>
                            )}
                        </S.InfoRow>
                        
                        {/* 전화번호 */}
                        <S.InfoRow>
                            <S.InfoLabel>전화번호</S.InfoLabel>
                            {isEditingPhone ? (
                                <div style={{ 
                                    display: 'flex', 
                                    gap: '10px', 
                                    flex: 1,
                                    alignItems: 'center'
                                }}>
                                    <input 
                                        type="text" 
                                        value={editPhone}
                                        onChange={(e) => setEditPhone(e.target.value)}
                                        placeholder="전화번호를 입력하세요 (01012345678)"
                                        style={inputStyle}
                                    />
                                    <button onClick={handleSavePhone} style={saveButtonStyle}>저장</button>
                                    <button onClick={handleCancelPhone} style={cancelButtonStyle}>취소</button>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flex: 1 }}>
                                    <S.InfoValue>{userInfo.phone}</S.InfoValue>
                                    <button onClick={handleEditPhone} style={editButtonStyle}>변경</button>
                                </div>
                            )}
                        </S.InfoRow>
                        
                        {/* 생년월일 */}
                        <S.InfoRow>
                            <S.InfoLabel>생년월일</S.InfoLabel>
                            {isEditingBirthday ? (
                                <div style={{ 
                                    display: 'flex', 
                                    gap: '10px', 
                                    flex: 1,
                                    alignItems: 'center'
                                }}>
                                    <input 
                                        type="text" 
                                        value={editBirthday}
                                        onChange={(e) => setEditBirthday(e.target.value)}
                                        placeholder="생년월일을 입력하세요 (20000101)"
                                        style={inputStyle}
                                    />
                                    <button onClick={handleSaveBirthday} style={saveButtonStyle}>저장</button>
                                    <button onClick={handleCancelBirthday} style={cancelButtonStyle}>취소</button>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flex: 1 }}>
                                    <S.InfoValue>{userInfo.birthDay}</S.InfoValue>
                                    <button onClick={handleEditBirthday} style={editButtonStyle}>변경</button>
                                </div>
                            )}
                        </S.InfoRow>

                        {/* 비밀번호 */}
                        <S.InfoRow>
                            <S.InfoLabel>비밀번호</S.InfoLabel>
                            {isEditingPassword ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                                    <input 
                                        type="password" 
                                        name="currentPassword"
                                        value={passwordForm.currentPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="현재 비밀번호"
                                        style={inputStyle}
                                    />
                                    <input 
                                        type="password" 
                                        name="newMemberPwd"
                                        value={passwordForm.newMemberPwd}
                                        onChange={handlePasswordChange}
                                        placeholder="새 비밀번호 (영문, 숫자 5~20자)"
                                        style={inputStyle}
                                    />
                                    <input 
                                        type="password" 
                                        name="confirmPassword"
                                        value={passwordForm.confirmPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="새 비밀번호 확인"
                                        style={inputStyle}
                                    />
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button onClick={handleSavePassword} style={saveButtonStyle}>저장</button>
                                        <button onClick={handleCancelPassword} style={cancelButtonStyle}>취소</button>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flex: 1 }}>
                                    <S.InfoValue>••••••••</S.InfoValue>
                                    <button onClick={handleEditPassword} style={editButtonStyle}>변경</button>
                                </div>
                            )}
                        </S.InfoRow>
                        
                        {/* 가입일 (변경 불가) */}
                        <S.InfoRow>
                            <S.InfoLabel>가입일</S.InfoLabel>
                            <S.InfoValue>
                                {new Date(userInfo.enrollDate).toLocaleDateString('ko-KR')}
                            </S.InfoValue>
                        </S.InfoRow>
                    </S.ProfileInfo>
                </S.ProfileSection>
                
                <S.ButtonGroup>
                    <S.LogoutButton onClick={handleLogout}>
                        로그아웃
                    </S.LogoutButton>
                </S.ButtonGroup>
            </S.ContentWrapper>
        </S.MyPageContainer>
    );
};

// 스타일 상수
const inputStyle = {
    flex: 1,
    padding: '8px 12px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    fontFamily: 'Lato, Noto Sans KR, sans-serif'
};

const editButtonStyle = {
    padding: '6px 12px',
    background: '#4a90e2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '600'
};

const saveButtonStyle = {
    padding: '8px 16px',
    background: '#4a90e2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '600'
};

const cancelButtonStyle = {
    padding: '8px 16px',
    background: '#999',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '600'
};

export default MyPage;