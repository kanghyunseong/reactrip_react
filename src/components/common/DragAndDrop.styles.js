import styled from "styled-components";

export const DropZone = styled.div`
  position: relative;
  width: 100%;
  min-height: 12.5rem;
  border: 0.125rem dashed
    ${(props) =>
      props.$isDragging
        ? "#2f80ed"
        : props.$disabled
        ? "#e0e0e0"
        : "#bdbdbd"};
  border-radius: 0.5rem;
  background-color: ${(props) =>
    props.$isDragging
      ? "rgba(47, 128, 237, 0.05)"
      : props.$disabled
      ? "#f5f5f5"
      : "#fafafa"};
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  &:hover {
    border-color: ${(props) =>
      props.$disabled ? "#e0e0e0" : "#2f80ed"};
    background-color: ${(props) =>
      props.$disabled
        ? "#f5f5f5"
        : props.$isDragging
        ? "rgba(47, 128, 237, 0.1)"
        : "#f0f0f0"};
  }

  &:active {
    transform: ${(props) => (props.$disabled ? "none" : "scale(0.98)")};
  }
`;

export const DropZoneContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  pointer-events: none;
`;

export const DropZoneIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.6;
`;

export const DropZoneText = styled.p`
  font-family: "Roboto", "Noto Sans KR", sans-serif;
  font-size: ${(props) => (props.$small ? "0.875rem" : "1rem")};
  color: ${(props) => (props.$small ? "#757575" : "#424242")};
  margin: ${(props) => (props.$small ? "0.25rem 0" : "0.5rem 0")};
  line-height: 1.5;
`;

export const FileInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  top: 0;
  left: 0;
  z-index: 1;
`;

export const PreviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
`;

export const PreviewImage = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%; /* 1:1 비율 */
  background: #f5f5f5;
  border-radius: 0.5rem;
  overflow: hidden;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const PreviewRemoveButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: bold;
  transition: all 0.2s ease;
  z-index: 10;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const FileList = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const FileItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 0.5rem;
  border: 0.0625rem solid #e0e0e0;
`;

export const FileName = styled.div`
  font-family: "Roboto", "Noto Sans KR", sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: #424242;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const FileSize = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.75rem;
  color: #757575;
`;
