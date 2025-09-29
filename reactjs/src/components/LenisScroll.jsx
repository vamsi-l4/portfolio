import { useEffect } from "react";
import Lenis from "lenis";

export default function LenisScroll() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            smoothWheel: true,
            smoothTouch: false,
            // Offset to account for the fixed Navbar (approx. 64-80px tall)
            // This ensures the element is visible just below the navbar after a hash link click.
            lerp: 0.08, // Added a lerp for slightly less aggressive smoothing
            // anchors: { offset: -100 } is no longer needed since Lenis handles smooth scroll to anchors automatically.
        });

        // Function to animate the scroll
        const raf = (time) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        // Cleanup on component unmount
        return () => {
            lenis.destroy();
        };
    }, []); // Empty dependency array means this runs once on mount

    return null; // This component doesn't render anything visible
}