import { ColumnView } from "@/shared/components/ui/custom-view";
import clsx from "clsx";
import { ScrollView } from "react-native";
import DateTimeInput from "./components/date-time-input";
import Header from "./components/header";
import NameDescriptionInput from "./components/name-desc-input";
import NotificationInput from "./components/notification-input";
import PriorityInput from "./components/priority-input";
import RepeatInput from "./components/repeat-input";
import SubmitButton from "./components/submit-button";

export default function AddActivityScreen() {
    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ColumnView className={clsx("relative pb-40")}>
                    <Header />
                    <ColumnView className="px-4 gap-4">
                        <NameDescriptionInput />
                        <PriorityInput />
                        <DateTimeInput />
                        <RepeatInput />
                        <NotificationInput />
                    </ColumnView>
                </ColumnView>
            </ScrollView>
            <SubmitButton />
        </>
    );
}
