import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #e3f2fd 0%, #ffffff 100%);
  position: relative;
`;

export const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 40px 60px;
`;

export const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateX(-2px);
  }
`;

export const DetailCard = styled.div`
  background: #1a1a1a;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  display: flex;
  min-height: 600px;

  @media (max-width: 968px) {
    flex-direction: column;
  }
`;

export const ImageSection = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  gap: 0;

  @media (max-width: 968px) {
    width: 100%;
  }
`;

export const MainImage = styled.img`
  width: 100%;
  height: 50%;
  object-fit: cover;
  background: #2a2a2a;
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 50%;
  background: #2a2a2a;
  
  /* 카카오 지도가 여기에 렌더링됨 */
`;

export const InfoSection = styled.div`
  flex: 1;
  padding: 40px;
  color: white;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: white;
  margin: 0 0 12px 0;
`;

export const Region = styled.p`
  font-size: 16px;
  color: #aaa;
  margin: 0 0 24px 0;
`;

export const Description = styled.p`
  font-size: 16px;
  color: #ccc;
  line-height: 1.8;
  margin: 0 0 32px 0;
  flex: 1;
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #333;

  &:last-child {
    border-bottom: none;
  }
`;

export const InfoLabel = styled.span`
  font-size: 14px;
  color: #888;
  font-weight: 500;
  min-width: 80px;
`;

export const InfoValue = styled.span`
  font-size: 14px;
  color: #ddd;
  flex: 1;
`;

// 로딩 스피너
export const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  color: #666;

  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #2196f3;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 20px;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  p {
    font-size: 16px;
    color: #666;
  }
`;

// 에러 메시지
export const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  background: rgba(255, 82, 82, 0.1);
  border-radius: 12px;
  text-align: center;

  p {
    font-size: 16px;
    color: #d32f2f;
    margin-bottom: 20px;
  }

  button {
    background: #2196f3;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 24px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: #1976d2;
    }
  }
`;