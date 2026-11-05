import { cn } from "@/lib/utils";
import {
    Bell,
    CalendarClock,
    Repeat,
    Smartphone,
    type LucideIcon,
} from "lucide-react";
import SectionWrapper from "../section-wrapper";
import { Card } from "../ui/card";

type Point = { icon: LucideIcon; title: string; desc: string };

const POINTS: Point[] = [
    {
        icon: CalendarClock,
        title: "Plan with purpose",
        desc: "Organize activities by date and time.",
    },
    {
        icon: Repeat,
        title: "Build consistent routines",
        desc: "Schedule daily, weekly, and custom repeats.",
    },
    {
        icon: Bell,
        title: "Stay reminded",
        desc: "Get local notifications for scheduled activities.",
    },
    {
        icon: Smartphone,
        title: "Keep your data local",
        desc: "Your activities are stored on your device.",
    },
];

export default function TrustStrip() {
    return (
        <SectionWrapper id="benefits">
            <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
                {POINTS.map(({ icon: Icon, title, desc }, i) => (
                    <Card
                        key={title}
                        className={cn(
                            "flex flex-col gap-2 border-border p-4 bg-transparent",
                        )}
                    >
                        <span className="flex size-10 items-center justify-center rounded bg-primary/10 text-primary">
                            <Icon className="size-5" aria-hidden="true" />
                        </span>
                        <div className="flex flex-col gap-1">
                            <h3 className="text-lg font-normal text-foreground">
                                {title}
                            </h3>
                            <p className="text-sm font-light leading-relaxed text-muted-foreground">
                                {desc}
                            </p>
                        </div>
                    </Card>
                ))}
            </div>
        </SectionWrapper>
    );
}
