import { ColumnView } from "@/shared/components/ui/custom-view";
import Input from "@/shared/components/ui/input";
import InputField from "@/shared/components/ui/input-field";
import Label from "@/shared/components/ui/label";
import { useActivityFormContext } from "@/shared/context/activity-form-context";
import { useMemo, useState } from "react";

const NAME_PLACEHOLDERS = [
    "e.g. Morning Walk",
    "e.g. Deep Work Session",
    "e.g. Evening Run",
    "e.g. Read for 30 mins",
    "e.g. Meditation",
    "e.g. Gym Workout",
    "e.g. Study Spanish",
    "e.g. Journaling",
];

const DESCRIPTION_PLACEHOLDERS = [
    "e.g. A short morning walk to start the day with energy.",
    "e.g. Focused work session with no distractions.",
    "e.g. 5km run around the park before sunset.",
    "e.g. Read at least 20 pages of a book.",
    "e.g. 10 minutes of mindfulness and breathing.",
    "e.g. Full body workout at the gym.",
    "e.g. Practice vocabulary and grammar for 30 minutes.",
    "e.g. Write thoughts, goals, and reflections for the day.",
];

export default function DetailsGroup() {
    const { activityForm, setActivityForm } = useActivityFormContext();

    const [randomIndex] = useState(() =>
        Math.floor(Math.random() * NAME_PLACEHOLDERS.length),
    );

    const namePlaceholder = NAME_PLACEHOLDERS[randomIndex];
    const descriptionPlaceholder = DESCRIPTION_PLACEHOLDERS[randomIndex]; // ✅ matching pair

    return (
        <ColumnView className="gap-4">
            <InputField>
                <Label>Name:</Label>
                <Input
                    placeholder={namePlaceholder}
                    value={activityForm.name}
                    onChangeText={(text) =>
                        setActivityForm({ ...activityForm, name: text })
                    }
                />
            </InputField>
            <InputField>
                <Label>Description {"(Optional)"}:</Label>
                <Input
                    className="h-36 pt-4"
                    placeholder={descriptionPlaceholder}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    value={activityForm.description ?? ""}
                    onChangeText={(text) =>
                        setActivityForm({ ...activityForm, description: text })
                    }
                />
            </InputField>
        </ColumnView>
    );
}
