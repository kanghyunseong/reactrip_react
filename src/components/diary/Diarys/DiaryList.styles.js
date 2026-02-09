 export const listStyles = {
  listWrapper: { maxWidth: "700px", margin: "10px auto", padding: "0 20px" },
  sectionTitle: { fontSize: "22px", fontWeight: "bold", marginBottom: "20px", color: "#333" },
  listItem: {
    display: "flex",
    alignItems: "center",
    padding: "15px 0",
    borderBottom: "1px solid #f0f0f0",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  thumbnailBox: {
    width: "80px",
    height: "80px",
    borderRadius: "12px",
    overflow: "hidden",
    marginRight: "20px",
    flexShrink: 0, // 이미지 크기 고정
  },
  thumbnailImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover", // 비율 유지하며 꽉 채움
    backgroundColor: "#eee",
  },
  listMain: { flex: 1, overflow: "hidden" },
  listTitle: { 
    margin: "0 0 6px 0", 
    fontSize: "18px", 
    color: "#222",
    fontWeight: "600",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" 
  },
  listText: { 
    margin: "0 0 8px 0", 
    fontSize: "14px", 
    color: "#292c29",
    display: "-webkit-box",
    WebkitLineClamp: 1, // 두 줄까지만 표시
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    lineHeight: "1.5"
  },
  listDate: { fontSize: "12px", color: "#aaa" },
  arrow: { color: "#ddd", fontSize: "20px", marginLeft: "15px" }
};