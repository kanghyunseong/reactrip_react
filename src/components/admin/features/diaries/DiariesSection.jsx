import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import DataTable from "../../../common/ui/DataTable";
import Pagination from "../../../common/ui/Pagination";
import { Toolbar, ToolbarLeft, ToolbarRight, Input, ToolbarPrimaryButton } from "../../ui/AdminUI.styles";
import { axiosAuth } from "../../../../api/api";
import DiaryDetailModal from "./DiaryDetailModal";

const DiariesSection = () => {
  const [pageInfo, setPageInfo] = useState({ currentPage: 1, maxPage: 1, totalCount : 0});
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [keyword, setKeyword] = useState("");
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedDiaryNo, setSelectedDiaryNo] = useState(null);

  const isSuccessResponse = (res) => {
    const success = res?.success;
    if (success === true) return true;
    if (typeof success === "string") return success.includes("성공");
    return false;
  };

  const getErrorMessage = (err) => {
    const status = err?.response?.status;
    const data = err?.response?.data;
    const msg =
      data?.message ||
      data?.msg ||
      data?.error ||
      data?.detail ||
      (typeof data === "string" ? data : null) ||
      err?.message;

    if (status === 401) return "로그인이 필요합니다. 다시 로그인해주세요.";
    if (status === 403) return "권한이 없습니다. 관리자 계정으로 로그인해주세요.";
    if (status === 404) return msg || "요청한 API를 찾을 수 없습니다.";
    if(status === 500) return msg || "서버 오류가 발생하였습니다. 관리자에게 문의해주세요.";
    return msg || "요청 처리 중 오류가 발생했습니다.";
  }

  const fetchDiaries = async (page = 1, searchTerm = searchKeyword,
    options = {}) => {
      const {showToast = false, isSearching = false} = options;
      try{
        setLoading(true);
        const term = String(searchTerm || "").trim();
        const searching = term.length > 0;
        const url = searching
        ? `/api/admin/community/diaries/search?keyword=${encodeURIComponent(term)}&page=${page}`
        : `/api/admin/community/diaries?page=${page}`;

        const res = await axiosAuth.getList(url);

        if(!isSuccessResponse(res))  {
          if(showToast) toast.error(res?.message || "일기 목록 조회에 실패하였습니다.");
          return;
        }

        const list = res?.data?.data || [];
        const pi = res?.data?.pageInfo || {};

        setRows(Array.isArray(list) ? list : []);
        setPageInfo({
          currentPage: pi?.currentPage || page,
          maxPage: pi?.maxPage || 1,
          totalCount: pi?.listCount || pi?.totalCount || 0
        });

        if(showToast && page === 1  && isSearching) {
          if(!list?.length) toast.info(`'${term}' 검색 결과가 없습니다.`);
          else toast.success(`'${term}' 검색 성공`);
        }
      } catch (error) {
        console.error(error);
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiaries(1, "", { showToast: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearch = () => {
    const term = String(searchKeyword || "").trim();
    if(!term || term.includes(" ")) {
      toast.error("검색어를 입력해주세요. 공백은 허용하지 않습니다.");
      return;
    } else {
      setSearchKeyword(term);
      fetchDiaries(1, term, { showToast: true, isSearching: true });
    }
  };
  const onReset = () => {
    setKeyword("");
    setSearchKeyword("");
    fetchDiaries(1, "", { showToast: false });
  };
  const onPageChange = (page) => fetchDiaries(page, searchKeyword);
  const onView = (row) => {
    setSelectedDiaryNo(row.diaryNo);
    setIsDetailOpen(true);
  };
  
  const onDelete = async (row) => {
    const isDeleted = row.diaryStatus === 'Y';
    const newStatus = isDeleted ? 'N' : 'Y';
    const action = isDeleted ? '복구' : '삭제';
    
    if(!confirm(`정말 ${action}하시겠습니까?`)) return;
    
    try {
      const response = await axiosAuth.deleteWithBody(
        `/api/admin/community/diaries/${row.diaryNo}`,
        { 
          diaryNo: row.diaryNo,
          diaryStatus: newStatus
        }
      );

      if (!response || response === "" || isSuccessResponse(response)) {
        toast.success(`일기 ${action}에 성공했습니다.`);
        fetchDiaries(pageInfo.currentPage, searchKeyword);
      } else {
        const message = response?.message || response?.data?.message;
        if (message && message.includes("성공")) {
          toast.success(message);
          fetchDiaries(pageInfo.currentPage, searchKeyword);
        } else {
          toast.error(message || `일기 ${action}에 실패했습니다.`);
        }
      }
    } catch (error) {
      console.error(`${action} 오류:`, error);
      if (error?.response?.status === 204) {
        toast.success(`일기 ${action}에 성공했습니다.`);
        fetchDiaries(pageInfo.currentPage, searchKeyword);
      } else {
        const errorMessage = error?.response?.data?.message;
        if (errorMessage && errorMessage.includes("성공")) {
          toast.success(errorMessage);
          fetchDiaries(pageInfo.currentPage, searchKeyword);
        } else {
          toast.error(getErrorMessage(error));
        }
      }
    }
  };

  const detailDiaries = async (diaryNo) => {
    try {
      const res = await axiosAuth.getActual(`/api/admin/community/diaries/${diaryNo}`);
      if(!isSuccessResponse(res)) {
        toast.error(res?.message || "일기 상세 조회에 실패했습니다.");
        return;
      }
      return res?.data?.data;
    } catch (error) {
      console.error(error);
      toast.error(getErrorMessage(error));
    }
  }

  const columns = [
    { key: "diaryNo", label: "번호", thStyle: { width: 90, textAlign: "center" } },
    { key: "diaryTitle", label: "일기 제목", thStyle: { width: 300 } },
    { key: "memberName", label: "작성자", thStyle: { width: 120 } },
    {
      key: "diaryStatus",
      label: "상태",
      thStyle: { width: 110 },
      render: (r, { Badge }) =>
        r?.diaryStatus === "N" ? (
          <Badge $variant="success">활성</Badge>
        ) : (
          <Badge $variant="danger">삭제됨</Badge>
        ),
    },
    { key: "count", label: "조회수", thStyle: { width: 90 } },
    { key: "createdDate", label: "작성일", thStyle: { width: 140 } },
  ];

  const actions = [
    {
      key: "view",
      label: "상세",
      variant: "primary",
      onClick: (row) => onView(row),
    },
    {
      key: "delete",
      label: (row) => row?.diaryStatus === "N" ? "삭제" : "복구",
      variant: (row) => row?.diaryStatus === "N" ? "danger" : "primary",
      onClick: (row) => onDelete(row),
    },
  ];

  const currentPage = pageInfo?.currentPage ?? 1;
  const maxPage = pageInfo?.maxPage ?? 1;

  return (
    <>
      <Toolbar>
        <ToolbarLeft>
          <Input
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !loading && onSearch()}
            placeholder="일기 제목/작성자 검색"
            disabled={loading}
          />
          <ToolbarPrimaryButton type="button" onClick={onSearch} disabled={loading}>
            {loading ? "검색 중..." : "검색"}
          </ToolbarPrimaryButton>
          <ToolbarPrimaryButton type="button" onClick={onReset} disabled={loading}>
            초기화
          </ToolbarPrimaryButton>
        </ToolbarLeft>
      </Toolbar>

      <DataTable
        columns={columns}
        rows={loading ? [] : rows}
        rowKey={(r) => r.diaryNo}
        actions={actions}
        emptyTitle={loading ? "데이터를 불러오는 중..." : "일기 데이터가 없습니다"}
        emptyDesc={loading ? "" : "사용자들이 일기를 작성하면 여기서 관리할 수 있어요."}
      />

      <Pagination page={currentPage} maxPage={maxPage} onChange={onPageChange} />

      <DiaryDetailModal
        open={isDetailOpen}
        diaryNo={selectedDiaryNo}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedDiaryNo(null);
        }}
      />
    </>
  );
};

export default DiariesSection;
