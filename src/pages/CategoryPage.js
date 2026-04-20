import React, { useEffect, useState, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { CATEGORIES, getProjectsByCategory } from "../data/projects";
import CategoryHero from "../components/CategoryHero";
import ProjectCard from "../components/ProjectCard";
import Footer from "../components/Footer";

// Map route paths to category IDs
const ROUTE_TO_CATEGORY = {
  "/ar": "ar",
  "/vr": "vr",
  "/games": "games",
  "/3d-interactive": "3d",
  "/simulation": "simulation",
};

const CategoryPage = () => {
  const location = useLocation();
  const catKey = ROUTE_TO_CATEGORY[location.pathname] || "games";
  const category = CATEGORIES[catKey];
  const allProjects = useMemo(() => getProjectsByCategory(catKey), [catKey]);

  const [filter, setFilter] = useState("all");

  // Get unique subcategories
  const subcategories = useMemo(() => {
    const subs = [...new Set(allProjects.map((p) => p.subcategory))];
    return subs.sort();
  }, [allProjects]);

  const filteredProjects = useMemo(() => {
    if (filter === "all") return allProjects;
    return allProjects.filter((p) => p.subcategory === filter);
  }, [allProjects, filter]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setFilter("all");
  }, [catKey]);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-white mb-4">Category not found</h1>
          <Link to="/projects" className="btn-aurora px-6 py-3 rounded-full text-white text-sm font-medium inline-block">
            Browse All Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <CategoryHero category={category} projectCount={allProjects.length} featuredProjects={allProjects} />

      {/* Filter bar */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`cat-pill transition-all duration-200 cursor-pointer ${
              filter === "all"
                ? "text-white border-white/30 bg-white/10"
                : "text-white/40 border-white/10 hover:border-white/20 hover:text-white/60"
            }`}
          >
            All ({allProjects.length})
          </button>
          {subcategories.map((sub) => {
            const count = allProjects.filter((p) => p.subcategory === sub).length;
            return (
              <button
                key={sub}
                onClick={() => setFilter(sub)}
                className={`cat-pill transition-all duration-200 cursor-pointer ${
                  filter === sub
                    ? ""
                    : "text-white/40 border-white/10 hover:border-white/20 hover:text-white/60"
                }`}
                style={
                  filter === sub
                    ? {
                        color: category.accent,
                        borderColor: `rgba(${category.accentRgb}, 0.4)`,
                        background: `rgba(${category.accentRgb}, 0.12)`,
                      }
                    : {}
                }
              >
                {sub} ({count})
              </button>
            );
          })}
        </div>
      </section>

      {/* Projects grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              size={i === 0 && filteredProjects.length > 3 ? "large" : "default"}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/30 text-lg">No projects match this filter.</p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default CategoryPage;
