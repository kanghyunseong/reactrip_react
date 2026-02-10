import styled from "styled-components";

export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #fff;
  border-radius: 14px;
  padding: 0.5rem 0.75rem;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.06);
  max-width: 560px;
  margin: 0 auto;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus-within {
    border-color: rgba(193, 127, 89, 0.4);
    box-shadow: 0 0 0 3px rgba(193, 127, 89, 0.1);
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 0.75rem 1rem;
  color: #2c2c2c;
  background: transparent;

  &::placeholder {
    color: #999;
  }
`;

export const SearchButton = styled.button`
  background: linear-gradient(135deg, #c17f59 0%, #a86a47 100%);
  border: none;
  border-radius: 10px;
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(193, 127, 89, 0.3);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(193, 127, 89, 0.35);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const SearchIcon = styled.span`
  font-size: 1.1rem;
`;
