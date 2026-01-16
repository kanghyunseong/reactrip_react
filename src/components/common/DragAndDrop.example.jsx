import React, { useState } from "react";
import styled from "styled-components";
import DragAndDrop from "./DragAndDrop";

// DragAndDrop 컴포넌트 사용 예제
// 사용 방법은 아래 예제 코드를 참고하세요

const ExampleContainer = styled.div`
  padding: 2rem;
  max-width: 75rem;
  margin: 0 auto;
  font-family: 'Roboto', 'Noto Sans KR', sans-serif;
`;

const ExampleTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #212121;
`;

const ExampleSection = styled.div`
  margin-bottom: 3rem;
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #424242;
`;

const FileInfo = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #424242;
`;

const FileInfoText = styled.p`
  margin: 0.5rem 0;
  line-height: 1.5;
`;

const FileList = styled.ul`
  margin: 0.5rem 0;
  padding-left: 1.5rem;
`;

const FileListItem = styled.li`
  margin: 0.25rem 0;
  color: #616161;
`;

export default function DragAndDropExample() {
  const [singleFile, setSingleFile] = useState(null);
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [documentFile, setDocumentFile] = useState(null);

  return (
    <ExampleContainer>
      <ExampleTitle>DragAndDrop 컴포넌트 예제</ExampleTitle>

      <ExampleSection>
        <SectionTitle>1. 단일 이미지 업로드</SectionTitle>
        <DragAndDrop
          onFilesSelected={(file) => {
            setSingleFile(file);
            console.log("선택된 파일:", file);
          }}
          accept="image/*"
          multiple={false}
          maxSize={5 * 1024 * 1024} // 5MB
          placeholder="이미지를 드래그하거나 클릭하여 업로드하세요"
        />
        {singleFile && (
          <FileInfo>
            <FileInfoText>
              <strong>선택된 파일:</strong> {singleFile.name}
            </FileInfoText>
            <FileInfoText>
              <strong>크기:</strong> {(singleFile.size / 1024).toFixed(2)} KB
            </FileInfoText>
            <FileInfoText>
              <strong>타입:</strong> {singleFile.type}
            </FileInfoText>
          </FileInfo>
        )}
      </ExampleSection>

      <ExampleSection>
        <SectionTitle>2. 여러 이미지 업로드 (최대 5개)</SectionTitle>
        <DragAndDrop
          onFilesSelected={(files) => {
            setMultipleFiles(files);
            console.log("선택된 파일들:", files);
          }}
          accept="image/*"
          multiple={true}
          maxFiles={5}
          maxSize={10 * 1024 * 1024} // 10MB
          placeholder="여러 이미지를 드래그하거나 클릭하여 업로드하세요"
        />
        {multipleFiles.length > 0 && (
          <FileInfo>
            <FileInfoText>
              <strong>선택된 파일 개수:</strong> {multipleFiles.length}
            </FileInfoText>
            <FileList>
              {multipleFiles.map((file, index) => (
                <FileListItem key={index}>
                  {file.name} ({(file.size / 1024).toFixed(2)} KB)
                </FileListItem>
              ))}
            </FileList>
          </FileInfo>
        )}
      </ExampleSection>

      <ExampleSection>
        <SectionTitle>3. 문서 파일 업로드 (PDF, DOC, DOCX)</SectionTitle>
        <DragAndDrop
          onFilesSelected={(file) => {
            setDocumentFile(file);
            console.log("선택된 파일:", file);
          }}
          accept=".pdf,.doc,.docx"
          multiple={false}
          showPreview={false}
          maxSize={20 * 1024 * 1024} // 20MB
          placeholder="문서 파일을 드래그하거나 클릭하여 업로드하세요"
        />
        {documentFile && (
          <FileInfo>
            <FileInfoText>
              <strong>선택된 파일:</strong> {documentFile.name}
            </FileInfoText>
            <FileInfoText>
              <strong>크기:</strong> {(documentFile.size / 1024 / 1024).toFixed(2)} MB
            </FileInfoText>
          </FileInfo>
        )}
      </ExampleSection>

      <ExampleSection>
        <SectionTitle>4. 모든 파일 타입</SectionTitle>
        <DragAndDrop
          onFilesSelected={(file) => {
            console.log("선택된 파일:", file);
          }}
          accept="*/*"
          multiple={false}
          showPreview={false}
          placeholder="모든 파일을 드래그하거나 클릭하여 업로드하세요"
        />
      </ExampleSection>

      <ExampleSection>
        <SectionTitle>5. 비활성화 상태</SectionTitle>
        <DragAndDrop
          onFilesSelected={(file) => {
            console.log("선택된 파일:", file);
          }}
          accept="image/*"
          disabled={true}
          placeholder="업로드가 비활성화되어 있습니다"
        />
      </ExampleSection>
    </ExampleContainer>
  );
}
