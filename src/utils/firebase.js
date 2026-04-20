import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, get, query, orderByChild, limitToLast } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCr2attgLywaN5FfhprINRWzkGoFFFXrXM",
  authDomain: "saifupwork-24020.firebaseapp.com",
  databaseURL: "https://saifupwork-24020-default-rtdb.firebaseio.com",
  projectId: "saifupwork-24020",
  storageBucket: "saifupwork-24020.firebasestorage.app",
  messagingSenderId: "294709564610",
  appId: "1:294709564610:web:5aa5adca8fe085b27d175b",
  measurementId: "G-5XTN8TD9TX",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ── WRITE EVENTS ────────────────────────────────────────────────────

const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return "mobile";
  return "desktop";
};

export const trackPageView = (path) => {
  try {
    push(ref(db, "pageViews"), {
      path,
      timestamp: Date.now(),
      device: getDeviceType(),
      referrer: document.referrer || "(direct)",
      language: navigator.language || "unknown",
    });
  } catch {}
};

export const trackProjectView = (slug, title, category) => {
  try {
    push(ref(db, "projectViews"), {
      slug,
      title,
      category,
      timestamp: Date.now(),
      device: getDeviceType(),
    });
  } catch {}
};

// ── READ DATA (for dashboard) ───────────────────────────────────────

export const getPageViews = async (fromTimestamp) => {
  try {
    const snapshot = await get(query(ref(db, "pageViews"), orderByChild("timestamp"), limitToLast(5000)));
    if (!snapshot.exists()) return [];
    const results = [];
    snapshot.forEach((child) => {
      const val = child.val();
      if (val.timestamp >= fromTimestamp) results.push(val);
    });
    return results;
  } catch {
    return [];
  }
};

export const getProjectViews = async (fromTimestamp) => {
  try {
    const snapshot = await get(query(ref(db, "projectViews"), orderByChild("timestamp"), limitToLast(5000)));
    if (!snapshot.exists()) return [];
    const results = [];
    snapshot.forEach((child) => {
      const val = child.val();
      if (val.timestamp >= fromTimestamp) results.push(val);
    });
    return results;
  } catch {
    return [];
  }
};
