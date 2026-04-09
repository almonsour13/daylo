import { ColumnView, RowView } from "@/shared/components/ui/custom-view";
import { Text, View } from "react-native";

export default function WeekProgress() {
    return (
        <ColumnView className="px-4">
            <RowView className="p-4 h-44 rounded-2xl bg-black">
                <View className="flex-1 flex-col gap-1">
                    <Text className="text-sm uppercase text-white font-semibold tracking-widest">
                        week progress
                    </Text>

                    <Text className="text-8xl leading-4 font-bold text-white">
                        50
                        <Text className="text-5xl">% </Text>
                    </Text>
                    <Text className="text-xs italic text-white">
                        of your target
                    </Text>
                </View>
                <View className="border-16 border-white justify-center items-center p-0 rounded-full aspect-square">
                    <Text className="text-4xl font-bold text-center text-white">
                        16
                        <Text className="text-lg">/</Text>
                        <Text className="text-xs">30</Text>
                    </Text>
                    <Text className="text-xs text-center text-white">Done</Text>
                </View>
            </RowView>
        </ColumnView>
    );
}
