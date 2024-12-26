import React, { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";

function Projects() {
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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

    return (
        <section id="projects" className="">
            <h1 className="text-4xl font-bold text-gray-100 mb-12 text-center">Projects I am Proud of</h1>
            {isLoading ? (
                <div className="space-y-4">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="bg-gray-800 rounded-lg shadow-lg p-4 animate-pulse">
                            <div className="bg-gray-700 rounded mb-4"></div>
                            <div className="bg-gray-700 rounded  mb-2"></div>
                            <div className="bg-gray-700 rounded "></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="space-y-12">
                    {videos.map((video, index) => (
                        <VideoCard
                            key={index}
                            title={video.title}
                            url={video.url}
                            description={video.description}
                            techStack={video.techStack}
                            animateOnView={true} // Pass prop to trigger animation when in viewport
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default Projects;
