import React from "react";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../data/projects";

const Footer = () => {
  const categories = Object.values(CATEGORIES);

  return (
    <footer className="relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="text-xl font-display font-bold text-white">
              Saif<span className="gradient-text-accent">.</span>dev
            </Link>
            <p className="mt-4 text-sm text-white/40 leading-relaxed">
              Unity developer crafting immersive experiences across AR, VR, games,
              and interactive simulations. 8+ years shipping to 6 platforms.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">
              Portfolio
            </h4>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={cat.route}
                    className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: cat.accent }}
                    />
                    {cat.fullName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Expertise */}
          <div>
            <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">
              Expertise
            </h4>
            <ul className="space-y-2.5 text-sm text-white/40">
              <li>Multiplayer Architecture</li>
              <li>VR/AR Interaction Design</li>
              <li>Performance Optimization</li>
              <li>Real-time 3D Rendering</li>
              <li>Physics Simulations</li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">
              Connect
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:saif@devhouse.co"
                  className="text-sm text-white/40 hover:text-white transition-colors"
                >
                  saif@devhouse.co
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/saif-ur-rehman-unity/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/40 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/saifurrehman"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/40 hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-gradient my-10" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} Saif Ur Rehman. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/projects" className="text-xs text-white/25 hover:text-white/50 transition-colors">
              All Projects
            </Link>
            <Link to="/" className="text-xs text-white/25 hover:text-white/50 transition-colors">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
