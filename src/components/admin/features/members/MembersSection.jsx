import React, { useEffect, useState } from "react";
import DataTable from "../../../common/ui/DataTable";
import Pagination from "../../../common/ui/Pagination";
import ConfirmDialog from "../../../common/ui/ConfirmDialog";
import { Toolbar, ToolbarLeft, ToolbarRight, Input, ToolbarPrimaryButton } from "../../ui/AdminUI.styles";
import { LoadingOverlay, Spinner, LoadingText } from "../../ui/AdminUI.styles";
import { axiosAuth } from "../../../../api/api";
import { toast } from "react-toastify";

const MembersSection = () => {
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [pageInfo, setPageInfo] = useState({ currentPage: 1, maxPage: 1, totalCount: 0 });
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  // 액션용 선택 상태
  const [selected, setSelected] = useState(null);
  const [confirm, setConfirm] = useState({ open: false, type: null, nextRole: null });

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

    const fieldErrors =
      data?.errors ||
      data?.fieldErrors ||
      data?.data?.errors ||
      data?.data?.fieldErrors;

    const normalized =
      Array.isArray(fieldErrors)
        ? fieldErrors
            .map((e) => e?.defaultMessage || e?.message || e?.reason || e?.msg || `${e?.field || e?.name || "필드"} 오류`)
            .filter(Boolean)
        : fieldErrors && typeof fieldErrors === "object"
          ? Object.entries(fieldErrors).map(([k, v]) => `${k}: ${v}`)
          : [];

    if (status === 401) return "로그인이 필요합니다. 다시 로그인해주세요.";
    if (status === 403) return "권한이 없습니다. 관리자 계정으로 로그인해주세요.";
    if (status === 400 && normalized.length) return `입력값 오류: ${normalized[0]}`;
    if (status === 400) return msg || "입력값을 확인해주세요.";
    return msg || "요청 처리 중 오류가 발생했습니다.";
  };

  const isSuccessResponse = (res) => {
    const s = res?.success;
    if (s === true) return true;
    if (typeof s === "string") return s.includes("성공");
    return false;
  };

  const roleLabel = (role) => {
    if (!role) return "-";
    const normalized = String(role).toUpperCase();
    if (normalized.includes("ADMIN")) return "관리자";
    if (normalized.includes("USER")) return "사용자";
    return role;
  };

  const maskPhone = (phone) => {
    if (!phone) return "-";
    const digits = String(phone).replace(/\D/g, "");
    if (digits.length === 11) return digits.replace(/(\d{3})\d{4}(\d{4})/, "$1-****-$2");
    if (digits.length === 10) return digits.replace(/(\d{3})\d{3}(\d{4})/, "$1-***-$2");
    return phone;
  };

  const maskEmail = (email) => {
    if (!email) return "-";
    const [id, domain] = String(email).split("@");
    if (!domain) return email;
    if ((id || "").length <= 2) return `${(id || "").slice(0, 1)}****@${domain}`;
    return `${id.slice(0, 2)}****@${domain}`;
  };

  const maskBirthday = (birthday) => {
    if (!birthday) return "-";
    const s = String(birthday);
    return s.length >= 4 ? `${s.slice(0, 4)}-**-**` : "****-**-**";
  };

  const maskName = (memberName) => {
    if(!memberName) return "-";
    const s = String(memberName);
    return s.length >= 2 ? `${s.slice(0, 1)}****` : "****";
  };


  // TODO: 실제 회원 목록 API에 맞게 엔드포인트/응답 매핑을 조정하세요.
  // options.showToast=true 일 때만 검색 성공/실패/결과없음 토스트 표시(중복 토스트 방지)
  const fetchMembers = async (page = 1, searchTerm = searchKeyword, options = {}) => {
    try {
      // const accessToken = localStorage.getItem("accessToken");
      // if (!accessToken) {
      //   toast.error("로그인이 필요합니다. 로그인 후 다시 시도해주세요.");
      //   window.location.href = "/login";
      //   return;
      // }

      setLoading(true);

      const term = String(searchTerm || "").trim();
      const isSearching = term.length > 0;
      const showToast = !!options.showToast;

      const url = isSearching
        ? `/api/admin/members/search?keyword=${encodeURIComponent(term)}&page=${page}`
        : `/api/admin/members?page=${page}`;

      const res = await axiosAuth.getList(url);
      if(isSuccessResponse(res)) {
        const list = res?.data.data || [];
        const pi = res?.data?.pageInfo || {};
        setRows(Array.isArray(list) ? list : []);
        setPageInfo({
          currentPage: pi?.currentPage || page,
          maxPage: pi?.maxPage || 1,
          totalCount: pi?.listCount || pi?.totalCount || 0,
        });
        if (showToast && page === 1) {
          if (isSearching) {
            if (!list?.length) toast.info(`'${term}' 검색 결과가 없습니다.`);
            else toast.success(`'${term}' 검색 성공`);
          } else {
            toast.info("전체 목록을 불러왔습니다.");
          }
        }
      } else {
        if (showToast) {
          toast.error(res?.message || (isSearching ? "검색에 실패했습니다." : "회원 목록 조회에 실패했습니다."));
        } else {
          toast.error(res?.message || "회원 목록 조회에 실패했습니다.");
        }
      }
    } catch (e) {
      console.error(e);
      if (options.showToast && e?.response?.status === 404) {
        toast.error("검색 API를 찾을 수 없습니다. 백엔드 서버를 재시작하거나 경로를 확인해주세요.");
      } else {
        toast.error(getErrorMessage(e));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers(1, "");
  }, []);

  const onSearch = () => {
    const term = String(keyword || "").trim();
    if (!term || term.includes(" ")) {
      toast.error("검색어를 입력해주세요. 공백은 허용하지 않습니다.");
      return;
    }
    setSearchKeyword(term);
    fetchMembers(1, term, { showToast: true });
  };

  const onReset = () => setKeyword("");
  const onPageChange = (p) => fetchMembers(p);

  const onDelete = async (row) => {
    try {
      const rest = await axiosAuth.delete(`/api/admin/members/${row.memberNo}`);
      if (isSuccessResponse(rest) || rest == null) {
        toast.success(rest?.message || "회원 삭제에 성공했습니다.");
        fetchMembers(pageInfo.currentPage);
      } else {
        toast.error(rest?.message || "회원 삭제에 실패했습니다.");
      }
    } catch (e) {
      console.error(e);
      toast.error(getErrorMessage(e));
    }
  };
  const onUpdateRole = async (row, role) => {
    try {
      const rest = await axiosAuth.putJson(
        `/api/admin/members/update-role/${row.memberNo}?memberRole=${encodeURIComponent(role)}`,
        {}
      );
      if (isSuccessResponse(rest) || rest == null) {
        toast.success(rest?.message || "권한 변경에 성공했습니다.");
        fetchMembers(pageInfo.currentPage);
      } else {
        toast.error(rest?.message || "권한 변경에 실패했습니다.");
      }
    } catch (e) {
      console.error(e);
      toast.error(getErrorMessage(e));
    }
  };

  const columns = [
    { key: "memberNo", label: "회원번호", thStyle: { width: 90 } },
    { key: "memberName", label: "이름", thStyle: { width: 120 }, render: (r) => maskName(r?.memberName) },
    { key: "email", label: "이메일", thStyle: { width: 220 }, render: (r) => maskEmail(r?.email) },
    { key: "phone", label: "전화번호", thStyle: { width: 160 }, render: (r) => maskPhone(r?.phone) },
    { key: "birthday", label: "생년월일", thStyle: { width: 140 }, render: (r) => maskBirthday(r?.birthday) },
    {
      key: "memberRole",
      label: "권한",
      thStyle: { width: 140 },
      render: (r, { Badge }) => {
        const label = roleLabel(r?.memberRole);
        const normalized = String(r?.memberRole || "").toUpperCase();
        const variant = normalized.includes("ADMIN") ? "warn" : normalized.includes("USER") ? "info" : undefined;
        return <Badge $variant={variant}>{label}</Badge>;
      },
    },
    { key: "enrollDate", label: "가입일", thStyle: { width: 140 } },
  ];

  const actions = [
    {
      key: "role-user",
      label: "USER",
      variant: "primary",
      onClick: (row) => {
        setSelected(row);
        setConfirm({ open: true, type: "role", nextRole: "ROLE_USER" });
      },
    },
    {
      key: "role-admin",
      label: "ADMIN",
      variant: "primary",
      onClick: (row) => {
        setSelected(row);
        setConfirm({ open: true, type: "role", nextRole: "ROLE_ADMIN" });
      },
    },
    {
      key: "delete",
      label: "삭제",
      variant: "danger",
      onClick: (row) => {
        setSelected(row);
        setConfirm({ open: true, type: "delete", nextRole: null });
      },
    },
  ];

  const currentPage = pageInfo?.currentPage ?? 1;
  const maxPage = pageInfo?.maxPage ?? 1;

  return (
    <>
      {loading && (
        <LoadingOverlay>
          <Spinner $size="3rem" />
          <LoadingText>회원 목록 불러오는 중...</LoadingText>
        </LoadingOverlay>
      )}

      <Toolbar>
        <ToolbarLeft>
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !loading && onSearch()}
            placeholder="이름/이메일/전화번호로 검색"
            disabled={loading}
          />
          <ToolbarPrimaryButton type="button" onClick={onSearch} disabled={loading}>
            검색
          </ToolbarPrimaryButton>
          <ToolbarPrimaryButton
            type="button"
            onClick={() => {
              setKeyword("");
              setSearchKeyword("");
              fetchMembers(1, "");
            }}
            disabled={loading}
          >
            초기화
          </ToolbarPrimaryButton>
        </ToolbarLeft>
        <ToolbarRight>
          <ToolbarPrimaryButton type="button" disabled={loading} onClick={() => {}}>
            (예정) PDF 저장 예정
          </ToolbarPrimaryButton>
        </ToolbarRight>
      </Toolbar>

      <DataTable
        columns={columns}
        rows={loading ? [] : rows}
        rowKey={(r) => r.memberNo}
        actions={actions}
        emptyTitle="회원 데이터가 없습니다"
        emptyDesc="검색 조건을 바꾸거나, 데이터를 불러오면 여기서 바로 관리할 수 있어요."
      />

      <Pagination page={currentPage} maxPage={maxPage} onChange={onPageChange} />

      <ConfirmDialog
        open={confirm.open}
        title={confirm.type === "delete" ? "회원 삭제" : "권한 변경"}
        danger={confirm.type === "delete"}
        description={
          confirm.type === "delete"
            ? `'${selected?.memberName ?? ""}' 회원을 삭제하시겠습니까?`
            : `'${selected?.memberName ?? ""}' 회원의 권한을 '${confirm.nextRole}'로 변경하시겠습니까?`
        }
        onClose={() => setConfirm({ open: false, type: null, nextRole: null })}
        onConfirm={async () => {
          try {
            if (!selected) return;
            if (confirm.type === "delete") {
              await onDelete(selected);
            } else if (confirm.type === "role") {
              await onUpdateRole(selected, confirm.nextRole);
            }
          } finally {
            setConfirm({ open: false, type: null, nextRole: null });
          }
        }}
      />
    </>
  );
};

export default MembersSection;
