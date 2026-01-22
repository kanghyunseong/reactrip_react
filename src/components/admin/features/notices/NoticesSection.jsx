import React, { useEffect, useState } from "react";
import DataTable from "../../../common/ui/DataTable";
import Pagination from "../../../common/ui/Pagination";
import {
  Toolbar,
  ToolbarLeft,
  ToolbarRight,
  Input,
  ToolbarPrimaryButton,
} from "../../ui/AdminUI.styles";
import { toast } from "react-toastify";
import { axiosAuth } from "../../../../api/api";
import NoticeFormModal from "./NoticeFormModal";

const NoticesSection = () => {
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    maxPage: 1,
    totalCount: 0,
  });
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const isSuccessResponse = (res) => {
    const s = res?.success;
    if (s === true) return true;
    return String(s || "").includes("성공");
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
    return msg || "요청 처리 중 오류가 발생했습니다.";
  };

  const fetchNotices = async (page = 1, searchTerm = searchKeyword, options = {}) => {
    const { showToast = false, isSearching = false } = options;
    try {
      setLoading(true);

      const term = String(searchTerm || "").trim();
      const searching = term.length > 0;
      const url = searching
        ? `/api/admin/notices/search?keyword=${encodeURIComponent(term)}&page=${page}`
        : `/api/admin/notices?page=${page}`;

      const res = await axiosAuth.getList(url);

      if (!isSuccessResponse(res)) {
        if (showToast) toast.error(res?.message || "공지 목록 조회에 실패했습니다.");
        return;
      }

      const list = res?.data?.data || [];
      const pi = res?.data?.pageInfo || {};

      setRows(Array.isArray(list) ? list : []);
      setPageInfo({
        currentPage: pi?.currentPage || page,
        maxPage: pi?.maxPage || 1,
        totalCount: pi?.listCount || pi?.totalCount || 0,
      });

      if (showToast && page === 1 && isSearching) {
        if (!list?.length) toast.info(`'${term}' 검색 결과가 없습니다.`);
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
    fetchNotices(1, "", { showToast: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearch = (e) => {
    e?.preventDefault?.();
    const term = String(keyword || "").trim();
    if (!term || term.includes(" ")) {
      toast.error("검색어를 입력해주세요. 공백은 허용하지 않습니다.");
      return;
    }
    setSearchKeyword(term);
    fetchNotices(1, term, { showToast: true, isSearching: true });
  };

  const onReset = () => {
    setKeyword("");
    setSearchKeyword("");
    fetchNotices(1, "", { showToast: false });
  };

  const onPageChange = (p) => fetchNotices(p);

  const onDelete = async (row) => {
    try {
      const response = await axiosAuth.delete("/api/admin/notices", row.noticeNo);
      if (isSuccessResponse(response) || response === undefined) {
        toast.success(response?.message || "공지 삭제에 성공했습니다.");
        fetchNotices(pageInfo.currentPage);
      } else {
        toast.error(response?.message || "공지 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      toast.error(getErrorMessage(error));
    }
  };

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("create");
  const [selected, setSelected] = useState(null);

  const columns = [
    { key: "noticeNo", label: "번호", thStyle: { width: 90 } },
    { key: "noticeTitle", label: "제목", thStyle: { width: 360 } },
    {
      key: "noticeStatus",
      label: "상태",
      thStyle: { width: 110 },
      render: (r, { Badge }) =>
        String(r?.noticeStatus || "").toUpperCase() === "Y" ? (
          <Badge $variant="danger">비활성</Badge>
        ) : (
          <Badge $variant="success">활성</Badge>
        ),
    },
    { key: "count", label: "조회수", thStyle: { width: 90 } },
    { key: "createdDate", label: "작성일", thStyle: { width: 140 } },
  ];

  const actions = [
    {
      key: "edit",
      label: "수정",
      variant: "primary",
      onClick: (row) => {
        setSelected(row);
        setFormMode("edit");
        setIsFormOpen(true);
      },
    },
    {
      key: "delete",
      label: "삭제",
      variant: "danger",
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
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="제목/내용 검색"
          />
          <ToolbarPrimaryButton type="button" onClick={onSearch}>
            검색
          </ToolbarPrimaryButton>
          <ToolbarPrimaryButton type="button" onClick={onReset}>
            초기화
          </ToolbarPrimaryButton>
        </ToolbarLeft>
        <ToolbarRight>
          <ToolbarPrimaryButton
            type="button"
            onClick={() => {
              setSelected(null);
              setFormMode("create");
              setIsFormOpen(true);
            }}
            disabled={loading}
          >
            공지 등록
          </ToolbarPrimaryButton>
        </ToolbarRight>
      </Toolbar>

      <DataTable
        columns={columns}
        rows={loading ? [] : rows}
        rowKey={(r) => r.noticeNo}
        actions={actions}
        emptyTitle="공지 데이터가 없습니다"
        emptyDesc="'공지 등록'을 눌러 새 공지를 작성하세요."
      />

      <Pagination page={currentPage} maxPage={maxPage} onChange={onPageChange} />

      <NoticeFormModal
        open={isFormOpen}
        mode={formMode}
        initialValue={selected}
        onClose={() => setIsFormOpen(false)}
        onSubmit={async (form, file) => {
          try {
            const title = String(form?.noticeTitle || "").trim();
            const content = String(form?.noticeContent || "").trim();
            if (!title) {
              toast.error("공지 제목을 입력해주세요.");
              return;
            }
            if (!content) {
              toast.error("공지 내용을 입력해주세요.");
              return;
            }

            // 백엔드에서 MEMBER_NO가 NOT NULL이라, 등록/수정 시 memberNo가 없으면 로컬스토리지에서 채운다.
            const storedUserNo = localStorage.getItem("userNo");
            // const memberNo = form?.memberNo ?? (storedUserNo ? Number(storedUserNo) : null);
            const memberNo = 1;
            if (!memberNo || Number.isNaN(memberNo)) {
              toast.error("로그인 정보(memberNo)를 확인할 수 없습니다. 다시 로그인해주세요.");
              return;
            }
            const payload = { ...form, memberNo };

            let res;
            if (formMode === "edit") {
              const noticeNo = form?.noticeNo || selected?.noticeNo;
              if (!noticeNo) {
                toast.error("수정할 공지 번호가 없습니다.");
                return;
              }
              res = await axiosAuth.put(`/api/admin/notices/update/${noticeNo}`, payload, file);
              if (isSuccessResponse(res)) toast.success(res?.message || "공지 수정에 성공했습니다.");
              else toast.error(res?.message || "공지 수정에 실패했습니다.");
            } else {
              // create
              res = await axiosAuth.create("/api/admin/notices/insert", payload, file);
              if (isSuccessResponse(res)) toast.success(res?.message || "공지 등록에 성공했습니다.");
              else toast.error(res?.message || "공지 등록에 실패했습니다.");
            }

            if (isSuccessResponse(res)) {
              setIsFormOpen(false);
              setSelected(null);
              setFormMode("create");
              fetchNotices(pageInfo.currentPage);
            }
          } catch (error) {
            console.error(error);
            toast.error(getErrorMessage(error));
          }
        }}
      />
    </>
  );
};

export default NoticesSection;
