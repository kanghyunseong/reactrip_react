import styled from "styled-components";

export const LoginPageContainer = styled.div`
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
  max-width: 65%;
  height: 100%;
  overflow: hidden;

  /* 텍스트/콘텐츠 가독성용 오버레이 */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.55) 0%,
      rgba(0, 0, 0, 0.35) 55%,
      rgba(0, 0, 0, 0.15) 100%
    );
    z-index: 1;
    pointer-events: none;
  }
  
  @media (max-width: 1400px) {
    width: 60%;
    max-width: 60%;
    height: 100%;
  }
  
  @media (max-width: 1024px) {
    width: 55%;
    max-width: 55%;
    height: 100%;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    height: 44vh;
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

  @media (max-width: 1024px) {
    left: 9.375rem;
    top: 12.5rem;
  }

  @media (max-width: 768px) {
    left: 1.25rem;
    top: 9.375rem;
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
`;

export const RightContainer = styled.div`
  position: absolute;
  right: clamp(1rem, 2.5vw, 2rem);
  top: 50%;
  transform: translateY(-50%);
  width: 38.75rem;
  max-width: calc(100vw - 12.5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 2.5rem 2.25rem;
  z-index: 3;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 1.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);
  max-height: calc(100dvh - 3rem);
  overflow-y: auto;
  scrollbar-width: thin; /* Firefox */

  @media (max-width: 1400px) {
    right: 1.5rem;
    max-width: calc(100vw - 9.375rem);
  }

  @media (max-width: 1024px) {
    right: 1.5rem;
    width: 31.25rem;
    max-width: calc(100vw - 9.375rem);
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
`;

export const LogoContainer = styled.div`
  position: relative;
  height: 5.125rem;
  width: 13rem;
  margin-bottom: 0.875rem;
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
`;

export const FormContainer = styled.div`
  margin-top: 1.75rem;
  width: 100%;
  max-width: 26.5rem;
  max-width: 100%;

  @media (max-width: 1024px) {
    width: 100%;
    max-width: 31.25rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: calc(100vw - 2.5rem);
    padding: 0 1.25rem;
  }
`;

export const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const InputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const InputLabel = styled.label`
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  color: #333;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 0.0625rem solid #ddd;
  border-radius: 0.25rem;
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.25s, box-shadow 0.25s;

  &:focus {
    border-color: #4a90e2;
    box-shadow: 0 0 0 4px rgba(74, 144, 226, 0.18);
  }

  &::placeholder {
    color: #999;
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  padding: 0.875rem;
  background: linear-gradient(180deg, #4a90e2 0%, #357abd 100%);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.15s, filter 0.2s;
  margin-top: 0.625rem;

  &:hover {
    filter: brightness(1.03);
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.625rem;
`;

export const Checkbox = styled.input`
  width: 1.125rem;
  height: 1.125rem;
  cursor: pointer;
`;

export const CheckboxLabel = styled.label`
  font-family: 'Lato', sans-serif;
  font-size: 0.875rem;
  color: #333;
  cursor: pointer;
`;

export const LinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  gap: 15px;

  a {
    text-decoration: none;
    color: inherit;
  }

  @media (max-width: 480px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const LinkText = styled.span`
  font-family: 'Lato', sans-serif;
  font-size: 14px;
  color: #4a90e2;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #357abd;
    text-decoration: underline;
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

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;
