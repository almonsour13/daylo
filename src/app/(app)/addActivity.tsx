import AddActivityScreen from "@/features/add-activity";
import { AddActivityProvider } from "@/features/add-activity/context/add-activity-context";
import ScreenWrapper from "@/shared/components/layout/screen-wrapper";

export default function AddActivity() {
    return (
        <ScreenWrapper>
            <AddActivityProvider>
                <AddActivityScreen />
            </AddActivityProvider>
        </ScreenWrapper>
    );
}
