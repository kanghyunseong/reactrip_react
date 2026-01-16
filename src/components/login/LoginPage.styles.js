import styled from "styled-components";

export const LoginPageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: white;
  overflow: hidden;
`;

export const BackgroundImageContainer = styled.div`
  position: absolute;
  height: 1886px;
  left: 1px;
  top: -312px;
  width: 1257px;
  overflow: hidden;
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
`;

export const SubtitleText = styled.p`
  font-family: 'Poppins', 'Noto Sans KR', sans-serif;
  font-weight: 900;
  line-height: 1.5625rem;
  font-size: 1.4375rem;
  color: white;
  text-transform: capitalize;
  margin: 0;
`;

export const RightContainer = styled.div`
  position: absolute;
  right: 5.625rem;
  top: 0;
  width: 38.75rem;
  max-width: calc(100vw - 12.5rem);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10.5rem;
  z-index: 2;

  @media (max-width: 1400px) {
    right: 3.125rem;
    max-width: calc(100vw - 9.375rem);
  }

  @media (max-width: 1024px) {
    right: 3.125rem;
    width: 31.25rem;
    max-width: calc(100vw - 9.375rem);
    padding-top: 7.5rem;
  }

  @media (max-width: 768px) {
    right: 0;
    width: 100%;
    max-width: 100vw;
    padding-top: 6.25rem;
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
  margin-top: 3.125rem;
  width: 36.1875rem;
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
  transition: border-color 0.3s;

  &:focus {
    border-color: #4a90e2;
  }

  &::placeholder {
    color: #999;
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  padding: 0.875rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 0.625rem;

  &:hover {
    background-color: #357abd;
  }

  &:active {
    transform: scale(0.98);
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
  background-color: transparent;
  border: none;
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
