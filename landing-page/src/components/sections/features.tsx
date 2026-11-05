import { APP_IMAGES, SHOT } from "@/constants/app-images";
import {
    Bell,
    CalendarDays,
    CalendarPlus,
    ListChecks,
    Repeat,
    type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { Column } from "../flex";
import SectionLabel from "../section-label";
import SectionWrapper from "../section-wrapper";
import { Card } from "../ui/card";

type Feature = {
    icon: LucideIcon;
    title: string;
    desc: string;
    benefit: string;
};

const FEATURES: Feature[] = [
    {
        icon: CalendarPlus,
        title: "Plan every activity your way",
        desc: "Create activities with names, descriptions, dates, start and end times, categories, priorities, and reminder preferences.",
        benefit: "A more organized day with less guesswork.",
    },
    {
        icon: CalendarDays,
        title: "See your day at a glance",
        desc: "Check your daily agenda, move between dates, and explore your calendar to see what's planned and what comes next.",
        benefit: "More clarity before your day gets busy.",
    },
    {
        icon: Repeat,
        title: "Make routines part of your life",
        desc: "Schedule an activity once and repeat it daily, on weekdays, weekly, monthly, yearly, or on selected weekdays.",
        benefit: "Less time recreating plans you follow regularly.",
    },
    {
        icon: Bell,
        title: "Remember what matters",
        desc: "Turn on local reminders for activities and choose how far in advance you want to be notified.",
        benefit: "A nudge for the things you don't want to overlook.",
    },
    {
        icon: ListChecks,
        title: "Stay in control of your plans",
        desc: "Search and filter activities, update existing plans, select several at once, and restore recently deleted activities.",
        benefit: "A schedule that stays flexible as priorities change.",
    },
];

export default function Features() {
    const { light, dark, alt } = APP_IMAGES.home;

    return (
        <SectionWrapper id="features">
            <Column className="relative w-full gap-12 md:gap-16">
                <Column className="gap-4 items-center">
                    <SectionLabel className="text-primary">
                        Features
                    </SectionLabel>
                    <h2 className="text-4xl font-normal tracking-tight text-foreground sm:text-5xl text-center">
                        Everything you need to{" "}
                        <span className="text-primary">plan your day.</span>
                    </h2>
                    <p className="text-center max-w-md text-sm font-light leading-relaxed text-muted-foreground sm:text-base">
                        The essential tools to organize activities, manage
                        recurring schedules, and stay aware of what's ahead,
                        without unnecessary complexity.
                    </p>
                </Column>
                <div className="flex flex-col-reverse gap-8 lg:flex-row">
                    <div className="flex items-start justify-center lg:flex-1 lg:justify-start">
                        <div className="w-full sm:w-72 lg:sticky lg:top-24">
                            <Image
                                src={light}
                                alt={alt}
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
                    </div>

                    <Column className="gap-2 md:gap-4 lg:flex-2">
                        {FEATURES.map(
                            ({ icon: Icon, title, desc, benefit }) => (
                                <Card
                                    key={title}
                                    className="h-full bg-transparent"
                                >
                                    <Column className="h-full justify-between gap-4">
                                        <Column className="gap-4">
                                            <span className="flex size-10 items-center justify-center rounded bg-primary/10 text-primary">
                                                <Icon
                                                    className="size-5"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                            <Column className="gap-2">
                                                <h3 className="text-lg font-normal leading-snug text-foreground">
                                                    {title}
                                                </h3>
                                                <p className="text-sm font-light leading-relaxed text-muted-foreground">
                                                    {desc}
                                                </p>
                                            </Column>
                                        </Column>
                                        <p className="border-t border-border pt-4 text-sm text-primary">
                                            {benefit}
                                        </p>
                                    </Column>
                                </Card>
                            ),
                        )}
                    </Column>
                </div>
            </Column>
        </SectionWrapper>
    );
}
