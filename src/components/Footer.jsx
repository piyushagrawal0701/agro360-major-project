import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-20 bg-gradient-to-t from-[#0f2e1c] to-[#1f5f3b] text-gray-200 px-6 md:px-16 py-12 rounded-t-3xl">

      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white">🌱 Agro360</h1>
          </Link>

          <p className="text-sm text-gray-300 max-w-sm">
            Empowering farmers with smart tools for crop health, fertilizers,
            government schemes, and better agricultural decisions.
          </p>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-md font-semibold text-white mb-4">Features</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/fertilizers" className="hover:text-green-300">Fertilizer Info</Link></li>
            <li><Link to="/crop-doctor" className="hover:text-green-300">Crop Doctor</Link></li>
            <li><Link to="/crop-scheduler" className="hover:text-green-300">Crop Scheduler</Link></li>
            <li><Link to="/agri-bazaar" className="hover:text-green-300">AgriBazaar</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-md font-semibold text-white mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/schemes" className="hover:text-green-300">Government Schemes</Link></li>
            <li><span className="text-gray-300">Farming Tips</span></li>
            <li><span className="text-gray-300">Weather Updates</span></li>
            <li><span className="text-gray-300">Soil Guidance</span></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-md font-semibold text-white mb-4">Contact</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Email: support@agro360.com</li>
            <li>Phone: +91 8839170393</li>
            <li>India 🌾</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 pt-6 border-t border-green-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
        <p>© 2026 Agro360. Built for Farmers 🌱</p>
        <p>Made with ❤️ by Syntax Error</p>
      </div>

      {/* Glow Branding */}
      <div className="relative mt-12">
        <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-3xl h-40 bg-green-500 rounded-full blur-[120px] opacity-30" />
        <h1 className="text-center font-extrabold text-transparent text-[clamp(3rem,10vw,7rem)] opacity-20 [-webkit-text-stroke:1px_#bbf7d0]">
          Agro360
        </h1>
      </div>

    </footer>
  );
};

export default Footer;