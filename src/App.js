import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import About from "./pages/About";
import Projects from "./pages/Projects";
function App() {
    const [opacity, setOpacity] = useState(1);
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

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("click", handleMouseClick);
        };
    }, []);

    return (
        <Router>
            <div className="relative">
                {/* Parallax Background */}
                <div id="parallax-bg" className="fixed inset-0 z-0"></div>

                {/* Navigation Bar */}
                <nav
                    style={{ opacity }}
                    className="fixed top-0 left-0 w-full bg-black bg-opacity-50 text-white p-4 mb-0 z-50 transition-opacity duration-300"
                >
                    <div className="container mx-auto flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-100">Saif's Unity Portfolio</h1>
                        <ul className="flex space-x-6">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-blue-500"
                                            : "text-gray-200 hover:text-blue-500"
                                    }
                                >
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/projects"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-blue-500"
                                            : "text-gray-200 hover:text-blue-500"
                                    }
                                >
                                    Projects
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
                {/* Page Content */}
                <div className="pt-20 relative z-10 w-full">
                    {/* Add padding to account for the fixed navbar */}
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
