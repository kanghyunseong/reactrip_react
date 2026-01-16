import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 로그인 로직 구현
    console.log("Login:", { email, password, rememberMe });
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
              <InputLabel>Email</InputLabel>
              <Input
                type="email"
                placeholder="Value"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputField>
            
            <InputField>
              <InputLabel>Password</InputLabel>
              <Input
                type="password"
                placeholder="Value"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputField>

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
