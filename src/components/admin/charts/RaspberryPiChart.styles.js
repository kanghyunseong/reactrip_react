import styled from "styled-components";

export const ChartContainer = styled.div`
  background: white;
  border-radius: 14px;
  padding: 32px;
  position: relative;
  height: 472px;
  display: flex;
  flex-direction: column;
`;

export const ChartTitle = styled.div`
  margin-bottom: 20px;
  
  h3 {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.2px;
    color: #000;
    margin: 0;
  }
`;

export const ChartControls = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
`;

export const ChevronButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
  }
  
  &:hover {
    opacity: 0.7;
  }
`;

export const DotsContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  
  img {
    width: 40px;
    height: 8px;
  }
`;

export const DataDisplay = styled.div`
  flex: 1;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;

export const DataItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const DataLabel = styled.span`
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  color: #4f4f4f;
  letter-spacing: 0.5px;
`;

export const DataValue = styled.span`
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  font-weight: 500;
  color: #000;
  letter-spacing: 0.16px;
`;
