import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import About from "./pages/About";
import Projects from "./pages/Projects";
function App() {
    const [opacity, setOpacity] = useState(1);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    useEffect(() => {
        
        // Mouse Trail Effect
        const createTrail = (x, y) => {
            const trail = document.createElement("div");
            trail.className = "trail";
            trail.style.left = `${x}px`;
            trail.style.top = `${y}px`;
            document.body.appendChild(trail);

            setTimeout(() => {
                trail.remove();
            }, 500);
        };
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            const newOpacity = 1 - scrollPosition / maxScroll;
            setOpacity(Math.max(newOpacity, 0)); // Ensure opacity doesn't go below 0
        };
        const handleMouseMove = (event) => {
            const scrollX = window.scrollX || document.documentElement.scrollLeft;
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            createTrail(event.clientX + scrollX, event.clientY + scrollY); // Adjust for scroll position
        };

        // Click Effect
        const createClickEffect = (x, y) => {
            const clickEffect = document.createElement("div");
            clickEffect.className = "click-effect";
            clickEffect.style.left = `${x}px`;
            clickEffect.style.top = `${y}px`;
            document.body.appendChild(clickEffect);

            setTimeout(() => {
                clickEffect.remove();
            }, 500);
        };
        const handleMouseClick = (event) => {
            const scrollX = window.scrollX || document.documentElement.scrollLeft;
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            createClickEffect(event.clientX + scrollX, event.clientY + scrollY); // Adjust for scroll position
        };

        // Event Listeners
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("click", handleMouseClick);
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("click", handleMouseClick);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <Router>
            <div className="relative min-h-screen">
                <div id="parallax-bg" className="fixed inset-0 z-0"></div>

                <nav
                    style={{ opacity }}
                    className="fixed top-0 left-0 z-50 w-full border-b border-white/5 bg-black/60 text-white backdrop-blur-lg transition-opacity duration-300"
                >
                    <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
                        <NavLink to="/" className="text-lg font-semibold tracking-wide text-slate-100 sm:text-xl">
                            Saif&apos;s Unity Portfolio
                        </NavLink>
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md border border-white/10 bg-white/10 p-2 text-slate-100 transition hover:border-white/30 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 md:hidden"
                            aria-label="Toggle navigation menu"
                            aria-expanded={isMenuOpen}
                            onClick={() => setIsMenuOpen((prev) => !prev)}
                        >
                            <span className="sr-only">Open navigation</span>
                            <svg
                                className={`h-5 w-5 transition-transform ${isMenuOpen ? "rotate-90" : "rotate-0"}`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <ul className="hidden items-center gap-6 text-sm font-medium md:flex">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `rounded-full px-3 py-2 transition hover:text-white ${
                                            isActive ? "text-emerald-300" : "text-slate-200"
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
                                        `rounded-full px-3 py-2 transition hover:text-white ${
                                            isActive ? "text-emerald-300" : "text-slate-200"
                                        }`
                                    }
                                >
                                    Projects
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div
                        className={`md:hidden transition-[max-height] duration-300 ease-in-out ${
                            isMenuOpen ? "max-h-44" : "max-h-0"
                        } overflow-hidden`}
                    >
                        <ul className="flex flex-col gap-3 px-4 pb-4 pt-2 text-sm font-medium">
                            <li>
                                <NavLink
                                    to="/"
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `rounded-xl border border-transparent px-3 py-2 transition hover:border-white/10 hover:bg-white/5 hover:text-white ${
                                            isActive ? "border-white/10 bg-white/5 text-emerald-300" : "text-slate-200"
                                        }`
                                    }
                                >
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/projects"
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `rounded-xl border border-transparent px-3 py-2 transition hover:border-white/10 hover:bg-white/5 hover:text-white ${
                                            isActive ? "border-white/10 bg-white/5 text-emerald-300" : "text-slate-200"
                                        }`
                                    }
                                >
                                    Projects
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div className="relative z-10 w-full pt-24 sm:pt-28">
                    <Routes>
                        <Route path="/" element={<About />} />
                        <Route path="/projects" element={<Projects />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
