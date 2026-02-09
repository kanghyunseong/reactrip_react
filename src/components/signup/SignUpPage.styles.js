import styled from "styled-components";

export const SignUpPageContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh; /* 동적 뷰포트 높이 */
  background-color: white;
  overflow-x: hidden;
  overflow-y: auto;
  max-width: 100vw;
`;

export const BackgroundImageContainer = styled.div`
  position: absolute;
  inset: 0 auto 0 0;
  width: 65%;
  height: 100%;
  overflow: hidden;
  z-index: 0;

  /* 텍스트 가독성용 오버레이 */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0.28) 55%,
      rgba(0, 0, 0, 0.12) 100%
    );
    z-index: 1;
    pointer-events: none;
  }

  @media (max-width: 1600px) {
    width: 62%;
  }

  @media (max-width: 1400px) {
    width: 58%;
  }

  @media (max-width: 1200px) {
    width: 52%;
  }

  @media (max-width: 1024px) {
    width: 50%;
  }

  @media (max-width: 900px) {
    width: 45%;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 40vh;
    min-height: 280px;
  }

  @media (max-width: 480px) {
    height: 35vh;
    min-height: 240px;
  }
`;

export const BackgroundImg = styled.img`
  position: absolute;
  inset: 0;
  max-width: none;
  object-fit: cover;
  pointer-events: none;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 0;
`;

export const LeftTextContainer = styled.div`
  position: absolute;
  left: 13.125rem;
  top: 15.625rem;
  z-index: 2;

  @media (max-width: 1400px) {
    left: 10rem;
    top: 14rem;
  }

  @media (max-width: 1200px) {
    left: 7.5rem;
    top: 13rem;
  }

  @media (max-width: 1024px) {
    left: 5rem;
    top: 12rem;
  }

  @media (max-width: 900px) {
    left: 3.5rem;
    top: 11rem;
  }

  @media (max-width: 768px) {
    left: 1.25rem;
    top: 8rem;
  }

  @media (max-width: 480px) {
    left: 1rem;
    top: 6rem;
  }
`;

export const TitleText = styled.p`
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
  line-height: 1.5625rem;
  font-style: normal;
  font-size: 1.4375rem;
  color: white;
  text-transform: capitalize;
  margin: 0 0 0.3125rem 0;
  text-shadow: 0 2px 14px rgba(0, 0, 0, 0.45);

  @media (max-width: 1024px) {
    font-size: 1.25rem;
    line-height: 1.4rem;
  }

  @media (max-width: 768px) {
    font-size: 1.125rem;
    line-height: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    line-height: 1.25rem;
  }
`;

export const SubtitleText = styled.p`
  font-family: 'Poppins', 'Noto Sans KR', sans-serif;
  font-weight: 900;
  line-height: 1.5625rem;
  font-size: 1.4375rem;
  color: white;
  text-transform: capitalize;
  margin: 0;
  text-shadow: 0 2px 14px rgba(0, 0, 0, 0.45);

  @media (max-width: 1024px) {
    font-size: 1.25rem;
    line-height: 1.4rem;
  }

  @media (max-width: 768px) {
    font-size: 1.125rem;
    line-height: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    line-height: 1.25rem;
  }
`;

export const RightContainer = styled.div`
  position: absolute;
  right: clamp(1rem, 2.5vw, 2rem);
  top: 50%;
  bottom: auto;
  transform: translateY(-50%);
  width: 38.75rem;
  max-width: calc(100vw - 12.5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 2.25rem 2.25rem 2.5rem;
  z-index: 2;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 1.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);
  max-height: calc(100dvh - 3rem);
  overflow-y: auto;
  scrollbar-width: thin; /* Firefox */

  @media (max-width: 1600px) {
    width: 36rem;
    max-width: calc(100vw - 11rem);
    padding: 2.25rem 2rem;
  }

  @media (max-width: 1400px) {
    right: 1.5rem;
    width: 34rem;
    max-width: calc(100vw - 9.375rem);
    padding: 2rem 1.875rem;
  }

  @media (max-width: 1200px) {
    right: 1.25rem;
    width: 32rem;
    max-width: calc(100vw - 8rem);
    padding: 2rem 1.75rem;
  }

  @media (max-width: 1024px) {
    right: 1.5rem;
    width: 31.25rem;
    max-width: calc(100vw - 9.375rem);
    padding: 2rem 1.75rem;
  }

  @media (max-width: 900px) {
    width: 28rem;
    max-width: calc(100vw - 7rem);
    padding: 1.875rem 1.5rem;
  }

  @media (max-width: 768px) {
    position: relative;
    top: auto;
    right: auto;
    transform: none;
    width: 100%;
    max-width: 100vw;
    margin-top: -1.5rem;
    border-radius: 1.5rem 1.5rem 0 0;
    max-height: none;
    overflow: visible;
    padding: 2rem 1.25rem 2.25rem;
  }

  @media (max-width: 480px) {
    padding: 1.75rem 1rem 2rem;
    margin-top: -1.25rem;
    border-radius: 1.25rem 1.25rem 0 0;
  }
`;

export const LogoContainer = styled.div`
  position: relative;
  height: 5.125rem;
  width: 13rem;
  margin-bottom: 0.9375rem;

  @media (max-width: 768px) {
    height: 4.5rem;
    width: 11.5rem;
    margin-bottom: 0.75rem;
  }

  @media (max-width: 480px) {
    height: 4rem;
    width: 10rem;
    margin-bottom: 0.625rem;
  }
`;

export const LogoImg = styled.img`
  position: absolute;
  inset: 0;
  max-width: none;
  object-fit: contain;
  pointer-events: none;
  width: 100%;
  height: 100%;
  display: block;
`;

export const LogoText = styled.p`
  font-family: 'PT Sans Caption', sans-serif;
  font-weight: 700;
  height: 3.9375rem;
  line-height: normal;
  font-style: normal;
  font-size: 2.5rem;
  color: black;
  text-align: center;
  margin: 0;
  width: 12.1875rem;

  @media (max-width: 768px) {
    font-size: 2.25rem;
    height: 3.5rem;
    width: 11rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    height: 3rem;
    width: 10rem;
  }
`;

export const FormContainer = styled.div`
  margin-top: 1.875rem;
  width: 33.1875rem;
  max-width: 100%;

  @media (max-width: 1024px) {
    width: 100%;
    max-width: 100%;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    padding: 0;
  }

  @media (max-width: 480px) {
    margin-top: 1.5rem;
  }
`;

export const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.9375rem;

  @media (max-width: 768px) {
    gap: 0.875rem;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

export const InputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
`;

export const InputLabel = styled.label`
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  color: #1e1e1e;
  line-height: 1.4;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 480px) {
    font-size: 0.9375rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #878787;
  border-radius: 8px;
  font-family: 'Lato', 'Noto Sans KR', sans-serif;
  font-size: 16px;
  font-weight: 400;
  outline: none;
  transition: border-color 0.25s, box-shadow 0.25s;
  background-color: white;
  color: #1e1e1e;

  @media (max-width: 480px) {
    padding: 10px 14px;
    font-size: 15px;
  }

  &:focus {
    border-color: #4a90e2;
    box-shadow: 0 0 0 4px rgba(74, 144, 226, 0.18);
  }

  &::placeholder {
    color: #757575;
  }
`;

export const ExampleText = styled.span`
  font-family: 'Lato', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: red;
  margin: 0;
  line-height: 1;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const SignUpButton = styled.button`
  width: 100%;
  padding: 12px;
  background: linear-gradient(180deg, #4a90e2 0%, #357abd 100%);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.15s, filter 0.2s;
  margin-top: 10px;
  height: 40px;

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 15px;
    height: 38px;
    border-radius: 0.625rem;
  }

  &:hover {
    filter: brightness(1.03);
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const TextLink = styled.p`
  font-family: 'Lato', sans-serif;
  font-size: 16px;
  color: #4a90e2;
  text-align: center;
  margin: 10px 0;
  cursor: pointer;
  line-height: 1.4;

  @media (max-width: 480px) {
    font-size: 15px;
    margin: 8px 0;
  }
`;

export const LoginLinkButton = styled.button`
  width: 100%;
  padding: 12px;
  background: linear-gradient(180deg, #4a90e2 0%, #357abd 100%);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.15s, filter 0.2s;
  height: 40px;

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 15px;
    height: 38px;
    border-radius: 0.625rem;
  }

  &:hover {
    filter: brightness(1.03);
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const BackButton = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(15, 23, 42, 0.1);
  border-radius: 8px;
  font-family: 'Lato', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  cursor: pointer;
  z-index: 1000;
  transition: all 0.3s;

  @media (max-width: 768px) {
    top: 12px;
    left: 12px;
    padding: 8px 16px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    top: 10px;
    left: 10px;
    padding: 6px 12px;
    font-size: 13px;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;
