import { useEffect, useState, useContext, useRef } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import { FiSend } from 'react-icons/fi'; // For the submit button icon

export default function Contact() {
    const [result, setResult] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);

        // Replace with your actual Formspree endpoint
        const res = await fetch("https://formspree.io/f/xjkavqvw", {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then((res) => res.json());

        if (res.ok) {
            setResult("Message sent successfully!");
            event.target.reset();
        } else {
            setResult("Failed to send message. Please try again.");
        }
    };

    // h-captcha loader function remains largely the same, but encapsulated in useEffect
    useEffect(() => {
        const CaptchaLoader = () => {
            const captchadiv = document.querySelectorAll('[data-captcha="true"]');
            if (captchadiv.length) {
                let lang = null;
                let onload = null;
                let render = null;

                captchadiv.forEach(function (item) {
                    const sitekey = item.dataset.sitekey;
                    lang = item.dataset.lang;
                    onload = item.dataset.onload;
                    render = item.dataset.render;

                    if (!sitekey) {
                        item.dataset.sitekey = "50b2fe65-b00b-4b9e-ad62-3ba471098be2"; // Your default sitekey
                    }
                });

                let scriptSrc = "https://js.hcaptcha.com/1/api.js?recaptchacompat=off";
                if (lang) {
                    scriptSrc += `&hl=${lang}`;
                }
                if (onload) {
                    scriptSrc += `&onload=${onload}`;
                }
                if (render) {
                    scriptSrc += `&render=${render}`;
                }

                var script = document.createElement("script");
                script.type = "text/javascript";
                script.async = true;
                script.defer = true;
                script.src = scriptSrc;
                document.body.appendChild(script);
            }
        };
        CaptchaLoader();
    }, []);

    const formVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.1,
                when: "beforeChildren",
            },
        },
    };

    const inputVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

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
    }, [theme]);

    return (
        <section
            id="contact"
            className="relative w-full px-[12%] py-10 scroll-mt-20 bg-blue-50/70 dark:bg-blue-900/30 dark:text-white overflow-hidden"
        >
            <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full"></canvas>
            <div className="relative z-10 max-w-7xl mx-auto">
                <motion.h4
                    className="text-center mb-2 text-lg font-Ovo text-blue-600 dark:text-blue-300 drop-shadow-md"
                    variants={inputVariants} // Using inputVariants for h4 as well
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                >
                    Connect with me
                </motion.h4>
                <motion.h2
                    className="text-5xl md:text-6xl font-extrabold text-center mb-6 text-gray-800 dark:text-white"
                    variants={inputVariants} // Using inputVariants for h2 as well
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                >
                    Get in touch
                </motion.h2>
                <motion.p
                    className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo text-gray-600 dark:text-gray-300"
                    variants={inputVariants} // Using inputVariants for p as well
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                >
                    I&apos;d love to hear from you! If you have any questions, comments or feedback, please use the form below.
                </motion.p>

                <motion.form
                    onSubmit={onSubmit}
                    // Updated form class: Light mode styles, then dark: styles
                    className="max-w-2xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-300/50
                               dark:bg-gray-800 dark:bg-opacity-70 dark:border-gray-700/50 dark:shadow-2xl"
                    variants={formVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <input type="hidden" name="subject" value="Krishna Vamsi - New form Submission" />

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 mb-8"
                        variants={formVariants} // Inner stagger for inputs
                    >
                        <motion.input
                            type="text"
                            placeholder="Your Name"
                            // Updated input class: Light mode styles, then dark: styles
                            className="w-full px-5 py-3 focus:ring-2 focus:ring-blue-500 outline-none
                                       border border-gray-300 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-500 transition-colors duration-300
                                       dark:border-gray-700 dark:rounded-xl dark:bg-gray-900/50 dark:text-white dark:placeholder-gray-400"
                            required
                            name="name"
                            variants={inputVariants}
                        />
                        <motion.input
                            type="email"
                            placeholder="Your Email"
                            // Updated input class: Light mode styles, then dark: styles
                            className="w-full px-5 py-3 focus:ring-2 focus:ring-blue-500 outline-none
                                       border border-gray-300 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-500 transition-colors duration-300
                                       dark:border-gray-700 dark:rounded-xl dark:bg-gray-900/50 dark:text-white dark:placeholder-gray-400"
                            required
                            name="email"
                            variants={inputVariants}
                        />
                    </motion.div>

                    <motion.textarea
                        rows="6"
                        placeholder="Your Message"
                        // Updated textarea class: Light mode styles, then dark: styles
                        className="w-full px-5 py-3 focus:ring-2 focus:ring-blue-500 outline-none
                                   border border-gray-300 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-500 mb-6 transition-colors duration-300
                                   dark:border-gray-700 dark:rounded-xl dark:bg-gray-900/50 dark:text-white dark:placeholder-gray-400"
                        required
                        name="message"
                        variants={inputVariants}
                    ></motion.textarea>

                    <motion.div
                        className="h-captcha mb-6 max-w-full"
                        data-captcha="true"
                        variants={inputVariants}
                    ></motion.div>

                    <motion.button
                        type='submit'
                        className="py-3 px-10 w-max flex items-center gap-3 bg-transparent border border-blue-600 text-blue-600 font-semibold text-lg rounded-full shadow-lg
                                   mx-auto hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900 transform hover:scale-105 transition-all duration-300 active:scale-95"
                        variants={inputVariants}
                    >
                        Send Message <FiSend className="w-5 h-5" />
                    </motion.button>
                    {result && <p className='mt-4 text-center text-green-600 dark:text-green-400'>{result}</p>}
                </motion.form>
            </div>
        </section>
    );
}