import styled from "styled-components";
import { Surface } from "../../ui/AdminUI.styles";

export const TopGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  margin-top: 0.75rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

export const BottomGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
  margin-top: 0.75rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export const ChartCard = styled(Surface)`
  padding: 1rem;
`;

export const ChartTitle = styled.div`
  font-weight: 900;
  font-size: 1rem;
  color: rgba(15, 23, 42, 0.9);
`;

export const ChartSub = styled.div`
  margin-top: 0.25rem;
  font-weight: 700;
  font-size: 0.85rem;
  color: rgba(15, 23, 42, 0.55);
`;

export const ChartBody = styled.div`
  margin-top: 0.75rem;
  height: 260px;
  position: relative;
`;

export const ChartBodySmall = styled.div`
  margin-top: 0.75rem;
  height: 170px;
  position: relative;
`;

