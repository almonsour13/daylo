import { Column } from "../flex";
import SectionLabel from "../section-label";
import SectionWrapper from "../section-wrapper";

const FAQ_ITEMS = [
    {
        q: "Do I need an account?",
        a: "No. Daylo has no sign-up, so you can start planning right after setup.",
    },
    {
        q: "Is my schedule backed up?",
        a: "No. Everything is stored on your phone, which keeps it private. Uninstalling Daylo or clearing its storage removes your data, and there's no cloud copy to restore from.",
    },
    {
        q: "Is my data encrypted?",
        a: "Daylo doesn't add its own encryption. Your phone's lock screen and device encryption protect it.",
    },
    {
        q: "Do reminders work without internet?",
        a: "Yes. They're scheduled on your phone and follow your device's notification settings.",
    },
    {
        q: "Why didn't I get a reminder?",
        a: "Check that reminders are on in Daylo, that the activity's own reminder switch is on, and that Daylo has notification permission in your device settings.",
    },
    {
        q: "What happens when I delete an activity?",
        a: "It moves to Recently Deleted and its reminders are cancelled. You can restore it, or it's removed automatically after 30 days.",
    },
    {
        q: "Which devices does Daylo run on?",
        a: "Android first. The app is set up for iOS, but there's no iOS build yet.",
    },
];

export default function FAQ() {
    return (
        <SectionWrapper id="faq">
            <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-5">
                    <Column className="lg:sticky lg:top-24 gap-4">
                        <SectionLabel className="text-primary">
                            FAQ
                        </SectionLabel>
                        <h2 className="text-3xl font-normal tracking-tight text-foreground sm:text-4xl">
                            Questions,{" "}
                            <span className="text-primary">answered</span>
                        </h2>
                        <p className="max-w-md text-sm font-light leading-relaxed text-muted-foreground sm:text-base">
                            How Daylo handles your data, your routines and your
                            reminders.
                        </p>
                    </Column>
                </div>

                <div className="divide-y divide-border border-y border-border lg:col-span-7">
                    {FAQ_ITEMS.map((f) => (
                        <details key={f.q} className="group py-5">
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-foreground focus-visible:outline-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
                                <span className="text-base">{f.q}</span>
                                <span
                                    className="text-xl text-primary transition-transform group-open:rotate-45"
                                    aria-hidden="true"
                                >
                                    +
                                </span>
                            </summary>
                            <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground">
                                {f.a}
                            </p>
                        </details>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}
