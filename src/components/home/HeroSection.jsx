import React from "react";
import { imgLine1 } from "../../constants/constants";
import {
  LineContainer,
  LineImg,
  MoreText,
  MainTitle,
  TitleLine,
  MoreButton,
  DescriptionText,
  DescriptionParagraph
} from "./HeroSection.styles";

export default function HeroSection({ onMoreClick }) {
  return (
    <>
      <LineContainer style={{ left: "-6px", top: "774px", width: "214px" }} data-node-id="2:167">
        <div style={{ position: "absolute", inset: "-2px 0 0 0" }}>
          <LineImg alt="" src={imgLine1} />
        </div>
      </LineContainer>
      <MoreText data-node-id="2:168" onClick={onMoreClick}>more</MoreText>
      <MainTitle data-node-id="2:206">
        <TitleLine>
          <span style={{ textTransform: "uppercase" }}>E</span>XPLORE
        </TitleLine>
        <TitleLine>tRAVEL</TitleLine>
      </MainTitle>
      <MoreButton data-node-id="2:207" onClick={onMoreClick} />
      <DescriptionText data-node-id="2:208">
        <DescriptionParagraph>기억은 일기로, 여정은 지도로. ReacTrip</DescriptionParagraph>
        <DescriptionParagraph>리액트립에서 당신의 경로를 실시간 지도로 확인하고, 숨겨진 장소를 발견해 미션을 완료하세요. 세상에 하나뿐인 당신만의 여행 레벨이 시작됩니다.</DescriptionParagraph>
      </DescriptionText>
    </>
  );
}
