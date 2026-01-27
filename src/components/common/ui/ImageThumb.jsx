import React, { useState } from "react";
import styled from "styled-components";

const Img = styled.img`
  width: ${(p) => p.$w || 56}px;
  height: ${(p) => p.$h || 40}px;
  object-fit: cover;
  border-radius: 0.5rem;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: rgba(2, 6, 23, 0.03);
`;

const Fallback = styled.div`
  width: ${(p) => p.$w || 56}px;
  height: ${(p) => p.$h || 40}px;
  border-radius: 0.5rem;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: rgba(2, 6, 23, 0.03);
  color: rgba(15, 23, 42, 0.55);
  font-weight: 800;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ImageThumb({ src, alt = "썸네일", width = 56, height = 40 }) {
  const [err, setErr] = useState(false);
  if (!src) return <span>-</span>;
  if (err) return <Fallback $w={width} $h={height}>이미지</Fallback>;
  return <Img src={src} alt={alt} $w={width} $h={height} onError={() => setErr(true)} />;
}

