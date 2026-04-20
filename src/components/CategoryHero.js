import React from "react";
import { Link } from "react-router-dom";
import { getYouTubeThumbnail } from "../data/projects";

const CategoryHero = ({ category, projectCount, featuredProjects = [] }) => {
  // Pick up to 3 projects with YouTube thumbnails for the visual strip
  const heroProjects = featuredProjects
    .filter((p) => p.youtubeId)
    .slice(0, 3);

  return (
    <section className="relative min-h-[55vh] flex items-center overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 bg-300% animate-gradient-shift"
        style={{
          backgroundImage: `linear-gradient(135deg, #070814 0%, rgba(${category.accentRgb},0.08) 30%, #070814 60%, rgba(${category.accentRgb},0.05) 100%)`,
        }}
      />

      {/* Accent glow orbs */}
      <div
        className="absolute rounded-full animate-float-slow"
        style={{
          width: 500,
          height: 500,
          background: `radial-gradient(circle, rgba(${category.accentRgb}, 0.25), transparent 70%)`,
          top: "-10%",
          left: "-5%",
        }}
      />
      <div
        className="absolute rounded-full animate-float-delayed"
        style={{
          width: 400,
          height: 400,
          background: `radial-gradient(circle, rgba(${category.accentRgb}, 0.15), transparent 70%)`,
          bottom: "-5%",
          right: "5%",
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-12 items-center">
          {/* Left: Text content */}
          <div>
            {/* Category label */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className="h-[1px] w-8"
                style={{ background: `linear-gradient(90deg, ${category.accent}, transparent)` }}
              />
              <span
                className="cat-pill"
                style={{
                  color: category.accent,
                  borderColor: `rgba(${category.accentRgb}, 0.3)`,
                  background: `rgba(${category.accentRgb}, 0.1)`,
                }}
              >
                {projectCount} Projects
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-4 leading-[1.1]">
              {category.fullName}
            </h1>

            {/* Tagline */}
            <p
              className="text-xl sm:text-2xl font-medium mb-4"
              style={{ color: category.accent }}
            >
              {category.tagline}
            </p>

            {/* Description */}
            <p className="text-base text-white/45 leading-relaxed max-w-xl mb-8">
              {category.description}
            </p>

            {/* Quick stat */}
            <div className="flex items-center gap-6">
              <div>
                <p className="text-2xl font-display font-bold" style={{ color: category.accent }}>{projectCount}</p>
                <p className="text-xs text-white/30">Projects</p>
              </div>
              <div className="h-8 w-[1px] bg-white/10" />
              <div>
                <p className="text-2xl font-display font-bold gradient-text">
                  {featuredProjects.filter(p => p.featured).length}
                </p>
                <p className="text-xs text-white/30">Featured</p>
              </div>
            </div>
          </div>

          {/* Right: Project thumbnail strip */}
          {heroProjects.length > 0 && (
            <div className="hidden lg:block">
              <div className="space-y-3">
                {heroProjects.map((p, i) => {
                  const thumb = getYouTubeThumbnail(p.youtubeId, "hq");
                  return (
                    <Link
                      key={p.id}
                      to={`/project/${p.slug}`}
                      className="group relative flex items-center gap-4 glass glass-hover rounded-xl overflow-hidden p-2 pr-5 transition-all duration-300 hover:-translate-x-1 animate-fade-in"
                      style={{ animationDelay: `${0.2 + i * 0.12}s` }}
                    >
                      <div className="relative w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={thumb}
                          alt={p.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium mb-0.5 truncate" style={{ color: category.accent }}>
                          {p.subcategory}
                        </p>
                        <p className="text-sm text-white font-medium truncate">{p.title}</p>
                        <p className="text-xs text-white/30 mt-0.5 truncate">{p.tagline}</p>
                      </div>
                      {/* Arrow */}
                      <svg className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoryHero;
