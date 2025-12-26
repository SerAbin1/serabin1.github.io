import { useEffect, useRef, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";

interface PageTransitionProps {
    children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Initial state - hidden
        gsap.set(container, { opacity: 0, y: 20 });

        // Animate in
        gsap.to(container, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
        });

        // Scroll to top on route change
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div ref={containerRef} className="page-transition-container">
            {children}
        </div>
    );
};

export default PageTransition;
