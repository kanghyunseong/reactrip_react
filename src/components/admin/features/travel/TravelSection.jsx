import React, { useState, useEffect } from "react";
import AdminTable from "../../ui/AdminTable";
import Pagination from "../../ui/Pagination";
import TravelToolbar from "./TravelToolbar";
import TravelFormModal from "../../ui/forms/TravelFormModal";
import ConfirmDialog from "../../ui/ConfirmDialog";
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

  const fetchTravels = async (page = 1, searchTerm = searchKeyword) => {
    try {
      setLoading(true);
      const url = searchTerm.trim() 
        ? `/api/admin/travel/search?keyword=${encodeURIComponent(searchTerm)}&page=${page}`
        : `/api/admin/travel?page=${page}`;
      
      const response = await axiosAuth.getList(url);
      if (response.success) {
        setRows(response.data.data || []);
        setPageInfo({
          currentPage: response.data.pageInfo?.currentPage || page,
          maxPage: response.data.pageInfo?.maxPage || 1,
          totalCount: response.data.pageInfo?.listCount || 0,
        });
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
      if (res.success) {
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

  const onEdit = async (form, file) => {
    try {
      const payload = { ...form };
      if (formMode === "edit" && !file) delete payload.travelImage;
      
      const res = formMode === "edit" 
        ? await axiosAuth.put(`/api/admin/travel/${form.travelNo}`, payload, file)
        : await axiosAuth.create(`/api/admin/travel/insert`, form, file);

      if (res.success) {
        toast.success(res.message || "저장되었습니다.");
        setIsFormOpen(false);
        fetchTravels(pageInfo.currentPage);
      } else {
        toast.error(res.message || "저장에 실패했습니다.");
      }
    } catch (e) { 
      console.error(e); 
      toast.error("처리 중 오류가 발생했습니다.");
    }
  };

  const columns = [
    { key: "travelNo", label: "번호", thStyle: { width: 90 } },
    { key: "travelName", label: "여행지명", thStyle: { width: 220 } },
    { key: "regionName", label: "지역", render: (r) => r?.regionName || r?.regionNo || "-" },
    { key: "travelStatus", label: "상태", render: (r) => r?.travelStatus === "Y" ? "비활성" : "활성" },
    { key: "travelAddress", label: "주소", thStyle: { width: 360 } },
  ];

  return (
    <>
      {syncing && (
        <LoadingOverlay><Spinner /><LoadingText>데이터 동기화 중...</LoadingText></LoadingOverlay>
      )}
      
      <TravelToolbar 
        keyword={keyword} setKeyword={setKeyword}
        onSearch={() => { setSearchKeyword(keyword); fetchTravels(1, keyword); }}
        onReset={() => { setKeyword(""); setSearchKeyword(""); fetchTravels(1, ""); }}
        onSyncApi={onSyncApi} syncing={syncing}
        onAddTravel={() => { setSelected(null); setFormMode("create"); setIsFormOpen(true); }}
        loading={loading}
        searchKeyword={searchKeyword}
        totalCount={pageInfo.totalCount}
      />

      <AdminTable
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
            if (res.success) { 
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
