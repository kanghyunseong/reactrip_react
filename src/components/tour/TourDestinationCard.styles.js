import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  background: #1a1a1a;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  }
`;

export const CardThumbnail = styled.img`
  width: 200px;
  height: 160px;
  object-fit: cover;
  background: #2a2a2a;
`;

export const PlaceholderImage = styled.div`
  width: 200px;
  height: 160px;
  background: #2a2a2a;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    color: #666;
    font-size: 16px;
    font-weight: 500;
  }
`;

export const CardContent = styled.div`
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CardTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin: 0 0 12px 0;
`;

export const CardDescription = styled.p`
  font-size: 14px;
  color: #ccc;
  line-height: 1.6;
  margin: 0 0 16px 0;
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
`;

export const InfoTag = styled.span`
  font-size: 13px;
  color: #aaa;
  font-weight: 500;
`;

export const ViewCount = styled.span`
  font-size: 13px;
  color: #888;
  font-weight: 400;
`;