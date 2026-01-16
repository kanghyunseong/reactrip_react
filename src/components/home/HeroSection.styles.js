import styled from "styled-components";

export const LineContainer = styled.div`
  position: absolute;
  height: 0;
`;

export const LineImg = styled.img`
  display: block;
  max-width: none;
  width: 100%;
  height: 100%;
`;

export const MoreText = styled.p`
  position: absolute;
  text-transform: capitalize;
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  height: 28px;
  line-height: normal;
  left: calc(8.33% + 149px);
  font-style: normal;
  font-size: 24px;
  color: white;
  top: 760px;
  width: 61px;
  margin: 0;
  cursor: pointer;
  transition: opacity 0.3s;
  z-index: 5;

  &:hover {
    opacity: 0.8;
  }
`;

export const MainTitle = styled.div`
  position: absolute;
  font-family: 'Montserrat', 'Poppins', sans-serif;
  font-weight: 900;
  line-height: 160px;
  left: 201px;
  text-transform: lowercase;
  font-style: normal;
  font-size: 144px;
  color: white;
  top: 269px;
  z-index: 5;

  @media (max-width: 1024px) {
    font-size: 100px;
    line-height: 120px;
    left: 150px;
    top: 250px;
  }

  @media (max-width: 768px) {
    font-size: 60px;
    line-height: 80px;
    left: 20px;
    top: 200px;
  }
`;

export const TitleLine = styled.p`
  margin: 0;
`;

export const MoreButton = styled.div`
  position: absolute;
  border: 2px solid white;
  height: 73px;
  left: calc(8.33% + 48px);
  top: 737px;
  width: 263px;
  cursor: pointer;
  transition: all 0.3s;
  z-index: 5;

  @media (max-width: 1024px) {
    left: 150px;
    width: 220px;
    height: 60px;
    top: 700px;
  }

  @media (max-width: 768px) {
    left: 20px;
    width: calc(100% - 40px);
    height: 50px;
    top: 650px;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const DescriptionText = styled.div`
  position: absolute;
  text-transform: capitalize;
  font-family: 'Poppins', 'Noto Sans KR', sans-serif;
  font-weight: 500;
  line-height: 25px;
  left: 207px;
  font-size: 18px;
  color: white;
  top: 613px;
  width: 619px;
  z-index: 5;

  @media (max-width: 1024px) {
    left: 150px;
    width: 500px;
    font-size: 16px;
    top: 580px;
  }

  @media (max-width: 768px) {
    left: 20px;
    width: calc(100% - 40px);
    font-size: 14px;
    top: 500px;
  }
`;

export const DescriptionParagraph = styled.p`
  margin: 0;
`;
