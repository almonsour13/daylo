import { useActivityContext } from "@/features/activity/context/activity-context";
import DiscardDrawer from "@/shared/components/drawer/discard-drawer";
import { ColumnView, RowView } from "@/shared/components/ui/custom-view";
import Drawer, { DrawerHandle } from "@/shared/components/ui/drawer";
import { useActivityFormContext } from "@/shared/context/activity-form-context";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { useMemo, useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const PHRASES = [
    {
        title: "Add something great.",
        subtitle: "Define it. Schedule it. Do it.",
    },
    {
        title: "What's next?",
        subtitle: "Set it up and show up.",
    },
    {
        title: "Build your day.",
        subtitle: "Every great day starts with a plan.",
    },
    {
        title: "Plan it. Own it.",
        subtitle: "A goal without a plan is just a wish.",
    },
    {
        title: "Make it happen.",
        subtitle: "Small steps, big results.",
    },
    {
        title: "New activity.",
        subtitle: "Set the hour. Show up. Repeat.",
    },
];

export default function Header() {
    const { hasChanges } = useActivityFormContext();
    const drawerRef = useRef<DrawerHandle>(null);
    const router = useRouter();

    // ✅ pick random phrase, stable per render
    const phrase = useMemo(
        () => PHRASES[Math.floor(Math.random() * PHRASES.length)],
        [],
    );

    const onBack = () => {
        if (hasChanges) {
            drawerRef.current?.open();
            return;
        }
        router.back();
    };

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
            <RowView className="px-4 justify-between ">
                <View className="flex-1 flex-col">
                    <Text className="text-2xl text-neutral-900">
                        {phrase.title}
                    </Text>
                    <Text className="text-5xl leading-normal text-neutral-900">
                        {phrase.subtitle}
                    </Text>
                </View>
                {/* <View className="h-24 aspect-square bg-reda-200" /> */}
            </RowView>
            <Drawer disableOpacity={true} ref={drawerRef}>
                <DiscardDrawer
                    onClose={() => drawerRef.current?.close()}
                    onSuccess={() => {
                        drawerRef.current?.close();
                        router.back();
                    }}
                />
            </Drawer>
        </ColumnView>
    );
}
