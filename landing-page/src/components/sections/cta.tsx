import { Button } from "@/components/ui/button";
import { APP_IMAGES, SHOT } from "@/constants/app-images";
import Image from "next/image";
import ContentContainer from "../content-container";
import GradientDotGrid from "../decorative/gradient-dot-grid";
import { Column } from "../flex";

const POINTS = [
    "Works offline, with no account to create",
    "Your activities stay on your phone",
    "Reminders scheduled on your device",
];

export default function CTA() {
    const { light, dark } = APP_IMAGES.calendar;
    return (
        <div id="download" className="w-full md:px-4">
            <div className="relative md:rounded bg-primary p-4 py-8 md:px-8 md:py-20">
                <GradientDotGrid className="z-0" color="#ffff" />
                <ContentContainer className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <Column className="relative justify-center  z-20 w-full gap-4 md:gap-6 lg:col-span-7">
                        <h2 className="max-w-xl text-5xl font-normal leading-tight tracking-tight sm:text-6xl text-white">
                            Make Room for What Matters.
                        </h2>
                        <p className="max-w-md text-sm font-light leading-relaxed text-white sm:text-base">
                            Add your first activity, choose how often it
                            repeats, and let Daylo remind you. It takes about a
                            minute to set up.
                        </p>
                        <div className="flex flex-col gap-2 md:gap-4 sm:flex-row lg:flex-col xl:flex-row">
                            <Button
                                size="xl"
                                className="w-full rounded px-8 py-6 sm:w-auto bg-white text-black hover:bg-white"
                            >
                                {/* Replace with your Android build or store link */}
                                <a href="#">Download for Android</a>
                            </Button>
                            <Button
                                size="xl"
                                variant="outline"
                                className="rounded border-white text-white  px-8 py-6 bg-primary"
                            >
                                <a href="#how-it-works">See how it works</a>
                            </Button>
                        </div>
                    </Column>
                    <div className="relative flex h-96 justify-center overflow-hidden lg:col-span-5">
                        <div
                            className="w-full sm:w-72"
                            role="img"
                            aria-label="Example of the Daylo home screen with a weekly calendar strip and today's schedule"
                        >
                            <Image
                                src={light}
                                alt="Daylo home screen showing a weekly calendar strip and today's schedule"
                                {...SHOT}
                                sizes="248px"
                                priority
                                className="h-auto w-full dark:hidden"
                            />
                            <Image
                                src={dark}
                                alt=""
                                aria-hidden="true"
                                {...SHOT}
                                sizes="248px"
                                priority
                                className="hidden h-auto w-full dark:block"
                            />
                        </div>

                        <div
                            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-primary to-transparent"
                            aria-hidden="true"
                        />
                    </div>
                </ContentContainer>
            </div>
        </div>
    );
}
