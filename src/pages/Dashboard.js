import React, { useState, useEffect, useCallback } from "react";

const StatCard = ({ label, value, sub, color }) => (
  <div className="glass rounded-xl p-5">
    <p className="text-xs text-white/30 uppercase tracking-wider mb-1">{label}</p>
    <p className="text-3xl font-display font-bold" style={{ color: color || "#fff" }}>{value}</p>
    {sub && <p className="text-xs text-white/25 mt-1">{sub}</p>}
  </div>
);

const RankedRow = ({ rank, label, sub, value, barPct, barColor }) => (
  <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
    <span className="text-xs text-white/20 w-5 tabular-nums">{rank}</span>
    <div className="flex-1 min-w-0">
      <p className="text-sm text-white/70 font-medium truncate">{label}</p>
      {sub && <p className="text-xs text-white/25 truncate">{sub}</p>}
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
];

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [range, setRange] = useState(30);
  const [activeTab, setActiveTab] = useState("pages");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const now = Date.now();
      const from = now - range * 24 * 60 * 60 * 1000;
      const res = await fetch(`/api/analytics?key=s41f&from=${from}&to=${now}`);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || `HTTP ${res.status}`);
      }
      setData(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [range]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const tabs = [
    { id: "pages", label: "Pages" },
    { id: "geo", label: "Geography" },
    { id: "tech", label: "Tech" },
  ];

  // Extract data arrays safely
  const pages = data?.pageViews?.data || [];
  const referrers = data?.referrers?.data || [];
  const countries = data?.countries?.data || [];
  const browsers = data?.browsers?.data || [];
  const osList = data?.os?.data || [];
  const devices = data?.devices?.data || [];

  // Compute totals from pages
  const totalViews = pages.reduce((s, p) => s + (p.visitors || p.pageViews || 0), 0);
  const topMax = pages[0]?.visitors || pages[0]?.pageViews || 1;

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold text-white">Analytics</h1>
            <p className="text-sm text-white/30 mt-1">Vercel Web Analytics</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Range selector */}
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

        {/* Error */}
        {error && (
          <div className="glass rounded-xl p-6 mb-8 border border-red-500/20">
            <p className="text-sm text-red-400">Failed to load analytics: {error}</p>
            <p className="text-xs text-white/25 mt-2">Make sure Vercel Web Analytics is enabled in your project settings and the API token is valid.</p>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && !data && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass rounded-xl p-5 animate-pulse">
                <div className="h-3 w-16 bg-white/5 rounded mb-3" />
                <div className="h-8 w-20 bg-white/5 rounded" />
              </div>
            ))}
          </div>
        )}

        {data && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard label="Total Visitors" value={totalViews} color="#8B5CF6" />
              <StatCard label="Top Pages" value={pages.length} color="#10B981" />
              <StatCard label="Referrer Sources" value={referrers.length} color="#F59E0B" />
              <StatCard label="Countries" value={countries.length} color="#06B6D4" />
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-6">
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

            {/* Pages tab */}
            {activeTab === "pages" && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
                    Top Pages
                  </h3>
                  <div className="space-y-2">
                    {pages.length === 0 ? <p className="text-sm text-white/20">No data yet</p> :
                      pages.map((p, i) => (
                        <RankedRow
                          key={p.key}
                          rank={i + 1}
                          label={p.key}
                          value={p.visitors || p.pageViews || 0}
                          barPct={((p.visitors || p.pageViews || 0) / topMax) * 100}
                          barColor="#8B5CF6"
                        />
                      ))
                    }
                  </div>
                </div>

                <div className="glass rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
                    Referrers
                  </h3>
                  <div className="space-y-2">
                    {referrers.length === 0 ? <p className="text-sm text-white/20">No referrer data yet</p> :
                      referrers.map((r, i) => (
                        <RankedRow
                          key={r.key}
                          rank={i + 1}
                          label={r.key || "(direct)"}
                          value={r.visitors || r.pageViews || 0}
                          barPct={((r.visitors || r.pageViews || 0) / (referrers[0]?.visitors || referrers[0]?.pageViews || 1)) * 100}
                          barColor="#F59E0B"
                        />
                      ))
                    }
                  </div>
                </div>
              </div>
            )}

            {/* Geography tab */}
            {activeTab === "geo" && (
              <div className="glass rounded-xl p-6">
                <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
                  Countries
                </h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {countries.length === 0 ? <p className="text-sm text-white/20">No data yet</p> :
                    countries.map((c, i) => (
                      <RankedRow
                        key={c.key}
                        rank={i + 1}
                        label={c.key}
                        value={c.visitors || c.pageViews || 0}
                        barPct={((c.visitors || c.pageViews || 0) / (countries[0]?.visitors || countries[0]?.pageViews || 1)) * 100}
                        barColor="#06B6D4"
                      />
                    ))
                  }
                </div>
              </div>
            )}

            {/* Tech tab */}
            {activeTab === "tech" && (
              <div className="grid md:grid-cols-3 gap-6">
                <div className="glass rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Browsers</h3>
                  <div className="space-y-2">
                    {browsers.length === 0 ? <p className="text-sm text-white/20">No data</p> :
                      browsers.map((b, i) => (
                        <RankedRow key={b.key} rank={i + 1} label={b.key} value={b.visitors || b.pageViews || 0}
                          barPct={((b.visitors || b.pageViews || 0) / (browsers[0]?.visitors || browsers[0]?.pageViews || 1)) * 100} barColor="#10B981" />
                      ))
                    }
                  </div>
                </div>

                <div className="glass rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Operating Systems</h3>
                  <div className="space-y-2">
                    {osList.length === 0 ? <p className="text-sm text-white/20">No data</p> :
                      osList.map((o, i) => (
                        <RankedRow key={o.key} rank={i + 1} label={o.key} value={o.visitors || o.pageViews || 0}
                          barPct={((o.visitors || o.pageViews || 0) / (osList[0]?.visitors || osList[0]?.pageViews || 1)) * 100} barColor="#F43F5E" />
                      ))
                    }
                  </div>
                </div>

                <div className="glass rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Devices</h3>
                  <div className="space-y-2">
                    {devices.length === 0 ? <p className="text-sm text-white/20">No data</p> :
                      devices.map((d, i) => (
                        <RankedRow key={d.key} rank={i + 1} label={d.key} value={d.visitors || d.pageViews || 0}
                          barPct={((d.visitors || d.pageViews || 0) / (devices[0]?.visitors || devices[0]?.pageViews || 1)) * 100} barColor="#8B5CF6" />
                      ))
                    }
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        <p className="text-center text-xs text-white/15 mt-12">
          Data from Vercel Web Analytics &middot; Last {range} days
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
