import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-black text-gray-300 p-4 fixed top-0 left-0 w-full z-50 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-100">Saif's Unity Portfolio</h1>
                <ul className="flex space-x-4">
                    <li><Link to="/" className="hover:text-gray-400">About</Link></li>
                    <li><Link to="/" className="hover:text-gray-400">Projects</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
