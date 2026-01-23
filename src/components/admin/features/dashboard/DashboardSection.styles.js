import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

export const CardBody = styled.div`
  padding: 1rem;
`;

export const Label = styled.div`
  color: rgba(15, 23, 42, 0.62);
  font-weight: 800;
  font-size: 0.9rem;
`;

export const KPI = styled.div`
  font-weight: 900;
  font-size: 1.5rem;
  margin-top: 0.25rem;
`;

