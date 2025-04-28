"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function TimelineProgressBar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const progressTimer = useRef(null);
    const lastPathRef = useRef(pathname);
    const isNavigatingRef = useRef(false);

    const resetProgress = () => {
        const progressBar = document.getElementById("timeline-progress");
        if (progressBar) {
            progressBar.style.transition = "none";
            progressBar.style.width = "0%";
            progressBar.style.opacity = "0";
        }
    };

    const startProgress = () => {
        if (isNavigatingRef.current) return;
        
        const progressBar = document.getElementById("timeline-progress");
        if (!progressBar) return;

        isNavigatingRef.current = true;

        // Clear any existing timers
        if (progressTimer.current) {
            clearTimeout(progressTimer.current);
        }

        // Reset and start progress
        resetProgress();
        
        // Start progress animation
        requestAnimationFrame(() => {
            progressBar.style.opacity = "1";
            progressBar.style.transition = "width 1.5s ease";
            progressBar.style.width = "90%";
        });
    };

    const completeProgress = () => {
        if (!isNavigatingRef.current) return;

        const progressBar = document.getElementById("timeline-progress");
        if (!progressBar) return;

        // Complete the progress
        progressBar.style.transition = "width 0.3s ease";
        progressBar.style.width = "100%";
        
        // Hide after completion
        progressTimer.current = setTimeout(() => {
            progressBar.style.opacity = "0";
            setTimeout(() => {
                resetProgress();
                isNavigatingRef.current = false;
            }, 300);
        }, 300);
    };

    // Handle navigation events
    useEffect(() => {
        const handleLinkClick = (e) => {
            const link = e.target.closest("a");
            if (link) {
                const href = link.getAttribute("href");
                if (href && !href.startsWith("#")) {
                    startProgress();
                }
            }
        };

        const handleRouteChangeStart = () => {
            startProgress();
        };

        const handleRouteChangeComplete = () => {
            completeProgress();
        };

        const handleRouteChangeError = () => {
            completeProgress();
        };

        // Add event listeners
        document.addEventListener("click", handleLinkClick);
        window.addEventListener("beforeunload", startProgress);

        // Cleanup
        return () => {
            if (progressTimer.current) {
                clearTimeout(progressTimer.current);
            }
            document.removeEventListener("click", handleLinkClick);
            window.removeEventListener("beforeunload", startProgress);
            resetProgress();
        };
    }, []);

    // Handle pathname changes
    useEffect(() => {
        if (pathname !== lastPathRef.current) {
            startProgress();
            
            // Complete after a delay
            const timer = setTimeout(() => {
                completeProgress();
            }, 1500);

            lastPathRef.current = pathname;

            return () => {
                clearTimeout(timer);
            };
        }
    }, [pathname]);

    // Force cleanup on unmount
    useEffect(() => {
        return () => {
            if (progressTimer.current) {
                clearTimeout(progressTimer.current);
            }
            resetProgress();
        };
    }, []);

    return (
        <div
            id="timeline-progress"
            className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-green-900 to-green-400 w-0 opacity-0 z-[9999]"
            style={{
                transition: "width 1.5s ease, opacity 0.3s ease",
            }}
        />
    );
}