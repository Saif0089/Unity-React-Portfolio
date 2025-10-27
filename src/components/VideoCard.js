import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

function VideoCard({ title, url, description, techStack = [], index }) {
    const cardRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const formattedIndex = typeof index === "number" ? index.toString().padStart(2, "0") : "—";

    useEffect(() => {
        if (typeof window === "undefined") {
            return undefined;
        }

        const handleVisibility = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsPlaying(true);
                } else {
                    setIsPlaying(false);
                }
            });
        };

        const observer = new IntersectionObserver(handleVisibility, { threshold: 0.4 });

        const node = cardRef.current;
        if (node) {
            observer.observe(node);
        }

        return () => {
            if (node) {
                observer.unobserve(node);
            }
        };
    }, []);

    return (
        <article
            ref={cardRef}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-6 shadow-xl backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-white/30 sm:p-8"
        >
            <div className="pointer-events-none absolute inset-x-14 -top-48 h-56 rounded-full bg-gradient-to-r from-emerald-400/20 via-indigo-400/20 to-purple-500/20 blur-3xl transition duration-700 group-hover:scale-110"></div>
            <div className="relative grid gap-6 lg:grid-cols-[1.05fr,1fr]">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200/80">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                        Project {formattedIndex}
                    </div>
                    <h2 className="text-2xl font-bold text-white sm:text-3xl">{title}</h2>
                    <p className="text-sm leading-relaxed text-slate-200/80 sm:text-base">{description}</p>
                    {techStack.length > 0 && (
                        <div className="mt-2">
                            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300/70">Tech Stack</h3>
                            <ul className="mt-3 flex flex-wrap gap-2">
                                {techStack.map((tech) => (
                                    <li
                                        key={`${title}-${tech}`}
                                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-slate-100/80"
                                    >
                                        {tech}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-inner">
                    <div className="relative aspect-video">
                        <ReactPlayer
                            url={url}
                            playing={isPlaying}
                            controls={false}
                            width="100%"
                            height="100%"
                            className="absolute inset-0"
                            muted
                            loop
                        />
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-indigo-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                </div>
            </div>
        </article>
    );
}

export default VideoCard;
