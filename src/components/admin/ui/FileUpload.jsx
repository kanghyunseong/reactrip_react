import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const DropZone = styled.div`
  width: 100%;
  border: 2px dashed ${props => props.$isDragging ? 'rgba(99, 102, 241, 0.6)' : 'rgba(99, 102, 241, 0.3)'};
  background: ${props => props.$isDragging 
    ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(236, 72, 153, 0.06))'
    : 'linear-gradient(135deg, rgba(99, 102, 241, 0.03), rgba(236, 72, 153, 0.02))'};
  padding: 1.5rem 1rem;
  border-radius: 0.875rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  text-align: center;
  transform: ${props => props.$isDragging ? 'scale(1.02)' : 'scale(1)'};

  &:hover {
    border-color: rgba(99, 102, 241, 0.5);
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.06), rgba(236, 72, 153, 0.04));
  }

  input[type="file"] {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`;

const DropContent = styled.div`
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
`;

const UploadIcon = styled.div`
  font-size: 2.5rem;
  opacity: ${props => props.$isDragging ? 0.8 : 0.6};
  transition: all 0.3s;
  animation: ${props => props.$isDragging ? 'bounce 0.6s ease-in-out infinite' : 'none'};

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
`;

const UploadText = styled.div`
  font-weight: 600;
  font-size: 0.95rem;
  color: rgba(15, 23, 42, 0.75);
  
  span {
    color: #6366f1;
    text-decoration: underline;
  }
`;

const UploadHint = styled.div`
  font-size: 0.82rem;
  color: rgba(15, 23, 42, 0.5);
`;

const FilePreview = styled.div`
  margin-top: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem;
  background: rgba(99, 102, 241, 0.06);
  border: 1px solid rgba(99, 102, 241, 0.15);
  border-radius: 0.75rem;
`;

const PreviewImage = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  object-fit: cover;
  border-radius: 0.5rem;
  border: 1px solid rgba(15, 23, 42, 0.1);
`;

const FileInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const FileName = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
  color: rgba(15, 23, 42, 0.85);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const FileSize = styled.div`
  font-size: 0.8rem;
  color: rgba(15, 23, 42, 0.5);
  margin-top: 0.15rem;
`;

const RemoveButton = styled.button`
  padding: 0.5rem 0.875rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 0.5rem;
  color: rgba(239, 68, 68, 0.9);
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(239, 68, 68, 0.15);
    border-color: rgba(239, 68, 68, 0.3);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const FileUpload = ({ onFileChange, accept = "image/*", maxSize = 10 * 1024 * 1024, initialPreview = null }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(initialPreview);
  const fileInputRef = useRef(null);

  // initialPreview가 변경되면 preview 및 file 상태 초기화
  useEffect(() => {
    console.log("[FileUpload] initialPreview 업데이트:", initialPreview);
    setPreview(initialPreview);
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [initialPreview]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFile(droppedFile);
    }
  };

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const handleFile = (selectedFile) => {
    // 파일 크기 체크
    if (selectedFile.size > maxSize) {
      toast.warning(`파일 크기는 ${Math.round(maxSize / 1024 / 1024)}MB를 초과할 수 없습니다.`);
      return;
    }

    // 파일 타입 체크 (이미지만)
    if (accept === "image/*" && !selectedFile.type.startsWith('image/')) {
      toast.warning('이미지 파일만 업로드 가능합니다.');
      return;
    }

    setFile(selectedFile);
    onFileChange?.(selectedFile);

    // 이미지 미리보기 생성
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    console.log("[FileUpload] 이미지 삭제 버튼 클릭");
    setFile(null);
    setPreview(null);
    onFileChange?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <>
      <DropZone
        $isDragging={isDragging}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileInput}
        />
        <DropContent $isDragging={isDragging}>
          <UploadIcon $isDragging={isDragging}>
            {isDragging ? '📂' : '📁'}
          </UploadIcon>
          <UploadText>
            {isDragging ? (
              '파일을 여기에 놓으세요'
            ) : (
              <>
                <span>클릭</span>하여 파일 선택 또는 드래그앤드롭
              </>
            )}
          </UploadText>
          <UploadHint>
            JPG, PNG 형식 (최대 {Math.round(maxSize / 1024 / 1024)}MB)
          </UploadHint>
        </DropContent>
      </DropZone>

      {(file || preview) && (
        <FilePreview>
          {preview && <PreviewImage src={preview} alt="미리보기" />}
          <FileInfo>
            {file ? (
              <>
                <FileName>{file.name}</FileName>
                <FileSize>{formatFileSize(file.size)}</FileSize>
              </>
            ) : (
              <FileName>기존 이미지</FileName>
            )}
          </FileInfo>
          <RemoveButton onClick={handleRemove}>
            삭제
          </RemoveButton>
        </FilePreview>
      )}
    </>
  );
};

export default FileUpload;
