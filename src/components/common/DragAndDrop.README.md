# DragAndDrop 컴포넌트 사용법

드래그 앤 드롭으로 파일을 업로드할 수 있는 재사용 가능한 컴포넌트입니다.

## 기본 사용법

```jsx
import DragAndDrop from "./components/common/DragAndDrop";

function MyComponent() {
  const handleFileSelected = (file) => {
    console.log("선택된 파일:", file);
    // 파일 처리 로직
  };

  return (
    <DragAndDrop
      onFilesSelected={handleFileSelected}
      accept="image/*"
      multiple={false}
    />
  );
}
```

## Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `onFilesSelected` | `function` | 필수 | 파일 선택 시 호출되는 콜백 함수. `multiple={true}`일 때는 배열, `false`일 때는 단일 파일 객체를 받습니다. |
| `accept` | `string` | `"image/*"` | 허용할 파일 타입. 예: `"image/*"`, `".pdf,.doc"`, `"*/*"` |
| `multiple` | `boolean` | `false` | 다중 파일 선택 여부 |
| `maxFiles` | `number` | `1` | 최대 파일 개수 (multiple={true}일 때) |
| `maxSize` | `number` | `10 * 1024 * 1024` | 최대 파일 크기 (bytes). 기본값: 10MB |
| `showPreview` | `boolean` | `true` | 이미지 미리보기 표시 여부 |
| `disabled` | `boolean` | `false` | 비활성화 여부 |
| `placeholder` | `string` | `"파일을 드래그하거나 클릭하여 업로드하세요"` | 안내 텍스트 |

## 사용 예제

### 1. 단일 이미지 업로드

```jsx
import React, { useState } from "react";
import DragAndDrop from "./components/common/DragAndDrop";

function ImageUploader() {
  const [image, setImage] = useState(null);

  return (
    <div>
      <DragAndDrop
        onFilesSelected={(file) => {
          setImage(file);
          console.log("이미지 선택됨:", file);
        }}
        accept="image/*"
        multiple={false}
        maxSize={5 * 1024 * 1024} // 5MB
        placeholder="이미지를 드래그하거나 클릭하여 업로드하세요"
      />
      
      {image && (
        <div>
          <p>선택된 파일: {image.name}</p>
          <p>크기: {(image.size / 1024).toFixed(2)} KB</p>
        </div>
      )}
    </div>
  );
}
```

### 2. 여러 이미지 업로드

```jsx
import React, { useState } from "react";
import DragAndDrop from "./components/common/DragAndDrop";

function MultipleImageUploader() {
  const [images, setImages] = useState([]);

  return (
    <div>
      <DragAndDrop
        onFilesSelected={(files) => {
          setImages(files);
          console.log("선택된 이미지들:", files);
        }}
        accept="image/*"
        multiple={true}
        maxFiles={5}
        maxSize={10 * 1024 * 1024} // 10MB
        placeholder="여러 이미지를 드래그하거나 클릭하여 업로드하세요"
      />
      
      {images.length > 0 && (
        <div>
          <p>선택된 이미지 개수: {images.length}</p>
          {images.map((img, index) => (
            <p key={index}>{img.name}</p>
          ))}
        </div>
      )}
    </div>
  );
}
```

### 3. 문서 파일 업로드 (PDF, DOC, DOCX)

```jsx
import React, { useState } from "react";
import DragAndDrop from "./components/common/DragAndDrop";

function DocumentUploader() {
  const [document, setDocument] = useState(null);

  return (
    <div>
      <DragAndDrop
        onFilesSelected={(file) => {
          setDocument(file);
          console.log("문서 선택됨:", file);
        }}
        accept=".pdf,.doc,.docx"
        multiple={false}
        showPreview={false}
        maxSize={20 * 1024 * 1024} // 20MB
        placeholder="문서 파일을 드래그하거나 클릭하여 업로드하세요"
      />
      
      {document && (
        <div>
          <p>선택된 문서: {document.name}</p>
          <p>크기: {(document.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
      )}
    </div>
  );
}
```

### 4. 모든 파일 타입 업로드

```jsx
import React from "react";
import DragAndDrop from "./components/common/DragAndDrop";

function AnyFileUploader() {
  return (
    <DragAndDrop
      onFilesSelected={(file) => {
        console.log("선택된 파일:", file);
        // 파일 처리 로직
      }}
      accept="*/*"
      multiple={false}
      showPreview={false}
      placeholder="모든 파일을 드래그하거나 클릭하여 업로드하세요"
    />
  );
}
```

### 5. 서버에 파일 업로드하기

```jsx
import React, { useState } from "react";
import DragAndDrop from "./components/common/DragAndDrop";

function ServerUploader() {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file) => {
    setUploading(true);
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("업로드 성공:", result);
        alert("파일이 성공적으로 업로드되었습니다!");
      } else {
        throw new Error("업로드 실패");
      }
    } catch (error) {
      console.error("업로드 오류:", error);
      alert("업로드 중 오류가 발생했습니다.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <DragAndDrop
        onFilesSelected={handleUpload}
        accept="image/*"
        multiple={false}
        disabled={uploading}
        placeholder={uploading ? "업로드 중..." : "이미지를 업로드하세요"}
      />
    </div>
  );
}
```

## 파일 타입 지정 방법

### 이미지 파일
```jsx
accept="image/*"  // 모든 이미지
accept="image/jpeg,image/png"  // JPEG, PNG만
```

### 문서 파일
```jsx
accept=".pdf,.doc,.docx"  // PDF, DOC, DOCX
accept="application/pdf"  // PDF만
```

### 비디오 파일
```jsx
accept="video/*"  // 모든 비디오
accept="video/mp4,video/avi"  // MP4, AVI만
```

### 오디오 파일
```jsx
accept="audio/*"  // 모든 오디오
accept="audio/mp3,audio/wav"  // MP3, WAV만
```

### 모든 파일
```jsx
accept="*/*"  // 모든 파일 타입
```

## 주요 기능

1. **드래그 앤 드롭**: 파일을 드래그하여 업로드 영역에 놓으면 자동으로 선택됩니다.
2. **클릭 업로드**: 업로드 영역을 클릭하면 파일 선택 다이얼로그가 열립니다.
3. **파일 검증**: 파일 타입과 크기를 자동으로 검증합니다.
4. **미리보기**: 이미지 파일은 미리보기를 제공합니다.
5. **에러 처리**: 잘못된 파일 선택 시 에러 메시지를 표시합니다.
6. **파일 삭제**: 선택된 파일을 개별적으로 삭제할 수 있습니다.

## 주의사항

- `multiple={false}`일 때 `onFilesSelected`는 단일 파일 객체를 받습니다.
- `multiple={true}`일 때 `onFilesSelected`는 파일 배열을 받습니다.
- 파일 크기는 bytes 단위로 지정합니다. (예: 5MB = `5 * 1024 * 1024`)
- 이미지가 아닌 파일은 `showPreview={false}`로 설정하는 것이 좋습니다.

## 스타일 커스터마이징

컴포넌트는 styled-components로 작성되어 있으므로, `DragAndDrop.styles.js` 파일을 수정하여 스타일을 변경할 수 있습니다.
