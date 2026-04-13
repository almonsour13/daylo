import { ColumnView, RowView } from "@/shared/components/ui/custom-view";
import { Text, View } from "react-native";

export default function WeekProgress() {
    return (
        <ColumnView className="px-2">
            <RowView className="p-4 h-44 rounded-2xl bg-white">
                <View className="flex-1 flex-col gap-1">
                    <Text className="text-sm uppercase font-semibold tracking-widest">
                        week progress
                    </Text>

                    <Text className="text-8xl leading-4 font-bold">
                        50
                        <Text className="text-5xl">% </Text>
                    </Text>
                    <Text className="text-xs italic ">of your target</Text>
                </View>
                <View className="border-16 border justify-center items-center p-0 rounded-full aspect-square">
                    <Text className="text-4xl font-bold text-center ">
                        16
                        <Text className="text-lg">/</Text>
                        <Text className="text-xs">30</Text>
                    </Text>
                    <Text className="text-xs text-center ">Done</Text>
                </View>
            </RowView>
        </ColumnView>
    );
}
