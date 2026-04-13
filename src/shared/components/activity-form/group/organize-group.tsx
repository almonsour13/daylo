import { ColumnView, RowView } from "@/shared/components/ui/custom-view";
import Label from "@/shared/components/ui/label";
import { useActivityFormContext } from "@/shared/context/activity-form-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Text, View } from "react-native";
import CategoryDrawer from "../drawer/category-drawer";
import PriorityDrawer from "../drawer/priority-drawer";

export default function OrganizeGroup() {
    const { activityForm, setActivityForm } = useActivityFormContext();
    return (
        <ColumnView>
            <Label>Organize</Label>
            <View className=" rounded-xl overflow-hidden bg-gray-100">
                <CategoryDrawer>
                    <RowView className="p-4 rounded-md justify-between items-center bg-gray-100">
                        <Text className="text-base font-medium">Category</Text>
                        <RowView className="items-center">
                            <Text className="text-sm text-gray-500">
                                {activityForm.category}
                            </Text>
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
                                {activityForm.priority}
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
