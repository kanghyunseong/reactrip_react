import styled from "styled-components";
import { Surface, PrimaryButton, Button } from "../../common/ui/CommonUI.styles";

export { Surface, Button, PrimaryButton };

export const Page = styled.div`
  min-height: 100vh;
  background: #e8e8e8;
  color: #2c2c2c;
`;

export const Topbar = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  background: #2c3e50;
  border-bottom: 3px solid #1a252f;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
`;

export const TopbarInner = styled.div`
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  gap: 1rem;
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 220px;
`;

export const BrandMark = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 3px;
  background: #3498db;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 16px;
  border: 1px solid #2980b9;
`;

export const BrandTitle = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.3;
`;

export const BrandName = styled.div`
  font-weight: 700;
  font-size: 17px;
  color: #ffffff;
  letter-spacing: 0.3px;
`;

export const BrandSub = styled.div`
  font-size: 11px;
  color: #bdc3c7;
  font-weight: 400;
`;

export const TopbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const Search = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  border-radius: 3px;
  border: 1px solid #34495e;
  background: #34495e;
  min-width: 300px;

  @media (max-width: 900px) {
    min-width: 220px;
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  font-size: 13px;
  color: #ffffff;
  &::placeholder {
    color: #95a5a6;
  }
`;

export const Pill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 12px;
  border-radius: 3px;
  border: 1px solid #34495e;
  background: #34495e;
`;

export const Avatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 3px;
  background: #3498db;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 13px;
  border: 1px solid #2980b9;
`;

export const UserName = styled.div`
  font-weight: 500;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  gap: 1px;
  line-height: 1.3;
`;

export const UserNameText = styled.div`
  font-weight: 500;
  font-size: 13px;
  color: #ffffff;
`;

export const UserRole = styled.div`
  font-size: 10px;
  color: #bdc3c7;
  font-weight: 400;
`;

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 0;
  padding: 0;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

export const Sidebar = styled.div`
  padding: 0;
  min-height: calc(100vh - 55px);
  position: sticky;
  top: 55px;
  background: #34495e;
  border-right: 2px solid #2c3e50;
  overflow-y: auto;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;

  &::after {
    content: "";
    flex: 1;
    background: #34495e;
    min-height: 0;
  }

  @media (max-width: 980px) {
    position: relative;
    top: auto;
    min-height: auto;
    border-right: none;
    border-bottom: 2px solid #2c3e50;

    &::after {
      display: none;
    }
  }
`;

export const NavGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  flex-shrink: 0;
`;

export const NavItem = styled.button`
  width: 100%;
  text-align: left;
  border: none;
  border-bottom: 1px solid #2c3e50;
  background: #34495e;
  padding: 12px 16px;
  border-radius: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  color: #ecf0f1;
  transition: background 0.15s ease;

  &:hover {
    background: #3d566e;
  }

  &:active {
    background: #2c3e50;
  }

  &:focus-visible {
    outline: 2px solid #3498db;
    outline-offset: -2px;
  }
`;

export const NavItemActive = styled(NavItem)`
  background: #2c3e50;
  border-left: 4px solid #3498db;
  color: #ffffff;
  font-weight: 600;

  &:hover {
    background: #253544;
  }
`;

export const NavIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  font-size: 12px;
  flex-shrink: 0;
`;

export const NavText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
`;

export const NavTitle = styled.div`
  font-weight: 500;
  font-size: 13px;
  color: #ecf0f1;
`;

export const NavDesc = styled.div`
  font-size: 10px;
  color: #95a5a6;
`;

export const SidebarFooter = styled.div`
  margin-top: auto;
  padding: 12px 0;
  border-top: 2px solid #2c3e50;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
`;

export const SidebarButton = styled.button`
  width: 100%;
  text-align: left;
  border: none;
  background: #34495e;
  padding: 12px 16px;
  border-radius: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  color: #ecf0f1;
  transition: background 0.15s ease;
  font-size: 13px;
  font-weight: 500;

  &:hover {
    background: #3d566e;
  }

  &:active {
    background: #2c3e50;
  }

  &:focus-visible {
    outline: 2px solid #3498db;
    outline-offset: -2px;
  }
`;

export const SidebarButtonDanger = styled(SidebarButton)`
  color: #e74c3c;

  &:hover {
    background: #3d566e;
    color: #c0392b;
  }

  &:active {
    background: #2c3e50;
  }
`;

export const Main = styled.div`
  min-width: 0;
  background: #e8e8e8;
  padding: 24px;
  padding-bottom: 60px;
  min-height: calc(100vh - 55px);
  box-sizing: border-box;
  overflow-x: auto;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 20px;
  padding: 18px 24px;
  border-bottom: 3px solid #bdc3c7;
  background: #ffffff;
  border-radius: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const SectionTitle = styled.div`
  font-weight: 700;
  font-size: 22px;
  color: #2c3e50;
  letter-spacing: 0.2px;
`;

export const SectionSub = styled.div`
  margin-top: 6px;
  font-size: 12px;
  color: #7f8c8d;
  font-weight: 400;
`;

export const Toolbar = styled(Surface)`
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  background: #ffffff;
  border: 1px solid #bdc3c7;
  border-radius: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const ToolbarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
  flex: 1 1 28rem;
  flex-wrap: wrap;
`;

export const ToolbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  flex-wrap: wrap;
  justify-content: flex-end;
  margin-left: auto;
`;

/* 툴바에서 "같은 모양"으로 쓰는 프라이머리 버튼 */
export const ToolbarPrimaryButton = styled(PrimaryButton)`
  min-width: 100px;
  background: #3498db;
  color: white;
  border: 1px solid #2980b9;
  border-radius: 3px;
  padding: 9px 18px;
  font-weight: 600;
  font-size: 13px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
  
  &:hover {
    background: #2980b9;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
    transform: translateY(-1px);
  }
  
  &:active {
    background: #21618c;
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  }
`;

// Admin-specific overrides for traditional admin panel style
export const AdminTableWrap = styled.div`
  overflow: auto;
  background: #ffffff;
  border: 1px solid #bdc3c7;
  border-radius: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const AdminTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const AdminThead = styled.thead`
  background: #ecf0f1;
  position: sticky;
  top: 0;
  z-index: 2;
`;

export const AdminTh = styled.th`
  text-align: left;
  padding: 14px 18px;
  font-size: 13px;
  color: #2c3e50;
  font-weight: 700;
  border-bottom: 2px solid #bdc3c7;
  white-space: nowrap;
  background: #ecf0f1;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 12px;
`;

export const AdminTbody = styled.tbody``;

export const AdminTr = styled.tr`
  border-bottom: 1px solid #ecf0f1;
  background: #ffffff;

  &:nth-child(even) {
    background: #f8f9fa;
  }

  &:hover {
    background: #e8f4f8;
  }
`;

export const AdminTd = styled.td`
  padding: 14px 18px;
  border-bottom: 1px solid #ecf0f1;
  font-size: 13px;
  color: #2c3e50;
  vertical-align: middle;
  max-width: 22rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// Re-export common styles used in existing admin components to avoid breaking them immediately
export {
  Input,
  FormInput,
  Textarea,
  Select,
  TableWrap,
  Table,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  RowActions,
  ActionButton,
  EmptyWrap,
  EmptyTitle,
  EmptyDesc,
  PaginationWrap,
  PageButton,
  PageInfo,
  ModalOverlay,
  ModalCard,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter,
  ModalText,
  FormGrid,
  Field,
  Label,
  Spinner,
  LoadingOverlay,
  LoadingText,
  Help,
  DangerButton,
  GhostButton
} from "../../common/ui/CommonUI.styles";
