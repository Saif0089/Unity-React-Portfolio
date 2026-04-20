import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES, getYouTubeThumbnail } from "../data/projects";

const ProjectCard = ({ project, index = 0, size = "default" }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const cat = CATEGORIES[project.category] || CATEGORIES.games;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const ytThumbnail = project.youtubeId
    ? getYouTubeThumbnail(project.youtubeId, "hq")
    : project.thumbnailUrl || null;

  // Local .mp4 video
  const isLocalVideo = project.videoUrl && project.videoUrl.startsWith("/videos/");
  // Any non-YouTube video source (Wistia, etc.)
  const hasAnyVideo = !!(project.youtubeId || project.videoUrl);

  const isLarge = size === "large";

  return (
    <Link
      to={`/project/${project.slug}`}
      ref={ref}
      className={`group block card-glow card-sheen ${
        visible ? "reveal is-visible" : "reveal"
      } ${isLarge ? "md:col-span-2 md:row-span-2" : ""}`}
      style={{
        "--glow-color": `rgba(${cat.accentRgb}, 0.2)`,
        transitionDelay: `${index * 0.05}s`,
      }}
    >
      <div className="relative glass glass-hover rounded-xl overflow-hidden h-full">
        {/* Thumbnail */}
        <div className={`relative overflow-hidden ${isLarge ? "aspect-[16/10]" : "aspect-video"}`}>
          {ytThumbnail ? (
            <img
              src={ytThumbnail}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : isLocalVideo ? (
            <video
              src={`${project.videoUrl}#t=0.5`}
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onMouseEnter={(e) => { try { e.target.play(); } catch (_) {} }}
              onMouseLeave={(e) => { try { e.target.pause(); e.target.currentTime = 0.5; } catch (_) {} }}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center relative"
              style={{
                background: `linear-gradient(135deg, rgba(${cat.accentRgb}, 0.2), #070814 60%, rgba(${cat.accentRgb}, 0.08))`,
              }}
            >
              {/* Decorative lines for non-video cards */}
              <div className="absolute inset-0 grid-pattern opacity-40" />
              <div className="text-center relative z-10">
                <span className="text-3xl block mb-2">{cat.icon}</span>
                {hasAnyVideo && (
                  <span className="text-[10px] uppercase tracking-widest font-medium" style={{ color: cat.accent }}>
                    Watch Demo
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />

          {/* Play icon for video cards */}
          {(ytThumbnail || isLocalVideo) && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-xl"
                style={{ background: `rgba(${cat.accentRgb}, 0.7)` }}
              >
                <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span
              className="cat-pill"
              style={{
                color: cat.accent,
                borderColor: `rgba(${cat.accentRgb}, 0.3)`,
                background: `rgba(${cat.accentRgb}, 0.1)`,
              }}
            >
              {cat.name}
            </span>
          </div>

          {/* Year */}
          <div className="absolute top-3 right-3">
            <span className="text-xs text-white/40 font-medium">{project.year}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-display font-semibold text-white mb-1.5 group-hover:text-white transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="text-sm text-white/50 mb-3 line-clamp-2">{project.tagline}</p>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-1.5">
            {project.platforms.slice(0, 3).map((p) => (
              <span key={p} className="tech-pill text-[11px]">{p}</span>
            ))}
            {project.platforms.length > 3 && (
              <span className="tech-pill text-[11px]">+{project.platforms.length - 3}</span>
            )}
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, transparent, ${cat.accent}, transparent)`,
          }}
        />
      </div>
    </Link>
  );
};

export default ProjectCard;
