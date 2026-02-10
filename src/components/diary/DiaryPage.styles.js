import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  max-width: 100vw;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
`;

/* 다이어리 전용: 크림 톤 배경으로 통일 */
export const Section = styled.section`
  width: 100%;
  min-height: 100vh;
  padding-top: 100px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background: linear-gradient(160deg, #faf8f5 0%, #f0ebe3 100%);
  color: #2c2c2c;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 720px;
  padding: 0 1.5rem;
`;

export const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 1.25rem 0;
  color: #2c2c2c;
  letter-spacing: -0.02em;
`;

export const Description = styled.p`
  margin: 0;
  font-size: 18px;
  line-height: 1.6;
`;

