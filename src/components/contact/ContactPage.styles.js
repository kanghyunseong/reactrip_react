import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  max-width: 100vw;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
`;

export const Section = styled.section`
  width: 100%;
  min-height: 100vh;
  padding-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(160deg, #faf8f5 0%, #f0ebe3 100%);
  color: #2c2c2c;
`;

export const Content = styled.div`
  text-align: center;
  max-width: 640px;
  padding: 0 1.5rem;
`;

export const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
  color: #2c2c2c;
  letter-spacing: -0.02em;
`;

export const Description = styled.p`
  font-size: 1.05rem;
  line-height: 1.8;
  color: #555;
  font-family: "Noto Sans KR", sans-serif;
`;
