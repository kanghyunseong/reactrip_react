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
  padding-top: 120px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background: linear-gradient(135deg, #30cfd0 0%, #330867 100%);
  color: white;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  padding: 0;          /* 🔥 padding 제거 */
`;

export const Title = styled.h2`
  font-size: 48px;
  font-weight: 800;
  margin: 0 0 10px 0;  /* ❗ 여기만 조절 */
  font-family: 'Lato', sans-serif;
`;

export const Description = styled.p`
  margin: 0;
  font-size: 18px;
  line-height: 1.6;
`;

