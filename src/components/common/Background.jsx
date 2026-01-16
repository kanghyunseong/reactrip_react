import React from "react";
import { imgImage1 } from "../../constants/constants";
import {
  BackgroundImageContainer,
  BackgroundImg,
  Overlay
} from "./Background.styles";

export default function Background() {
  return (
    <>
      <BackgroundImageContainer data-name="image 1" data-node-id="2:137">
        <BackgroundImg 
          alt="" 
          src={imgImage1} 
          loading="eager"
          fetchPriority="high"
        />
      </BackgroundImageContainer>
      <Overlay data-node-id="2:138" />
    </>
  );
}
