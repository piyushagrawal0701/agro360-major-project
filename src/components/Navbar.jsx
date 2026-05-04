import { FaLeaf, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const letterRefs = useRef([]);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleLanguageChange = (e) => setLanguage(e.target.value);

  const animateLetters = () => {
    letterRefs.current.forEach((el, i) => {
      gsap.to(el, {
        y: -10,
        rotation: gsap.utils.random(-15, 15),
        scale: gsap.utils.random(1.1, 1.3),
        duration: 0.3,
        ease: "power2.out",
        delay: i * 0.05,
      });
    });
  };

  const resetLetters = () => {
    letterRefs.current.forEach((el) => {
      gsap.to(el, {
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.inOut",
      });
    });
  };

  useEffect(() => {
    letterRefs.current.forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 30, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          delay: i * 0.05,
          duration: 0.4,
          ease: "back.out(1.7)",
        },
      );
    });
  }, []);

  const navLinks = [
    { label: "Fertilizer Info", path: "/fertilizers" },
    { label: "Crop Doctor", path: "/crop-doctor" },
    { label: "Crop Scheduler", path: "/crop-scheduler" },
    { label: "AgriBazaar", path: "/agri-bazaar" },
    { label: "Schemes", path: "/schemes" },
  ];

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 px-2"
    >
      <div className="max-w-9xl mx-auto px-4 py-3 flex items-center justify-between bg-white/30 backdrop-blur-md border-b border-white/20 shadow-lg rounded-b-2xl">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <FaLeaf className="text-green-600 text-2xl glow" />
          <div
            className="flex gap-0.5"
            onMouseEnter={animateLetters}
            onMouseLeave={resetLetters}
          >
            {["A", "g", "r", "o", "3", "6", "0"].map((char, index) => (
              <span
                key={index}
                ref={(el) => (letterRefs.current[index] = el)}
                className="text-xl font-extrabold text-green-800 inline-block"
              >
                {char}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(({ label, path }) => (
            <motion.button
              key={label}
              onClick={() => navigate(path)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.96 }}
              className="relative text-gray-700 font-semibold py-1 px-2 hover:text-green-700 transition-all duration-300 group"
            >
              <span className="relative z-10">{label}</span>
              <span className="absolute left-0 bottom-0 w-0 h-1 bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </motion.button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-green-700 text-2xl"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </motion.nav>
  );
}
