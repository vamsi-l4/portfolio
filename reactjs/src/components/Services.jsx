import { motion } from 'framer-motion';
import { useContext, useRef, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';
// Importing react-icons for services
import { FaLaptopCode, FaBrain, FaPuzzlePiece } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs'; // For "Read more" arrow

export default function Services() {
    const services = [
        {
            name: "Full-Stack Web Development",
            description: "Building scalable and interactive web applications using modern frameworks like React and Django, with robust backend systems and REST APIs.",
            icon: <FaLaptopCode className="text-blue-400" />, // React icon
            link: "#" // Link to a relevant page or section
        },
        {
            name: "AI/ML Solutions",
            description: "Developing intelligent solutions with deep learning models (e.g., PyTorch) for real-world applications in healthcare, prediction, and data analysis.",
            icon: <FaBrain className="text-purple-400" />, // React icon
            link: "#"
        },
        {
            name: "Problem Solving & Optimization",
            description: "Expertise in Data Structures & Algorithms, competitive programming, and optimizing code for efficiency and performance in complex challenges.",
            icon: <FaPuzzlePiece className="text-red-400" />, // React icon
            link: "#"
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

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12, 
            },
        },
        hover: {
            scale: 1.05,
            // Enhanced shadow for a lifted effect in dark theme
            boxShadow: "0px 15px 40px rgba(100, 0, 150, 0.5)", 
            transition: { duration: 0.3 }
        }
    };

    return (
        <section id="services" className="relative w-full px-[12%] py-10 scroll-mt-20 dark:text-white bg-white dark:bg-violet-900/20 overflow-hidden">
            <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full"></canvas>
            <div className="relative z-10 max-w-7xl mx-auto">
                <motion.h4
                    className="text-center mb-2 text-lg font-Ovo text-purple-300 drop-shadow-md"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={cardVariants}
                >
                    What I offer
                </motion.h4>
                <motion.h2
                    className="text-5xl md:text-6xl font-extrabold text-center mb-16 text-gray-800 dark:text-white"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={cardVariants}
                >
                    My Services
                </motion.h2>
                <motion.p
                    className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo text-gray-600 dark:text-gray-300"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={cardVariants}
                >
                    I bring a comprehensive skill set to the table, offering full-stack web development, advanced AI/ML solutions, and a strong foundation in problem-solving and code optimization.
                </motion.p>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                        visible: { transition: { staggerChildren: 0.2 } },
                    }}
                >
                    {services.map((service) => (
                        <motion.div
                            key={service.name}
                            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-300/50 cursor-pointer dark:bg-gray-800 dark:bg-opacity-70 dark:border-gray-700/50
                                    flex flex-col justify-between" // Removed redundant transform/transition from className
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <div>
                                <div className="text-5xl mb-4 text-gray-800 dark:text-white">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-bold my-4 text-gray-800 dark:text-white">
                                    {service.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-md">{service.description}</p>
                            </div>

                            <a href={service.link} className="flex items-center gap-2 text-lg mt-8 text-purple-600 dark:text-purple-300 hover:text-purple-500 dark:hover:text-purple-200 transition-colors duration-300 group">
                                Read more
                                <BsArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </a>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
