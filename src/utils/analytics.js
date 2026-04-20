// Simple client-side analytics using localStorage
// Tracks page views, project clicks, sessions, and referrers

const STORAGE_KEY = "portfolio_analytics";

const getStore = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

const initStore = () => ({
  totalVisits: 0,
  uniqueDays: [],
  sessions: [],
  pageViews: {},
  projectViews: {},
  categoryViews: {},
  referrers: {},
  devices: { desktop: 0, mobile: 0, tablet: 0 },
  firstVisit: new Date().toISOString(),
  lastVisit: new Date().toISOString(),
});

const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return "mobile";
  return "desktop";
};

const getToday = () => new Date().toISOString().split("T")[0];

export const trackPageView = (path) => {
  try {
    const store = getStore() || initStore();
    const today = getToday();

    store.totalVisits += 1;
    store.lastVisit = new Date().toISOString();
    store.pageViews[path] = (store.pageViews[path] || 0) + 1;

    if (!store.uniqueDays.includes(today)) {
      store.uniqueDays.push(today);
    }

    // Track device
    const device = getDeviceType();
    store.devices[device] = (store.devices[device] || 0) + 1;

    // Track session (new session if last visit was > 30 min ago)
    const lastSession = store.sessions[store.sessions.length - 1];
    const now = Date.now();
    if (!lastSession || now - new Date(lastSession.end).getTime() > 30 * 60 * 1000) {
      store.sessions.push({
        start: new Date().toISOString(),
        end: new Date().toISOString(),
        pages: [path],
      });
    } else {
      lastSession.end = new Date().toISOString();
      if (!lastSession.pages.includes(path)) {
        lastSession.pages.push(path);
      }
    }

    // Track referrer
    if (document.referrer) {
      try {
        const ref = new URL(document.referrer).hostname;
        store.referrers[ref] = (store.referrers[ref] || 0) + 1;
      } catch {}
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {}
};

export const trackProjectView = (slug, title, category) => {
  try {
    const store = getStore() || initStore();
    if (!store.projectViews[slug]) {
      store.projectViews[slug] = { title, category, views: 0, lastViewed: null };
    }
    store.projectViews[slug].views += 1;
    store.projectViews[slug].lastViewed = new Date().toISOString();

    store.categoryViews[category] = (store.categoryViews[category] || 0) + 1;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {}
};

export const getAnalytics = () => {
  return getStore() || initStore();
};

export const clearAnalytics = () => {
  localStorage.removeItem(STORAGE_KEY);
};
