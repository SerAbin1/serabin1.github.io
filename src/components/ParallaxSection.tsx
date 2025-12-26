import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxSectionProps {
    children: ReactNode;
    className?: string;
    speed?: number; // 0.1 = slow, 0.5 = medium, 1 = fast
    direction?: "up" | "down";
}

const ParallaxSection = ({
    children,
    className = "",
    speed = 0.3,
    direction = "up",
}: ParallaxSectionProps) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const content = contentRef.current;

        if (!section || !content) return;

        const yMultiplier = direction === "up" ? -1 : 1;

        gsap.to(content, {
            yPercent: speed * 100 * yMultiplier,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.trigger === section) {
                    trigger.kill();
                }
            });
        };
    }, [speed, direction]);

    return (
        <div ref={sectionRef} className={`relative overflow-hidden ${className}`}>
            <div ref={contentRef}>{children}</div>
        </div>
    );
};

export default ParallaxSection;
