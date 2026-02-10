import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  align-items: stretch;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
`;

export const CardThumbnail = styled.img`
  width: 200px;
  min-width: 200px;
  height: 160px;
  object-fit: cover;
  background: #f0ebe3;

  @media (max-width: 600px) {
    width: 120px;
    min-width: 120px;
    height: 120px;
  }
`;

export const PlaceholderImage = styled.div`
  width: 200px;
  min-width: 200px;
  height: 160px;
  background: #f0ebe3;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    color: #999;
    font-size: 0.9rem;
  }

  @media (max-width: 600px) {
    width: 120px;
    min-width: 120px;
    height: 120px;
  }
`;

export const CardContent = styled.div`
  flex: 1;
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
`;

export const CardTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
  color: #2c2c2c;
  margin: 0 0 0.5rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CardDescription = styled.p`
  font-size: 0.875rem;
  color: #555;
  line-height: 1.55;
  margin: 0 0 0.75rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CardInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const InfoTag = styled.span`
  font-size: 0.8rem;
  color: #888;
  font-weight: 500;
`;

export const ViewCount = styled.span`
  font-size: 0.8rem;
  color: #999;
  font-weight: 400;
`;
