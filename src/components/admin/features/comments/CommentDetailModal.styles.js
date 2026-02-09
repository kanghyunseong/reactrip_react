import styled from "styled-components";
import { Label } from "../../ui/AdminUI.styles";

export const DetailGrid = styled.div`
  display: grid;
  gap: 1.25rem;
`;

export const DetailRow = styled.div`
  display: grid;
  grid-template-columns: 8rem 1fr;
  gap: 1rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
`;

export const DetailLabel = styled(Label)`
  font-weight: 700;
  color: rgba(15, 23, 42, 0.85);
  margin: 0;
`;

export const DetailValue = styled.div`
  color: rgba(15, 23, 42, 0.9);
  line-height: 1.6;
  word-break: break-word;
`;

export const ContentBox = styled.div`
  padding: 1rem;
  background: rgba(249, 250, 251, 0.6);
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 0.75rem;
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.7;
  min-height: 4rem;
  max-height: 15rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(15, 23, 42, 0.05);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(99, 102, 241, 0.3);
    border-radius: 10px;
    &:hover {
      background: rgba(99, 102, 241, 0.5);
    }
  }
`;

export const LoadingContainer = styled.div`
  text-align: center;
  padding: 3rem;
`;

export const EmptyContainer = styled.div`
  text-align: center;
  padding: 3rem;
`;

export const LinkButton = styled.button`
  color: #2563eb;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  font-size: inherit;
  padding: 0;
  margin: 0;
  
  &:hover {
    color: #1d4ed8;
  }
`;
