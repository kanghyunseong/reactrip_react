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
  left: 210px;
  top: 250px;
  z-index: 2;

  @media (max-width: 1024px) {
    left: 150px;
    top: 200px;
  }

  @media (max-width: 768px) {
    left: 20px;
    top: 150px;
  }
`;

export const TitleText = styled.p`
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
  line-height: 25px;
  font-style: normal;
  font-size: 23px;
  color: white;
  text-transform: capitalize;
  margin: 0 0 5px 0;
`;

export const SubtitleText = styled.p`
  font-family: 'Poppins', 'Noto Sans KR', sans-serif;
  font-weight: 900;
  line-height: 25px;
  font-size: 23px;
  color: white;
  text-transform: capitalize;
  margin: 0;
`;

export const RightContainer = styled.div`
  position: absolute;
  right: 90px;
  top: 0;
  width: 620px;
  max-width: calc(100vw - 200px);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 168px;
  z-index: 2;

  @media (max-width: 1400px) {
    right: 50px;
    max-width: calc(100vw - 150px);
  }

  @media (max-width: 1024px) {
    right: 50px;
    width: 500px;
    max-width: calc(100vw - 150px);
    padding-top: 120px;
  }

  @media (max-width: 768px) {
    right: 0;
    width: 100%;
    max-width: 100vw;
    padding-top: 100px;
  }
`;

export const LogoContainer = styled.div`
  position: relative;
  height: 82px;
  width: 208px;
  margin-bottom: 14px;
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
  height: 63px;
  line-height: normal;
  font-style: normal;
  font-size: 40px;
  color: black;
  text-align: center;
  margin: 0;
  width: 195px;
`;

export const FormContainer = styled.div`
  margin-top: 50px;
  width: 579px;
  max-width: 100%;

  @media (max-width: 1024px) {
    width: 100%;
    max-width: 500px;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: calc(100vw - 40px);
    padding: 0 20px;
  }
`;

export const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InputLabel = styled.label`
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #333;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: 'Lato', sans-serif;
  font-size: 16px;
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
  padding: 14px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;

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
  gap: 8px;
  margin-top: 10px;
`;

export const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

export const CheckboxLabel = styled.label`
  font-family: 'Lato', sans-serif;
  font-size: 14px;
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
