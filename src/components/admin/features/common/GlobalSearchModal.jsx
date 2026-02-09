import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosAuth } from "../../../../api/api";
import { toast } from "react-toastify";
import styled from "styled-components";
import Modal from "../../../common/ui/Modal";
import { Button, Input } from "../../ui/AdminUI.styles";

const SearchResults = styled.div`
  max-height: 60vh;
  overflow-y: auto;
  margin-top: 1rem;
`;

const ResultSection = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.div`
  font-weight: 700;
  font-size: 0.95rem;
  color: rgba(15, 23, 42, 0.85);
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(15, 23, 42, 0.1);
`;

const ResultList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ResultItem = styled.button`
  text-align: left;
  padding: 0.75rem;
  border: 1px solid rgba(15, 23, 42, 0.1);
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(99, 102, 241, 0.08);
    border-color: rgba(99, 102, 241, 0.3);
    transform: translateY(-1px);
  }
`;

const ResultTitle = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
  color: rgba(15, 23, 42, 0.9);
  margin-bottom: 0.25rem;
`;

const ResultDesc = styled.div`
  font-size: 0.8rem;
  color: rgba(15, 23, 42, 0.6);
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: rgba(15, 23, 42, 0.5);
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: rgba(15, 23, 42, 0.6);
`;

const SearchInputContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
`;

const SearchInputField = styled(Input)`
  flex: 1;
`;

const isSuccessResponse = (res) => {
  const success = res?.success;
  if (success === true) return true;
  if (typeof success === "string") return success.includes("성공");
  return false;
};

const GlobalSearchModal = ({ open, searchTerm: initialSearchTerm, onClose }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm || "");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({
    members: [],
    travels: [],
    notices: [],
    diaries: [],
    comments: [],
  });

  useEffect(() => {
    if (open && initialSearchTerm) {
      setSearchTerm(initialSearchTerm);
    }
  }, [open, initialSearchTerm]);

  const performSearch = async (term) => {
    if (!term?.trim()) {
      setResults({
        members: [],
        travels: [],
        notices: [],
        diaries: [],
        comments: [],
      });
      return;
    }

    setLoading(true);
    const encodedTerm = encodeURIComponent(term.trim());

    try {
      const [membersRes, travelsRes, noticesRes, diariesRes, commentsRes] = await Promise.allSettled([
        axiosAuth.getList(`/api/admin/members/search?keyword=${encodedTerm}&page=1`),
        axiosAuth.getList(`/api/admin/travel/search?keyword=${encodedTerm}&page=1`),
        axiosAuth.getList(`/api/admin/notices/search?keyword=${encodedTerm}&page=1`),
        axiosAuth.getList(`/api/admin/community/diaries/search?keyword=${encodedTerm}&page=1`),
        axiosAuth.getList(`/api/admin/community/comments/search?keyword=${encodedTerm}&page=1`),
      ]);

      const newResults = {
        members: [],
        travels: [],
        notices: [],
        diaries: [],
        comments: [],
      };

      if (membersRes.status === "fulfilled" && isSuccessResponse(membersRes.value)) {
        newResults.members = membersRes.value?.data?.data || [];
      }

      if (travelsRes.status === "fulfilled" && isSuccessResponse(travelsRes.value)) {
        newResults.travels = travelsRes.value?.data?.data || [];
      }

      if (noticesRes.status === "fulfilled" && isSuccessResponse(noticesRes.value)) {
        newResults.notices = noticesRes.value?.data?.data || [];
      }

      if (diariesRes.status === "fulfilled" && isSuccessResponse(diariesRes.value)) {
        newResults.diaries = diariesRes.value?.data?.data || [];
      }

      if (commentsRes.status === "fulfilled" && isSuccessResponse(commentsRes.value)) {
        newResults.comments = commentsRes.value?.data?.data || [];
      }

      setResults(newResults);
    } catch (error) {
      console.error("전역 검색 오류:", error);
      toast.error("검색 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 모달이 열릴 때 초기 검색어로 검색
  useEffect(() => {
    if (open && initialSearchTerm?.trim()) {
      performSearch(initialSearchTerm);
    } else if (open && !initialSearchTerm) {
      setResults({
        members: [],
        travels: [],
        notices: [],
        diaries: [],
        comments: [],
      });
    }
  }, [open, initialSearchTerm]);

  const handleItemClick = (section, item) => {
    onClose();
    switch (section) {
      case "members":
        navigate("/admin/members");
        break;
      case "travels":
        navigate("/admin/travel");
        break;
      case "notices":
        navigate("/admin/notices");
        break;
      case "diaries":
        navigate("/admin/diaries");
        break;
      case "comments":
        navigate("/admin/comments");
        break;
    }
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      toast.error("검색어를 입력해주세요.");
      return;
    }
    performSearch(searchTerm);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const totalResults = Object.values(results).reduce((sum, arr) => sum + arr.length, 0);

  if (!open) return null;

  return (
    <Modal
      open={open}
      title="전역 검색"
      onClose={onClose}
      footer={
        <Button type="button" onClick={onClose}>
          닫기
        </Button>
      }
    >
      <SearchInputContainer>
        <SearchInputField
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="검색어를 입력하세요 (회원, 여행지, 공지, 일기, 댓글)"
          autoFocus
        />
        <Button type="button" onClick={handleSearch} disabled={loading}>
          {loading ? "검색 중..." : "검색"}
        </Button>
      </SearchInputContainer>

      {!searchTerm.trim() ? (
        <EmptyState>검색어를 입력하고 검색 버튼을 누르거나 Enter를 눌러주세요.</EmptyState>
      ) : loading ? (
        <LoadingState>검색 중...</LoadingState>
      ) : totalResults === 0 ? (
        <EmptyState>검색 결과가 없습니다.</EmptyState>
      ) : (
        <SearchResults>
          {results.members.length > 0 && (
            <ResultSection>
              <SectionTitle>👥 회원 ({results.members.length})</SectionTitle>
              <ResultList>
                {results.members.slice(0, 5).map((item) => (
                  <ResultItem
                    key={item.memberNo}
                    onClick={() => handleItemClick("members", item)}
                  >
                    <ResultTitle>{item.memberName || item.userId || `회원 #${item.memberNo}`}</ResultTitle>
                    <ResultDesc>이메일: {item.email || "-"} | 전화: {item.phone || "-"}</ResultDesc>
                  </ResultItem>
                ))}
              </ResultList>
            </ResultSection>
          )}

          {results.travels.length > 0 && (
            <ResultSection>
              <SectionTitle>🗺️ 여행지 ({results.travels.length})</SectionTitle>
              <ResultList>
                {results.travels.slice(0, 5).map((item) => (
                  <ResultItem
                    key={item.travelNo}
                    onClick={() => handleItemClick("travels", item)}
                  >
                    <ResultTitle>{item.travelName || `여행지 #${item.travelNo}`}</ResultTitle>
                    <ResultDesc>{item.address || "-"}</ResultDesc>
                  </ResultItem>
                ))}
              </ResultList>
            </ResultSection>
          )}

          {results.notices.length > 0 && (
            <ResultSection>
              <SectionTitle>📣 공지 ({results.notices.length})</SectionTitle>
              <ResultList>
                {results.notices.slice(0, 5).map((item) => (
                  <ResultItem
                    key={item.noticeNo}
                    onClick={() => handleItemClick("notices", item)}
                  >
                    <ResultTitle>{item.noticeTitle || `공지 #${item.noticeNo}`}</ResultTitle>
                    <ResultDesc>{item.noticeContent?.substring(0, 50) || "-"}...</ResultDesc>
                  </ResultItem>
                ))}
              </ResultList>
            </ResultSection>
          )}

          {results.diaries.length > 0 && (
            <ResultSection>
              <SectionTitle>📓 일기 ({results.diaries.length})</SectionTitle>
              <ResultList>
                {results.diaries.slice(0, 5).map((item) => (
                  <ResultItem
                    key={item.diaryNo}
                    onClick={() => handleItemClick("diaries", item)}
                  >
                    <ResultTitle>{item.diaryTitle || `일기 #${item.diaryNo}`}</ResultTitle>
                    <ResultDesc>작성자: {item.memberName || "-"} | {item.diaryContent?.substring(0, 50) || "-"}...</ResultDesc>
                  </ResultItem>
                ))}
              </ResultList>
            </ResultSection>
          )}

          {results.comments.length > 0 && (
            <ResultSection>
              <SectionTitle>💬 댓글 ({results.comments.length})</SectionTitle>
              <ResultList>
                {results.comments.slice(0, 5).map((item) => (
                  <ResultItem
                    key={item.commentNo}
                    onClick={() => handleItemClick("comments", item)}
                  >
                    <ResultTitle>댓글 #{item.commentNo}</ResultTitle>
                    <ResultDesc>{item.commentContent?.substring(0, 50) || "-"}...</ResultDesc>
                  </ResultItem>
                ))}
              </ResultList>
            </ResultSection>
          )}
        </SearchResults>
      )}
    </Modal>
  );
};

export default GlobalSearchModal;
