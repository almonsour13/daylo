import { ColView } from "@/shared/components/ui/CustomView";
import Text from "@/shared/components/ui/Text";
import { TIME_SESSION_PHRASES } from "@/shared/constants/constant";
import { useNow } from "@/shared/hooks/use-now";
import { useProfileStore } from "@/shared/stores/use-profile.store";
import { useMemo } from "react";

type Session = "morning" | "afternoon" | "evening" | "night";

const getSession = (hour: number): Session =>
    hour < 5
        ? "night"
        : hour < 12
          ? "morning"
          : hour < 17
            ? "afternoon"
            : "evening";

export default function Header() {
    const now = useNow();
    const profile = useProfileStore((s) => s.profile);

    const session = getSession(now.getHours());
    const name = profile?.name?.trim();

    const phrase = useMemo(() => {
        const phrases = TIME_SESSION_PHRASES as Record<string, string[]>;
        const list = phrases[session]?.length
            ? phrases[session]
            : phrases.evening;
        if (!list?.length) return "";
        return list[Math.floor(Math.random() * list.length)];
    }, [session]);

    return (
        <ColView className="px-4 pt-4 gap-0">
            <Text className="text-xl text-muted-foreground">
                Good {session}
                {name ? (
                    <>
                        {", "}
                        <Text className="capitalize font-medium">{name}</Text>
                        {"!"}
                    </>
                ) : (
                    "!"
                )}
            </Text>
            {!!phrase && (
                <Text className="capitalize text-2xl text-foreground">
                    {phrase}
                </Text>
            )}
        </ColView>
    );
}
