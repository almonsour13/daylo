import { Button } from "@/components/ui/button";
import { APP_IMAGES, SHOT } from "@/constants/app-images";
import Image from "next/image";
import Link from "next/link";
import ContentContainer from "../content-container";
import GradientDotGrid from "../decorative/gradient-dot-grid";
import { Column } from "../flex";
import { Badge } from "../ui/badge";

async function getLatestRelease() {
    try {
        const res = await fetch(
            "https://api.github.com/repos/almonsour13/daylo/releases/latest",
            { next: { revalidate: 3600 } }, // cache for 1 hour
        );
        if (!res.ok) return null;
        const data = await res.json();

        const apkAsset = data.assets?.find((a: any) => a.name.endsWith(".apk"));

        return {
            version: data.tag_name, // v1.0.0
            apkUrl: apkAsset?.browser_download_url || data.html_url,
            allReleasesUrl: "https://github.com/almonsour13/daylo/releases",
        };
    } catch {
        return null;
    }
}

export default async function CTA() {
    const { light, dark } = APP_IMAGES.calendar;
    const latest = await getLatestRelease();

    const version = latest?.version || "v1.0.0";
    const apkUrl =
        latest?.apkUrl ||
        "https://github.com/almonsour13/daylo/releases/download/v1.0.0/Daylo-v1.0.apk";
    const allReleasesUrl =
        latest?.allReleasesUrl ||
        "https://github.com/almonsour13/daylo/releases";

    return (
        <div id="download" className="w-full md:px-4">
            <div className="relative md:rounded bg-primary p-4 py-8 md:px-8 md:py-20">
                <GradientDotGrid className="z-0" color="#ffff" />
                <ContentContainer className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <Column className="relative justify-center z-20 w-full gap-4 md:gap-6 lg:col-span-7">
                        <h2 className="max-w-xl text-5xl font-normal leading-tight tracking-tight sm:text-6xl text-white">
                            Make Room for What Matters.
                        </h2>
                        <p className="max-w-md text-sm font-light leading-relaxed text-white sm:text-base">
                            Add your first activity, choose how often it
                            repeats, and let Daylo remind you. It takes about a
                            minute to set up.
                        </p>

                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2 md:gap-4 sm:flex-row lg:flex-col xl:flex-row">
                                <Link
                                    href={apkUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button
                                        size="xl"
                                        className="w-full rounded px-8 py-6 sm:w-auto bg-white text-black hover:bg-white"
                                    >
                                        Download for Android
                                    </Button>
                                </Link>
                                <Button
                                    size="xl"
                                    variant="outline"
                                    className="rounded border-white text-white px-8 py-6 bg-primary hover:bg-white/10 hover:text-white"
                                >
                                    <a href="#how-it-works">See how it works</a>
                                </Button>
                            </div>

                            <div className="flex items-center gap-2 text-sm">
                                <Badge className="inline-flex items-center bg-white px-2.5 py-0.5 text-xs font-medium text-black">
                                    Latest {version}
                                </Badge>
                                <Link
                                    href={allReleasesUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline underline-offset-4 hover:text-white"
                                >
                                    See all versions
                                </Link>
                            </div>
                        </div>
                    </Column>

                    <div className="relative flex h-96 justify-center overflow-hidden lg:col-span-5">
                        <div
                            className="w-full sm:w-72"
                            role="img"
                            aria-label="Example of the Daylo home screen"
                        >
                            <Image
                                src={light}
                                alt="Daylo home screen"
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
