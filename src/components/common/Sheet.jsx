import React from "react";
import styled from "styled-components";

const imgSheet = "http://localhost:3845/assets/323d8b92ee44b37f80b84ddb1c33ef81a9073d7a.svg";

const SheetContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const SheetImage = styled.img`
  display: block;
  max-width: none;
  width: 100%;
  height: 100%;
`;

export default function Sheet() {
  return (
    <SheetContainer data-name="sheet" data-node-id="53:1426">
      <SheetImage alt="" src={imgSheet} />
    </SheetContainer>
  );
}
