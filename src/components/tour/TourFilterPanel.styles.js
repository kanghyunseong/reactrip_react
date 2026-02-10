import styled from "styled-components";

export const PanelContainer = styled.div`
  position: sticky;
  top: 100px;
  width: 260px;
  height: fit-content;
  background: #fff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);
  flex-shrink: 0;
`;

export const FilterSection = styled.div`
  margin-bottom: 1.25rem;

  &:last-of-type {
    margin-bottom: 1rem;
  }
`;

export const FilterTitle = styled.h3`
  font-size: 0.85rem;
  font-weight: 600;
  color: #2c2c2c;
  margin-bottom: 0.5rem;
`;

export const FilterSelect = styled.select`
  width: 100%;
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
  color: #333;
  background: #fff;
  border: 1px solid #e8e4df;
  border-radius: 10px;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:hover {
    border-color: #d4cfc7;
  }

  &:focus {
    outline: none;
    border-color: #c17f59;
    box-shadow: 0 0 0 3px rgba(193, 127, 89, 0.12);
  }
`;

export const ResetButton = styled.button`
  width: 100%;
  padding: 0.65rem 1rem;
  background: #faf8f5;
  color: #555;
  border: 1px solid #e8e4df;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, color 0.2s;

  &:hover {
    background: #f0ebe3;
    border-color: #c17f59;
    color: #a86a47;
  }
`;
