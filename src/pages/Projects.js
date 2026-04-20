import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { PROJECTS, CATEGORIES, getFeaturedProjects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import Footer from "../components/Footer";

const categories = Object.values(CATEGORIES);

function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const featured = useMemo(() => getFeaturedProjects().slice(0, 6), []);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40" />

        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16">
          <span className="inline-block cat-pill text-white/60 border-white/10 mb-6">
            {PROJECTS.length} Projects Shipped
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold gradient-text mb-4 max-w-3xl leading-tight">
            Interactive experiences crafted to{" "}
            <span className="gradient-text-accent">delight</span> and deliver.
          </h1>
          <p className="text-base sm:text-lg text-white/50 max-w-2xl leading-relaxed">
            From VR training simulations to multiplayer arenas and AR city portals
            — every build is engineered for performance and crafted for impact.
          </p>
        </div>
      </section>

      {/* Category cards */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 stagger-children">
          {categories.map((cat) => {
            const count = PROJECTS.filter((p) => p.category === cat.id).length;
            return (
              <Link
                key={cat.id}
                to={cat.route}
                className="group glass glass-hover rounded-xl p-4 text-center transition-all duration-300 hover:-translate-y-1"
                style={{
                  "--glow-color": `rgba(${cat.accentRgb}, 0.15)`,
                }}
              >
                <span className="text-2xl block mb-2">{cat.icon}</span>
                <h3
                  className="text-sm font-semibold mb-0.5 transition-colors"
                  style={{ color: cat.accent }}
                >
                  {cat.name}
                </h3>
                <p className="text-xs text-white/30">{count} projects</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="divider-gradient mb-12" />
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
          Featured Work
        </h2>
        <p className="text-white/40 mb-8 text-sm">
          Highlights from across AR, VR, games, 3D, and simulation.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} size={i === 0 ? "large" : "default"} />
          ))}
        </div>
      </section>

      {/* All projects with filter */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="divider-gradient mb-12" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
            All Projects
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`cat-pill transition-all duration-200 cursor-pointer ${
                activeCategory === "all"
                  ? "text-white border-white/30 bg-white/10"
                  : "text-white/40 border-white/10 hover:text-white/60"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`cat-pill transition-all duration-200 cursor-pointer ${
                  activeCategory !== cat.id
                    ? "text-white/40 border-white/10 hover:text-white/60"
                    : ""
                }`}
                style={
                  activeCategory === cat.id
                    ? {
                        color: cat.accent,
                        borderColor: `rgba(${cat.accentRgb}, 0.4)`,
                        background: `rgba(${cat.accentRgb}, 0.12)`,
                      }
                    : {}
                }
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default Projects;
