import React from "react";
import { img } from "../../constants/constants";
import {
  LineContainer,
  LineImg,
  GithubIcon,
  IconContainer,
  IconImg
} from "./Footer.styles";

export default function Footer() {
  return (
    <>
      <GithubIcon data-name="Github" data-node-id="79:823">
        <IconContainer style={{ inset: "4.06% 10.42% 8.33% 8.33%" }} data-name="Icon" data-node-id="I79:823;7758:11677">
          <div style={{ position: "absolute", inset: "-6.66% -7.18%" }}>
            <IconImg alt="" src={img} />
          </div>
        </IconContainer>
      </GithubIcon>
    </>
  );
}
