import { useEffect, useRef, useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi'; // Importing react-icons
import { FiArrowUpRight } from 'react-icons/fi'; // For the 'Contact' arrow icon
import { ThemeContext } from '../context/ThemeContext';
import { SunIcon, MoonIcon } from './Header'; // Import icons from Header

export default function Navbar() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false); // State for scroll effect
    const navRef = useRef();

    const handleScroll = () => {
        setIsScrolled(window.scrollY > 50); // Set scrolled state based on scroll position
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check on mount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const menuVariants = {
        hidden: { x: '100%', opacity: 0, transition: { duration: 0.4 } },
        visible: { x: '0%', opacity: 1, transition: { duration: 0.4 } },
    };

    const linkVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const navItems = [
        { name: 'Home', href: '#top' },
        { name: 'About me', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'My Work', href: '#work' },
        { name: 'Contact me', href: '#contact' },
    ];

    return (
        <>
            <nav
                ref={navRef}
                className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 transition-all duration-300
                    ${isScrolled
                        ? 'bg-gray-900/40 backdrop-blur-lg shadow-xl border-b border-purple-800/50'
                        : 'bg-transparent'
                    }`}
            >
                <a href="#top"> {/* Changed href to #top for home */}
                    <img src="./assets/logo.png" alt="Logo" className="w-28 cursor-pointer dark:hidden" />
                    <img src="./assets/logo_dark.png" alt="Logo" className="w-28 cursor-pointer hidden dark:block" />
                </a>

                {/* Desktop Navigation Menu */}
                <ul className="hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3
                                bg-gray-900/40 backdrop-blur-md shadow-lg font-Ovo text-gray-100
                                border border-purple-800/50 transition-colors duration-300">
                    {navItems.map(item => (
                        <li key={item.name}>
                            <a
                                className='relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-blue-400 after:w-0 hover:after:w-full after:transition-all after:duration-300
                                            hover:text-blue-300 transition-colors duration-300'
                                href={item.href}
                            >
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-4">
                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className="p-3 rounded-full shadow-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white hover:scale-110 transition-all duration-300"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
                    </button>

                    {/* Contact Button (desktop) */}
                    <a
                        href="#contact"
                        className="hidden lg:flex items-center gap-2 px-8 py-2 border rounded-full font-Ovo text-lg
                                   bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-md
                                   hover:from-blue-700 hover:to-purple-800 transform hover:scale-105 transition-all duration-300 active:scale-95"
                    >
                        Contact <FiArrowUpRight className="w-4 h-4" />
                    </a>

                    {/* Mobile Menu Button */}
                    <button 
                        className="block md:hidden ml-3 p-2 rounded-full hover:bg-gray-800/50 transition duration-300" 
                        onClick={() => setIsMenuOpen(true)}
                        aria-label="Open mobile menu"
                    >
                        <HiMenuAlt3 className="w-7 h-7 text-gray-100" />
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="fixed inset-0 bg-black bg-opacity-70 z-[55]" // Dark overlay
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)} // Close when clicking overlay
                        >
                            <motion.ul
                                className="flex md:hidden flex-col gap-6 py-20 px-10 fixed right-0 top-0 bottom-0 w-64 h-screen z-[60]
                                            bg-gray-900 backdrop-blur-lg border-l border-purple-800/50 font-Ovo text-gray-50 shadow-2xl"
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={menuVariants}
                                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside menu
                            >
                                <button 
                                    className="absolute right-6 top-6 p-2 rounded-full hover:bg-gray-800/50 transition duration-300" 
                                    onClick={() => setIsMenuOpen(false)}
                                    aria-label="Close mobile menu"
                                >
                                    <HiX className="w-7 h-7 text-gray-100" />
                                </button>
                                {navItems.map(item => (
                                    <motion.li key={item.name} variants={linkVariants}>
                                        <a
                                            className='text-xl hover:text-blue-300 transition duration-300'
                                            href={item.href}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {item.name}
                                        </a>
                                    </motion.li>
                                ))}
                                {/* Mobile Contact Button within menu */}
                                <motion.li variants={linkVariants} className="mt-8">
                                    <a
                                        href="#contact"
                                        className="inline-flex items-center gap-2 px-8 py-2 border rounded-full font-Ovo text-lg
                                                    bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-md
                                                    hover:from-blue-700 hover:to-purple-800 transform hover:scale-105 transition-all duration-300 active:scale-95"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Contact <FiArrowUpRight className="w-4 h-4" />
                                    </a>
                                </motion.li>
                            </motion.ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
}