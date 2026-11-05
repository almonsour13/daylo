import { Column } from "../flex";
import SectionLabel from "../section-label";
import SectionWrapper from "../section-wrapper";
import { Card } from "../ui/card";

const STEPS = [
    {
        title: "Tell Daylo your name",
        desc: "A short welcome saves your name on your phone and asks for notification permission. You can change your theme, reminder lead time and sound later in Settings.",
    },
    {
        title: "Add an activity",
        desc: "Give it a name and a time, then choose how often it repeats. Add a category and priority if you like, and switch the reminder on.",
    },
    {
        title: "Check your day",
        desc: "Home shows today's activities with a week strip. The calendar shows any other date, and repeating activities appear on every day they apply.",
    },
    {
        title: "Get a nudge before it starts",
        desc: "Reminders are scheduled on your phone, so they work without a connection. You get one at the start time and an optional earlier one.",
    },
];

export default function HowItWorks() {
    return (
        <SectionWrapper id="how-it-works">
            <Column className="w-full gap-12 md:gap-16">
                <Column className="gap-4 items-center">
                    <SectionLabel className="text-primary">
                        How it works
                    </SectionLabel>
                    <h2 className="text-4xl font-normal tracking-tight text-foreground sm:text-5xl text-center">
                        From first launch to{" "}
                        <span className="text-primary">first reminder</span>
                    </h2>
                    <p className="text-center max-w-md text-sm font-light leading-relaxed text-muted-foreground sm:text-base">
                        Setting up takes a minute. After that, planning a day is
                        a few taps.
                    </p>
                </Column>

                <div className="grid lg:grid-cols-2 gap-4">
                    {STEPS.map((s, i) => (
                        <Card key={s.title} className="bg-transparent">
                            <Column>
                                <span
                                    className="pt-1 text-sm tabular-nums text-primary"
                                    aria-hidden="true"
                                >
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <div>
                                    <h3 className="mb-2 text-xl font-normal text-foreground">
                                        {s.title}
                                    </h3>
                                    <p className="text-sm font-light leading-relaxed text-muted-foreground">
                                        {s.desc}
                                    </p>
                                </div>
                            </Column>
                        </Card>
                    ))}
                </div>
            </Column>
        </SectionWrapper>
    );
}
