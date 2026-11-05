import Image from "next/image";
import { Column } from "../flex";
import SectionLabel from "../section-label";
import SectionWrapper from "../section-wrapper";

type UseCase = {
    title: string;
    desc: string;
    image: string;
    alt: string;
};
const USE_CASES: UseCase[] = [
    {
        title: "Personal routines",
        desc: "Organize morning rituals, exercise plans, reading time, and other recurring activities.",
        image: "https://cdn.fbsbx.com/v/t65.102178-21/874395146_2178986132994137_767728677633760388_n.jpg/personal-routines.webp?_nc_ht=cdn.fbsbx.com&_nc_ohc=dQgASh_scvwQ7kNvwEpRCsl&sdl=0&ccb=14-4&oh=00_AQRd6IqdBEdPQv9X-cKwiftSc2WLU7yBlBdYJj4v4U-rjg&oe=6B13D21D&_nc_sid=4ee932",
        alt: "Morning routine with yoga mat, book and coffee",
    },
    {
        title: "Work and responsibilities",
        desc: "Keep track of scheduled tasks, meetings, and important commitments.",
        image: "https://cdn.fbsbx.com/v/t65.102178-21/874324074_871130402723923_3628719308304824193_n.jpg/work-responsibilities.webp?_nc_ht=cdn.fbsbx.com&_nc_ohc=jPictT7tLEAQ7kNvwElW0mX&sdl=0&ccb=14-4&oh=00_AQQocp5NCcc0jJpPqxrUTn5OUcoH26GIQfrf5DDe5ub5XQ&oe=6B13C019&_nc_sid=4ee932",
        alt: "Work desk with planner and tasks",
    },
    {
        title: "Study and learning",
        desc: "Plan study sessions, learning activities, and regular practice time.",
        image: "https://cdn.fbsbx.com/v/t65.102178-21/891940564_1526904399275022_5631211627162850870_n.jpg/study-learning.webp?_nc_ht=cdn.fbsbx.com&_nc_ohc=u-65z_Hc_EMQ7kNvwEvcWFt&sdl=0&ccb=14-4&oh=00_AQTwJE8HI9Ka8FW7AZz43tFdJ2Tyc2r1qMcQh6fqz-S1KQ&oe=6B13B6E3&_nc_sid=4ee932",
        alt: "Study desk with calculus and study plan",
    },
    {
        title: "Everyday life",
        desc: "Organize errands, personal appointments, household activities, and plans with family or friends.",
        image: "https://cdn.fbsbx.com/v/t65.102178-21/888835441_1802970217412165_7947388261326052319_n.jpg/everyday-life.webp?_nc_ht=cdn.fbsbx.com&_nc_ohc=l67gGmtwuGAQ7kNvwHe19if&sdl=0&ccb=14-4&oh=00_AQQ8ME1550afnIwO7MmI479AkOdYi22_1_cTD8kLJu0NcQ&oe=6B13D114&_nc_sid=4ee932",
        alt: "Kitchen counter with groceries and family toys",
    },
];

export default function Lifestyle() {
    return (
        <SectionWrapper id="lifestyle">
            <Column className="w-full gap-12 md:gap-16">
                <Column className="gap-4 items-center">
                    <SectionLabel className="text-primary">
                        Your life, your routine
                    </SectionLabel>
                    <h2 className="text-4xl font-normal tracking-tight text-foreground sm:text-5xl text-center">
                        One planner.{" "}
                        <span className="text-primary">
                            Many ways to use it.
                        </span>
                    </h2>
                    <p className="text-center max-w-md text-sm font-light leading-relaxed text-muted-foreground sm:text-base">
                        Daylo brings your responsibilities, routines, and
                        upcoming commitments together in one organized schedule.
                    </p>
                </Column>
                <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
                    {USE_CASES.map(({ title, desc, image, alt }) => (
                        <Column key={title} className="gap-4">
                            <div className="relative aspect-square overflow-hidden rounded bg-muted">
                                <Image
                                    src={image}
                                    alt={alt}
                                    fill
                                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                                    className="object-cover"
                                />
                            </div>
                            <Column className="gap-2">
                                <h3 className="text-lg font-normal text-foreground">
                                    {title}
                                </h3>
                                <p className="text-sm font-light leading-relaxed text-muted-foreground">
                                    {desc}
                                </p>
                            </Column>
                        </Column>
                    ))}
                </div>
            </Column>
        </SectionWrapper>
    );
}
