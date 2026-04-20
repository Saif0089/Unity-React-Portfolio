import React, { useState, useEffect, useCallback, useMemo } from "react";
import { getPageViews, getProjectViews } from "../utils/firebase";
import { CATEGORIES } from "../data/projects";

const StatCard = ({ label, value, sub, color }) => (
  <div className="glass rounded-xl p-5">
    <p className="text-xs text-white/30 uppercase tracking-wider mb-1">{label}</p>
    <p className="text-3xl font-display font-bold" style={{ color: color || "#fff" }}>{value}</p>
    {sub && <p className="text-xs text-white/25 mt-1">{sub}</p>}
  </div>
);

const RankedRow = ({ rank, label, value, barPct, barColor, sub }) => (
  <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
    <span className="text-xs text-white/20 w-5 tabular-nums">{rank}</span>
    <div className="flex-1 min-w-0">
      <p className="text-sm text-white/70 font-medium truncate">{label}</p>
      {sub && <p className="text-xs text-white/25">{sub}</p>}
      {barPct !== undefined && (
        <div className="h-1 rounded-full bg-white/5 overflow-hidden mt-1.5">
          <div className="h-full rounded-full" style={{ width: `${barPct}%`, background: barColor || "#8B5CF6" }} />
        </div>
      )}
    </div>
    <span className="text-sm font-medium text-white/70 tabular-nums">{value}</span>
  </div>
);

const RANGES = [
  { label: "7 days", days: 7 },
  { label: "30 days", days: 30 },
  { label: "90 days", days: 90 },
  { label: "All time", days: 365 * 5 },
];

const Dashboard = () => {
  const [pageViews, setPageViews] = useState([]);
  const [projectViews, setProjectViews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState(30);
  const [activeTab, setActiveTab] = useState("overview");

  const fromTimestamp = useMemo(() => Date.now() - range * 24 * 60 * 60 * 1000, [range]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const [pv, projV] = await Promise.all([
      getPageViews(fromTimestamp),
      getProjectViews(fromTimestamp),
    ]);
    setPageViews(pv);
    setProjectViews(projV);
    setLoading(false);
  }, [fromTimestamp]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Aggregate page views by path
  const topPages = useMemo(() => {
    const counts = {};
    pageViews.forEach((pv) => { counts[pv.path] = (counts[pv.path] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [pageViews]);

  // Aggregate projects
  const topProjects = useMemo(() => {
    const counts = {};
    projectViews.forEach((pv) => {
      if (!counts[pv.slug]) counts[pv.slug] = { title: pv.title, category: pv.category, views: 0, last: 0 };
      counts[pv.slug].views += 1;
      counts[pv.slug].last = Math.max(counts[pv.slug].last, pv.timestamp);
    });
    return Object.entries(counts).sort((a, b) => b[1].views - a[1].views);
  }, [projectViews]);

  // Device breakdown
  const devices = useMemo(() => {
    const counts = { desktop: 0, mobile: 0, tablet: 0 };
    pageViews.forEach((pv) => { if (pv.device) counts[pv.device] = (counts[pv.device] || 0) + 1; });
    return counts;
  }, [pageViews]);

  // Referrers
  const referrers = useMemo(() => {
    const counts = {};
    pageViews.forEach((pv) => {
      if (pv.referrer && pv.referrer !== "(direct)") {
        try {
          const host = new URL(pv.referrer).hostname;
          counts[host] = (counts[host] || 0) + 1;
        } catch {
          counts[pv.referrer] = (counts[pv.referrer] || 0) + 1;
        }
      }
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10);
  }, [pageViews]);

  // Category interest
  const categoryInterest = useMemo(() => {
    const counts = {};
    projectViews.forEach((pv) => { counts[pv.category] = (counts[pv.category] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [projectViews]);

  // Unique days
  const uniqueDays = useMemo(() => {
    const days = new Set();
    pageViews.forEach((pv) => days.add(new Date(pv.timestamp).toISOString().split("T")[0]));
    return days.size;
  }, [pageViews]);

  // Daily breakdown for the chart
  const dailyViews = useMemo(() => {
    const counts = {};
    pageViews.forEach((pv) => {
      const day = new Date(pv.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" });
      counts[day] = (counts[day] || 0) + 1;
    });
    return Object.entries(counts).slice(-14); // last 14 days
  }, [pageViews]);

  const maxDaily = Math.max(...dailyViews.map(([, v]) => v), 1);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "projects", label: "Projects" },
    { id: "traffic", label: "Traffic" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold text-white">Analytics Dashboard</h1>
            <p className="text-sm text-white/30 mt-1">
              All visitors &middot; Firebase Realtime Database
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-1 glass rounded-lg p-1">
              {RANGES.map((r) => (
                <button
                  key={r.days}
                  onClick={() => setRange(r.days)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    range === r.days ? "text-white bg-white/10" : "text-white/40 hover:text-white/60"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
            <button
              onClick={fetchData}
              disabled={loading}
              className="px-4 py-2 text-xs font-medium text-white/50 border border-white/10 rounded-lg hover:text-white hover:border-white/20 transition-colors disabled:opacity-30"
            >
              {loading ? "Loading..." : "Refresh"}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id ? "text-white bg-white/10" : "text-white/40 hover:text-white/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass rounded-xl p-5 animate-pulse">
                <div className="h-3 w-16 bg-white/5 rounded mb-3" />
                <div className="h-8 w-20 bg-white/5 rounded" />
              </div>
            ))}
          </div>
        )}

        {!loading && (
          <>
            {/* ── OVERVIEW TAB ─────────────────────────────────────── */}
            {activeTab === "overview" && (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <StatCard label="Total Page Views" value={pageViews.length} color="#8B5CF6" />
                  <StatCard label="Project Views" value={projectViews.length} color="#10B981" />
                  <StatCard label="Active Days" value={uniqueDays} color="#F59E0B" />
                  <StatCard
                    label="Devices"
                    value={`${devices.desktop}/${devices.mobile}`}
                    sub="Desktop / Mobile"
                    color="#06B6D4"
                  />
                </div>

                {/* Mini bar chart */}
                {dailyViews.length > 0 && (
                  <div className="glass rounded-xl p-6 mb-8">
                    <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
                      Daily Page Views
                    </h3>
                    <div className="flex items-end gap-1 h-32">
                      {dailyViews.map(([day, count]) => (
                        <div key={day} className="flex-1 flex flex-col items-center gap-1">
                          <span className="text-[10px] text-white/40 tabular-nums">{count}</span>
                          <div
                            className="w-full rounded-t"
                            style={{
                              height: `${(count / maxDaily) * 100}%`,
                              minHeight: 4,
                              background: "linear-gradient(to top, rgba(139,92,246,0.6), rgba(139,92,246,0.2))",
                            }}
                          />
                          <span className="text-[9px] text-white/20 truncate w-full text-center">{day}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Top pages + category interest */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="glass rounded-xl p-6">
                    <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Top Pages</h3>
                    <div className="space-y-2">
                      {topPages.length === 0 ? (
                        <p className="text-sm text-white/20">No data yet</p>
                      ) : (
                        topPages.slice(0, 12).map(([path, count], i) => (
                          <RankedRow
                            key={path}
                            rank={i + 1}
                            label={path}
                            value={count}
                            barPct={(count / (topPages[0]?.[1] || 1)) * 100}
                            barColor="#8B5CF6"
                          />
                        ))
                      )}
                    </div>
                  </div>

                  <div className="glass rounded-xl p-6">
                    <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Category Interest</h3>
                    {categoryInterest.length === 0 ? (
                      <p className="text-sm text-white/20">No project views yet</p>
                    ) : (
                      <div className="space-y-4">
                        {categoryInterest.map(([catId, count]) => {
                          const cat = CATEGORIES[catId];
                          const max = categoryInterest[0]?.[1] || 1;
                          return (
                            <div key={catId}>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm text-white/50">{cat?.fullName || catId}</span>
                                <span className="text-sm font-medium text-white/70 tabular-nums">{count}</span>
                              </div>
                              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                                <div
                                  className="h-full rounded-full transition-all duration-700"
                                  style={{ width: `${(count / max) * 100}%`, background: cat?.accent || "#666" }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* ── PROJECTS TAB ─────────────────────────────────────── */}
            {activeTab === "projects" && (
              <div className="glass rounded-xl p-6">
                <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
                  Most Viewed Projects ({topProjects.length})
                </h3>
                {topProjects.length === 0 ? (
                  <p className="text-sm text-white/20">No project views yet</p>
                ) : (
                  <div className="space-y-2">
                    {topProjects.map(([slug, info], i) => {
                      const cat = CATEGORIES[info.category];
                      return (
                        <div
                          key={slug}
                          className="flex items-center gap-4 px-4 py-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                        >
                          <span className="text-sm text-white/20 w-6 tabular-nums">{i + 1}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-white/70 font-medium truncate">{info.title}</p>
                            <p className="text-xs text-white/25">{slug}</p>
                          </div>
                          <span
                            className="cat-pill text-[10px]"
                            style={{
                              color: cat?.accent || "#888",
                              borderColor: `${cat?.accent || "#888"}40`,
                              background: `${cat?.accent || "#888"}15`,
                            }}
                          >
                            {cat?.name || info.category}
                          </span>
                          <div className="text-right">
                            <p className="text-sm font-medium text-white/70 tabular-nums">{info.views}</p>
                            <p className="text-[10px] text-white/20">
                              {info.last ? new Date(info.last).toLocaleDateString() : "—"}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ── TRAFFIC TAB ──────────────────────────────────────── */}
            {activeTab === "traffic" && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Referrers</h3>
                  {referrers.length === 0 ? (
                    <p className="text-sm text-white/20">No referrer data — most visits are direct</p>
                  ) : (
                    <div className="space-y-2">
                      {referrers.map(([host, count], i) => (
                        <RankedRow
                          key={host}
                          rank={i + 1}
                          label={host}
                          value={count}
                          barPct={(count / (referrers[0]?.[1] || 1)) * 100}
                          barColor="#F59E0B"
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="glass rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Devices</h3>
                  <div className="space-y-4">
                    {Object.entries(devices)
                      .filter(([, v]) => v > 0)
                      .sort((a, b) => b[1] - a[1])
                      .map(([device, count]) => {
                        const total = Object.values(devices).reduce((s, v) => s + v, 0) || 1;
                        const pct = Math.round((count / total) * 100);
                        const colors = { desktop: "#8B5CF6", mobile: "#10B981", tablet: "#F59E0B" };
                        return (
                          <div key={device}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-white/50 capitalize">{device}</span>
                              <span className="text-sm font-medium text-white/70">{count} ({pct}%)</span>
                            </div>
                            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{ width: `${pct}%`, background: colors[device] || "#666" }}
                              />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        <p className="text-center text-xs text-white/15 mt-12">
          Showing last {range >= 365 ? "all" : `${range} days`} &middot; Data from all visitors via Firebase
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
