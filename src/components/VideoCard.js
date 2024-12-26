import React, { useRef, useEffect, useState } from "react";
import ReactPlayer from "react-player";

function VideoCard({ title, url, description, techStack = [] }) {
    const playerRef = useRef(null);
    const cardRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const handleVisibility = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsPlaying(true); // Autoplay when visible
                } else {
                    setIsPlaying(false); // Pause when not visible
                }
            });
        };

        const observer = new IntersectionObserver(handleVisibility, { threshold: 0.5 });

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className="relative bg-black bg-opacity-50 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-300 transform hover:scale-105 max-w-4xl mx-auto"
        >
            {/* Video Details */}
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-100 mb-2">{title}</h2>
                <p className="text-gray-200">{description}</p>
            </div>

            {/* Responsive Video Player */}
            <div className="relative pt-[56.25%] rounded-lg overflow-hidden">
                <ReactPlayer
                    ref={playerRef}
                    url={url}
                    playing={isPlaying}
                    controls={false} // Disable native YouTube controls
                    width="100%"
                    height="100%"
                    className="absolute top-0 left-0 w-full h-full"
                    muted
                    loop
                />
                {/* Invisible Panel to Block User Interaction */}
                <div
                    className="absolute inset-0 z-10"
                    style={{ backgroundColor: "transparent", pointerEvents: "all" }}
                ></div>
            </div>

            {/* Tech Stack */}
            {techStack.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-xl font-semibold text-gray-100 mb-2">Technology Stack</h3>
                    <ul className="flex flex-wrap gap-2">
                        {techStack.map((tech, index) => (
                            <li
                                key={index}
                                className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm shadow-sm"
                            >
                                {tech}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default VideoCard;
