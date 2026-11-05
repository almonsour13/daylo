import {
    CloudOff,
    Database,
    SlidersHorizontal,
    Smartphone,
    type LucideIcon,
} from "lucide-react";
import { Column } from "../flex";
import SectionLabel from "../section-label";
import SectionWrapper from "../section-wrapper";
import { Badge } from "../ui/badge";

type Store = { icon: LucideIcon; title: string; desc: string };

const STORES: Store[] = [
    {
        icon: Database,
        title: "Device-local activity storage",
        desc: "Your activities are saved in the app's local SQLite database.",
    },
    {
        icon: SlidersHorizontal,
        title: "Locally saved preferences",
        desc: "Your profile, theme, reminder settings, and other preferences are stored on your device.",
    },
    {
        icon: Smartphone,
        title: "A local-first experience",
        desc: "Daylo's activity management is built around local data, without a remote activity-sync service.",
    },
];

export default function Privacy() {
    return (
        <SectionWrapper id="privacy">
            <Column className="w-full gap-12 md:gap-16">
                <Column className="gap-4 items-center">
                    <SectionLabel className="text-primary">
                        Your plans, on your device
                    </SectionLabel>
                    <h2 className="text-4xl font-normal tracking-tight text-foreground sm:text-5xl text-center">
                        Your schedule stays{" "}
                        <span className="text-primary">close to home.</span>
                    </h2>
                    <p className="text-center max-w-md text-sm font-light leading-relaxed text-muted-foreground sm:text-base">
                        Daylo keeps your activity records, profile, and
                        preferences stored locally on your device, with no
                        accounts or remote activity syncing
                    </p>
                </Column>

                <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
                    <p className="lg:sticky lg:top-24 text-2xl font-normal leading-snug tracking-tight text-foreground sm:text-3xl lg:col-span-5 text-center md:text-start">
                        That means your planner is designed around{" "}
                        <span className="text-primary">local storage</span>{" "}
                        rather than requiring a cloud account to manage your
                        schedule.
                    </p>
                    <Column className="gap-4 lg:col-span-7">
                        <div className="rounded border border-dashed border-primary/40 p-4">
                            <p className="px-4 pb-2 pt-1 text-xs text-primary">
                                On your device
                            </p>
                            <ul className="divide-y divide-border rounded border border-border">
                                {STORES.map(({ icon: Icon, title, desc }) => (
                                    <li key={title} className="flex gap-4 p-4">
                                        <span className="flex size-10 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
                                            <Icon
                                                className="size-5"
                                                aria-hidden="true"
                                            />
                                        </span>
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-lg font-normal text-foreground">
                                                {title}
                                            </h3>
                                            <p className="text-sm font-light leading-relaxed text-muted-foreground">
                                                {desc}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* What sits outside the boundary */}
                        <div className="flex items-start gap-4 rounded border border-dashed border-border px-5 py-4 text-muted-foreground">
                            <span className="flex size-10 shrink-0 items-center justify-center rounded bg-muted">
                                <CloudOff
                                    className="size-5"
                                    aria-hidden="true"
                                />
                            </span>
                            <Column>
                                <p className="flex-1 text-sm font-light sm:text-base">
                                    Cloud account and remote activity sync
                                </p>
                                <Badge className="bg-muted text-foreground">
                                    Not in the current version
                                </Badge>
                            </Column>
                        </div>
                    </Column>
                </div>
            </Column>
        </SectionWrapper>
    );
}
