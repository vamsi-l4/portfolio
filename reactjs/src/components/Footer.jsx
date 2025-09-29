import { useContext, useRef, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa'; // Social Media Icons
import { MdOutlineMail } from 'react-icons/md'; // Mail icon

export default function Footer() {
    const { theme } = useContext(ThemeContext);
    const [isMobile, setIsMobile] = useState(false);
    const canvasRef = useRef(null);

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
        const particleCount = isMobile ? 10 : 50; // Reduced for section and mobile
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
            const baseColor = 'rgba(255, 255, 255, alpha)'; // White particles

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

    return (
        <footer className="w-full px-[5%] md:px-[10%] py-12 relative bg-blue-50/70 dark:bg-blue-900/30 text-gray-800 dark:text-gray-200 overflow-hidden">
            <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full"></canvas>
            {/* Background glowing particles/grid - consistent with other dark sections */}
            <div className="absolute inset-0 z-0 opacity-10">
                <div className="absolute inset-0 bg-grid-pattern [background-size:25px_25px] [background-position:-1px_-1px]"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-transparent to-transparent"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
                {/* Logo Section */}
                <div className="text-center mb-8">
                    <img src="./assets/logo.png" alt="Logo" className="w-36 mx-auto mb-2 dark:hidden filter brightness-125" />
                    <img src="./assets/logo_dark.png" alt="Logo" className="w-36 mx-auto mb-2 hidden dark:block filter brightness-125" />
                    <div className="w-max flex items-center gap-2 mx-auto text-blue-300 hover:text-blue-200 transition-colors duration-300">
                        <MdOutlineMail className="w-6 h-6" />
                        <a href="mailto:krishnavamsi3400@gmail.com" className="font-Ovo text-lg">krishnavamsi3400@gmail.com</a>
                    </div>
                </div>

                

                {/* Separator Line */}
                <div className="w-full h-px bg-gray-300/50 dark:bg-gray-700/50 my-10"></div>

                {/* Copyright and Social Links */}
                <div className="text-center sm:flex items-center justify-between w-full py-3 text-gray-600 dark:text-gray-300 font-Ovo">
                    <p className="mb-4 sm:mb-0 text-sm sm:text-base">© {new Date().getFullYear()} Krishna Vamsi. All rights reserved.</p>
                    <ul className="flex items-center gap-8 justify-center">
                        <li>
                            <a target='_blank' href="https://github.com/vamsi-l4" rel="noopener noreferrer"
                               className="text-gray-400 hover:text-pink-400 transition-colors duration-300 text-3xl">
                                <FaGithub />
                                <span className="sr-only">GitHub</span>
                            </a>
                        </li>
                        <li>
                            <a target='_blank' href="https://www.linkedin.com/in/mulaparthi-krishna-vamsi-137b7a29a/" rel="noopener noreferrer"
                               className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-3xl">
                                <FaLinkedinIn />
                                <span className="sr-only">LinkedIn</span>
                            </a>
                        </li>
                        <li>
                            <a target='_blank' href="https://www.instagram.com/apoplectic_vamsi_034/?next=%2F&hl=en" rel="noopener noreferrer"
                               className="text-gray-400 hover:text-pink-400 transition-colors duration-300 text-3xl">
                                <FaInstagram />
                                <span className="sr-only">Instagram</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Basic Animations (add these to your global CSS or a styled-components file) */}
            <style jsx>{`
                .bg-grid-pattern {
                    background-image:
                        linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
                }
            `}</style>
        </footer>
    );
}