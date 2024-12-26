import React, { useState, useEffect } from "react";
import logo1 from "../logo1.svg";
import logo2 from "../logo2.svg";
import logo3 from "../logo3.svg";
import logo4 from "../logo4.svg";
import logo5 from "../logo5.svg";
import logo6 from "../logo6.svg";
import logo7 from "../logo7.svg";
import logo8 from "../logo8.svg";
import movie from "../movie.mp4";
function About() {
    const [logos, setLogos] = useState([logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8]);
    const [introMovie,setMovie] = useState(movie);
    // Reviews Data
    const reviews = [
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
            review: "After a long collaboartion with Saif in the last two years, we have finally completed our complex gaming project. I would rate 10 stars for him if upwork allows that.\n" +
                "\n" +
                "He is very professional in both backend and frontend coding and with the full stack skill it reduced unneccessary communication between frontend dev and backend guy.\n" +
                "\n" +
                "I would like to wish the best of him and highly recommend to work with Saif.",
            website: "https://pracer.en.uptodown.com/android",
        },
    ];

    const [previews, setPreviews] = useState({}); // Store fetched previews
    const [isFetched, setIsFetched] = useState(false); // Prevent refetching

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
            if (isFetched) return; // Prevent refetching
            const promises = reviews.map((review) => fetchPreview(review.website));
            const results = await Promise.all(promises);

            const previewsMap = {};
            results.forEach((result, index) => {
                if (result) {
                    previewsMap[reviews[index].website] = result;
                }
            });
            setPreviews(previewsMap);
            setIsFetched(true); // Mark as fetched
        };

        fetchPreviews();
    }, [isFetched, reviews]);

    return (
        <section id="about" className="w-full pb-4">
            {/* Introductory Panel with Video */}
            <div className="relative h-[700px] w-auto m-0 p-0">
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    src={introMovie}
                    autoPlay
                    loop
                    muted
                ></video>
                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                    <h1 className="text-5xl font-bold text-white text-center">Welcome to My Gaming World</h1>
                </div>
            </div>
            {/* Existing About Content */}
            <div className="bg-black bg-opacity-50 p-12 px-96 rounded-lg shadow-lg text-center">
                <h1 className="text-4xl font-bold text-gray-100 mb-6">A little About Me</h1>
                <p className="text-gray-200 text-lg mb-8">
                    Hi, my name is Saif Ur Rehman. I am a passionate Unity game developer with a keen eye for detail and
                    a drive to create immersive gaming experiences.
                    From multiplayer battles to VR adventures, I specialize in bringing innovative ideas to life.
                </p>

                {/* Skillset Section */}
                <h2 className="text-3xl font-bold text-gray-100 mb-4">My Expertise</h2>
                <ul className="text-gray-200 text-lg leading-loose list-disc list-inside mb-8 text-left">
                    <li>Developing multiplayer games using Unity's server-based architecture</li>
                    <li>Creating immersive Virtual Reality (VR) experiences for modern VR headsets</li>
                    <li>Optimizing performance for mobile and desktop platforms</li>
                    <li>Building AI-powered NPCs and enemy behaviors</li>
                    <li>Implementing in-app purchases (IAP) and monetization strategies</li>
                </ul>

                {/* Achievements Section */}
                <h2 className="text-3xl font-bold text-gray-100 mb-4">Key Achievements</h2>
                <p className="text-gray-200 text-lg mb-4">
                    Over the years, I’ve had the privilege to work on exciting projects that showcase my skills and
                    creativity:
                </p>
                <ul className="text-gray-200 text-lg leading-loose list-disc list-inside mb-8 text-left">
                    <li>Published 5+ multiplayer games with global player bases</li>
                    <li>100+ Satisfied Clients</li>
                    <li>100% Client Success</li>
                    <li>Successfully launched VR training simulations for enterprise clients</li>
                    <li>Collaborated with artists and designers to create stunning game environments</li>
                    <li>Received player accolades for engaging gameplay mechanics</li>
                </ul>

                {/* Vision Section */}
                <h2 className="text-3xl font-bold text-gray-100 mb-4">My Vision</h2>
                <p className="text-gray-200 text-lg mb-8">
                    I believe games have the power to transport players into worlds of wonder, challenge, and joy. My
                    vision is to
                    continue creating experiences that resonate with players and push the boundaries of what's possible
                    in game development.
                </p>

                {/* Call to Action */}
                <p className="text-gray-200 text-lg">
                    Interested in collaborating or learning more about my projects? Feel free to reach out or explore my
                    portfolio further.
                </p>
            </div>

            {/* Client Reviews Section */}
            <div className="mt-12 px-10">
                <h2 className="text-3xl font-bold text-gray-100 text-center mb-8">What My Clients Say</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <div key={index} className="relative bg-black bg-opacity-60 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-300 transform hover:scale-105">
                            <h3 className="text-lg font-bold text-gray-100">{review.name}</h3>
                            <p className="text-sm text-gray-400 mb-4">{review.role}</p>
                            <p className="text-gray-200 mb-4">{review.review}</p>
                            {previews[review.website] && (
                                <a
                                    href={review.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block border border-gray-600 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                                >
                                    <img
                                        src={previews[review.website].image}
                                        alt={previews[review.website].title}
                                        className="w-full object-cover"
                                    />
                                    <div className="p-3">
                                        <h4 className="text-sm font-bold text-gray-100">
                                            {previews[review.website].title}
                                        </h4>
                                        <p className="text-xs text-gray-400">
                                            {previews[review.website].description}
                                        </p>
                                    </div>
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {/* Scrolling Logos Section */}
            <div className="mt-12">
                <h2 className="text-3xl font-bold text-gray-100 text-center mb-8">My Clients</h2>
                <div className="relative overflow-hidden">
                    <div className="flex animate-scroll whitespace-nowrap gap-8">
                        {logos.concat(logos).map((logo, index) => (
                            <div
                                key={index}
                                className="bg-black p-4 bg-opacity-0 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex-shrink-0 hover:shadow-2xl transition-transform duration-300 transform hover:scale-105"
                            >
                                <img
                                    src={logo}
                                    alt={`Client logo ${index + 1}`}
                                    className="w-64 h-16 object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <style jsx>{`
                    .animate-scroll {
                        animation: scroll 20s linear infinite;
                    }

                    @keyframes scroll {
                        0% {
                            transform: translateX(0);
                        }
                        100% {
                            transform: translateX(-100%);
                        }
                    }
                `}</style>
            </div>
        </section>
    );
}

export default About;
