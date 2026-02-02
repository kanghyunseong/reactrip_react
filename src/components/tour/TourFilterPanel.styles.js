import styled from "styled-components";

export const FilterContainer = styled.div`
  width: 320px;
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 100px;
  height: fit-content;
`;

export const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f0f0f0;
`;

export const FilterTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #222;
  margin: 0;
`;

export const ResetButton = styled.button`
  background: #ff5252;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #ff1744;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const FilterSection = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const FilterLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #555;
  margin-bottom: 8px;
`;

export const Dropdown = styled.div`
  position: relative;
`;

export const DropdownButton = styled.button`
  width: 100%;
  background: ${(props) => (props.$isOpen ? "#f5f5f5" : "white")};
  border: 1.5px solid ${(props) => (props.$isOpen ? "#2196f3" : "#ddd")};
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;

  &:hover {
    border-color: #2196f3;
    background: #f5f5f5;
  }
`;

export const DropdownArrow = styled.span`
  font-size: 10px;
  color: #666;
  transition: transform 0.2s;
  transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "rotate(0)")};
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-height: 250px;
  overflow-y: auto;

  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #bbb;
    border-radius: 10px;

    &:hover {
      background: #999;
    }
  }
`;

export const DropdownItem = styled.div`
  padding: 12px 16px;
  font-size: 14px;
  color: ${(props) => (props.$active ? "#2196f3" : "#333")};
  background: ${(props) => (props.$active ? "#e3f2fd" : "transparent")};
  font-weight: ${(props) => (props.$active ? "600" : "400")};
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: ${(props) => (props.$active ? "#e3f2fd" : "#f5f5f5")};
  }

  &:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;