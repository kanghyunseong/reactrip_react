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
  background: radial-gradient(900px 600px at 15% 10%, rgba(99, 102, 241, 0.22), transparent 55%),
    radial-gradient(800px 520px at 85% 10%, rgba(236, 72, 153, 0.18), transparent 55%),
    linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  color: white;
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
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 30px;
  font-family: 'Lato', sans-serif;
`;

export const Description = styled.p`
  font-size: 20px;
  line-height: 1.8;
  font-family: 'Noto Sans KR', sans-serif;
`;

export const Card = styled.div`
  background: rgba(255, 255, 255, 0.92);
  color: rgba(15, 23, 42, 0.92);
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 1.25rem;
  box-shadow: 0 20px 55px rgba(2, 6, 23, 0.18);
  padding: 1.25rem;
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
  border-bottom: 22px solid rgba(15, 23, 42, 0.9);
  filter: drop-shadow(0 10px 18px rgba(0,0,0,0.25));
  z-index: 3;
`;

export const WheelCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  border-radius: 999px;
  background: rgba(255,255,255,0.94);
  box-shadow: 0 22px 55px rgba(2, 6, 23, 0.22);
  border: 10px solid rgba(255, 255, 255, 0.55);
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
  border: 1px solid rgba(15, 23, 42, 0.14);
  background: rgba(255, 255, 255, 0.92);
  color: rgba(15, 23, 42, 0.9);
  font-weight: 900;
  cursor: pointer;
  transition: transform 0.12s ease, box-shadow 0.2s ease, filter 0.2s ease;
  box-shadow: 0 10px 24px rgba(2, 6, 23, 0.12);

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    filter: brightness(1.02);
    box-shadow: 0 14px 34px rgba(2, 6, 23, 0.18);
  }
  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export const PrimaryBtn = styled(Btn)`
  background: linear-gradient(135deg, rgba(99, 102, 241, 1) 0%, rgba(236, 72, 153, 1) 100%);
  color: #fff;
  border-color: rgba(255,255,255,0.25);
`;

export const Meta = styled.div`
  margin-top: 0.85rem;
  font-size: 0.9rem;
  color: rgba(15, 23, 42, 0.65);
`;

export const ResultTitle = styled.div`
  font-weight: 950;
  font-size: 1.1rem;
  margin-bottom: 0.6rem;
`;

export const ResultName = styled.div`
  font-weight: 950;
  font-size: 1.35rem;
  letter-spacing: -0.3px;
`;

export const ResultSub = styled.div`
  margin-top: 0.35rem;
  color: rgba(15, 23, 42, 0.72);
  line-height: 1.55;
`;

export const Mini = styled.div`
  margin-top: 0.85rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;
