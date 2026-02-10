import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(160deg, #faf8f5 0%, #f0ebe3 100%);
  position: relative;
`;

export const ContentWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 100px 1.5rem 3rem;
`;

export const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
`;

export const BackButton = styled.button`
  background: #fff;
  border: 1px solid #e8e4df;
  border-radius: 12px;
  padding: 0.6rem 1.25rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #555;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  &:hover {
    background: #faf8f5;
    border-color: #c17f59;
    color: #a86a47;
  }
`;

export const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: 700;
  color: #2c2c2c;
  margin: 0 0 0.25rem 0;
  letter-spacing: -0.02em;
`;

export const Subtitle = styled.p`
  font-size: 0.95rem;
  color: #666;
  margin: 0;
`;

export const MainContent = styled.div`
  display: flex;
  gap: 1.5rem;
  position: relative;
  margin-top: 1.5rem;
`;

export const CardGrid = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 400px;
`;

export const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 1rem;
  color: #666;

  .spinner {
    width: 48px;
    height: 48px;
    border: 3px solid #f0ebe3;
    border-top: 3px solid #c17f59;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-bottom: 1rem;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  p {
    font-size: 0.95rem;
    color: #666;
  }
`;

export const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  background: rgba(193, 127, 89, 0.08);
  border-radius: 16px;
  text-align: center;
  border: 1px solid rgba(193, 127, 89, 0.2);

  p {
    font-size: 1rem;
    color: #a86a47;
    margin-bottom: 1rem;
  }

  button {
    background: linear-gradient(135deg, #c17f59 0%, #a86a47 100%);
    color: white;
    border: none;
    border-radius: 10px;
    padding: 0.6rem 1.25rem;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(193, 127, 89, 0.35);
    }
  }
`;

export const EmptyMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  background: #fff;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);

  p {
    font-size: 1rem;
    color: #666;
    margin-bottom: 1rem;
  }

  button {
    background: linear-gradient(135deg, #c17f59 0%, #a86a47 100%);
    color: white;
    border: none;
    border-radius: 10px;
    padding: 0.6rem 1.25rem;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(193, 127, 89, 0.35);
    }
  }
`;

export const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 2rem;
  padding: 1rem 0;
`;

export const PageButton = styled.button`
  background: ${(p) => (p.disabled ? "#f0ebe3" : "#fff")};
  color: ${(p) => (p.disabled ? "#bbb" : "#555")};
  border: 1px solid ${(p) => (p.disabled ? "#e8e4df" : "#e0dcd6")};
  border-radius: 10px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #faf8f5;
    border-color: #c17f59;
    color: #a86a47;
  }
`;

export const PageNumber = styled.button`
  background: ${(p) => (p.$active ? "#c17f59" : "#fff")};
  color: ${(p) => (p.$active ? "#fff" : "#555")};
  border: 1px solid ${(p) => (p.$active ? "#c17f59" : "#e0dcd6")};
  border-radius: 10px;
  padding: 0.5rem 0.75rem;
  font-size: 0.9rem;
  font-weight: ${(p) => (p.$active ? "600" : "500")};
  cursor: pointer;
  transition: all 0.2s;
  min-width: 40px;

  &:hover {
    background: ${(p) => (p.$active ? "#a86a47" : "#faf8f5")};
    border-color: #c17f59;
    color: ${(p) => (p.$active ? "#fff" : "#a86a47")};
  }
`;

export const PageDots = styled.span`
  color: #999;
  font-size: 0.9rem;
  padding: 0 0.25rem;
`;
