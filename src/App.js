import React, { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from "react-router-dom";
import { CATEGORIES } from "./data/projects";

// Lazy load pages for performance
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));

const categories = Object.values(CATEGORIES);

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
  </div>
);

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    // Scroll detection for navbar
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // Mouse trail effect (throttled)
    let lastTrail = 0;
    const handleMouseMove = (event) => {
      const now = Date.now();
      if (now - lastTrail < 50) return; // throttle to 20fps
      lastTrail = now;
      const trail = document.createElement("div");
      trail.className = "trail";
      trail.style.left = `${event.clientX + window.scrollX}px`;
      trail.style.top = `${event.clientY + window.scrollY}px`;
      document.body.appendChild(trail);
      setTimeout(() => trail.remove(), 500);
    };

    // Click effect
    const handleClick = (event) => {
      const el = document.createElement("div");
      el.className = "click-effect";
      el.style.left = `${event.clientX + window.scrollX}px`;
      el.style.top = `${event.clientY + window.scrollY}px`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setShowCategories(false);
  };

  return (
    <Router>
      <div className="relative min-h-screen film-grain">
        {/* ── NAVBAR ─────────────────────────────────────────────── */}
        <nav
          className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
            scrolled
              ? "bg-[rgba(7,8,20,0.75)] backdrop-blur-2xl saturate-150 border-b border-white/8 shadow-lg shadow-black/30"
              : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
            {/* Logo */}
            <NavLink to="/" className="text-lg font-display font-bold text-white" onClick={closeMenu}>
              Saif<span className="gradient-text-accent">.</span>dev
            </NavLink>

            {/* Desktop nav */}
            <ul className="hidden lg:flex items-center gap-1 text-sm font-medium">
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-full transition-all duration-200 ${
                      isActive
                        ? "text-white bg-white/10"
                        : "text-white/50 hover:text-white hover:bg-white/5"
                    }`
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/projects"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-full transition-all duration-200 ${
                      isActive
                        ? "text-white bg-white/10"
                        : "text-white/50 hover:text-white hover:bg-white/5"
                    }`
                  }
                >
                  Projects
                </NavLink>
              </li>

              {/* Category links */}
              <li className="relative group">
                <button
                  className="px-4 py-2 rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-all duration-200 flex items-center gap-1"
                  onMouseEnter={() => setShowCategories(true)}
                  onMouseLeave={() => setShowCategories(false)}
                >
                  Categories
                  <svg className="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown */}
                <div
                  className={`absolute top-full left-0 mt-1 w-56 glass rounded-xl overflow-hidden transition-all duration-200 ${
                    showCategories
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                  onMouseEnter={() => setShowCategories(true)}
                  onMouseLeave={() => setShowCategories(false)}
                >
                  <div className="py-2">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={cat.route}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors"
                        onClick={closeMenu}
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ background: cat.accent }}
                        />
                        {cat.fullName}
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
            </ul>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center rounded-lg p-2 text-white/60 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Toggle navigation"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <svg
                className={`h-5 w-5 transition-transform duration-200 ${isMenuOpen ? "rotate-90" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          <div
            className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
              isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-6 pb-6 pt-2 space-y-1">
              <NavLink
                to="/"
                end
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive ? "text-white bg-white/10" : "text-white/50 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/projects"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive ? "text-white bg-white/10" : "text-white/50 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                All Projects
              </NavLink>

              <div className="divider-gradient my-3" />

              <p className="px-4 py-1 text-xs text-white/25 uppercase tracking-wider">Categories</p>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={cat.route}
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full" style={{ background: cat.accent }} />
                  {cat.fullName}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* ── ROUTES ─────────────────────────────────────────────── */}
        <div className="relative z-10 w-full">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/ar" element={<CategoryPage />} />
              <Route path="/vr" element={<CategoryPage />} />
              <Route path="/games" element={<CategoryPage />} />
              <Route path="/3d-interactive" element={<CategoryPage />} />
              <Route path="/simulation" element={<CategoryPage />} />
              <Route path="/project/:slug" element={<ProjectDetail />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </Router>
  );
}

export default App;
