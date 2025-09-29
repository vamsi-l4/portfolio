import React, { useState, useContext, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';

// ✅ Dev Icons for Tech Stack
import { 
    DiPython, DiJavascript1, DiReact, DiDjango, DiNodejsSmall, DiHtml5, DiCss3, DiMongodb, DiMysql 
} from "react-icons/di";
import { SiTailwindcss, SiVercel, SiRender } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { AiOutlineFileSearch } from "react-icons/ai";
import { ArrowRight } from "lucide-react"; // keeping ArrowRight

// --- Projects ---
const projects = [
    {
        name: "RedIron Gym – Full-Stack Web App",
        description: "A dynamic fitness platform with secure login/signup and an admin dashboard.",
        image: "./assets/rediron-gym.png",
        liveUrl: "https://roaring-scone-cfda07.netlify.app/",
        githubUrl: "https://github.com/vamsi-l4/rediron_frontend.git"
    },
    {
        name: "Kidney Stone Detection Web App",
        description: "An AI-powered web app for early kidney stone detection with ~98% accuracy.",
        image: "./assets/kidney-stone.png",
        liveUrl: "https://kidneystone-blond.vercel.app/",
        githubUrl: "https://github.com/vamsi-l4/kidney-health-frontend.git"
    },
];

// --- Certificates ---
const certificates = [
    {
        name: "Python Full Stack Developer",
        description: "Certification from TalentShine.",
        image: "./assets/talentshine-logo.png",
        detailsUrl: "#"
    },
    {
        name: "Python Bootcamp",
        description: "Certification from LetsUpgrade + NSDC.",
        image: "./assets/letsupgrade-logo.png",
        detailsUrl: "#"
    },
    {
        name: "National Level Hackathon",
        description: "Participation in Utkarsh 2025 (HACKSPRINT).",
        image: "./assets/hackathon-logo.png",
        detailsUrl: "#"
    },
];

// --- Achievements ---
const achievements = [
    {
        name: "Robotics Workshop Challenge",
        description: "2nd Prize at HackerTribe, Hyderabad (Aug 2024).",
        image: "./assets/robotics-logo.png",
        detailsUrl: "#"
    },
    {
        name: "IoT Fire Alarm Model",
        description: "3rd Prize at MakeSkilled Expo (Mar 2023).",
        image: "./assets/iot-logo.png",
        detailsUrl: "#"
    },
    {
        name: "Prompt Engineering Workshop",
        description: "STEPCon, GMR Institute of Technology (Feb 2024).",
        image: "./assets/prompt.png",
        detailsUrl: "#"
    },
];

// --- Tech Stack (Using Dev Icons) ---
const techStack = [
    { name: "Python", icon: <DiPython size={40} className="text-blue-500" /> },
    { name: "JavaScript", icon: <DiJavascript1 size={40} className="text-yellow-400" /> },
    { name: "React", icon: <DiReact size={40} className="text-cyan-400" /> },
    { name: "Django", icon: <DiDjango size={40} className="text-green-700" /> },
    { name: "Node.js", icon: <DiNodejsSmall size={40} className="text-green-600" /> },
    { name: "HTML", icon: <DiHtml5 size={40} className="text-orange-500" /> },
    { name: "CSS", icon: <DiCss3 size={40} className="text-blue-600" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss size={40} className="text-teal-400" /> },
    { name: "MongoDB", icon: <DiMongodb size={40} className="text-green-500" /> },
    { name: "MySQL", icon: <DiMysql size={40} className="text-blue-600" /> },
    { name: "Git", icon: <FaGithub size={40} className="text-gray-800 dark:text-white" /> },
    { name: "Vercel", icon: <SiVercel size={40} className="text-black dark:text-white" /> },
    { name: "Render", icon: <SiRender size={40} className="text-purple-500" /> },
];

// --- Image Modal Component (Lightbox) ---
const ImageModal = ({ image, title, onClose }) => {
    if (!image) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="relative p-2 rounded-xl shadow-2xl max-w-5xl max-h-[95vh] w-full"
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-0 right-0 m-4 text-white bg-red-600/80 hover:bg-red-700 rounded-full w-10 h-10 flex items-center justify-center text-2xl z-10 transition-transform hover:scale-110 shadow-lg"
                    aria-label="Close modal"
                >
                    &times;
                </button>
                <div className="overflow-y-auto w-full h-full rounded-lg bg-white dark:bg-gray-900 flex justify-center items-center">
                    <img
                        src={image}
                        alt={title || "Full view of item"}
                        className="w-auto h-auto rounded-lg object-contain"
                        style={{ maxWidth: '100%', maxHeight: 'calc(95vh - 20px)' }}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://placehold.co/800x600/EF4444/ffffff?text=Image+Load+Error`;
                        }}
                    />
                </div>
                <p className="text-center text-sm mt-2 font-semibold text-white dark:text-gray-300 font-Ovo">{title}</p>
            </motion.div>
        </motion.div>
    );
};

export default function Work() {
    const { theme } = useContext(ThemeContext);
    const [activeTab, setActiveTab] = useState('projects');
    const [items, setItems] = useState(projects);
    const [showAll, setShowAll] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const canvasRef = useRef(null);

    // --- Modal State ---
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({ image: '', title: '' });

    const openModal = (image, title) => {
        setModalContent({ image, title });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setModalContent({ image: '', title: '' });
    };

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
        setShowAll(false);
        switch (tabName) {
            case 'projects':
                setItems(projects);
                break;
            case 'certificates':
                setItems(certificates);
                break;
            case 'achievements':
                setItems(achievements);
                break;
            case 'techStack':
                setItems(techStack);
                break;
            default:
                setItems(projects);
        }
    };

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        setIsMobile(mediaQuery.matches);

        const handleResize = (e) => {
            setIsMobile(e.matches);
        };

        mediaQuery.addEventListener('change', handleResize);
        return () => mediaQuery.removeEventListener('change', handleResize);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const particles = [];
        const particleCount = isMobile ? 10 : 50; 
        let width = canvas.clientWidth;
        let height = canvas.clientHeight;

        const resizeCanvas = () => {
            width = canvas.clientWidth;
            height = canvas.clientHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor(x, y) {
                this.x = x || Math.random() * width;
                this.y = y || Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 1.5;
                this.alpha = 0;
                this.growthRate = 0.003;
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
            const baseColor = theme === 'dark' ? 'rgba(255, 255, 255, alpha)' : 'rgba(139, 92, 246, alpha)';

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
    }, [theme, isMobile]);

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
        hover: { scale: 1.05, boxShadow: "0px 10px 30px rgba(0,0,0,0.2)", transition: { duration: 0.3 } }
    };

    const techStackVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
        hover: {
            scale: 1.1,
            boxShadow: theme === 'dark'
                ? "0 0 15px rgba(255, 255, 255, 0.7), 0 0 30px rgba(255, 255, 255, 0.4), 0 0 45px rgba(255, 255, 255, 0.2)"
                : "0 0 15px #8A2BE2, 0 0 30px #8A2BE2, 0 0 45px #8A2BE2",
            transition: { duration: 0.3 }
        }
    };

    const ViewFileIcon = AiOutlineFileSearch; 
    const GitHubIcon = FaGithub;
    const ArrowIcon = ArrowRight; 

    return (
        <div id="work" className="relative w-full px-[12%] py-10 scroll-mt-20 dark:text-white bg-white dark:bg-purple-900/20 overflow-hidden">
            <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full"></canvas>
            <div className="relative z-10">
                <h4 className="text-center mb-2 text-lg font-Ovo">My portfolio</h4>
                <h2 className="text-center text-5xl font-Ovo">My latest work</h2>
                <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo">
                    Explore my projects, certificates, achievements, and technical expertise.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
                    {["projects", "certificates", "achievements", "techStack"].map((tab) => (
                        <motion.button
                            key={tab}
                            onClick={() => handleTabChange(tab)}
                            className={`px-6 py-2 rounded-full font-Ovo transition-all duration-300 ${
                                activeTab === tab
                                    ? "bg-black text-white dark:bg-white dark:text-black"
                                    : "bg-gray-200 text-gray-800 dark:bg-darkHover dark:text-white"
                            }`}
                            whileHover={{ scale: 1.1, boxShadow: "0px 4px 10px rgba(0,0,0,0.2)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </motion.button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        className={`grid my-10 gap-5 ${
                            activeTab === "techStack"
                                ? "grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
                                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                        }`}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                    >
                        {items
                            .slice(0, showAll ? items.length : activeTab === "techStack" ? 12 : 3)
                            .map((item, index) => (
                                <motion.div
                                    key={index}
                                    className={`bg-gray-100 dark:bg-darkHover rounded-xl p-6 flex flex-col items-center justify-center text-center
                                        dark:shadow-[0px_5px_15px_rgba(255,255,255,0.1)] relative overflow-hidden group
                                        ${activeTab === "techStack" ? "aspect-square w-full" : "w-full h-full items-start text-left"}`}
                                    variants={activeTab === "techStack" ? techStackVariants : cardVariants}
                                    whileHover="hover"
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {activeTab === "techStack" ? (
                                        <>
                                            {React.cloneElement(item.icon, { size: isMobile ? 30 : 40 })}
                                            <h3 className="font-semibold text-sm mt-2">{item.name}</h3>
                                        </>
                                    ) : (
                                        <>
                                            <div className="mb-4 w-full flex justify-center items-center h-48">
                                                {item.image && (
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover transition-transform duration-300"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = `https://placehold.co/400x200/312E81/ffffff?text=Logo`;
                                                        }}
                                                    />
                                                )}
                                            </div>
                                            <div className="w-full text-left mt-2 flex-grow">
                                                <h3 className="font-bold text-xl mb-1">{item.name}</h3>
                                                <p className="text-sm text-gray-600 dark:text-white/80">{item.description}</p>
                                            </div>
                                            <div className="mt-4 flex gap-4 w-full justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                                                {item.liveUrl && (
                                                    <a href={item.liveUrl} className="flex items-center gap-1 text-sm text-indigo-500 hover:text-indigo-600 transition duration-150 font-semibold hover:underline">
                                                        Live Demo <ArrowIcon size={16} />
                                                    </a>
                                                )}
                                                {item.githubUrl && (
                                                    <motion.a
                                                        href={item.githubUrl}
                                                        className="flex items-center gap-1 text-sm text-gray-700 dark:text-white/80 hover:text-gray-900 dark:hover:text-white transition duration-150 font-semibold"
                                                        whileHover={{ y: -2 }}
                                                    >
                                                        GitHub <GitHubIcon size={16} className="dark:text-white" />
                                                    </motion.a>
                                                )}
                                            </div>
                                        </>
                                    )}

                                    {(activeTab === 'certificates' || activeTab === 'achievements') && (
                                        <motion.button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                openModal(item.image, item.name);
                                            }}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 0 }}
                                            variants={{
                                                hover: { opacity: 1, backdropFilter: "blur(2px)", backgroundColor: "rgba(0,0,0,0.6)" }
                                            }}
                                            className="absolute inset-0 flex flex-col items-center justify-center text-white z-30 cursor-pointer"
                                        >
                                            <ViewFileIcon size={30} className="mb-2" />
                                            <span className="text-sm font-semibold">
                                                {activeTab === 'certificates' ? "View Certificate" : "View Achievement"}
                                            </span>
                                        </motion.button>
                                    )}
                                </motion.div>
                            ))}
                    </motion.div>
                </AnimatePresence>

                <div className="w-full text-center">
                    {items.length > (activeTab === "techStack" ? 12 : 3) && (
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="inline-block px-8 py-3 rounded-full font-Ovo bg-black text-white dark:bg-white dark:text-black mt-4 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            {showAll ? "Show Less" : "Show All"}
                        </button>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {showModal && (
                    <ImageModal 
                        image={modalContent.image} 
                        title={modalContent.title} 
                        onClose={closeModal} 
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
