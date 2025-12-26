import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Hook for fade-up animation on scroll
 */
export const useFadeUpOnScroll = <T extends HTMLElement>() => {
    const ref = useRef<T>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        gsap.fromTo(
            element,
            {
                opacity: 0,
                y: 60,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.trigger === element) {
                    trigger.kill();
                }
            });
        };
    }, []);

    return ref;
};

/**
 * Hook for staggered children animation on scroll
 */
export const useStaggerOnScroll = <T extends HTMLElement>(
    childSelector: string,
    staggerAmount = 0.15
) => {
    const ref = useRef<T>(null);

    useEffect(() => {
        const container = ref.current;
        if (!container) return;

        const children = container.querySelectorAll(childSelector);
        if (children.length === 0) return;

        gsap.fromTo(
            children,
            {
                opacity: 0,
                y: 40,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: staggerAmount,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: container,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.trigger === container) {
                    trigger.kill();
                }
            });
        };
    }, [childSelector, staggerAmount]);

    return ref;
};

/**
 * Hook for hero/intro animations (no scroll trigger, plays on mount)
 */
export const useHeroAnimation = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Get elements
        const codeBlock = container.querySelector("[data-animate='code']");
        const heading = container.querySelector("[data-animate='heading']");
        const description = container.querySelector("[data-animate='description']");
        const buttons = container.querySelector("[data-animate='buttons']");
        const terminal = container.querySelector("[data-animate='terminal']");

        // Set initial states
        gsap.set([codeBlock, heading, description, buttons, terminal], {
            opacity: 0,
            y: 30,
        });

        // Animate sequence
        tl.to(codeBlock, { opacity: 1, y: 0, duration: 0.6 }, 0.2)
            .to(heading, { opacity: 1, y: 0, duration: 0.6 }, 0.4)
            .to(description, { opacity: 1, y: 0, duration: 0.6 }, 0.6)
            .to(buttons, { opacity: 1, y: 0, duration: 0.5 }, 0.8)
            .to(terminal, { opacity: 1, y: 0, duration: 0.5 }, 1.0);

        return () => {
            tl.kill();
        };
    }, []);

    return containerRef;
};

/**
 * Hook for section header animation
 */
export const useSectionHeader = <T extends HTMLElement>() => {
    const ref = useRef<T>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const header = element.querySelector("[data-animate='section-header']");
        if (!header) return;

        gsap.fromTo(
            header.children,
            {
                opacity: 0,
                y: 30,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: header,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.trigger === header) {
                    trigger.kill();
                }
            });
        };
    }, []);

    return ref;
};

/**
 * Hook for scale-in animation on scroll
 */
export const useScaleInOnScroll = <T extends HTMLElement>() => {
    const ref = useRef<T>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        gsap.fromTo(
            element,
            {
                opacity: 0,
                scale: 0.95,
            },
            {
                opacity: 1,
                scale: 1,
                duration: 0.7,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.trigger === element) {
                    trigger.kill();
                }
            });
        };
    }, []);

    return ref;
};
