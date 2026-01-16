import styled from "styled-components";

export const DrawerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
  animation: fadeIn 0.3s ease;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const DrawerContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 320px;
  height: 100vh;
  background-color: rgba(26, 27, 31, 0.95);
  backdrop-filter: blur(10px);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease;
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

export const DrawerHeader = styled.div`
  padding: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 32px;
  cursor: pointer;
  padding: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  
  &:hover {
    opacity: 0.7;
    transform: rotate(90deg);
  }
`;

export const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  overflow-y: auto;
`;

export const MenuItem = styled.li`
  padding: 20px 30px;
  color: white;
  font-family: 'Lato', 'Noto Sans KR', sans-serif;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    padding-left: 40px;
  }
  
  &:active {
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

export const MenuDivider = styled.li`
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 10px 0;
  list-style: none;
`;
