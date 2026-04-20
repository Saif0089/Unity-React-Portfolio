import React, { useState, useEffect } from "react";
import { getAnalytics, clearAnalytics } from "../utils/analytics";
import { CATEGORIES } from "../data/projects";

const StatCard = ({ label, value, sub, color }) => (
  <div className="glass rounded-xl p-5">
    <p className="text-xs text-white/30 uppercase tracking-wider mb-1">{label}</p>
    <p className="text-3xl font-display font-bold" style={{ color: color || "#fff" }}>
      {value}
    </p>
    {sub && <p className="text-xs text-white/25 mt-1">{sub}</p>}
  </div>
);

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    setData(getAnalytics());
  }, []);

  const refresh = () => setData(getAnalytics());
  const handleClear = () => {
    if (window.confirm("Clear all analytics data? This cannot be undone.")) {
      clearAnalytics();
      refresh();
    }
  };

  if (!data) return null;

  const totalSessions = data.sessions?.length || 0;
  const avgPagesPerSession =
    totalSessions > 0
      ? (data.sessions.reduce((sum, s) => sum + (s.pages?.length || 0), 0) / totalSessions).toFixed(1)
      : 0;

  const topPages = Object.entries(data.pageViews || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15);

  const topProjects = Object.entries(data.projectViews || {})
    .sort((a, b) => b[1].views - a[1].views)
    .slice(0, 15);

  const topReferrers = Object.entries(data.referrers || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const categoryViews = Object.entries(data.categoryViews || {}).sort((a, b) => b[1] - a[1]);

  const recentSessions = [...(data.sessions || [])].reverse().slice(0, 10);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "projects", label: "Projects" },
    { id: "sessions", label: "Sessions" },
  ];

  return (
    <div className="min-h-screen pt-20 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold text-white">Analytics Dashboard</h1>
            <p className="text-sm text-white/30 mt-1">
              Client-side tracking &middot; Data stored in visitor's browser
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={refresh}
              className="px-4 py-2 text-xs font-medium text-white/50 border border-white/10 rounded-lg hover:text-white hover:border-white/20 transition-colors"
            >
              Refresh
            </button>
            <button
              onClick={handleClear}
              className="px-4 py-2 text-xs font-medium text-red-400/60 border border-red-400/20 rounded-lg hover:text-red-400 hover:border-red-400/40 transition-colors"
            >
              Clear Data
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
                activeTab === tab.id
                  ? "text-white bg-white/10"
                  : "text-white/40 hover:text-white/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard
                label="Total Page Views"
                value={data.totalVisits || 0}
                color="#8B5CF6"
              />
              <StatCard
                label="Unique Days"
                value={data.uniqueDays?.length || 0}
                sub={`Since ${data.firstVisit ? new Date(data.firstVisit).toLocaleDateString() : "N/A"}`}
              />
              <StatCard
                label="Sessions"
                value={totalSessions}
                sub={`${avgPagesPerSession} pages/session`}
                color="#10B981"
              />
              <StatCard
                label="Device Split"
                value={`${data.devices?.desktop || 0}/${data.devices?.mobile || 0}`}
                sub="Desktop / Mobile"
                color="#F59E0B"
              />
            </div>

            {/* Top Pages + Category Split */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Top Pages */}
              <div className="glass rounded-xl p-6">
                <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
                  Top Pages
                </h3>
                {topPages.length === 0 ? (
                  <p className="text-sm text-white/20">No data yet</p>
                ) : (
                  <div className="space-y-2">
                    {topPages.map(([path, count]) => (
                      <div key={path} className="flex items-center justify-between">
                        <span className="text-sm text-white/50 truncate mr-4">{path}</span>
                        <span className="text-sm font-medium text-white/70 tabular-nums">{count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Category Views */}
              <div className="glass rounded-xl p-6">
                <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
                  Category Interest
                </h3>
                {categoryViews.length === 0 ? (
                  <p className="text-sm text-white/20">No project views yet</p>
                ) : (
                  <div className="space-y-3">
                    {categoryViews.map(([catId, count]) => {
                      const cat = CATEGORIES[catId];
                      const maxCount = categoryViews[0]?.[1] || 1;
                      return (
                        <div key={catId}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-white/50">{cat?.fullName || catId}</span>
                            <span className="text-sm font-medium text-white/70 tabular-nums">{count}</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${(count / maxCount) * 100}%`,
                                background: cat?.accent || "#666",
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Referrers */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
                Referrers
              </h3>
              {topReferrers.length === 0 ? (
                <p className="text-sm text-white/20">No referrer data yet</p>
              ) : (
                <div className="grid sm:grid-cols-2 gap-2">
                  {topReferrers.map(([ref, count]) => (
                    <div key={ref} className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/[0.02]">
                      <span className="text-sm text-white/50 truncate mr-4">{ref}</span>
                      <span className="text-sm font-medium text-white/70 tabular-nums">{count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="glass rounded-xl p-6">
            <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
              Project Views ({topProjects.length})
            </h3>
            {topProjects.length === 0 ? (
              <p className="text-sm text-white/20">No project views yet</p>
            ) : (
              <div className="space-y-3">
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
                          {info.lastViewed ? new Date(info.lastViewed).toLocaleDateString() : "—"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Sessions Tab */}
        {activeTab === "sessions" && (
          <div className="glass rounded-xl p-6">
            <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
              Recent Sessions ({recentSessions.length})
            </h3>
            {recentSessions.length === 0 ? (
              <p className="text-sm text-white/20">No sessions yet</p>
            ) : (
              <div className="space-y-3">
                {recentSessions.map((session, i) => {
                  const start = new Date(session.start);
                  const end = new Date(session.end);
                  const durationMs = end - start;
                  const durationMin = Math.floor(durationMs / 60000);
                  const durationSec = Math.floor((durationMs % 60000) / 1000);

                  return (
                    <div key={i} className="px-4 py-3 rounded-lg bg-white/[0.02]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-white/50">
                          {start.toLocaleDateString()} &middot; {start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                        <span className="text-xs text-white/25">
                          {durationMin > 0 ? `${durationMin}m ${durationSec}s` : `${durationSec}s`}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {(session.pages || []).map((page) => (
                          <span key={page} className="tech-pill text-[10px]">{page}</span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Footer note */}
        <p className="text-center text-xs text-white/15 mt-12">
          Data is stored locally in each visitor's browser via localStorage. It does not persist across devices or after cache clearing.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
