import { ColumnView, RowView } from "@/shared/components/ui/custom-view";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const EDIT_PHRASES = [
    {
        title: "Make it better.",
        subtitle: "Refine it. Reschedule it. Own it.",
    },
    {
        title: "Update your plan.",
        subtitle: "Small tweaks, big impact.",
    },
    {
        title: "Adjust and adapt.",
        subtitle: "Flexibility is the key to consistency.",
    },
    {
        title: "Refine your focus.",
        subtitle: "A better plan leads to better results.",
    },
    {
        title: "Keep it sharp.",
        subtitle: "Update it. Improve it. Do it.",
    },
];

export default function Header() {
    const router = useRouter();

    // ✅ pick random phrase, stable per render
    const phrase = useMemo(
        () => EDIT_PHRASES[Math.floor(Math.random() * EDIT_PHRASES.length)],
        [],
    );

    const onBack = () => router.back();

    return (
        <ColumnView className="">
            <RowView className="p-4 justify-between items-center">
                <TouchableOpacity
                    className="h-12 aspect-square rounded-full justify-center items-center bg-white"
                    onPress={onBack}
                >
                    <Feather name="arrow-left" size={20} />
                </TouchableOpacity>
                <Text className="hidden text-2xl">Create New Activity</Text>
                <TouchableOpacity className="hidden h-12 aspect-square rounded-full justify-center items-center bg-white">
                    <Feather name="more-vertical" size={20} />
                </TouchableOpacity>
            </RowView>
            <RowView className="px-4 justify-between text-neutral-900">
                <View className="flex-1 flex-col">
                    <Text className="text-2xl">{phrase.title}</Text>
                    <Text className="text-4xl leading-normal text-neutral-900">
                        {phrase.subtitle}
                    </Text>
                </View>
                {/* <View className="h-24 aspect-square bg-reda-200" /> */}
            </RowView>
        </ColumnView>
    );
}
