import styled from "styled-components";
import { Surface, PrimaryButton, Button } from "../../common/ui/CommonUI.styles";

export { Surface, Button, PrimaryButton };

export const Page = styled.div`
  min-height: 100vh;
  background: radial-gradient(1200px 800px at 15% 0%, rgba(99, 102, 241, 0.14), transparent 55%),
    radial-gradient(900px 600px at 85% 10%, rgba(236, 72, 153, 0.12), transparent 55%),
    #f7f8fb;
  color: #0f172a;
`;

export const Topbar = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(12px);
  background: rgba(247, 248, 251, 0.7);
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
`;

export const TopbarInner = styled.div`
  height: 4.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.25rem;
  gap: 1rem;
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 14rem;
`;

export const BrandMark = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.75rem;
  background: linear-gradient(135deg, #6366f1, #ec4899);
  box-shadow: 0 10px 25px rgba(99, 102, 241, 0.25);
`;

export const BrandTitle = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.1;
`;

export const BrandName = styled.div`
  font-weight: 800;
  font-size: 0.95rem;
  letter-spacing: 0.2px;
`;

export const BrandSub = styled.div`
  font-size: 0.78rem;
  color: rgba(15, 23, 42, 0.62);
`;

export const TopbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const Search = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.75rem;
  border-radius: 999px;
  border: 1px solid rgba(15, 23, 42, 0.1);
  background: rgba(255, 255, 255, 0.85);
  min-width: 18rem;

  @media (max-width: 900px) {
    min-width: 12rem;
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
  font-size: 0.9rem;
  color: #0f172a;
  &::placeholder {
    color: rgba(15, 23, 42, 0.45);
  }
`;

export const Pill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 999px;
  border: 1px solid rgba(15, 23, 42, 0.1);
  background: rgba(255, 255, 255, 0.85);
`;

export const Avatar = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(236, 72, 153, 0.9));
`;

export const UserName = styled.div`
  font-weight: 700;
  font-size: 0.9rem;
`;

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 16.5rem 1fr;
  gap: 1.25rem;
  padding: 1.25rem;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

export const Sidebar = styled(Surface)`
  padding: 0.75rem;
  height: fit-content;
  position: sticky;
  top: 5.25rem;

  @media (max-width: 980px) {
    position: relative;
    top: auto;
  }
`;

export const NavGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const NavItem = styled.button`
  width: 100%;
  text-align: left;
  border: 1px solid transparent;
  background: transparent;
  padding: 0.75rem 0.75rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  color: rgba(15, 23, 42, 0.85);
  transition: background 0.15s ease, border-color 0.15s ease, transform 0.15s ease;

  &:hover {
    background: rgba(99, 102, 241, 0.08);
  }

  &:active {
    transform: translateY(1px);
  }

  &:focus-visible {
    outline: none;
    border-color: rgba(99, 102, 241, 0.5);
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.16);
  }
`;

export const NavItemActive = styled(NavItem)`
  background: rgba(99, 102, 241, 0.12);
  border-color: rgba(99, 102, 241, 0.25);
  color: rgba(15, 23, 42, 0.95);
`;

export const NavIcon = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 0.65rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(2, 6, 23, 0.06);
`;

export const NavText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`;

export const NavTitle = styled.div`
  font-weight: 800;
  font-size: 0.92rem;
`;

export const NavDesc = styled.div`
  font-size: 0.78rem;
  color: rgba(15, 23, 42, 0.55);
`;

export const Main = styled.div`
  min-width: 0;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.75rem;
`;

export const SectionTitle = styled.div`
  font-weight: 900;
  font-size: 1.35rem;
  letter-spacing: -0.2px;
`;

export const SectionSub = styled.div`
  margin-top: 0.25rem;
  font-size: 0.92rem;
  color: rgba(15, 23, 42, 0.6);
`;

export const Toolbar = styled(Surface)`
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
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
  min-width: 7.25rem;
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
