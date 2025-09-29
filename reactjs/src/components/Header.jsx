import React, { useState, useEffect, useRef, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { motion } from 'framer-motion';

// Icons using inline SVG for a clean, single-file solution
const SunIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);
const MoonIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);
const ArrowRightIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);
const DownloadIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const Header = () => {
  const { theme } = useContext(ThemeContext);
  const [darkMode, setDarkMode] = useState(theme === 'dark');
  const canvasRef = useRef(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    }
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const particles = [];
    const particleCount = 100;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor(x, y) {
        this.x = x || Math.random() * width;
        this.y = y || Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        this.radius = Math.random() * 2;
        this.alpha = 0;
        this.growthRate = 0.005;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha = Math.min(1, this.alpha + this.growthRate);
        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
          this.reset();
        }
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.alpha = 0;
      }

      draw(color) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = color.replace('alpha', this.alpha);
        ctx.fill();
        ctx.restore();
      }
    }

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const baseColor = darkMode ? 'rgba(255, 255, 255, alpha)' : 'rgba(0, 0, 0, alpha)';

      particles.forEach(p => {
        p.update();
        p.draw(baseColor);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const name = "Krishna Vamsi";
  const title = "Full-Stack Developer";
  const aboutText = "Passionate software engineer from Andhra Pradesh, India. Skilled in Python, JavaScript, Django, React, and building scalable applications. Currently pursuing B.Tech (ECE, 2023–26).";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };



  return (
    <div className="relative w-full min-h-screen font-sans bg-white dark:bg-gray-950 text-gray-800 dark:text-white transition-colors duration-500 overflow-hidden">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Ovo&display=swap');
          body { font-family: 'Ovo', serif; }
        `}
      </style>
      <script src="https://cdn.tailwindcss.com"></script>

      {/* Canvas for dynamic background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full"></canvas>

      {/* Main Content */}
      <div className="relative z-10 w-full px-5 lg:px-8 xl:px-[8%] h-screen flex flex-col items-center justify-center text-center">
        


        <motion.div
          className="max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Profile Image & Icons */}
          <motion.div
            className="relative w-40 h-40 mx-auto mb-8"
            variants={itemVariants}
          >
            <motion.img
              src="https://placehold.co/160x160/282c34/ffffff?text=KV"
              alt="Krishna Vamsi"
              className="w-full h-full rounded-full object-cover shadow-2xl z-10 relative"
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            />
            {/* Pulsing ring effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-purple-500"
              animate={{ scale: [1, 1.2, 1], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Intro Text */}
          <motion.h3
            className="text-xl md:text-2xl mb-3 font-Ovo font-light tracking-wide"
            variants={itemVariants}
          >
            Hi! I'm {name}
          </motion.h3>

          {/* Title */}
          <motion.h1
            className="text-3xl sm:text-6xl lg:text-[66px] font-Ovo font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-orange-400"
            variants={itemVariants}
          >
            {title}
          </motion.h1>

          {/* About Text */}
          <motion.p
            className="max-w-2xl mx-auto font-Ovo mb-8 text-gray-600 dark:text-gray-300"
            variants={itemVariants}
          >
            {aboutText}
          </motion.p>
          
          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4"
            variants={containerVariants}
          >
            <motion.a
              href="#contact"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-orange-400 text-white shadow-lg transform hover:scale-105 transition-transform flex items-center gap-2"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              contact me <ArrowRightIcon className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="./assets/krishnavamsi-resume.pdf"
              download
              className="px-8 py-3 rounded-full border border-gray-300 dark:border-white/25 text-gray-700 dark:text-white shadow-lg transform hover:scale-105 transition-transform flex items-center gap-2"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              my resume <DownloadIcon className="w-5 h-5" />
            </motion.a>

          </motion.div>
        </motion.div>


      </div>
    </div>
  );
};

export { SunIcon, MoonIcon, ArrowRightIcon, DownloadIcon };
export default Header;
