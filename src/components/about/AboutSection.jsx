import React from "react";
import { imgSylwiaBartyzelEU4PipU8HaUnsplash1, imgJackAnsteyXVoyX7L9OcYUnsplash1 } from "../../constants/constants";
import {
  AboutPage1,
  AboutPage2,
  AboutBackground,
  AboutBackgroundImg,
  AboutOverlay,
  SectionLabel,
  Title,
  Title2,
  LeftContent,
  DescriptionText,
  DescriptionParagraph,
  ImageContainer,
  ImageWrapper,
  BackgroundImage,
  ImageContainer2,
  BackgroundImage2,
  LoginButton,
  LoginText
} from "./AboutSection.styles";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function AboutSection() {
  const navigate = useNavigate();

  return (
    <>
      <AboutPage1 id="about" data-snap-section>
        <AboutBackground>
          <AboutBackgroundImg alt="" src={imgJackAnsteyXVoyX7L9OcYUnsplash1} />
        </AboutBackground>
        <AboutOverlay />
        <SectionLabel>About</SectionLabel>
        <Title>Traceable Experience</Title>
        <LeftContent>
          <DescriptionText>
            <DescriptionParagraph>일기를 쓰면 경로가 보이고, 여행을 하면 레벨이 오른다.</DescriptionParagraph>
            <DescriptionParagraph>지도는 당신의 놀이터, 기록은 당신의 무기.</DescriptionParagraph>
            <DescriptionParagraph>Play your Trip, Record your Map.</DescriptionParagraph>
          </DescriptionText>
          <DescriptionText style={{ marginTop: "1.875rem" }}>
            <DescriptionParagraph>{"\"기억은 흐릿해지지만, 당신의 발자취는 선명하게 남아야 하기에\""}</DescriptionParagraph>
            <DescriptionParagraph>우리는 여행의 설렘을 기록하지만, 가끔은 그날의 공기와 우리가 걸었던 길의 구체적인 모양을 잊곤 합니다.</DescriptionParagraph>
            <DescriptionParagraph>ReacTrip은 당신의 소중한 기록을 텍스트에만 가두지 않습니다.</DescriptionParagraph>
            <DescriptionParagraph>당신이 쓴 일기는 지도 위의 선이 되어 여정을 시각화하고,</DescriptionParagraph>
            <DescriptionParagraph>당신의 발걸음은 하나의 게임처럼 성취감 있는 보상으로 돌아옵니다.</DescriptionParagraph>
            <DescriptionParagraph>{"우리는 당신의 여행이 단순한 '지나감'이 아닌, 하나의 '작품'이자 '성장'이 되기를 바랍니다."}</DescriptionParagraph>
          </DescriptionText>
        </LeftContent>
        <ImageContainer>
          <ImageWrapper>
            <BackgroundImage alt="" src={imgJackAnsteyXVoyX7L9OcYUnsplash1} />
          </ImageWrapper>
        </ImageContainer>
      </AboutPage1>
      <AboutPage2 id="about-page-2" data-snap-section>
        <AboutBackground>
          <AboutBackgroundImg alt="" src={imgSylwiaBartyzelEU4PipU8HaUnsplash1} />
        </AboutBackground>
        <AboutOverlay />
        <SectionLabel>About</SectionLabel>
        <Title2>Experiential Travel</Title2>
        <LeftContent>
          <DescriptionText>
            <DescriptionParagraph>{"여행은 단순히 한 지점에서 다른 지점으로 이동하는 물리적 행위가 아닙니다."}</DescriptionParagraph>
            <DescriptionParagraph>{"그 사이사이에 스며든 낯선 공기, 길을 잃으며 발견한 골목의 풍경, 그리고 그곳에서 느낀 감정들이 모여 당신만의 '경험적 여행'을 완성합니다."}</DescriptionParagraph>
            <DescriptionParagraph>리액트립은 당신의 파편화된 기억들을 하나의 선으로 연결합니다.</DescriptionParagraph>
            <DescriptionParagraph>당신이 기록한 일기는 지도 위의 생생한 경로가 되고, 그 경로는 세상에 하나뿐인 당신만의 여행 서사가 됩니다.</DescriptionParagraph>
          </DescriptionText>
          <DescriptionText style={{ marginTop: "1.875rem" }}>
            <DescriptionParagraph>{"가장 가치 있는 여행은 직접 발로 뛰며 체득한 '나만의 루트'를 가졌을 때 완성됩니다."}</DescriptionParagraph>
            <DescriptionParagraph>리액트립은 당신이 현장에서 겪은 생생한 경험들을 지도 기반의 인터랙티브 데이터로 변환하여, 당신의 여정을 더욱 가치 있게 만듭니다.</DescriptionParagraph>
            <DescriptionParagraph>어제의 발자취는 오늘의 기록이 되고, 내일의 랭킹이 됩니다.</DescriptionParagraph>
            <DescriptionParagraph>지금 바로 당신의 지도를 펼치고 첫 번째 퀘스트를 시작하세요.</DescriptionParagraph>
          </DescriptionText>
        </LeftContent>
        <ImageContainer2>
          <BackgroundImage2 alt="" src={imgSylwiaBartyzelEU4PipU8HaUnsplash1} />
        </ImageContainer2>
        <LoginButton onClick={() => {
          if(!localStorage.getItem("accessToken")) {
            alert("로그인이 필요합니다.")
            navigate('/login')
          } else {
            alert("이미 로그인이 되있습니다.")
            navigate("/")
          }
        }}>
          <LoginText>Login</LoginText>
        </LoginButton>
      </AboutPage2>
    </>
  );
}
