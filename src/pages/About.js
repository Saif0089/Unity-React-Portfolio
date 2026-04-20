import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES, getFeaturedProjects, getYouTubeThumbnail } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import StatsCounter from "../components/StatsCounter";
import Footer from "../components/Footer";
import logo1 from "../logo1.svg";
import logo2 from "../logo2.svg";
import logo3 from "../logo3.svg";
import logo4 from "../logo4.svg";
import logo5 from "../logo5.svg";
import logo6 from "../logo6.svg";
import logo7 from "../logo7.svg";
import logo8 from "../logo8.svg";

const HERO_TITLE = "Welcome to My Gaming Universe";
const categories = Object.values(CATEGORIES);

function About() {
  const logos = useMemo(() => [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8], []);
  const featured = useMemo(() => getFeaturedProjects().slice(0, 6), []);

  const reviews = useMemo(
    () => [
      {
        name: "Joseph Luciano",
        role: "CEO at AvaSci",
        review: "Saif's work exceeded my expectations! He delivered our VR project ahead of schedule, and the quality was top-notch.",
      },
      {
        name: "Martin",
        role: "Game Director at Trace3D",
        review: "Working with Saif was a pleasure. His Unity expertise brought our multiplayer game to life flawlessly.",
      },
      {
        name: "Haki",
        role: "Direct Company",
        review: "Saif's ability to create immersive experiences is unparalleled. Highly recommend him for any VR projects!",
      },
      {
        name: "Equipe Technique",
        role: "Direct Company",
        review: "I had the pleasure of working with Saif. He's dedicated, intelligent, and creative. He delivered exactly what we wanted.",
      },
      {
        name: "Yufeng Cai",
        role: "CEO, Project Racer",
        review: "After a long collaboration in the last two years, we completed our complex gaming project. I would rate 10 stars if allowed. Very professional in both backend and frontend.",
      },
      {
        name: "Kenny",
        role: "CEO, Super RC Game",
        review: "Great developer with good experience. Delivered exactly what was needed for our game project.",
      },
    ],
    []
  );

  const [typedTitle, setTypedTitle] = useState("");

  // Typewriter effect
  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      frame += 1;
      if (frame >= HERO_TITLE.length) {
        clearInterval(interval);
        setTypedTitle(HERO_TITLE);
        return;
      }
      setTypedTitle(HERO_TITLE.slice(0, frame));
    }, 80);
    return () => clearInterval(interval);
  }, []);

  // Reveal on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    const elements = document.querySelectorAll("[data-reveal]");
    elements.forEach((el) => {
      el.classList.add("reveal");
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <main className="w-full">
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-300% animate-gradient-shift" style={{
          backgroundImage: "linear-gradient(135deg, #070814 0%, #1a0533 25%, #070814 50%, #0a1628 75%, #070814 100%)"
        }} />

        {/* Accent glow spots */}
        <div className="absolute top-[15%] left-[10%] w-[500px] h-[500px] rounded-full opacity-20 animate-float-slow" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.4), transparent 70%)" }} />
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full opacity-15 animate-float-delayed" style={{ background: "radial-gradient(circle, rgba(6,182,212,0.4), transparent 70%)" }} />
        <div className="absolute top-[50%] right-[30%] w-[300px] h-[300px] rounded-full opacity-10 animate-float-slow" style={{ background: "radial-gradient(circle, rgba(244,63,94,0.4), transparent 70%)" }} />

        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-30" />

        {/* Main content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-12">
          <div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-12 items-center">
            {/* Left: Text */}
            <div>
              <div className="flex items-center gap-3 mb-6 animate-fade-in">
                <div className="h-[1px] w-8 bg-gradient-to-r from-violet-500 to-transparent" />
                <span className="text-xs uppercase tracking-[0.3em] text-white/40 font-medium">
                  Unity Specialist & Technical Artist
                </span>
              </div>

              <h1 className="typewriter text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white mb-6 leading-[1.1]">
                {typedTitle || HERO_TITLE}
              </h1>

              <p className="max-w-lg text-base sm:text-lg text-white/45 leading-relaxed mb-10">
                From rapid prototypes to AAA-ready builds, I architect fluid gameplay systems,
                cinematic visuals, and immersive interactions that ship on every major platform.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-12">
                <Link
                  to="/projects"
                  className="btn-aurora rounded-full px-8 py-3.5 text-sm font-semibold text-white"
                >
                  View All Projects
                </Link>
              </div>

              {/* Inline stats row */}
              <div className="flex flex-wrap gap-8">
                {[
                  { val: "8+", label: "Years" },
                  { val: "120+", label: "Builds Shipped" },
                  { val: "6", label: "Platforms" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-display font-bold gradient-text-accent">{s.val}</p>
                    <p className="text-xs text-white/30 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Project thumbnail grid */}
            <div className="hidden lg:block relative">
              <div className="grid grid-cols-2 gap-3">
                {featured.slice(0, 4).map((p, i) => {
                  const thumb = p.youtubeId ? getYouTubeThumbnail(p.youtubeId, "hq") : p.thumbnailUrl || null;
                  const isLocalVid = !thumb && p.videoUrl && p.videoUrl.startsWith("/videos/");
                  const c = CATEGORIES[p.category] || CATEGORIES.games;
                  return (
                    <Link
                      key={p.id}
                      to={`/project/${p.slug}`}
                      className="group relative rounded-xl overflow-hidden aspect-video animate-fade-in"
                      style={{ animationDelay: `${0.3 + i * 0.15}s` }}
                    >
                      {thumb ? (
                        <img src={thumb} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                      ) : isLocalVid ? (
                        <video src={`${p.videoUrl}#t=0.5`} muted playsInline preload="metadata" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      ) : (
                        <div className="w-full h-full" style={{ background: `linear-gradient(135deg, rgba(${c.accentRgb},0.2), rgba(${c.accentRgb},0.05))` }} />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <span className="text-[10px] uppercase tracking-wider font-medium" style={{ color: c.accent }}>{c.name}</span>
                        <p className="text-xs text-white/80 font-medium line-clamp-1">{p.title}</p>
                      </div>
                      {/* Hover border glow */}
                      <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-white/20 transition-colors duration-300" />
                    </Link>
                  );
                })}
              </div>
              {/* Decorative glow behind grid */}
              <div className="absolute -inset-8 -z-10 rounded-3xl opacity-30" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.2), transparent 70%)" }} />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float-slow">
          <div className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
            <div className="w-1 h-2 rounded-full bg-white/40 animate-pulse-glow" />
          </div>
        </div>
      </section>

      {/* ── CATEGORY SHOWCASE ─────────────────────────────────────── */}
      <section data-reveal className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-display font-bold gradient-text mb-3">
            What I Build
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Deep expertise across five domains — each with its own technical demands and creative opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 stagger-children">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={cat.route}
              className="group relative glass glass-hover rounded-xl p-6 text-center transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              {/* Glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 100%, rgba(${cat.accentRgb}, 0.15), transparent 70%)`,
                }}
              />

              <div className="relative z-10">
                <span className="text-3xl block mb-3">{cat.icon}</span>
                <h3 className="text-sm font-display font-semibold text-white mb-1">
                  {cat.name}
                </h3>
                <p className="text-xs text-white/30">{cat.tagline}</p>
              </div>

              {/* Bottom accent */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(90deg, transparent, ${cat.accent}, transparent)`,
                }}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* ── ABOUT ME ──────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-10">
          <div className="space-y-8">
            <article data-reveal className="glass rounded-xl p-8">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
                A Little About Me
              </h2>
              <p className="text-white/50 leading-relaxed mb-4">
                Hi, I'm Saif Ur Rehman — a Unity game developer obsessed with creating worlds
                that surprise players. Whether it's a VR laboratory, a multiplayer arena, or
                a cinematic experience, I translate ambitious ideas into polished, optimized builds.
              </p>
              <p className="text-white/40 leading-relaxed">
                Collaboration keeps my process fast and transparent. I iterate with designers,
                artists, and producers in real time, shaping mechanics and visuals around
                clear player goals.
              </p>
            </article>

            <article data-reveal className="glass rounded-xl p-8">
              <h3 className="text-xl sm:text-2xl font-display font-semibold text-white mb-5">
                My Expertise
              </h3>
              <div className="space-y-3">
                {[
                  { title: "Multiplayer Architecture", desc: "Authoritative servers, lag compensation, and cheat mitigation" },
                  { title: "VR/AR Interaction Design", desc: "Purpose-built UX for Quest, Vive, Pico, and AR ecosystems" },
                  { title: "Performance Optimization", desc: "GPU/CPU profiling for buttery-smooth performance on all platforms" },
                  { title: "AI & Procedural Systems", desc: "Behavior trees, procedural encounters, and adaptive difficulty" },
                  { title: "Live-Ops Integration", desc: "Analytics, monetization, and player-first balance" },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="card-sheen rounded-lg border border-white/8 bg-[rgba(10,10,30,0.5)] backdrop-blur-xl px-5 py-4 transition-all duration-200 hover:border-white/12"
                  >
                    <h4 className="text-sm font-semibold text-white mb-1">{item.title}</h4>
                    <p className="text-xs text-white/40">{item.desc}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <div className="space-y-8">
            {/* Stats */}
            <div data-reveal>
              <StatsCounter />
            </div>

            {/* Experience pillars */}
            <article data-reveal className="glass rounded-xl p-8">
              <h3 className="text-xl sm:text-2xl font-display font-semibold text-white mb-5">
                Experience Pillars
              </h3>
              <div className="space-y-4">
                {[
                  {
                    title: "Immersive Storytelling",
                    desc: "Cinematic pacing, dynamic lighting, and spatial audio combine to place players inside unforgettable narratives.",
                  },
                  {
                    title: "Technical Reliability",
                    desc: "From netcode to asset streaming, every system is profiled and battle-tested for launch-ready performance.",
                  },
                  {
                    title: "Player-Centric Design",
                    desc: "Tight controls, intuitive UX, and rewarding feedback loops keep players engaged and invested.",
                  },
                ].map((pillar) => (
                  <div key={pillar.title} className="card-sheen rounded-lg border border-white/8 bg-[rgba(10,10,30,0.5)] backdrop-blur-xl p-5">
                    <h4 className="text-base font-semibold text-white mb-2">{pillar.title}</h4>
                    <p className="text-sm text-white/40 leading-relaxed">{pillar.desc}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="divider-gradient mb-12" />
        <div data-reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold gradient-text mb-2">
              Featured Work
            </h2>
            <p className="text-white/40">
              Highlights from across AR, VR, games, 3D, and simulation.
            </p>
          </div>
          <Link
            to="/projects"
            className="text-sm font-medium text-white/40 hover:text-white border border-white/10 hover:border-white/20 rounded-full px-5 py-2 transition-all duration-200 self-start sm:self-auto"
          >
            View all projects
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="divider-gradient mb-12" />
        <div data-reveal className="text-center mb-10">
          <h2 className="text-2xl sm:text-4xl font-display font-bold gradient-text mb-3">
            What Clients Say
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            From indie visionaries to enterprise teams — partners who trusted me to
            bring their interactive ambitions to life.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <article
              key={review.name}
              data-reveal
              className="card-glow glass glass-hover rounded-xl p-6 flex flex-col transition-all duration-300 hover:-translate-y-1"
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-base font-semibold text-white">{review.name}</h3>
                  <span className="text-xs text-white/30">{review.role}</span>
                </div>
                {/* Star rating */}
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <svg
                      key={j}
                      className="w-3.5 h-3.5 text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-sm text-white/40 leading-relaxed flex-1">"{review.review}"</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── CLIENTS MARQUEE ───────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="divider-gradient mb-12" />
        <div data-reveal className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-display font-bold gradient-text mb-3">
            Teams I've Empowered
          </h2>
          <p className="text-white/40 max-w-lg mx-auto text-sm">
            Studios, startups, and enterprise partners who trusted me with their interactive ambitions.
          </p>
        </div>

        <div className="relative overflow-hidden glass rounded-xl p-6">
          <div className="marquee-track gap-6">
            {logos.concat(logos).map((logo, index) => (
              <div
                key={`logo-${index}`}
                className="flex h-20 w-36 items-center justify-center rounded-lg border border-white/8 bg-[rgba(10,10,30,0.5)] backdrop-blur-xl px-5 py-3 flex-shrink-0 transition-all duration-300 hover:-translate-y-1 hover:border-white/12"
              >
                <img
                  src={logo}
                  alt={`Client logo ${(index % logos.length) + 1}`}
                  className="h-10 w-full object-contain opacity-50 hover:opacity-80 transition-opacity"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, rgba(139, 92, 246, 0.2), transparent 70%)",
          }}
        />
        <div data-reveal className="relative max-w-3xl mx-auto px-6 py-24 text-center">
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-white mb-4">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-white/40 mb-8 max-w-lg mx-auto">
            Whether you need a VR prototype, a multiplayer game, or an AR experience
            — let's discuss how to bring your vision to life.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:saif@devhouse.co"
              className="btn-aurora rounded-full px-8 py-3.5 text-sm font-semibold text-white"
            >
              Start a Conversation
            </a>
            <Link
              to="/projects"
              className="rounded-full px-8 py-3.5 text-sm font-semibold text-white/60 border border-white/10 hover:border-white/20 hover:text-white transition-all duration-300"
            >
              Browse Portfolio
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default About;
