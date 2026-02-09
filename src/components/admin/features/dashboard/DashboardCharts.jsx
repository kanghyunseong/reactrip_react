import React, { useEffect, useMemo, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import {
  BottomGrid,
  ChartBody,
  ChartBodySmall,
  ChartCard,
  ChartSub,
  ChartTitle,
  TopGrid,
} from "./DashboardCharts.styles";
import { axiosAuth } from "../../../../api/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Filler,
);

const isSuccessResponse = (res) => {
  const s = res?.success;
  if (s === true) return true;
  return String(s || "").includes("성공");
};

const toIsoDay = (d) => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const parseLooseDate = (value) => {
  if (!value) return null;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  const dataString = String(value).trim();
  if (!dataString) return null;
  const normalized = dataString.includes("T") ? dataString : dataString.replace(" ", "T");
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? null : date;
};

const buildLastNDays = (n) => {
  const today = new Date();
  const days = [];
  for (let i = n - 1; i >= 0; i -= 1) {
    const date = new Date(today);
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - i);
    days.push(date);
  }
  return days;
};

const countByDay = (items, dateField, dayKeysSet) => {
  const dayCounts = {};
  for (const item of items || []) {
    const date = parseLooseDate(item?.[dateField]);
    if (!date) continue;
    const key = toIsoDay(date);
    if (!dayKeysSet.has(key)) continue;
    dayCounts[key] = (dayCounts[key] || 0) + 1;
  }
  return dayCounts;
};

const formatNumber = (v) => {
  const n = Number(v);
  if (Number.isNaN(n)) return String(v ?? "");
  return n.toLocaleString();
};

const getTooltipValue = (ctx) => {
  const indexAxis = ctx?.chart?.options?.indexAxis || "x";
  const parsed = ctx?.parsed;
  if (parsed == null) return 0;
  if (typeof parsed === "number") return parsed;
  // bar(horizontal): parsed.x = value, parsed.y = category index
  // bar(vertical)/line: parsed.y = value
  return indexAxis === "y" ? parsed.x ?? 0 : parsed.y ?? 0;
};

const basePlugins = {
  tooltip: {
    mode: "index",
    intersect: false,
    backgroundColor: "rgba(15, 23, 42, 0.92)",
    titleColor: "#fff",
    bodyColor: "#fff",
    padding: 10,
    cornerRadius: 10,
    displayColors: true,
    callbacks: {
      label: (ctx) => {
        const label = ctx?.dataset?.label ? `${ctx.dataset.label}: ` : "";
        return `${label}${formatNumber(getTooltipValue(ctx))}`;
      },
    },
  },
};

const baseScales = {
  gridColor: "rgba(15, 23, 42, 0.06)",
  tickColor: "rgba(15, 23, 42, 0.55)",
};

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    ...basePlugins,
    legend: {
      position: "bottom",
      labels: {
        color: "rgba(15, 23, 42, 0.62)",
        boxWidth: 10,
        boxHeight: 10,
        usePointStyle: true,
        pointStyle: "circle",
        font: { weight: "800" },
      },
    },
  },
  interaction: { mode: "index", intersect: false },
  scales: {
    y: {
      beginAtZero: true,
      ticks: { precision: 0, color: baseScales.tickColor },
      grid: { color: baseScales.gridColor },
      border: { display: false },
    },
    x: {
      grid: { display: false },
      ticks: { color: baseScales.tickColor },
      border: { display: false },
    },
  },
};

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    ...basePlugins,
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: { precision: 0, color: baseScales.tickColor },
      grid: { color: baseScales.gridColor },
      border: { display: false },
    },
    x: {
      grid: { display: false },
      ticks: { color: baseScales.tickColor },
      border: { display: false },
    },
  },
};

const singleBarOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    ...basePlugins,
  },
  scales: {
    y: { display: false, grid: { display: false } },
    x: {
      beginAtZero: true,
      ticks: { precision: 0, color: baseScales.tickColor },
      grid: { color: baseScales.gridColor },
      border: { display: false },
    },
  },
  indexAxis: "y",
};

const summaryBarOptions = {
  ...singleBarOptions,
  scales: {
    y: { grid: { display: false }, ticks: { font: { weight: "800" } } },
    x: { grid: { color: "rgba(15, 23, 42, 0.06)" }, ticks: { precision: 0 } },
  },
  indexAxis: "y",
};

const DashboardCharts = () => {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [diaries, setDiaries] = useState([]);
  const [totals, setTotals] = useState({ members: 0, travels: 0, diaries: 0 });

  useEffect(() => {
    let mounted = true;

    const fetchPaged = async (url) => {
      const res = await axiosAuth.getList(url);
      if (!isSuccessResponse(res)) throw new Error(res?.message || "요청 실패");
      const list = res?.data?.data || [];
      const pi = res?.data?.pageInfo || {};
      const total =
        pi?.listCount ??
        pi?.totalCount ??
        pi?.total ??
        pi?.count ??
        0;
      return { list: Array.isArray(list) ? list : [], total: Number(total) || 0 };
    };

    const run = async () => {
      try {
        setLoading(true);
        const [mRes, tRes, dRes] = await Promise.allSettled([
          fetchPaged("/api/admin/members?page=1"),
          fetchPaged("/api/admin/travel?page=1"),
          fetchPaged("/api/admin/community/diaries?page=1"),
        ]);

        if (!mounted) return;

        const pick = (r) => (r?.status === "fulfilled" ? r.value : { list: [], total: 0 });
        const m = pick(mRes);
        const t = pick(tRes);
        const d = pick(dRes);

        setMembers(m.list);
        setDiaries(d.list);
        setTotals({ members: m.total, travels: t.total, diaries: d.total });
      } catch (_e) {
      } finally {
        if (mounted) setLoading(false);
      }
    };

    run();
    return () => {
      mounted = false;
    };
  }, []);

  const last7Days = useMemo(() => buildLastNDays(7), []);
  const dayKeys = useMemo(() => last7Days.map(toIsoDay), [last7Days]);
  const dayKeysSet = useMemo(() => new Set(dayKeys), [dayKeys]);
  const dayLabels = useMemo(() => dayKeys.map((k) => k.slice(5).replace("-", "/")), [dayKeys]);

  const series = useMemo(() => {
    const memberCounts = countByDay(members, "enrollDate", dayKeysSet);
    const diaryCounts = countByDay(diaries, "createdDate", dayKeysSet);

    return {
      members: dayKeys.map((k) => memberCounts[k] || 0),
      diaries: dayKeys.map((k) => diaryCounts[k] || 0),
    };
  }, [dayKeys, dayKeysSet, diaries, members]);

  const lineData = useMemo(
    () => ({
      labels: dayLabels,
      datasets: [
        {
          label: "회원(신규)",
          data: series.members,
          borderColor: "rgba(59, 130, 246, 1)",
          backgroundColor: "rgba(59, 130, 246, 0.08)",
          pointRadius: 0,
          pointHitRadius: 10,
          tension: 0.35,
          fill: false,
          borderWidth: 3,
        },
        {
          label: "일기(신규)",
          data: series.diaries,
          borderColor: "rgba(245, 158, 11, 1)",
          backgroundColor: "rgba(245, 158, 11, 0.08)",
          pointRadius: 0,
          pointHitRadius: 10,
          tension: 0.35,
          fill: false,
          borderWidth: 3,
        },
      ],
    }),
    [dayLabels, series.diaries, series.members],
  );

  const totalsBarData = useMemo(
    () => ({
      labels: ["여행지", "회원", "일기"],
      datasets: [
        {
          label: "총 개수",
          data: [totals.travels, totals.members, totals.diaries],
          backgroundColor: ["rgba(59, 130, 246, 0.75)", "rgba(34, 197, 94, 0.75)", "rgba(245, 158, 11, 0.75)"],
          borderColor: ["rgba(59, 130, 246, 1)", "rgba(34, 197, 94, 1)", "rgba(245, 158, 11, 1)"],
          borderWidth: 1,
          borderRadius: 10,
        },
      ],
    }),
    [totals.diaries, totals.members, totals.travels],
  );

  const travelCountData = useMemo(
    () => ({
      labels: ["총 여행지"],
      datasets: [
        {
          label: "여행지",
          data: [totals.travels],
          backgroundColor: "rgba(59, 130, 246, 0.75)",
          borderColor: "rgba(59, 130, 246, 1)",
          borderWidth: 1,
          borderRadius: 10,
        },
      ],
    }),
    [totals.travels],
  );

  const memberCountData = useMemo(
    () => ({
      labels: ["총 회원"],
      datasets: [
        {
          label: "회원",
          data: [totals.members],
          backgroundColor: "rgba(34, 197, 94, 0.75)",
          borderColor: "rgba(34, 197, 94, 1)",
          borderWidth: 1,
          borderRadius: 10,
        },
      ],
    }),
    [totals.members],
  );

  const diaryCountData = useMemo(
    () => ({
      labels: ["총 일기"],
      datasets: [
        {
          label: "일기",
          data: [totals.diaries],
          backgroundColor: "rgba(245, 158, 11, 0.75)",
          borderColor: "rgba(245, 158, 11, 1)",
          borderWidth: 1,
          borderRadius: 10,
        },
      ],
    }),
    [totals.diaries],
  );

  return (
    <>
      <TopGrid>
        <ChartCard>
          <ChartTitle>최근 7일 추이</ChartTitle>
          <ChartSub>{loading ? "불러오는 중..." : "회원(신규) / 일기(신규)"}</ChartSub>
          <ChartBody>
            <Line data={lineData} options={lineOptions} />
          </ChartBody>
        </ChartCard>

        <ChartCard>
          <ChartTitle>총개수 (요약)</ChartTitle>
          <ChartSub>{loading ? "불러오는 중..." : "여행지 / 회원 / 일기"}</ChartSub>
          <ChartBody>
            <Bar data={totalsBarData} options={summaryBarOptions} />
          </ChartBody>
        </ChartCard>
      </TopGrid>

      <BottomGrid>
        <ChartCard>
          <ChartTitle>여행지 수</ChartTitle>
          <ChartSub>{loading ? "불러오는 중..." : `총 ${totals.travels.toLocaleString()}개`}</ChartSub>
          <ChartBodySmall>
            <Bar data={travelCountData} options={singleBarOptions} />
          </ChartBodySmall>
        </ChartCard>

        <ChartCard>
          <ChartTitle>회원 수</ChartTitle>
          <ChartSub>{loading ? "불러오는 중..." : `총 ${totals.members.toLocaleString()}명`}</ChartSub>
          <ChartBodySmall>
            <Bar data={memberCountData} options={singleBarOptions} />
          </ChartBodySmall>
        </ChartCard>

        <ChartCard>
          <ChartTitle>일기 수</ChartTitle>
          <ChartSub>{loading ? "불러오는 중..." : `총 ${totals.diaries.toLocaleString()}개`}</ChartSub>
          <ChartBodySmall>
            <Bar data={diaryCountData} options={singleBarOptions} />
          </ChartBodySmall>
        </ChartCard>
      </BottomGrid>
    </>
  );
};

export default DashboardCharts;

