import React, { useState, useEffect } from "react";
import DataTable from "../../../common/ui/DataTable";
import Pagination from "../../../common/ui/Pagination";
import TravelToolbar from "./TravelToolbar";
import TravelFormModal from "./TravelFormModal";
import ConfirmDialog from "../../../common/ui/ConfirmDialog";
import { LoadingOverlay, Spinner, LoadingText } from "../../ui/AdminUI.styles";
import { axiosAuth } from "../../../../api/api";
import { toast } from "react-toastify";

const TravelSection = () => {
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [pageInfo, setPageInfo] = useState({ currentPage: 1, maxPage: 1, totalCount: 0 });
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("create");
  const [selected, setSelected] = useState(null);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const isSuccessResponse = (res) => {
    const s = res?.success;
    if (s === true) return true;
    if (typeof s === "string") return s.includes("성공");
    return false;
  };

  const fetchTravels = async (page = 1, searchTerm = searchKeyword) => {
    try {
      setLoading(true);
      const url = searchTerm.trim() 
        ? `/api/admin/travel/search?keyword=${encodeURIComponent(searchTerm)}&page=${page}`
        : `/api/admin/travel?page=${page}`;
      
      const response = await axiosAuth.getList(url);

      
      if (isSuccessResponse(response)) {
        setRows(response.data.data || []);
        setPageInfo({
          currentPage: response.data.pageInfo?.currentPage || page,
          maxPage: response.data.pageInfo?.maxPage || 1,
          totalCount: response.data.pageInfo?.listCount || 0,
        });
      } else {
        toast.error(response?.message || "조회에 실패했습니다.");
      } 
    } catch (error) {
      console.error("조회 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTravels(1, ""); }, []);

  const onSyncApi = async () => {
    if (!confirm("API 동기화를 실행하시겠습니까? (데이터 양에 따라 수 분이 소요될 수 있습니다)")) return;
    try {
      setSyncing(true);
      const res = await axiosAuth.createJson("/api/admin/travel/api-sync", {});
      if (isSuccessResponse(res)) {
        toast.success(res.message || "데이터 동기화가 성공적으로 완료되었습니다.");
        fetchTravels(1, "");
      } else {
        toast.error(res.message || "동기화에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (e) { 
      console.error("동기화 오류:", e);
      toast.error("동기화 중 서버 오류가 발생했습니다.");
    } 
    finally { setSyncing(false); }
  };

  const getErrorMessage = (err) => {
    // axios error 형태 방어적으로 파싱
    const status = err?.response?.status;
    const data = err?.response?.data;

    // Spring/일반 에러 메시지
    const msg =
      data?.message ||
      data?.msg ||
      data?.error ||
      data?.detail ||
      (typeof data === "string" ? data : null) ||
      err?.message;

    // validation errors (다양한 케이스)
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
    if (status === 400) return msg || "입력값을 확인해주세요. (필수 항목 누락)";
    return msg || "요청 처리 중 오류가 발생했습니다.";
  };

  const onEdit = async (form, file) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      // if (!accessToken) {
      //   toast.error("로그인이 필요합니다. 로그인 후 다시 시도해주세요.");
      //   window.location.href = "/login";
      //   return;
      // }

      const payload = { ...form };
      if (formMode === "edit" && !file) delete payload.travelImage;
      
      const res = formMode === "edit" 
        ? await axiosAuth.put(`/api/admin/travel/${form.travelNo}`, payload, file)
        : await axiosAuth.create(`/api/admin/travel`, form, file);

      if (isSuccessResponse(res)) {
        toast.success(res.message || "저장되었습니다.");
        setIsFormOpen(false);
        fetchTravels(pageInfo.currentPage);
      } else {
        toast.error(res?.message || "저장에 실패했습니다.");
      }
    } catch (e) { 
      console.error(e); 
      toast.error(getErrorMessage(e));
    }
  };

  const columns = [
    { key: "travelNo", label: "번호", thStyle: { width: 90 } },
    { key: "travelName", label: "여행지명", thStyle: { width: 220 } },
    { key: "regionName", label: "지역", render: (r) => r?.regionName || r?.regionNo || "-" },
    {
      key: "travelStatus",
      label: "상태",
      thStyle: { width: 110 },
      render: (r, { Badge }) =>
        r?.travelStatus === "Y" ? <Badge $variant="danger">비활성</Badge> : <Badge $variant="success">활성</Badge>,
    },
    { key: "travelAddress", label: "주소", thStyle: { width: 360 } },
  ];

  return (
    <>
      {syncing && (
        <LoadingOverlay><Spinner $size="3rem" /><LoadingText>데이터 동기화 중...</LoadingText></LoadingOverlay>
      )}
      
      <TravelToolbar 
        keyword={keyword} setKeyword={setKeyword}
        onSearch={() => { if(!keyword.trim() || keyword.includes(" ")) { toast.error("검색어를 입력해주세요. 공백은 허용하지 않습니다."); return; } setSearchKeyword(keyword); fetchTravels(1, keyword); }}
        onReset={() => { setKeyword(""); setSearchKeyword(""); fetchTravels(1, ""); }}
        onSyncApi={onSyncApi} syncing={syncing}
        onAdd={() => { setSelected(null); setFormMode("create"); setIsFormOpen(true); }}
        loading={loading}
      />

      <DataTable
        columns={columns} rows={loading ? [] : rows} rowKey={(r) => r.travelNo}
        actions={[
          { key: "edit", label: "수정", variant: "primary", onClick: (row) => { setSelected(row); setFormMode("edit"); setIsFormOpen(true); }},
          { key: "status", label: "상태변경", variant: "primary", onClick: (row) => { setSelected(row); setIsStatusOpen(true); }}
        ]}
      />

      <Pagination page={pageInfo.currentPage} maxPage={pageInfo.maxPage} onChange={(p) => fetchTravels(p)} />

      <TravelFormModal 
        open={isFormOpen} mode={formMode} initialValue={selected} 
        onClose={() => setIsFormOpen(false)} onSubmit={onEdit} 
      />

      <ConfirmDialog 
        open={isStatusOpen} title="상태 변경" 
        description={`'${selected?.travelName}'의 상태를 변경하시겠습니까?`}
        onClose={() => setIsStatusOpen(false)} 
        onConfirm={async () => {
          try {
            const res = await axiosAuth.delete(`/api/admin/travel/${selected.travelNo}?status=${selected.travelStatus === "Y" ? "N" : "Y"}`);
            if (isSuccessResponse(res)) { 
              toast.success(res.message || "상태가 변경되었습니다.");
              setIsStatusOpen(false); 
              fetchTravels(pageInfo.currentPage); 
            } else {
              toast.error(res.message || "상태 변경에 실패했습니다.");
            }
          } catch (e) {
            console.error(e);
            toast.error("상태 변경 중 오류가 발생했습니다.");
          }
        }} 
      />
    </>
  );
};

export default TravelSection;
