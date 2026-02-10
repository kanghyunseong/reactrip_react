import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(160deg, #faf8f5 0%, #f0ebe3 100%);
  position: relative;
`;

export const ContentWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 100px 1.5rem 3rem;
`;

export const BackButton = styled.button`
  background: #fff;
  border: 1px solid #e8e4df;
  border-radius: 12px;
  padding: 0.6rem 1.25rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #555;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  margin-bottom: 1.5rem;

  &:hover {
    background: #faf8f5;
    border-color: #c17f59;
    color: #a86a47;
  }
`;

export const DetailCard = styled.div`
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  min-height: 500px;

  @media (min-width: 900px) {
    flex-direction: row;
  }
`;

export const ImageSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;

  @media (min-width: 900px) {
    width: 45%;
    flex-shrink: 0;
  }
`;

export const MainImage = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
  background: #f0ebe3;

  @media (min-width: 900px) {
    height: 100%;
    min-height: 400px;
  }
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 280px;
  background: #f0ebe3;

  @media (min-width: 900px) {
    height: 100%;
    min-height: 280px;
  }
`;

export const InfoSection = styled.div`
  flex: 1;
  padding: 1.75rem 1.5rem;
  color: #2c2c2c;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    padding: 2rem 2.25rem;
  }
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c2c2c;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.02em;
  line-height: 1.3;

  @media (min-width: 768px) {
    font-size: 1.75rem;
  }
`;

export const Region = styled.p`
  font-size: 0.9rem;
  color: #888;
  margin: 0 0 1rem 0;
`;

export const Description = styled.p`
  font-size: 0.95rem;
  color: #444;
  line-height: 1.75;
  margin: 0 0 1.5rem 0;
  flex: 1;
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

export const InfoLabel = styled.span`
  font-size: 0.85rem;
  color: #888;
  font-weight: 600;
  min-width: 72px;
`;

export const InfoValue = styled.span`
  font-size: 0.9rem;
  color: #444;
  flex: 1;
  word-break: break-word;
`;

export const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 1rem;
  color: #666;

  .spinner {
    width: 48px;
    height: 48px;
    border: 3px solid #f0ebe3;
    border-top: 3px solid #c17f59;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-bottom: 1rem;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  p {
    font-size: 0.95rem;
    color: #666;
  }
`;

export const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  background: rgba(193, 127, 89, 0.08);
  border-radius: 16px;
  text-align: center;
  border: 1px solid rgba(193, 127, 89, 0.2);

  p {
    font-size: 1rem;
    color: #a86a47;
    margin-bottom: 1rem;
  }

  button {
    background: linear-gradient(135deg, #c17f59 0%, #a86a47 100%);
    color: white;
    border: none;
    border-radius: 10px;
    padding: 0.6rem 1.25rem;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(193, 127, 89, 0.35);
    }
  }
`;
