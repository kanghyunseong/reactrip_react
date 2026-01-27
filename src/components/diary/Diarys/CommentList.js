export const CommentSection = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 40px auto 0;
  padding: 0 16px;
`;

export const CommentItem = styled.div`
  display: flex;
  gap: 14px;
  padding: 16px;
  margin-bottom: 12px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  backdrop-filter: blur(8px);
`;

export const CommentAvatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #ddd;
  flex-shrink: 0;
`;

export const CommentBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`;

export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CommentAuthor = styled.span`
  font-weight: 700;
  font-size: 14px;
`;

export const CommentDate = styled.span`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
`;

export const CommentText = styled.p`
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  word-break: break-word;
`;
