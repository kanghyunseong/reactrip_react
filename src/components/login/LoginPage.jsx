import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { axiosPublic } from "../../api/api.js";
import { imgTimoSternIUBgeNeyVy8Unsplash1, imgLogoRemovebgPreview1 } from "../../constants/constants";
import {
  LoginPageContainer,
  BackgroundImageContainer,
  BackgroundImg,
  LeftTextContainer,
  TitleText,
  SubtitleText,
  RightContainer,
  LogoContainer,
  LogoImg,
  LogoText,
  FormContainer,
  FormBox,
  InputField,
  InputLabel,
  Input,
  LoginButton,
  CheckboxContainer,
  Checkbox,
  CheckboxLabel,
  LinksContainer,
  LinkText,
  BackButton
} from "./LoginPage.styles";

export default function LoginPage() {
  const navigate = useNavigate();
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const regexpId = /^[a-zA-Z0-9]{6,20}$/;
    const regexpPwd = /^[a-zA-Z0-9]{5,20}$/;

    if (!regexpId.test(memberId)) {
      setMsg("아이디는 영어 숫자만 가능하고 6~20자 사이만 가능합니다");
      return;
    } else if (!regexpPwd.test(password)) {
      setMsg("비밀번호는 영어 숫자만 가능하고 5~20자 사이만 가능합니다");
      return;
    } else {
      setMsg("");
    }

    try {
        const response = await axiosPublic.post("/api/auth/login", {
            memberId,
            memberPwd: password,
        });


        // response.data가 바로 토큰 객체
        const loginData = response.data;
        
        
        if (loginData) {
          
          if (typeof loginData === 'object') {
              localStorage.setItem('accessToken', loginData.accessToken);
              localStorage.setItem('refreshToken', loginData.refreshToken);
              localStorage.setItem('memberId', loginData.userId);
              
          }
          
          alert('로그인 성공');
          navigate('/');
        } else {
            alert('로그인 응답에 토큰이 없습니다.');
        }
    } catch (error) {
        alert(error.response?.data?.message || '로그인 실패');
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <LoginPageContainer data-name="LoginPage" data-node-id="27:2">
      <BackButton onClick={handleBack}>← 뒤로가기</BackButton>
      <BackgroundImageContainer data-name="timo-stern-iUBgeNeyVy8-unsplash 1" data-node-id="73:896">
        <BackgroundImg alt="" src={imgTimoSternIUBgeNeyVy8Unsplash1} />
      </BackgroundImageContainer>
      
      <LeftTextContainer>
        <TitleText data-node-id="73:904">
          Every Step is a Story.
        </TitleText>
        <SubtitleText data-node-id="73:907">
          지도 위에 그려질 당신의 다음 페이지
        </SubtitleText>
      </LeftTextContainer>

      <RightContainer>
        <LogoContainer data-name="Logo-removebg-preview 1" data-node-id="27:43">
          <LogoImg alt="ReacTrip Logo" src={imgLogoRemovebgPreview1} />
        </LogoContainer>
        <LogoText data-node-id="27:226">
          ReacTrip
        </LogoText>

        <FormContainer data-node-id="33:517" data-name="Form Log In">
          <FormBox onSubmit={handleSubmit}>
            <InputField>
              <InputLabel>아이디</InputLabel>
              <Input
                type="text"
                placeholder="아이디를 입력하세요"
                autoComplete="username"
                required
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
              />
            </InputField>
            
            <InputField>
              <InputLabel>비밀번호</InputLabel>
              <Input
                type="password"
                placeholder="비밀번호를 입력하세요"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputField>

            {msg && <div style={{ color: 'red', fontSize: '14px' }}>{msg}</div>}

            <LoginButton type="submit">
              Welcome to ReacTrip
            </LoginButton>

            <CheckboxContainer data-node-id="27:435" data-name="Checkbox Field">
              <Checkbox
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <CheckboxLabel htmlFor="rememberMe">로그인 상태 유지</CheckboxLabel>
            </CheckboxContainer>

            <LinksContainer>
              <LinkText data-node-id="27:461">아이디 찾기</LinkText>
              <LinkText data-node-id="27:459">비밀번호 찾기</LinkText>
              <Link to="/signup">
                <LinkText data-node-id="27:464">회원가입</LinkText>
              </Link>
            </LinksContainer>
          </FormBox>
        </FormContainer>
      </RightContainer>
    </LoginPageContainer>
  );
}