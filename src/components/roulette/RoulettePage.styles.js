import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  max-width: 100vw;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
`;

export const Section = styled.section`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(160deg, #faf8f5 0%, #f0ebe3 100%);
  color: #2c2c2c;
  padding: 6.5rem 1rem 4rem;
`;

export const Content = styled.div`
  width: min(980px, 100%);
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 2rem;
  align-items: start;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #2c2c2c;
  letter-spacing: -0.02em;
`;

export const Description = styled.p`
  font-size: 1.05rem;
  line-height: 1.75;
  color: #555;
  font-family: "Noto Sans KR", sans-serif;
`;

export const Card = styled.div`
  background: #fff;
  color: #2c2c2c;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 1.25rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
`;

export const Left = styled.div`
  min-width: 0;
`;

export const Right = styled.div`
  min-width: 0;
`;

export const WheelWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.9rem;
`;

export const WheelStage = styled.div`
  position: relative;
  width: min(420px, 90vw);
  aspect-ratio: 1 / 1;
`;

export const Pointer = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 14px solid transparent;
  border-right: 14px solid transparent;
  border-bottom: 22px solid rgba(44, 44, 44, 0.9);
  filter: drop-shadow(0 10px 18px rgba(0, 0, 0, 0.15));
  z-index: 3;
`;

export const WheelCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 8px solid rgba(193, 127, 89, 0.2);
  transform: rotate(var(--deg, 0deg));
  transition: transform var(--dur, 3200ms) cubic-bezier(0.12, 0.95, 0.22, 1);
  will-change: transform;
`;

export const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  justify-content: center;
`;

export const Btn = styled.button`
  height: 2.85rem;
  padding: 0 1.05rem;
  border-radius: 0.95rem;
  border: 1px solid #e8e4df;
  background: #fff;
  color: #2c2c2c;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    border-color: #c17f59;
    color: #a86a47;
    box-shadow: 0 4px 14px rgba(193, 127, 89, 0.15);
  }
  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export const PrimaryBtn = styled(Btn)`
  background: linear-gradient(135deg, #c17f59 0%, #a86a47 100%);
  color: #fff;
  border-color: transparent;
  box-shadow: 0 4px 14px rgba(193, 127, 89, 0.35);

  &:hover:not(:disabled) {
    color: #fff;
    box-shadow: 0 6px 18px rgba(193, 127, 89, 0.4);
  }
`;

export const Meta = styled.div`
  margin-top: 0.85rem;
  font-size: 0.9rem;
  color: #888;
`;

export const ResultTitle = styled.div`
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #2c2c2c;
`;

export const ResultName = styled.div`
  font-weight: 700;
  font-size: 1.35rem;
  letter-spacing: -0.02em;
  color: #2c2c2c;
`;

export const ResultSub = styled.div`
  margin-top: 0.35rem;
  color: #555;
  line-height: 1.55;
  font-size: 0.9rem;
`;

export const Mini = styled.div`
  margin-top: 0.85rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;
