import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { axiosAuth } from "../../../../../api/api";

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
  if (status === 500) return msg || "서버 오류가 발생하였습니다. 관리자에게 문의해주세요.";
  return msg || "요청 처리 중 오류가 발생했습니다.";
};

export const useCommentDetail = (commentNo, enabled = true) => {
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!enabled || !commentNo) {
      setDetail(null);
      setError(null);
      return;
    }

    const fetchDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axiosAuth.getList(`/api/admin/community/comments/${commentNo}`);
        
        if (!isSuccessResponse(res)) {
          const errorMsg = res?.message || "댓글 상세 조회에 실패했습니다.";
          setError(errorMsg);
          toast.error(errorMsg);
          return;
        }
        
        setDetail(res?.data || null);
      } catch (err) {
        console.error("댓글 상세 조회 오류:", err);
        const errorMsg = getErrorMessage(err);
        setError(errorMsg);
        toast.error(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [commentNo, enabled]);

  return { loading, detail, error };
};
