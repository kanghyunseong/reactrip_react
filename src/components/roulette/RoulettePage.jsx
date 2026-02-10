import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "../layout/Header";
import {
  PageContainer,
  Section,
  Content,
  Title,
  Description,
  Card,
  Left,
  Right,
  WheelWrap,
  WheelStage,
  Pointer,
  WheelCanvas,
  Controls,
  Btn,
  PrimaryBtn,
  Meta,
  ResultTitle,
  ResultName,
  ResultSub,
  Mini
} from "./RoulettePage.styles";
import { toast } from "react-toastify";
import { axiosPublic } from "../../api/api";

export default function RoulettePage() {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [travelList, setTravelList] = useState([]);
  const [wheelItems, setWheelItems] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [rotationDeg, setRotationDeg] = useState(0);
  const [selected, setSelected] = useState(null);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const isSuccessResponse = (response) =>
    response?.success === "요청성공" || response?.success === true || String(response?.success || "").includes("성공");

  const pickWheelItems = (list) => {
    const arr = Array.isArray(list) ? [...list] : [];
    // 섹터는 너무 많으면 글자도, 가독성도 망가져서 12개로 제한
    const MAX = 12;
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, Math.min(MAX, arr.length));
  };

  const safeText = (v) => String(v ?? "").trim();

  const getDisplayName = (t) =>
    safeText(t?.travelName) || safeText(t?.name) || safeText(t?.title) || `여행지#${t?.travelNo ?? ""}`;

  const drawWheel = (items) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = 860; // 내부 기준 픽셀(렌더 품질 확보)
    canvas.width = Math.floor(size * dpr);
    canvas.height = Math.floor(size * dpr);
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.clearRect(0, 0, size, size);
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - 16;

    if (!items?.length) {
      ctx.fillStyle = "rgba(15,23,42,0.7)";
      ctx.font = "900 34px system-ui, -apple-system, Segoe UI, Roboto, 'Noto Sans KR', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("여행지가 없습니다", cx, cy);
      return;
    }

    const n = items.length;
    const arc = (Math.PI * 2) / n;
    const colors = [
      "#6366F1",
      "#EC4899",
      "#F59E0B",
      "#10B981",
      "#06B6D4",
      "#A78BFA",
      "#FB7185",
      "#22C55E",
      "#38BDF8",
      "#F97316",
      "#E879F9",
      "#84CC16",
    ];

    for (let i = 0; i < n; i++) {
      const start = -Math.PI / 2 + i * arc; // 포인터(위쪽)를 기준으로 시작
      const end = start + arc;

      // sector
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start, end);
      ctx.closePath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();

      // divider
      ctx.strokeStyle = "rgba(255,255,255,0.55)";
      ctx.lineWidth = 6;
      ctx.stroke();

      // text
      const label = getDisplayName(items[i]);
      const mid = (start + end) / 2;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(mid);
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "rgba(255,255,255,0.95)";
      ctx.font = "900 26px system-ui, -apple-system, Segoe UI, Roboto, 'Noto Sans KR', sans-serif";
      const text = label.length > 10 ? `${label.slice(0, 10)}…` : label;
      ctx.fillText(text, r - 34, 0);
      ctx.restore();
    }

    // center cap
    ctx.beginPath();
    ctx.arc(cx, cy, 86, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fill();
    ctx.lineWidth = 10;
    ctx.strokeStyle = "rgba(15,23,42,0.12)";
    ctx.stroke();

    ctx.fillStyle = "rgba(15,23,42,0.9)";
    ctx.font = "950 30px system-ui, -apple-system, Segoe UI, Roboto, 'Noto Sans KR', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("SPIN", cx, cy);
  };

  const fetchAllTravels = async () => {
    setLoading(true);
    try {
      // AdminTravelController: /api/admin/travel?page=1 형태로 사용 (토큰 없어도 동작하도록 되어 있는 구조)
      // axiosPublic.getList()는 axios response가 아니라 ResponseData를 그대로 반환
      const first = await axiosPublic.getList("/api/admin/travel?page=1");
      if (!isSuccessResponse(first)) {
        throw new Error(first?.message || "여행지 목록을 불러오지 못했습니다.");
      }
      const pageDto = first?.data;
      const pi = pageDto?.pageInfo || {};
      // PageResponseDTO<T> 에서 리스트 필드는 data
      const list1 = Array.isArray(pageDto?.data) ? pageDto.data : [];

      const maxPage = Number(pi?.maxPage || 1);
      // 너무 과도한 요청 방지(룰렛은 샘플링만 필요)
      const HARD_MAX_PAGES = 12;
      const pages = [];
      for (let p = 2; p <= Math.min(maxPage, HARD_MAX_PAGES); p++) pages.push(p);

      const rest = await Promise.all(
        pages.map((page) =>
          axiosPublic
            .getList(`/api/admin/travel?page=${page}`)
            .then((r) => (isSuccessResponse(r) ? r?.data?.data || [] : []))
            .catch(() => [])
        )
      );

      const merged = [...list1, ...rest.flat()].filter(Boolean);
      setTravelList(merged);
      const initialWheel = pickWheelItems(merged);
      setWheelItems(initialWheel);
      setSelected(null);
      setRotationDeg(0);
      if (merged.length === 0) toast.info("등록된 여행지가 없습니다.");
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || "여행지 목록 조회 실패";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTravels();
  }, []);

  useEffect(() => {
    drawWheel(wheelItems);
  }, [wheelItems]);

  const spin = () => {
    if (spinning) return;
    if (!wheelItems.length) {
      toast.info("룰렛에 넣을 여행지가 없습니다. 새로고침을 눌러보세요.");
      return;
    }

    setSpinning(true);
    setSelected(null);

    const n = wheelItems.length;
    const arc = 360 / n;
    const pickIndex = Math.floor(Math.random() * n);
    const targetToTop = 360 - (pickIndex * arc + arc / 2);
    const baseSpins = prefersReducedMotion ? 1 : 6 + Math.floor(Math.random() * 3); // 6~8바퀴
    const next = rotationDeg + baseSpins * 360 + targetToTop;

    setRotationDeg(next);

    const dur = prefersReducedMotion ? 0 : 3200;
    window.setTimeout(() => {
      setSelected(wheelItems[pickIndex]);
      setSpinning(false);
    }, prefersReducedMotion ? 0 : dur + 50);
  };

  const reshuffle = () => {
    if (spinning) return;
    const next = pickWheelItems(travelList);
    setWheelItems(next);
    setSelected(null);
    setRotationDeg(0);
  };

  const openKakaoMap = () => {
    if (!selected) return;
    const q = encodeURIComponent(`${getDisplayName(selected)}`.trim());
    window.open(`https://map.kakao.com/?q=${q}`, "_blank", "noopener,noreferrer");
  };

  const resultName = selected ? getDisplayName(selected) : "—";
  const resultRegion = safeText(selected?.regionName || selected?.region || selected?.regionTitle);
  const resultAddr = safeText(selected?.travelAddress || selected?.address);

  return (
    <PageContainer>
      <Header />
      <Section>
        <Content>
          <Left>
            <Title>룰렛</Title>
            <Description>
              룰렛을 돌려 <b>랜덤 여행지</b>를 추천받으세요.
              <br />
              오늘은 어디로 떠날까요?
            </Description>

            <div style={{ height: "1.25rem" }} />

            <Card>
              <ResultTitle>이번 추천 여행지</ResultTitle>
              <ResultName>{resultName}</ResultName>
              <ResultSub>
                {selected ? (
                  <>
                    {resultRegion ? <div>지역: {resultRegion}</div> : null}
                    {resultAddr ? <div>주소: {resultAddr}</div> : null}
                  </>
                ) : (
                  <div>룰렛을 돌려 결과를 확인하세요.</div>
                )}
              </ResultSub>

              <Mini>
                <Btn onClick={openKakaoMap} disabled={!selected}>
                  지도에서 보기
                </Btn>
              </Mini>

              <Meta>
                {loading
                  ? "여행지 목록 불러오는 중..."
                  : `불러온 여행지: ${travelList.length}개 / 룰렛 섹터: ${wheelItems.length}개`}
              </Meta>
            </Card>
          </Left>

          <Right>
            <WheelWrap>
              <WheelStage>
                <Pointer />
                <WheelCanvas
                  ref={canvasRef}
                  style={{
                    ["--deg"]: `${rotationDeg}deg`,
                    ["--dur"]: prefersReducedMotion ? "0ms" : "3200ms",
                  }}
                />
              </WheelStage>

              <Controls>
                <PrimaryBtn onClick={spin} disabled={loading || spinning || wheelItems.length === 0}>
                  {spinning ? "도는 중..." : "룰렛 돌리기"}
                </PrimaryBtn>
                <Btn onClick={reshuffle} disabled={loading || spinning || travelList.length === 0}>
                  섹터 다시 섞기
                </Btn>
                <Btn onClick={fetchAllTravels} disabled={loading || spinning}>
                  새로고침
                </Btn>
              </Controls>
            </WheelWrap>
          </Right>
        </Content>
      </Section>
    </PageContainer>
  );
}
