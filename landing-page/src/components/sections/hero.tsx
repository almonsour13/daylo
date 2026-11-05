import { Button } from "@/components/ui/button";
import { APP_IMAGES } from "@/constants/app-images";
import { Column } from "../flex";
import ScreenFader from "../screen-fader";
import SectionWrapper from "../section-wrapper";

export default function Hero() {
    const { light, dark, alt } = APP_IMAGES.home;

    return (
        <SectionWrapper>
            <div className="relative grid grid-cols-1 items-center gap-12 pt-40 md:pt-20 lg:min-h-screen lg:grid-cols-12 lg:gap-8">
                <Column className="items-center gap-8 text-center lg:col-span-7 lg:items-start lg:text-left">
                    <h1 className="text-5xl font-normal leading-[1.08] tracking-tight text-foreground lg:text-6xl">
                        Make every day a little more{" "}
                        <span className="text-primary">productive.</span>
                    </h1>

                    <p className="max-w-lg text-base font-light leading-relaxed text-muted-foreground">
                        Plan your activities, build better routines, and keep
                        your day on track with Daylo, the simple daily planner
                        designed to bring more clarity to your schedule.
                    </p>

                    <div className="mt-2 flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                        <Button size="xl" className="rounded px-6">
                            <a href="#download">Get Daylo for Android</a>
                        </Button>
                        <Button
                            variant="outline"
                            size="xl"
                            className="rounded px-6"
                        >
                            <a href="#features">Explore features</a>
                        </Button>
                    </div>
                </Column>

                {/* Fixed blur gradient */}
                <div className="relative flex justify-center lg:col-span-5">
                    <div className="pointer-events-none absolute left-1/2 top-1/2 h-88 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/40 blur-3xl" />
                    <div className="pointer-events-none absolute left-1/2 top-1/2 h-44 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
                    <div className="relative w-full sm:w-64 bg-background">
                        <ScreenFader />
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
