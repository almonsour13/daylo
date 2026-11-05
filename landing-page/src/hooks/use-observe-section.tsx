import { NAV } from "@/components/layout/header";
import { useEffect, useState } from "react";

export const useObserveSection = () => {
    const [active, setActive] = useState("/");

    const SECTION_IDS = NAV.links
        .map((l) => l.href.split("#")[1])
        .filter(Boolean) as string[];

    useEffect(() => {
        const elements = SECTION_IDS.map((id) =>
            document.getElementById(id),
        ).filter((el): el is HTMLElement => el !== null);

        if (!elements.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const newUrl =
                            entry.target.id === "hero"
                                ? "/"
                                : `/#${entry.target.id}`;

                        setActive(newUrl);
                        window.history.replaceState(null, "", newUrl);
                    }
                });
            },
            { threshold: 0.4 },
        );

        elements.forEach((el) => observer.observe(el));

        return () => {
            elements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY < 80) {
                setActive("/");
                window.history.replaceState(null, "", "/");
            }
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return active;
};
