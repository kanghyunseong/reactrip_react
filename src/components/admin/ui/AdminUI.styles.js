import styled from "styled-components";

export const Surface = styled.div`
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 1rem;
  box-shadow: 0 12px 30px rgba(2, 6, 23, 0.06);
`;

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

export const Input = styled.input`
  flex: 1 1 18rem;
  min-width: 12rem;
  max-width: 28rem;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: rgba(255, 255, 255, 0.9);
  padding: 0.65rem 0.75rem;
  border-radius: 0.75rem;
  outline: none;
  transition: box-shadow 0.2s, border-color 0.2s;
  font-size: 0.95rem;

  &:focus {
    border-color: rgba(99, 102, 241, 0.55);
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.16);
  }
`;

export const Button = styled.button`
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.88));
  height: 2.75rem;
  padding: 0 1rem;
  border-radius: 0.85rem;
  cursor: pointer;
  font-weight: 800;
  font-size: 0.9rem;
  transition: transform 0.15s ease, filter 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  color: rgba(15, 23, 42, 0.9);
  box-shadow: 0 8px 18px rgba(2, 6, 23, 0.06);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  white-space: nowrap;

  &:hover {
    filter: brightness(1.03);
    box-shadow: 0 12px 28px rgba(2, 6, 23, 0.1);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0px);
    box-shadow: 0 8px 18px rgba(2, 6, 23, 0.06);
  }

  &:focus-visible {
    outline: none;
    border-color: rgba(99, 102, 241, 0.45);
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.16), 0 12px 28px rgba(2, 6, 23, 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`;

export const PrimaryButton = styled(Button)`
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 45%, #ec4899 100%);
  border-color: rgba(99, 102, 241, 0.35);
  color: #fff;
  box-shadow: 0 14px 34px rgba(99, 102, 241, 0.22);

  &:hover {
    filter: brightness(1.04);
    box-shadow: 0 18px 44px rgba(99, 102, 241, 0.28);
  }

  &:focus-visible {
    border-color: rgba(255, 255, 255, 0.45);
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.22), 0 18px 44px rgba(99, 102, 241, 0.28);
  }
`;

export const GhostButton = styled(Button)`
  background: rgba(2, 6, 23, 0.02);
  border-color: rgba(15, 23, 42, 0.1);
  color: rgba(15, 23, 42, 0.75);
  box-shadow: none;

  &:hover {
    background: rgba(2, 6, 23, 0.04);
    filter: none;
    box-shadow: none;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0px);
  }

  &:focus-visible {
    border-color: rgba(15, 23, 42, 0.25);
    box-shadow: 0 0 0 4px rgba(15, 23, 42, 0.08);
  }
`;

export const DangerButton = styled(Button)`
  background: linear-gradient(180deg, rgba(239, 68, 68, 0.12), rgba(239, 68, 68, 0.06));
  border-color: rgba(239, 68, 68, 0.25);
  color: rgba(185, 28, 28, 0.95);
  box-shadow: 0 10px 22px rgba(239, 68, 68, 0.12);

  &:hover {
    filter: brightness(1.03);
    box-shadow: 0 14px 30px rgba(239, 68, 68, 0.18);
  }

  &:focus-visible {
    border-color: rgba(239, 68, 68, 0.45);
    box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.16), 0 14px 30px rgba(239, 68, 68, 0.18);
  }
`;

/* 툴바에서 "같은 모양"으로 쓰는 프라이머리 버튼 */
export const ToolbarPrimaryButton = styled(PrimaryButton)`
  min-width: 7.25rem;
`;

export const TableWrap = styled(Surface)`
  overflow: hidden;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Thead = styled.thead`
  background: rgba(2, 6, 23, 0.03);
`;

export const Th = styled.th`
  text-align: left;
  padding: 0.75rem 0.75rem;
  font-size: 0.82rem;
  letter-spacing: 0.2px;
  color: rgba(15, 23, 42, 0.7);
  font-weight: 900;
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
  white-space: nowrap;
`;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  &:hover td {
    background: rgba(99, 102, 241, 0.04);
  }
`;

export const Td = styled.td`
  padding: 0.75rem 0.75rem;
  border-bottom: 1px solid rgba(15, 23, 42, 0.06);
  font-size: 0.92rem;
  color: rgba(15, 23, 42, 0.88);
  vertical-align: middle;
  max-width: 22rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const RowActions = styled.div`
  display: flex;
  gap: 0.4rem;
  justify-content: flex-end;
`;

export const ActionButton = styled.button`
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.88));
  height: 2.125rem;
  padding: 0 0.75rem;
  border-radius: 0.7rem;
  cursor: pointer;
  font-weight: 800;
  font-size: 0.82rem;
  color: rgba(15, 23, 42, 0.85);
  transition: transform 0.15s ease, filter 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  box-shadow: 0 6px 14px rgba(2, 6, 23, 0.08);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  white-space: nowrap;

  ${({ $variant }) =>
    $variant === "danger"
      ? `
    background: linear-gradient(180deg, rgba(239, 68, 68, 0.14), rgba(239, 68, 68, 0.06));
    border-color: rgba(239, 68, 68, 0.28);
    color: rgba(185, 28, 28, 0.95);
    box-shadow: 0 8px 18px rgba(239, 68, 68, 0.14);
  `
      : ""}

  ${({ $variant }) =>
    $variant === "primary"
      ? `
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.18), rgba(236, 72, 153, 0.12));
    border-color: rgba(99, 102, 241, 0.28);
    color: rgba(67, 56, 202, 0.95);
    box-shadow: 0 8px 18px rgba(99, 102, 241, 0.14);
  `
      : ""}

  &:hover {
    filter: brightness(1.03);
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0px);
  }

  &:focus-visible {
    outline: none;
    border-color: rgba(99, 102, 241, 0.45);
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.16);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`;

export const EmptyWrap = styled(Surface)`
  padding: 3rem 1rem;
  text-align: center;
`;

export const EmptyTitle = styled.div`
  font-weight: 900;
  font-size: 1.05rem;
`;

export const EmptyDesc = styled.div`
  margin-top: 0.35rem;
  color: rgba(15, 23, 42, 0.6);
  font-size: 0.92rem;
`;

export const PaginationWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 0.75rem 0;
`;

export const PageButton = styled.button`
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.88));
  height: 2.5rem;
  padding: 0 0.9rem;
  border-radius: 0.75rem;
  cursor: pointer;
  font-weight: 800;
  font-size: 0.85rem;
  color: rgba(15, 23, 42, 0.85);
  transition: transform 0.15s ease, box-shadow 0.2s ease, filter 0.2s ease, border-color 0.2s ease;
  box-shadow: 0 8px 18px rgba(2, 6, 23, 0.06);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  white-space: nowrap;

  &:hover:not(:disabled) {
    filter: brightness(1.03);
    transform: translateY(-1px);
    box-shadow: 0 12px 28px rgba(2, 6, 23, 0.1);
  }

  &:active:not(:disabled) {
    transform: translateY(0px);
  }

  &:focus-visible {
    outline: none;
    border-color: rgba(99, 102, 241, 0.45);
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.16), 0 12px 28px rgba(2, 6, 23, 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`;

export const PageInfo = styled.div`
  font-weight: 800;
  font-size: 0.85rem;
  color: rgba(15, 23, 42, 0.65);
`;

// ----------------------------
// Modal / Form UI
// ----------------------------

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 9999;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ModalCard = styled(Surface)`
  width: min(52rem, 100%);
  max-height: min(85vh, 52rem);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

export const ModalHeader = styled.div`
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
  background: linear-gradient(180deg, rgba(255, 255, 255, 1), rgba(249, 250, 251, 0.95));
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

export const ModalTitle = styled.div`
  font-weight: 950;
  letter-spacing: -0.3px;
  font-size: 1.2rem;
  background: linear-gradient(135deg, #0f172a, #334155);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const ModalClose = styled.button`
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.875rem;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: rgba(255, 255, 255, 0.95);
  cursor: pointer;
  font-weight: 900;
  font-size: 1.1rem;
  color: rgba(15, 23, 42, 0.6);
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(239, 68, 68, 0.1);
    border-color: rgba(239, 68, 68, 0.3);
    color: rgba(239, 68, 68, 1);
    transform: rotate(90deg);
  }

  &:active {
    transform: rotate(90deg) scale(0.95);
  }
`;

export const ModalBody = styled.div`
  padding: 1.5rem;
  overflow: auto;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.5), rgba(249, 250, 251, 0.8));
  
  /* 커스텀 스크롤바 */
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

export const ModalFooter = styled.div`
  padding: 1.25rem 1.5rem;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
  background: rgba(249, 250, 251, 0.8);
  display: flex;
  justify-content: flex-end;
  gap: 0.65rem;
  flex-wrap: wrap;
`;

export const ModalText = styled.div`
  color: rgba(15, 23, 42, 0.75);
  font-size: 0.95rem;
  line-height: 1.6;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-weight: 800;
  font-size: 0.9rem;
  color: rgba(15, 23, 42, 0.85);
  letter-spacing: -0.1px;
  display: flex;
  align-items: center;
  gap: 0.35rem;

  &::before {
    content: "";
    display: inline-block;
    width: 3px;
    height: 14px;
    background: linear-gradient(135deg, #6366f1, #ec4899);
    border-radius: 2px;
  }
`;

export const FormInput = styled.input`
  width: 100%;
  border: 1.5px solid rgba(15, 23, 42, 0.12);
  background: rgba(255, 255, 255, 0.98);
  padding: 0.8rem 1rem;
  border-radius: 0.875rem;
  outline: none;
  font-size: 0.95rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);

  &::placeholder {
    color: rgba(15, 23, 42, 0.35);
  }

  &:hover {
    border-color: rgba(99, 102, 241, 0.3);
  }

  &:focus {
    border-color: rgba(99, 102, 241, 0.6);
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.12), 0 4px 12px rgba(99, 102, 241, 0.08);
    transform: translateY(-1px);
  }

  &:disabled {
    background: rgba(15, 23, 42, 0.03);
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 9rem;
  border: 1.5px solid rgba(15, 23, 42, 0.12);
  background: rgba(255, 255, 255, 0.98);
  padding: 0.8rem 1rem;
  border-radius: 0.875rem;
  outline: none;
  font-size: 0.95rem;
  resize: vertical;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: inherit;
  line-height: 1.6;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);

  &::placeholder {
    color: rgba(15, 23, 42, 0.35);
  }

  &:hover {
    border-color: rgba(99, 102, 241, 0.3);
  }

  &:focus {
    border-color: rgba(99, 102, 241, 0.6);
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.12), 0 4px 12px rgba(99, 102, 241, 0.08);
    transform: translateY(-1px);
  }

  /* 커스텀 스크롤바 */
  &::-webkit-scrollbar {
    width: 6px;
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

export const Select = styled.select`
  width: 100%;
  border: 1.5px solid rgba(15, 23, 42, 0.12);
  background: rgba(255, 255, 255, 0.98);
  padding: 0 1rem;
  height: 2.9rem;
  border-radius: 0.875rem;
  outline: none;
  font-size: 0.95rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236366f1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;

  &:hover {
    border-color: rgba(99, 102, 241, 0.3);
  }

  &:focus {
    border-color: rgba(99, 102, 241, 0.6);
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.12), 0 4px 12px rgba(99, 102, 241, 0.08);
    transform: translateY(-1px);
  }

  &:disabled {
    background: rgba(15, 23, 42, 0.03);
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

// ----------------------------
// Loading / Spinner
// ----------------------------

export const Spinner = styled.div`
  width: ${({ $size }) => $size || "2rem"};
  height: ${({ $size }) => $size || "2rem"};
  border: 3px solid rgba(99, 102, 241, 0.1);
  border-top-color: #6366f1;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const LoadingOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  z-index: 10000;
  animation: fadeIn 0.2s ease-out;
`;

export const LoadingText = styled.div`
  font-weight: 800;
  font-size: 1.1rem;
  color: #6366f1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const Help = styled.div`
  color: rgba(15, 23, 42, 0.5);
  font-size: 0.82rem;
  line-height: 1.4;
  display: flex;
  align-items: flex-start;
  gap: 0.35rem;
  margin-top: -0.15rem;

  &::before {
    content: "ℹ️";
    font-size: 0.75rem;
    opacity: 0.7;
    flex-shrink: 0;
    margin-top: 0.1rem;
  }
`;

export const FileInput = styled.div`
  width: 100%;
  position: relative;

  input[type="file"] {
    width: 100%;
    border: 1.5px dashed rgba(99, 102, 241, 0.3);
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.03), rgba(236, 72, 153, 0.02));
    padding: 1.25rem 1rem;
    border-radius: 0.875rem;
    outline: none;
    font-size: 0.9rem;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    color: rgba(15, 23, 42, 0.6);

    &::file-selector-button {
      padding: 0.5rem 1rem;
      border: none;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: white;
      border-radius: 0.625rem;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.875rem;
      margin-right: 0.75rem;
      transition: all 0.2s;

      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
      }

      &:active {
        transform: translateY(0);
      }
    }

    &:hover {
      border-color: rgba(99, 102, 241, 0.5);
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.06), rgba(236, 72, 153, 0.04));
    }
  }
`;


