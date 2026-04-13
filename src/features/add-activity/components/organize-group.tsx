import { ColumnView, RowView } from "@/shared/components/ui/custom-view";
import Label from "@/shared/components/ui/label";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Text, View } from "react-native";
import PriorityDrawer from "./drawer/priority-drawer";
import { useAddActivityContext } from "../context/add-activity-context";
import { PRIORITY } from "@/shared/constants/constant";
import CategoryDrawer from "./drawer/category-drawer";

export default function OrganizeGroup() {
    const { newActivity } = useAddActivityContext();
    return (
        <ColumnView>
            <Label>Organize</Label>
            <View className=" rounded-xl overflow-hidden bg-gray-100">
                <CategoryDrawer>
                    <RowView className="p-4 rounded-md justify-between items-center bg-gray-100">
                        <Text className="text-base font-medium">Category</Text>
                        <RowView className="items-center">
                            <Text className="text-sm text-gray-500">None</Text>
                            <MaterialIcons
                                name="arrow-forward-ios"
                                size={16}
                                className="text-gray-500"
                            />
                        </RowView>
                    </RowView>
                </CategoryDrawer>
                <PriorityDrawer>
                    <RowView className="p-4 rounded-md justify-between items-center bg-gray-100">
                        <Text className="text-base font-medium">Priority</Text>
                        <RowView className="items-center">
                            <Text className="text-sm text-gray-500">
                                {PRIORITY[newActivity.priority].label}
                            </Text>
                            <MaterialIcons
                                name="arrow-forward-ios"
                                size={16}
                                className="text-gray-500"
                            />
                        </RowView>
                    </RowView>
                </PriorityDrawer>
            </View>
        </ColumnView>
    );
}
