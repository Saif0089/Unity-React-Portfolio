import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { getProjectBySlug, getRelatedProjects, CATEGORIES, getYouTubeThumbnail } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import Footer from "../components/Footer";

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPlaying(false);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-white mb-4">Project not found</h1>
          <Link to="/projects" className="btn-aurora px-6 py-3 rounded-full text-white text-sm font-medium inline-block">
            Browse All Projects
          </Link>
        </div>
      </div>
    );
  }

  const cat = CATEGORIES[project.category] || CATEGORIES.games;
  const related = getRelatedProjects(project, 3);
  const videoUrl = project.youtubeId
    ? `https://www.youtube.com/watch?v=${project.youtubeId}`
    : project.videoUrl || null;
  const thumbnail = project.youtubeId ? getYouTubeThumbnail(project.youtubeId, "maxres") : null;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, rgba(${cat.accentRgb}, 0.3), transparent 70%)`,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link to="/" className="hover:text-white/60 transition-colors">Home</Link>
            <span>/</span>
            <Link to={cat.route} className="hover:text-white/60 transition-colors" style={{ color: `rgba(${cat.accentRgb}, 0.6)` }}>
              {cat.fullName}
            </Link>
            <span>/</span>
            <span className="text-white/60">{project.title}</span>
          </nav>

          {/* Title section */}
          <div className="flex flex-wrap items-start gap-3 mb-3">
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
            <span className="cat-pill text-white/40 border-white/10">{project.subcategory}</span>
            <span className="cat-pill text-white/40 border-white/10">{project.year}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold gradient-text mb-4">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl mb-2" style={{ color: cat.accent }}>
            {project.tagline}
          </p>

          {project.client && project.client !== "Studio Project" && project.client !== "Internal" && (
            <p className="text-sm text-white/30">
              Client: <span className="text-white/50">{project.client}</span>
              {project.websiteUrl && (
                <>
                  {" "}&middot;{" "}
                  <a
                    href={project.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                    style={{ color: `rgba(${cat.accentRgb}, 0.7)` }}
                  >
                    Visit website
                  </a>
                </>
              )}
            </p>
          )}
        </div>
      </section>

      {/* Video / Media */}
      {videoUrl && (
        <section className="max-w-5xl mx-auto px-6 pb-16">
          <div className="relative rounded-xl overflow-hidden glass">
            {/* Thumbnail with play button (before playing) */}
            {!playing && thumbnail && (
              <div
                className="relative aspect-video cursor-pointer group"
                onClick={() => setPlaying(true)}
              >
                <img
                  src={thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-xl transition-transform group-hover:scale-110"
                    style={{ background: `rgba(${cat.accentRgb}, 0.8)` }}
                  >
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {/* Player (after clicking play or no thumbnail) */}
            {(playing || !thumbnail) && (
              <div className="video-wrapper">
                <ReactPlayer
                  url={videoUrl}
                  width="100%"
                  height="100%"
                  playing={playing}
                  controls
                  style={{ position: "absolute", top: 0, left: 0 }}
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Content */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Description */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-display font-semibold text-white mb-4">About This Project</h2>
            <p className="text-white/50 leading-relaxed mb-8">{project.description}</p>

            {/* Features */}
            <h2 className="text-xl font-display font-semibold text-white mb-4">Key Features</h2>
            <ul className="space-y-3">
              {project.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: cat.accent }}
                  />
                  <span className="text-white/50 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Engine */}
            <div className="glass rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3">Engine</h3>
              <p className="text-white/60 text-sm">{project.engine}</p>
            </div>

            {/* Platforms */}
            <div className="glass rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3">Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {project.platforms.map((p) => (
                  <span key={p} className="tech-pill">{p}</span>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="glass rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span key={t} className="tech-pill">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="divider-gradient mb-12" />
          <h2 className="text-2xl font-display font-bold text-white mb-8">
            More {cat.fullName} Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ProjectDetail;
