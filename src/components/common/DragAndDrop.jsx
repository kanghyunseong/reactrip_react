import React, { useState, useRef } from "react";
import {
  DropZone,
  DropZoneContent,
  DropZoneText,
  DropZoneIcon,
  FileInput,
  PreviewContainer,
  PreviewImage,
  PreviewRemoveButton,
  FileList,
  FileItem,
  FileName,
  FileSize,
} from "./DragAndDrop.styles";

export default function DragAndDrop({
  onFilesSelected,
  accept = "image/*",
  multiple = false,
  maxFiles = 1,
  maxSize = 10 * 1024 * 1024, // 10MB 기본값
  showPreview = true,
  disabled = false,
  placeholder = "파일을 드래그하거나 클릭하여 업로드하세요",
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState([]);
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    const errors = [];

    // 파일 크기 검증
    if (file.size > maxSize) {
      errors.push(`${file.name}: 파일 크기가 너무 큽니다 (최대 ${(maxSize / 1024 / 1024).toFixed(1)}MB)`);
      return { valid: false, errors };
    }

    // 파일 타입 검증
    if (accept && accept !== "*/*") {
      const acceptedTypes = accept.split(",").map((type) => type.trim());
      const fileType = file.type;
      const fileExtension = "." + file.name.split(".").pop().toLowerCase();

      const isAccepted = acceptedTypes.some((type) => {
        if (type.startsWith(".")) {
          return fileExtension === type.toLowerCase();
        }
        if (type.includes("*")) {
          const baseType = type.split("/")[0];
          return fileType.startsWith(baseType);
        }
        return fileType === type;
      });

      if (!isAccepted) {
        errors.push(`${file.name}: 지원하지 않는 파일 형식입니다`);
        return { valid: false, errors };
      }
    }

    return { valid: true, errors: [] };
  };

  const processFiles = (fileList) => {
    const fileArray = Array.from(fileList);
    const newFiles = [];
    const newErrors = [];

    // 최대 파일 개수 확인
    const totalFiles = files.length + fileArray.length;
    if (totalFiles > maxFiles) {
      newErrors.push(`최대 ${maxFiles}개의 파일만 업로드할 수 있습니다`);
      setErrors(newErrors);
      return;
    }

    fileArray.forEach((file) => {
      const validation = validateFile(file);
      if (validation.valid) {
        newFiles.push(file);
      } else {
        newErrors.push(...validation.errors);
      }
    });

    if (newErrors.length > 0) {
      setErrors(newErrors);
    }

    if (newFiles.length > 0) {
      const updatedFiles = multiple ? [...files, ...newFiles] : newFiles;
      setFiles(updatedFiles);
      setErrors([]);
      if (onFilesSelected) {
        onFilesSelected(multiple ? updatedFiles : updatedFiles[0]);
      }
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      processFiles(droppedFiles);
    }
  };

  const handleFileInput = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles.length > 0) {
      processFiles(selectedFiles);
    }
    // 같은 파일을 다시 선택할 수 있도록 리셋
    e.target.value = "";
  };

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    if (onFilesSelected) {
      onFilesSelected(multiple ? updatedFiles : updatedFiles[0] || null);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div>
      <DropZone
        $isDragging={isDragging}
        $disabled={disabled}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <FileInput
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
          disabled={disabled}
        />
        <DropZoneContent>
          <DropZoneIcon>📁</DropZoneIcon>
          <DropZoneText>{placeholder}</DropZoneText>
          {accept && accept !== "*/*" && (
            <DropZoneText $small>
              지원 형식: {accept}
            </DropZoneText>
          )}
          {maxSize && (
            <DropZoneText $small>
              최대 크기: {(maxSize / 1024 / 1024).toFixed(1)}MB
            </DropZoneText>
          )}
        </DropZoneContent>
      </DropZone>

      {errors.length > 0 && (
        <div style={{ marginTop: "1rem", color: "#d32f2f" }}>
          {errors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </div>
      )}

      {showPreview && files.length > 0 && (
        <PreviewContainer>
          {files.map((file, index) => {
            const isImage = file.type.startsWith("image/");
            const fileUrl = isImage ? URL.createObjectURL(file) : null;

            return (
              <FileItem key={index}>
                {isImage && fileUrl ? (
                  <PreviewImage>
                    <img src={fileUrl} alt={file.name} />
                    <PreviewRemoveButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile(index);
                        if (fileUrl) URL.revokeObjectURL(fileUrl);
                      }}
                    >
                      ✕
                    </PreviewRemoveButton>
                  </PreviewImage>
                ) : (
                  <div style={{ padding: "1rem", textAlign: "center" }}>
                    <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>
                      📄
                    </div>
                    <FileName>{file.name}</FileName>
                    <FileSize>{formatFileSize(file.size)}</FileSize>
                    <PreviewRemoveButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile(index);
                      }}
                    >
                      ✕
                    </PreviewRemoveButton>
                  </div>
                )}
                {!isImage && (
                  <>
                    <FileName>{file.name}</FileName>
                    <FileSize>{formatFileSize(file.size)}</FileSize>
                  </>
                )}
              </FileItem>
            );
          })}
        </PreviewContainer>
      )}

      {!showPreview && files.length > 0 && (
        <FileList>
          {files.map((file, index) => (
            <FileItem key={index}>
              <FileName>{file.name}</FileName>
              <FileSize>{formatFileSize(file.size)}</FileSize>
              <PreviewRemoveButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile(index);
                }}
              >
                ✕
              </PreviewRemoveButton>
            </FileItem>
          ))}
        </FileList>
      )}
    </div>
  );
}
