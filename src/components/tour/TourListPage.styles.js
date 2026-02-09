import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #e3f2fd 0%, #ffffff 100%);
  position: relative;
`;

export const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 100px 40px 60px;
`;

export const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
`;

export const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateX(-2px);
  }
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #222;
  margin: 0 0 8px 0;
`;

export const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0;
`;

export const MainContent = styled.div`
  display: flex;
  gap: 30px;
  position: relative;
  margin-top: 30px;
`;

export const CardGrid = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 600px;
`;

// 로딩 스피너
export const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  color: #666;

  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #2196f3;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 20px;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  p {
    font-size: 16px;
    color: #666;
  }
`;

// 에러 메시지
export const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  background: rgba(255, 82, 82, 0.1);
  border-radius: 12px;
  text-align: center;

  p {
    font-size: 16px;
    color: #d32f2f;
    margin-bottom: 20px;
  }

  button {
    background: #d32f2f;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 24px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: #b71c1c;
    }
  }
`;

// 빈 상태 메시지
export const EmptyMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  text-align: center;

  p {
    font-size: 18px;
    color: #666;
    margin-bottom: 20px;
  }

  button {
    background: #2196f3;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 24px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: #1976d2;
    }
  }
`;

// 페이지네이션
export const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 40px;
  padding: 20px 0;
`;

export const PageButton = styled.button`
  background: ${(props) => (props.disabled ? "#f5f5f5" : "white")};
  color: ${(props) => (props.disabled ? "#ccc" : "#666")};
  border: 1px solid ${(props) => (props.disabled ? "#e0e0e0" : "#ddd")};
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #2196f3;
    color: white;
    border-color: #2196f3;
  }
`;

export const PageNumber = styled.button`
  background: ${(props) => (props.$active ? "#2196f3" : "white")};
  color: ${(props) => (props.$active ? "white" : "#666")};
  border: 1px solid ${(props) => (props.$active ? "#2196f3" : "#ddd")};
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 14px;
  font-weight: ${(props) => (props.$active ? "600" : "500")};
  cursor: pointer;
  transition: all 0.2s;
  min-width: 40px;

  &:hover {
    background: ${(props) => (props.$active ? "#1976d2" : "#f5f5f5")};
    border-color: ${(props) => (props.$active ? "#1976d2" : "#bbb")};
  }
`;

export const PageDots = styled.span`
  color: #999;
  font-size: 14px;
  padding: 0 8px;
`;