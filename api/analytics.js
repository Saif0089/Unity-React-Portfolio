const PROJECT_ID = "prj_OmD8r1Jsvter8yu2bcwHsaEUcBXu";
const TEAM_ID = "team_qVUB3iWghPAtLNPTbB89QDBq";
const BASE = "https://api.vercel.com";

async function fetchVercel(path, token) {
  const sep = path.includes("?") ? "&" : "?";
  const url = `${BASE}${path}${sep}projectId=${PROJECT_ID}&teamId=${TEAM_ID}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Vercel API ${res.status}: ${text}`);
  }
  return res.json();
}

module.exports = async (req, res) => {
  // Simple auth: require a query param key so random visitors can't hit it
  const key = req.query.key;
  if (key !== "s41f") {
    return res.status(403).json({ error: "Forbidden" });
  }

  const token = process.env.ANALYTICS_TOKEN;
  if (!token) {
    return res.status(500).json({ error: "ANALYTICS_TOKEN not set" });
  }

  const now = Date.now();
  const from = req.query.from || (now - 30 * 24 * 60 * 60 * 1000); // default 30 days
  const to = req.query.to || now;
  const tz = req.query.tz || "America/New_York";

  try {
    const [pageViews, referrers, countries, browsers, os, devices] = await Promise.all([
      fetchVercel(`/v1/web/analytics/page-views?from=${from}&to=${to}&limit=25&timeZone=${tz}`, token),
      fetchVercel(`/v1/web/analytics/referrers?from=${from}&to=${to}&limit=15&timeZone=${tz}`, token),
      fetchVercel(`/v1/web/analytics/countries?from=${from}&to=${to}&limit=15&timeZone=${tz}`, token),
      fetchVercel(`/v1/web/analytics/browsers?from=${from}&to=${to}&limit=10&timeZone=${tz}`, token),
      fetchVercel(`/v1/web/analytics/operating-systems?from=${from}&to=${to}&limit=10&timeZone=${tz}`, token),
      fetchVercel(`/v1/web/analytics/devices?from=${from}&to=${to}&limit=10&timeZone=${tz}`, token),
    ]);

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    return res.json({
      period: { from: Number(from), to: Number(to) },
      pageViews,
      referrers,
      countries,
      browsers,
      os,
      devices,
    });
  } catch (err) {
    return res.status(502).json({ error: err.message });
  }
};
