import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
`;

export const Section = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  color: #333;
`;

export const Content = styled.div`
  text-align: center;
  max-width: 800px;
  padding: 0 20px;
`;

export const Title = styled.h2`
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 30px;
  font-family: 'Lato', sans-serif;
`;

export const Description = styled.p`
  font-size: 20px;
  line-height: 1.8;
  font-family: 'Noto Sans KR', sans-serif;
`;
