import styled from "styled-components";

export const MyPageContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  overflow-x: hidden;
  overflow-y: auto;
  max-width: 100vw;
  padding: 2rem;
  margin-top: 100px;
`;

export const ContentWrapper = styled.div`
  max-width: 50rem;
  margin: 0 auto;
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  padding: 3rem;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

export const PageTitle = styled.h2`
  font-family: 'Poppins', 'Noto Sans KR', sans-serif;
  font-weight: 700;
  font-size: 2rem;
  color: #1e1e1e;
  text-align: center;
  margin: 0 0 2.5rem 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
`;

export const ProfileSection = styled.div`
  display: flex;
  gap: 2.5rem;
  margin-bottom: 2.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
`;

export const ProfileImageWrapper = styled.div`
  flex-shrink: 0;
`;

export const ProfileImage = styled.img`
  width: 9.375rem;
  height: 9.375rem;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #e0e0e0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 7.5rem;
    height: 7.5rem;
  }
`;

export const ProfileInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const InfoRow = styled.div`
  display: flex;
  padding: 1rem 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.875rem 0;
  }
`;

export const InfoLabel = styled.label`
  width: 7.5rem;
  font-family: 'Lato', 'Noto Sans KR', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  color: #666;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    font-size: 0.875rem;
  }
`;

export const InfoValue = styled.span`
  flex: 1;
  font-family: 'Lato', 'Noto Sans KR', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  color: #1e1e1e;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

export const EditButton = styled.button`
  padding: 0.875rem 2.5rem;
  background: linear-gradient(180deg, #4a90e2 0%, #357abd 100%);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.15s, filter 0.2s;

  &:hover {
    filter: brightness(1.03);
  }

  &:active {
    transform: translateY(1px);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.75rem;
  }
`;

export const LogoutButton = styled.button`
  padding: 0.875rem 2.5rem;
  background: linear-gradient(180deg, #f44336 0%, #d32f2f 100%);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.15s, filter 0.2s;

  &:hover {
    filter: brightness(1.03);
  }

  &:active {
    transform: translateY(1px);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.75rem;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: 'Lato', 'Noto Sans KR', sans-serif;
  font-size: 1.125rem;
  color: #666;
`;

export const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: 'Lato', 'Noto Sans KR', sans-serif;
  font-size: 1.125rem;
  color: #f44336;
`;