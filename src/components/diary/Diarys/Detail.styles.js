export const detailStyles = {
  /* 전체 페이지 */
  page: {
    minHeight: "70vh",
    width: "100%",
    backgroundColor: "#f5f5f5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px",
  },

  /* 카드 */
  wrapper: {
    width: "100%",
    maxWidth: "1200px",        // 🔥 가로 확장
    backgroundColor: "#fff",
    borderRadius: "18px",
    padding: "32px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },

  /* 좌우 레이아웃 */
  layout: {
    display: "flex",
    gap: "32px",
    alignItems: "flex-start",
  },

  /* 왼쪽 - 글 영역 */
  leftSection: {
    flex: 1.2,
  },

  title: {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "20px",
  },

  content: {
    fontSize: "15px",
    lineHeight: "1.7",
    whiteSpace: "pre-line",
    marginBottom: "24px",
    color: "#333",
  },

  emotionBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },

  emotionButton: {
    padding: "6px 14px",
    borderRadius: "20px",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    fontSize: "13px",
    cursor: "pointer",
  },

  emotionActive: {
    backgroundColor: "#ffe4ec",
    borderColor: "#f06292",
  },

  author: {
    fontSize: "13px",
    color: "#777",
    textAlign: "right",
    marginBottom: "16px",
  },

  footer: {
    borderTop: "1px solid #eee",
    paddingTop: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  buttonGroup: {
    display: "flex",
    gap: "10px",
  },

  button: {
    padding: "6px 14px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    fontSize: "13px",
    cursor: "pointer",
  },

  deleteButton: {
    padding: "6px 14px",
    borderRadius: "20px",
    border: "1px solid #f44336",
    backgroundColor: "#fff",
    fontSize: "13px",
    color: "#f44336",
    cursor: "pointer",
  },

  likeButton: {
    fontSize: "14px",
    color: "#e91e63",
    background: "none",
    border: "none",
    cursor: "pointer",
  },

  /* 오른쪽 - 이미지 + 댓글 */
  rightSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  imageBox: {
    width: "50%",
    borderRadius: "14px",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "320px",
    objectFit: "cover",
  },

  imageCaption: {
    fontSize: "13px",
    color: "#666",
    marginTop: "6px",
  },

  commentBox: {
    borderTop: "1px solid #eee",
    paddingTop: "16px",
  },
};
