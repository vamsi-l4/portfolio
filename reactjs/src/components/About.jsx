import { motion } from 'framer-motion';
import { useContext, useRef, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import {
    FaPython, FaReact, FaJs, FaNodeJs, FaHtml5, FaCss3Alt, FaGitAlt, FaCode, FaFigma
} from 'react-icons/fa';
import {
    SiDjango, SiMongodb, SiFirebase, SiTailwindcss
} from 'react-icons/si';
import { MdSchool, MdOutlineScience, MdMonitor } from 'react-icons/md';

export default function AboutSection() {
    // Using react-icons for tools, falling back to image paths if a specific icon isn't found
    const tools = [
        { name: 'React', iconComponent: <FaReact className="text-cyan-400" /> },
        { name: 'Django', iconComponent: <SiDjango className="text-green-600" /> },
        { name: 'Tailwind', iconComponent: <SiTailwindcss className="text-blue-500" /> },
        { name: 'Git', iconComponent: <FaGitAlt className="text-red-500" /> },
        { name: 'VS Code', iconComponent: <FaCode className="text-blue-400" /> },
    ];

    // Refactored data to use react-icons and allow for more detailed lists
    const data = [
        {
            name: 'Technologies',
            iconPrimary: <MdMonitor className="text-indigo-400" />,
            description: 'Core languages and frameworks powering my full-stack development.',
            details: [
                { icon: <FaPython className="text-blue-400" />, text: 'Python' },
                { icon: <FaJs className="text-yellow-400" />, text: 'JavaScript' },
                { icon: <FaHtml5 className="text-orange-500" />, text: 'HTML' },
                { icon: <FaCss3Alt className="text-blue-500" />, text: 'CSS' },
                { icon: <FaReact className="text-cyan-400" />, text: 'React' },
                { icon: <SiDjango className="text-green-600" />, text: 'Django' },
                { icon: <FaNodeJs className="text-green-500"     />, text: 'Node.js' },
            ]
        },
        {
            name: 'Education',
            iconPrimary: <MdSchool className="text-emerald-400" />,
            description: 'My academic background and qualifications.',
            details: [
                { icon: null, text: 'B.Tech (ECE) – BVC Institute, 2023–2026 (CGPA 7.27)' },
                { icon: null, text: 'Diploma (ECE) – DR.BR.A.GMR.POLYTECHNIC, 2020 – 2023 (GPA 7.23)' },
                { icon: null, text: 'SSC – MJPAPBCW RESIDENTIAL, 2015 – 2020 (GPA : 8.6)' },
            ]
        },
        {
            name: 'Key Projects',
            iconPrimary: <MdOutlineScience className="text-rose-400" />,
            description: 'Highlights of my impactful full-stack and AI/ML projects.',
            details: [
                { icon: null, text: 'RedIron Gym (Full-Stack Web App)' },
                { icon: null, text: 'Kidney Stone Detection (AI/ML)' },
            ]
        },
    ];

    const { theme } = useContext(ThemeContext);
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const particles = [];
        const particleCount = 50; // Reduced for section
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
            const baseColor = theme === 'dark' ? 'rgba(255, 255, 255, alpha)' : 'rgba(0, 0, 0, alpha)';

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
    }, [theme]);

    const containerVariants = { // Your existing container variants
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15, // Adjusted stagger for a slightly quicker animation
                when: "beforeChildren",
            },
        },
    };

    const itemVariants = { // Your existing item variants
        hidden: { opacity: 0, y: 30 }, // Adjusted y offset for subtle lift
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12, // Adjusted damping
            },
        },
        hover: {
            scale: 1.02,
            boxShadow: "0px 15px 40px rgba(0, 0, 128, 0.5)",
            transition: { duration: 0.3 }
        }
    };

    return (
        <section id="about" className="relative w-full px-[12%] py-10 scroll-mt-20 dark:text-white bg-white dark:bg-violet-900/20 overflow-hidden">
            <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full"></canvas>
            <div className="relative z-10 max-w-9999xl mx-auto">
                <motion.h4
                    className="text-center mb-2 text-lg font-Ovo text-purple-300 drop-shadow-md"
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                >
                    Introduction
                </motion.h4>
                <motion.h2
                    className="text-5xl md:text-6xl font-extrabold text-center mb-16 text-gray-800 dark:text-white"
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                >
                    About Me
                </motion.h2>

                <motion.div
                    className="flex w-full flex-col lg:flex-row items-center gap-16 my-16"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {/* Left: Enhanced Profile Image Section */}
                    <motion.div
                        className="max-w-max mx-auto relative"
                        variants={itemVariants}
                    >
                        <img src='./assets/profile-img.png' alt="" className="w-64 sm:w-80 rounded-3xl max-w-none shadow-2xl" />
                        <div className="bg-white w-1/2 aspect-square absolute right-0 bottom-0 rounded-full translate-x-1/4 translate-y-1/3 shadow-[0_4px_55px_rgba(149,0,162,0.15)] flex items-center justify-center">
                            <img src="./assets/circular-text.png" alt="" className="w-full animate-spin_slow" />
                            <img src="./assets/dev-icon.png" alt="" className="w-1/4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        </div>
                    </motion.div>

                    {/* Right: Introduction Text */}
                    <div className="flex-1 lg:pl-10">
                        <motion.p
                            className="mb-10 text-lg md:text-xl leading-relaxed max-w-2xl font-Ovo text-gray-600 dark:text-gray-300"
                            variants={itemVariants}
                        >
                            Hello! I'm <strong className="text-purple-300">Krishna Vamsi Mulaparthi</strong>, a dynamic Full-Stack Developer thriving on innovation and scalability. With expertise in <strong className="text-cyan-300">Python, JavaScript, React, and Django</strong>, I architect robust backend systems and craft captivating frontends. My strong foundation in Data Structures & Algorithms and OOP fuels my passion for problem-solving and building impactful web applications. Eager to continuously learn and contribute to cutting-edge projects.
                        </motion.p>
                    </div>
                </motion.div>

                {/* Grid of Main Cards (Technologies, Education, Projects) */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-16"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {data.map((item) => (
                        <motion.div
                            key={item.name}
                            className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-gray-300/50 cursor-pointer flex flex-col justify-between dark:bg-gray-800 dark:bg-opacity-70 dark:border-gray-700/50"
                            variants={itemVariants}
                            whileHover="hover"
                        >
                            <div>
                                <div className="text-5xl mb-4 text-gray-800 dark:text-white">
                                    {item.iconPrimary}
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">
                                    {item.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6 text-md">{item.description}</p>
                            </div>

                            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                                {item.details.map((detail, idx) => (
                                    <li key={idx} className="flex items-center gap-3">
                                        {detail.icon && <span className="text-xl opacity-80">{detail.icon}</span>}
                                        <span className="text-sm md:text-base font-Ovo">{detail.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Tools I Use Section */}
                <motion.h4
                    className="my-10 text-center text-4xl font-extrabold text-gray-800 dark:text-white"
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                >
                    My Go-To Development Arsenal
                </motion.h4>

                <motion.ul
                    className="flex flex-wrap items-center justify-center gap-5 sm:gap-7 mb-20"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {tools.map((tool) => (
                        <motion.li
                            key={tool.name}
                            className="flex items-center justify-center w-16 sm:w-20 aspect-square bg-white/70 backdrop-blur-sm border border-gray-300 rounded-xl cursor-pointer hover:-translate-y-2 hover:shadow-lg hover:border-blue-500 duration-500 group dark:bg-gray-800 dark:bg-opacity-70 dark:border-gray-700"
                            variants={itemVariants}
                            whileHover="hover"
                        >
                            {tool.iconComponent ? (
                                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{tool.iconComponent}</span>
                            ) : (
                                <img src={tool.iconImg} alt={tool.name} className="w-8 sm:w-10 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-md" />
                            )}
                            <span className="sr-only">{tool.name}</span> {/* For accessibility */}
                        </motion.li>
                    ))}
                </motion.ul>

                {/* Final Call to Action */}
                <motion.div
                    className="text-center mt-20"
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                >
                    <p className="text-3xl md:text-4xl font-extrabold mb-8 text-gray-800 dark:text-white">
                        Ready to innovate? Let's build something exceptional together.
                    </p>
                    <a
                        href="mailto:krishnavamsi3400@gmail.com"
                        className="inline-block px-12 py-5 bg-transparent border border-blue-600 text-blue-600 font-extrabold text-xl rounded-full shadow-2xl hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900 transform hover:scale-105 transition-all duration-300 active:scale-95"
                    >
                        Get In Touch
                    </a>
                </motion.div>
            </div>
        </section>
    );
}