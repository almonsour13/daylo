import { Column } from "@/components/flex";
import CTA from "@/components/sections/cta";
import FAQ from "@/components/sections/faq";
import Features from "@/components/sections/features";
import Hero from "@/components/sections/hero";
import HowItWorks from "@/components/sections/how-it-works";
import Lifestyle from "@/components/sections/life-style";
import Privacy from "@/components/sections/privacy";
import TrustStrip from "@/components/sections/trust-strip";

const GLOWS = [
    // "top-[8%] right-[4%] from-primary/15 dark:from-primary/10",
    // "top-[16%] md:top-[20%] right-10 from-primary/15 dark:from-primary/10",
    "top-[30%] -left-48 from-primary/15 dark:from-primary/10",
    "top-[46%] right-[6%] from-primary/15 dark:from-primary/10",
    "top-[62%] -left-40 from-primary/15 dark:from-primary/10",
    "top-[78%] -right-48 from-primary/15 dark:from-primary/10",
    "top-[88%] left-[0%] from-primary/15 dark:from-primary/10",
];

export default function Home() {
    return (
        <Column className="relative w-full gap-24 md:gap-48">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
            >
                {GLOWS.map((pos) => (
                    <div
                        key={pos}
                        className={`absolute h-104 aspect-square -translate-y-1/2 bg-radial to-transparent to-70% md:h-180 ${pos}`}
                    />
                ))}
            </div>
            <Column className="w-full gap-24">
                <Hero />
                <TrustStrip />
            </Column>
            <Features />
            <Lifestyle />
            <HowItWorks />
            <Privacy />
            <CTA />
            <FAQ />
        </Column>
    );
}
