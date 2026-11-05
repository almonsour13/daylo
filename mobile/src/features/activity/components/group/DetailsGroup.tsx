import { ColView, RowView } from "@/shared/components/ui/CustomView";
import { DrawerHandle } from "@/shared/components/ui/Drawer";
import { getCategory, getPriority } from "@/shared/helper/helper";
import { Activity } from "@/shared/types/type";
import { cn } from "@/shared/utils/cn";
import { useRef } from "react";
import { TouchableOpacity } from "react-native";
import Field from "../../../../shared/components/ui/Field";
import FormField from "../../../../shared/components/ui/FormField";
import CategoryDrawer from "../drawer/CategoryDrawer";
import PriorityDrawer from "../drawer/PriorityDrawer";

export default function DetailsGroup({
    form,
    update,
}: {
    form: Activity;
    update: (f: Partial<Activity>) => void;
}) {
    const { category, priority } = form;
    const categoryDrawer = useRef<DrawerHandle>(null);
    const priorityDrawer = useRef<DrawerHandle>(null);
    const catConfig = getCategory(form.category);
    const priConfig = getPriority(form.priority);

    return (
        <>
            <RowView>
                <ColView className="flex-1">
                    <FormField label="Category">
                        <TouchableOpacity
                            onPress={() => categoryDrawer.current?.open()}
                        >
                            <Field
                                type="display"
                                textClassName={cn(
                                    catConfig && catConfig.textColor,
                                )}
                                value={form.category}
                            />
                        </TouchableOpacity>
                    </FormField>
                </ColView>
                <ColView className="flex-1">
                    <FormField label="Priority">
                        <TouchableOpacity
                            onPress={() => priorityDrawer.current?.open()}
                        >
                            <Field
                                type="display"
                                textClassName={cn(
                                    priConfig && priConfig.textColor,
                                )}
                                value={form.priority}
                            />
                        </TouchableOpacity>
                    </FormField>
                </ColView>
            </RowView>
            <CategoryDrawer
                ref={categoryDrawer}
                value={category}
                onChange={(v) => {
                    update({ category: v });
                }}
            />

            <PriorityDrawer
                ref={priorityDrawer}
                value={priority}
                onChange={(v) => {
                    update({ priority: v });
                }}
            />
        </>
    );
}
