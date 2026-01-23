import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { axiosPublic } from "../../api/api.js";
import { imgImage13, imgLogoRemovebgPreview1 } from "../../constants/constants";
import {
  SignUpPageContainer,
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
  ExampleText,
  SignUpButton,
  LoginLinkButton,
  TextLink,
  BackButton
} from "./SignUpPage.styles";
import axios from "axios";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [formData, setFormData] = useState({
    id:"",
    name: "",
    age: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const signup = (memberId, memberName, age, phone, email, password, confirmPassword) => {
      localStorage.setItem("memberId", memberId);
      localStorage.setItem("memberName", memberName);
      localStorage.setItem("age", age);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      localStorage.setItem("confirmPassword",  confirmPassword);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 회원가입 로직 구현
    const regexpId = /^[a-zA-Z0-9]{6,20}$/;
    const regexpPwd = /^[a-zA-Z0-9]{5,20}$/;
    const regexpName = /^[a-zA-Z가-힣0-9]{3,20}$/;
    const regexpAge = /^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/;
    const regexpPhone = /^010\d{8}$/;
    const regexpEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!regexpId.test(formData.id)) {
      setMsg("아이디는 영어, 숫자만 가능하고 6~20자 사이만 가능합니다");
      return;
    } else if(!regexpPwd.test(formData.password)) {
      setMsg("비밀번호는 영어, 숫자만 가능하고 5~20자 사이만 가능합니다");
      return;
    } else if(!regexpName.test(formData.name)){
      setMsg("이름은 한글, 영어, 숫자만 가능하고 3~20자 사이만 가능합니다");
      return;
    } else if(!regexpAge.test(formData.age)) {
      setMsg("생년월일 형식이 올바르지 않습니다");
      return;
    } else if(!regexpPhone.test(formData.phone)) {
      setMsg("휴대폰 번호 형식이 올바르지 않습니다");
    } else if(!regexpEmail.test(formData.email)) {
      setMsg("이메일 형식이 올바르지 않습니다");
    } else if(formData.password !== formData.confirmPassword) {
      setMsg("비밀번호가 일치하지 않습니다");
    }

    axiosPublic.post("/api/members/signup", {
      memberId: formData.id,
      memberName : formData.name,
      memberPwd : formData.password,
      birthDay : formData.age,
      email : formData.email,
      phone : formData.phone
    }).then((result) => {
      const {memberId, memberName, age, phone, email, password, confirmPassword} = result.data;
      signup(memberId, memberName, age, phone, email, password, confirmPassword);
      alert("회원가입 성공");
      navigate("/login");
    }).catch((error) => {
    });
      
    console.log("SignUp:", formData);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <SignUpPageContainer data-name="SingUpPage" data-node-id="75:836">
      <BackButton onClick={handleBack}>← 뒤로가기</BackButton>
      <BackgroundImageContainer data-name="image 13" data-node-id="75:877">
        <BackgroundImg alt="" src={imgImage13} />
      </BackgroundImageContainer>
      
      <LeftTextContainer>
        <TitleText data-node-id="75:838">
          Every Step Is A Story.
        </TitleText>
        <SubtitleText data-node-id="75:839">
          지도 위에 그려질 당신의 다음 페이지
        </SubtitleText>
      </LeftTextContainer>

      <RightContainer>
        <LogoContainer data-name="Logo-removebg-preview 1" data-node-id="75:840">
          <LogoImg alt="ReacTrip Logo" src={imgLogoRemovebgPreview1} />
        </LogoContainer>
        <LogoText data-node-id="75:841">
          ReacTrip
        </LogoText>

        <FormContainer>
          <FormBox onSubmit={handleSubmit}>
             <InputField data-node-id="80:123">
              <InputLabel>
                ID
              </InputLabel>
              <Input
                type="text"
                name="id"
                placeholder="영문, 한글 최소 6자 ~ 최대 20자"
                autoComplete="id"
                required
                value={formData.id}
                onChange={handleChange}
                data-node-id="80:123"
              />
            </InputField>
            <InputField data-node-id="73:1045">
              <InputLabel>
                Name
              </InputLabel>
              <Input
                type="text"
                name="name"
                placeholder="영문, 한글 최소 3자 ~ 최대 20자"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
                data-node-id="73:1046"
              />
            </InputField>

            <InputField data-node-id="145:2517">
              <InputLabel>
                Age
                <ExampleText data-node-id="143:2305">ex) 20110203</ExampleText>
              </InputLabel>
              <Input
                type="text"
                name="age"
                placeholder="숫자만 입력하세요"
                inputMode="numeric"
                pattern="[0-9]*"
                required
                value={formData.age}
                onChange={handleChange}
                data-node-id="145:2518"
              />
            </InputField>

            <InputField data-node-id="97:771">
              <InputLabel>
                Phone
                <ExampleText data-node-id="143:2307">ex) 01012345678</ExampleText>
              </InputLabel>
              <Input
                type="tel"
                name="phone"
                placeholder="숫자만 입력하세요."
                autoComplete="tel"
                inputMode="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                data-node-id="97:772"
              />
            </InputField>

            <InputField data-node-id="73:937">
              <InputLabel>
                Email
                <ExampleText data-node-id="143:2420">ex) abc@gmail.com</ExampleText>
              </InputLabel>
              <Input
                type="email"
                name="email"
                placeholder="이메일 형식으로 입력해주세요."
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                data-node-id="73:1091"
              />
            </InputField>

            <InputField data-node-id="73:1041">
              <InputLabel>Password</InputLabel>
              <Input
                type="password"
                name="password"
                placeholder="영문, 숫자 최소 4자 ~ 최대 20자"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                data-node-id="73:1042"
              />
            </InputField>

            <InputField data-node-id="73:1072">
              <InputLabel>Confirm Password</InputLabel>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="영문, 숫자 최소 4자 ~ 최대 20자"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                data-node-id="73:1073"
              />
            </InputField>

            <SignUpButton type="submit" data-node-id="73:944">
              Welcome to ReacTrip
            </SignUpButton>

            <TextLink data-node-id="73:941">
              이미 계정이 있으신가요?
            </TextLink>

            <LoginLinkButton type="button" onClick={handleLoginClick} data-node-id="73:1082">
              로그인 하러 가기
            </LoginLinkButton>
          </FormBox>
        </FormContainer>
      </RightContainer>
    </SignUpPageContainer>
  );
}
