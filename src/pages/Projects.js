import React, { useEffect, useMemo, useState } from "react";
import VideoCard from "../components/VideoCard";

function Projects() {
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, []);

    useEffect(() => {
        fetch("/data/videos.json")
            .then((response) => response.json())
            .then((data) => {
                setVideos(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error loading videos.json:", error);
                setIsLoading(false);
            });
    }, []);

    const highlightStacks = useMemo(() => {
        const stackSet = new Set();
        videos.forEach((video) => {
            (video.techStack || []).forEach((stack) => stackSet.add(stack));
        });
        return Array.from(stackSet).slice(0, 6);
    }, [videos]);

    return (
        <main className="w-full bg-gradient-to-b from-black via-slate-950 to-black text-slate-100">
            <section className="relative overflow-hidden">
                <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl sm:-left-16 sm:h-96 sm:w-96"></div>
                <div className="absolute bottom-0 right-[-6rem] h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl sm:h-80 sm:w-80"></div>
                <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 px-5 pb-20 pt-28 text-center sm:px-8 sm:pt-32 sm:pb-24 md:text-left">
                    <span className="mx-auto max-w-max rounded-full border border-white/10 bg-white/10 px-5 py-2 text-xs uppercase tracking-[0.35em] text-slate-200/80 md:mx-0">
                        Signature Projects
                    </span>
                    <h1 className="text-3xl font-semibold leading-tight text-white sm:text-5xl">
                        Interactive experiences crafted to <span className="text-emerald-300">delight players</span> and deliver results.
                    </h1>
                    <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-300/85 sm:text-base md:mx-0">
                        Every build is engineered with precision, optimized for performance, and infused with cinematic flair. Explore the showcase below to see how gameplay, visuals, and systems design unite in each release.
                    </p>
                    <div className="mx-auto flex flex-col items-center gap-3 sm:flex-row sm:justify-start md:mx-0">
                        <a
                            href="mailto:saif@example.com?subject=Project%20Inquiry"
                            className="btn-aurora rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg"
                        >
                            Start a Project Conversation
                        </a>
                        <a
                            href="#showreel"
                            className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition-all hover:border-white/40 hover:bg-white/10 hover:text-white"
                        >
                            Browse the Showcase
                        </a>
                    </div>
                </div>
            </section>

            <section id="showreel" className="relative mx-auto -mt-10 max-w-6xl px-5 pb-24 sm:px-8">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-lg sm:p-10">
                    <div className="flex flex-col gap-6 pb-8 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold text-white sm:text-3xl">Featured Experiences</h2>
                            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-300/80 sm:text-base">
                                A curated tour of shipped projects ranging from VR labs and multiplayer arenas to data-rich enterprise visualizations.
                            </p>
                        </div>
                        {highlightStacks.length > 0 && (
                            <ul className="flex flex-wrap justify-center gap-2 md:justify-end">
                                {highlightStacks.map((stack) => (
                                    <li
                                        key={stack}
                                        className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-200/80"
                                    >
                                        {stack}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {isLoading ? (
                        <div className="grid gap-6 md:grid-cols-2">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="animate-pulse overflow-hidden rounded-3xl border border-white/5 bg-black/40 p-6 sm:p-8"
                                >
                                    <div className="aspect-video rounded-2xl bg-white/5"></div>
                                    <div className="mt-5 h-5 w-3/4 rounded-full bg-white/10"></div>
                                    <div className="mt-3 h-4 w-full rounded-full bg-white/5"></div>
                                    <div className="mt-3 h-4 w-2/3 rounded-full bg-white/5"></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid gap-10">
                            {videos.map((video, index) => (
                                <VideoCard
                                    key={`${video.title}-${index}`}
                                    index={index + 1}
                                    title={video.title}
                                    url={video.url}
                                    description={video.description}
                                    techStack={video.techStack}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}

export default Projects;
