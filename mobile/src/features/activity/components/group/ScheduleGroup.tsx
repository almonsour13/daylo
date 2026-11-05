import { ColView, RowView } from "@/shared/components/ui/CustomView";
import { DrawerHandle } from "@/shared/components/ui/Drawer";
import { DAY_LABELS } from "@/shared/constants/constant";
import { Activity } from "@/shared/types/type";
import { format } from "date-fns";
import { useRef } from "react";
import { TouchableOpacity } from "react-native";
import Field from "../../../../shared/components/ui/Field";
import FormField from "../../../../shared/components/ui/FormField";
import DateDrawer from "../drawer/DateDrawer";
import RepeatDaysDrawer from "../drawer/RepeatDaysDrawer";
import RepeatTypeDrawer from "../drawer/RepeatTypeDrawer";
import TimeRangeDrawer from "../drawer/TImeRangeDrawer";

export default function ScheduleGroup({
    form,
    update,
}: {
    form: Activity;
    update: (f: Partial<Activity>) => void;
}) {
    const dateDrawer = useRef<DrawerHandle>(null);
    const timeRangeDrawer = useRef<DrawerHandle>(null);
    const repeatTypeDrawer = useRef<DrawerHandle>(null);
    const repeatDaysDrawer = useRef<DrawerHandle>(null);

    const { date, startTime, endTime, repeatDays, repeatType } = form;

    const dateObj = new Date(date);

    const start = new Date(dateObj);
    const [startH, startM] = startTime.split(":").map(Number);
    start.setHours(startH, startM, 0, 0);

    const end = new Date(dateObj);
    const [endH, endM] = endTime.split(":").map(Number);
    end.setHours(endH, endM, 0, 0);

    const timeRange = startTime
        ? endTime
            ? `${format(start, "p")} - ${format(end, "p")}`
            : format(start, "p")
        : "--";
    const formattedDate = date ? format(dateObj, "dd MMM, yyy") : "--";

    const parsedRepeatDays = repeatDays
        ? (JSON.parse(repeatDays) as number[])
        : [];

    const repeat = (() => {
        if (repeatType === "custom" && repeatDays.length > 0) {
            return (
                "Every " +
                parsedRepeatDays
                    .map((i) => DAY_LABELS[i].substring(0, 3))
                    .join(", ")
            );
        }
        return repeatType;
    })();

    return (
        <>
            <ColView className="gap-4">
                <RowView>
                    <ColView className="flex-1">
                        <FormField label="Date">
                            <TouchableOpacity
                                onPress={() => dateDrawer.current?.open()}
                            >
                                <Field type="display" value={formattedDate} />
                            </TouchableOpacity>
                        </FormField>
                    </ColView>
                    <ColView className="flex-1">
                        <FormField label="Time Range">
                            <TouchableOpacity
                                onPress={() => timeRangeDrawer.current?.open()}
                            >
                                <Field type="display" value={timeRange} />
                            </TouchableOpacity>
                        </FormField>
                    </ColView>
                </RowView>

                <FormField label="Repeat">
                    <TouchableOpacity
                        onPress={() => repeatTypeDrawer.current?.open()}
                    >
                        <Field type="display" value={repeat || "Select"} />
                    </TouchableOpacity>
                </FormField>
            </ColView>

            <DateDrawer ref={dateDrawer} form={form} update={update} />
            <RepeatTypeDrawer
                ref={repeatTypeDrawer}
                value={form.repeatType}
                onChange={(v) => {
                    if (v === "custom") {
                        repeatDaysDrawer.current?.open();
                        return;
                    } else {
                        update({ repeatType: v });
                        update({ repeatDays: JSON.stringify([]) }); // This causes a state update right when a drawer opens/closes!
                    }
                }}
            />
            <RepeatDaysDrawer
                ref={repeatDaysDrawer}
                value={parsedRepeatDays}
                onChange={(v) => {
                    const hasChanged =
                        v.length !== parsedRepeatDays.length ||
                        v.some((day) => !parsedRepeatDays.includes(day));

                    if (hasChanged) {
                        update({ repeatType: "custom" });
                        update({ repeatDays: JSON.stringify(v) });
                    }
                }}
            />
            <TimeRangeDrawer
                ref={timeRangeDrawer}
                form={form}
                update={update}
            />
        </>
    );
}
