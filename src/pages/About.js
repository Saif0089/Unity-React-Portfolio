import React, { useEffect, useMemo, useState } from "react";
import logo1 from "../logo1.svg";
import logo2 from "../logo2.svg";
import logo3 from "../logo3.svg";
import logo4 from "../logo4.svg";
import logo5 from "../logo5.svg";
import logo6 from "../logo6.svg";
import logo7 from "../logo7.svg";
import logo8 from "../logo8.svg";
import movie from "../movie.mp4";

const HERO_TITLE = "Welcome to My Gaming Universe";

function About() {
    const logos = useMemo(() => [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8], []);
    const reviews = useMemo(
        () => [
            {
                name: "Joseph Luciano",
                role: "CEO at AvaSci",
                review: "Saif's work exceeded my expectations! He delivered our VR project ahead of schedule, and the quality was top-notch.",
                website: "https://avasci.com/",
            },
            {
                name: "Martin",
                role: "Game Director at Trace3D",
                review: "Working with Saif was a pleasure. His Unity expertise brought our multiplayer game to life flawlessly.",
                website: "https://www.trace3d.app/",
            },
            {
                name: "Haki",
                role: "Direct Company",
                review: "Saif's ability to create immersive experiences is unparalleled. Highly recommend him for any VR projects!",
                website: "https://www.haki.com/service-and-support/design-tools/lasco",
            },
            {
                name: "Equipe Technique",
                role: "Direct Company",
                review: "I had the pleasure of working with Saif. He's dedicated, intelligent, and creative. He delivered exactly what we wanted. I would definitely work with him in the future.",
                website: "https://www.equipetechnique.com/projects",
            },
            {
                name: "Super RC Game",
                role: "Kenny CEO & Game Developer",
                review: "Great developer with good experience.",
                website: "https://bitplanetgames.com/",
            },
            {
                name: "Project Racer",
                role: "Yufeng Cai CEO",
                review:
                    "After a long collaboartion with Saif in the last two years, we have finally completed our complex gaming project. I would rate 10 stars for him if upwork allows that.\n" +
                    "\n" +
                    "He is very professional in both backend and frontend coding and with the full stack skill it reduced unneccessary communication between frontend dev and backend guy.\n" +
                    "\n" +
                    "I would like to wish the best of him and highly recommend to work with Saif.",
                website: "https://pracer.en.uptodown.com/android",
            },
        ],
        []
    );

    const highlightStats = useMemo(
        () => [
            { value: "8+", label: "Years Crafting Unity Worlds" },
            { value: "120+", label: "Playable Builds Delivered" },
            { value: "35%", label: "Average FPS Boost After Optimization" },
            { value: "6", label: "Platforms Shipped To" },
        ],
        []
    );

    const experiencePillars = useMemo(
        () => [
            {
                title: "Immersive Storytelling",
                description:
                    "Cinematic pacing, dynamic lighting, and spatial audio combine to place players inside unforgettable narratives.",
            },
            {
                title: "Technical Reliability",
                description:
                    "From netcode to asset streaming, every system is profiled and battle-tested for launch-ready performance.",
            },
            {
                title: "Player-Centric Design",
                description:
                    "Tight controls, intuitive UX, and rewarding feedback loops keep players engaged and invested.",
            },
        ],
        []
    );

    const [typedTitle, setTypedTitle] = useState("");
    const [previews, setPreviews] = useState({});
    const [isFetched, setIsFetched] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") {
            setTypedTitle(HERO_TITLE);
            return undefined;
        }

        let frame = 0;
        const interval = window.setInterval(() => {
            frame += 1;
            if (frame >= HERO_TITLE.length) {
                window.clearInterval(interval);
                setTypedTitle(HERO_TITLE);
                return;
            }
            setTypedTitle(HERO_TITLE.slice(0, frame));
        }, 80);

        return () => window.clearInterval(interval);
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") {
            return undefined;
        }
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.18 }
        );

        const elements = document.querySelectorAll("[data-reveal]");
        elements.forEach((element) => {
            element.classList.add("reveal");
            observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const fetchPreview = async (url) => {
            try {
                const response = await fetch(`https://api.linkpreview.net/?key=ac306fb1558fee10da86c2a5c235ed59&q=${encodeURIComponent(url)}`);
                const data = await response.json();
                return {
                    title: data.title || "No Title Available",
                    description: data.description || "No Description Available",
                    image: data.image || "/path/to/fallback-image.jpg",
                };
            } catch (error) {
                console.error(`Error fetching LinkPreview data for ${url}:`, error);
                return null;
            }
        };

        const fetchPreviews = async () => {
            if (isFetched) return;
            const promises = reviews.map((review) => fetchPreview(review.website));
            const results = await Promise.all(promises);

            const previewsMap = {};
            results.forEach((result, index) => {
                if (result) {
                    previewsMap[reviews[index].website] = result;
                }
            });
            setPreviews(previewsMap);
            setIsFetched(true);
        };

        fetchPreviews();
    }, [isFetched, reviews]);

    return (
        <section id="about" className="w-full pb-16 sm:pb-24 bg-gradient-to-b from-black via-slate-950 to-black">
            <div className="relative min-h-[420px] sm:min-h-[520px] lg:h-[720px] w-full overflow-hidden">
                <video className="absolute inset-0 w-full h-full object-cover" src={movie} autoPlay loop muted playsInline></video>
                <div className="absolute inset-0 bg-black/70 sm:bg-black/65 backdrop-blur-[2px]" aria-hidden="true"></div>
                <div className="aurora-glow absolute inset-0" aria-hidden="true"></div>
                <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center gap-6 px-5 text-center">
                    <span className="rounded-full border border-white/10 bg-white/10 px-6 py-2 text-xs uppercase tracking-[0.3em] text-slate-200">
                        Unity Specialist & Technical Artist
                    </span>
                    <h1 className="typewriter text-3xl font-semibold text-white sm:text-5xl lg:text-6xl">
                        {typedTitle || HERO_TITLE}
                    </h1>
                    <p className="max-w-3xl text-sm text-slate-200/85 sm:text-lg">
                        From rapid prototypes to AAA-ready builds, I architect fluid gameplay systems, cinematic visuals, and immersive interactions that ship on every major platform.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                        <a href="#projects" className="btn-aurora rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg">
                            View Featured Projects
                        </a>
                        <a
                            href="mailto:saif@example.com?subject=Unity%20Project%20Collaboration"
                            className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition-all hover:border-white/40 hover:bg-white/10 hover:text-white"
                        >
                            Let&apos;s Collaborate
                        </a>
                    </div>
                </div>
            </div>

            <div className="mx-auto mt-16 grid max-w-6xl gap-10 px-5 lg:grid-cols-[1.1fr,0.9fr]">
                <div className="space-y-12">
                    <article data-reveal className="rounded-3xl border border-white/5 bg-white/5 p-8 shadow-2xl backdrop-blur-sm">
                        <h2 className="text-3xl font-bold text-white sm:text-4xl">A little About Me</h2>
                        <p className="mt-4 text-base leading-relaxed text-slate-200/90 sm:text-lg">
                            Hi, I&apos;m Saif Ur Rehman — a Unity game developer obsessed with creating worlds that surprise players. Whether it&apos;s a VR laboratory, a multiplayer arena, or a cinematic experience, I translate ambitious ideas into polished, optimized builds.
                        </p>
                        <p className="mt-4 text-base leading-relaxed text-slate-200/80 sm:text-lg">
                            Collaboration keeps my process fast and transparent. I iterate with designers, artists, and producers in real time, shaping mechanics and visuals around clear player goals.
                        </p>
                    </article>

                    <article data-reveal className="rounded-3xl border border-white/5 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 shadow-2xl backdrop-blur-md">
                        <h3 className="text-2xl font-semibold text-white sm:text-3xl">My Expertise</h3>
                        <ul className="mt-5 space-y-4 text-slate-200/90">
                            <li className="card-sheen rounded-2xl border border-white/5 bg-black/40 px-5 py-4 text-sm leading-relaxed sm:text-base">
                                Developing resilient multiplayer architecture with authoritative servers, lag compensation, and cheat mitigation.
                            </li>
                            <li className="card-sheen rounded-2xl border border-white/5 bg-black/40 px-5 py-4 text-sm leading-relaxed sm:text-base">
                                Building immersive VR interactions and UX flows tailored for Quest, Vive, and Pico ecosystems.
                            </li>
                            <li className="card-sheen rounded-2xl border border-white/5 bg-black/40 px-5 py-4 text-sm leading-relaxed sm:text-base">
                                Profiling and optimizing GPU/CPU hot paths to deliver buttery-smooth performance on desktop and mobile.
                            </li>
                            <li className="card-sheen rounded-2xl border border-white/5 bg-black/40 px-5 py-4 text-sm leading-relaxed sm:text-base">
                                Designing AI-driven NPC behavior trees, procedural encounters, and adaptive difficulty systems.
                            </li>
                            <li className="card-sheen rounded-2xl border border-white/5 bg-black/40 px-5 py-4 text-sm leading-relaxed sm:text-base">
                                Integrating live-ops hooks, analytics, and monetization while preserving player-first balance.
                            </li>
                        </ul>
                    </article>

                    <article data-reveal className="rounded-3xl border border-white/5 bg-black/40 p-8 shadow-2xl backdrop-blur-sm">
                        <h3 className="text-2xl font-semibold text-white sm:text-3xl">My Vision</h3>
                        <p className="mt-4 text-base leading-relaxed text-slate-200/85 sm:text-lg">
                            Games should feel alive — bending to player choices, reacting with cinematic flair, and rewarding mastery. I&apos;m dedicated to pushing Unity beyond the expected, blending artistry with engineering to create experiences players remember.
                        </p>
                        <p className="mt-4 text-base leading-relaxed text-slate-200/80 sm:text-lg">
                            Interested in teaming up or want a technical review of your build? Let&apos;s discuss how we can elevate your next release.
                        </p>
                    </article>
                </div>

                <aside className="space-y-8">
                    <div data-reveal className="rounded-3xl border border-emerald-200/10 bg-emerald-400/5 p-8 shadow-2xl backdrop-blur-md">
                        <h3 className="text-2xl font-semibold text-white sm:text-3xl">Impact at a Glance</h3>
                        <div className="mt-6 grid grid-cols-2 gap-4">
                            {highlightStats.map((stat) => (
                                <div key={stat.label} className="card-sheen rounded-2xl border border-white/5 bg-black/40 px-5 py-6 text-center">
                                    <p className="text-3xl font-bold text-white sm:text-4xl">{stat.value}</p>
                                    <p className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-300/80 sm:text-sm">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div data-reveal className="rounded-3xl border border-white/5 bg-white/5 p-8 shadow-2xl backdrop-blur-md">
                        <h3 className="text-2xl font-semibold text-white sm:text-3xl">Experience Pillars</h3>
                        <div className="mt-6 space-y-5">
                            {experiencePillars.map((pillar) => (
                                <div key={pillar.title} className="card-sheen rounded-2xl border border-white/5 bg-black/45 px-5 py-5">
                                    <h4 className="text-lg font-semibold text-white sm:text-xl">{pillar.title}</h4>
                                    <p className="mt-2 text-sm leading-relaxed text-slate-200/85 sm:text-base">{pillar.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>

            <div className="mx-auto mt-20 max-w-6xl px-5">
                <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">What My Clients Say</h2>
                <p className="mx-auto mt-3 max-w-3xl text-center text-sm text-slate-300/80 sm:text-base">
                    From indie visionaries to enterprise teams, partners trust me to design reliable pipelines, polished gameplay, and unforgettable immersion.
                </p>
                <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-3">
                    {reviews.map((review) => (
                        <article
                            key={review.name}
                            data-reveal
                            className="card-glow card-sheen flex flex-col rounded-3xl border border-white/5 bg-white/5 p-7 text-left shadow-2xl backdrop-blur-md transition duration-500 hover:-translate-y-1"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-white sm:text-xl">{review.name}</h3>
                                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs uppercase tracking-wide text-slate-200/75">
                                    {review.role}
                                </span>
                            </div>
                            <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-200/80 sm:text-base">{review.review}</p>
                            {previews[review.website] && (
                                <a
                                    href={review.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black/40 transition duration-500 hover:border-white/30"
                                >
                                    <img
                                        src={previews[review.website].image}
                                        alt={previews[review.website].title}
                                        className="h-40 w-full object-cover"
                                    />
                                    <div className="space-y-1 p-4">
                                        <p className="text-sm font-semibold text-white">{previews[review.website].title}</p>
                                        <p className="text-xs leading-relaxed text-slate-300/75">
                                            {previews[review.website].description}
                                        </p>
                                    </div>
                                </a>
                            )}
                        </article>
                    ))}
                </div>
            </div>

            <div className="mx-auto mt-24 max-w-6xl px-5">
                <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">Teams I&apos;ve Empowered</h2>
                <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-300/80 sm:text-base">
                    A snapshot of studios, startups, and partners who trusted me to bring their interactive ambitions to life.
                </p>
                <div className="relative mt-10 overflow-hidden rounded-3xl border border-white/5 bg-white/5 p-6 shadow-2xl backdrop-blur-md">
                    <div className="marquee-track gap-8">
                        {logos.concat(logos).map((logo, index) => (
                            <div
                                key={`${logo}-${index}`}
                                className="flex h-24 w-40 items-center justify-center rounded-2xl border border-white/10 bg-black/40 px-6 py-4 backdrop-blur-sm transition duration-500 hover:-translate-y-1 hover:border-white/30"
                            >
                                <img src={logo} alt={`Client logo ${index + 1}`} className="h-12 w-full object-contain" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
