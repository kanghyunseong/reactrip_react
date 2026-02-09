import styled from "styled-components";

export const PanelContainer = styled.div`
  position: sticky;
  top: 120px;
  width: 280px;
  height: fit-content;
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
`;

export const FilterSection = styled.div`
  margin-bottom: 24px;

  &:last-of-type {
    margin-bottom: 20px;
  }
`;

export const FilterTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
`;

export const FilterSelect = styled.select`
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  color: #333;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #2196f3;
  }

  &:focus {
    outline: none;
    border-color: #2196f3;
    box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
  }
`;

export const ResetButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #f5f5f5;
  color: #666;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #e0e0e0;
    color: #333;
  }
`;