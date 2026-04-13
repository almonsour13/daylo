import AddActivityScreen from "@/features/add-activity";
import ScreenWrapper from "@/shared/components/layout/screen-wrapper";
import { ActivityFormProvider } from "@/shared/context/activity-form-context";

export default function AddActivity() {
    return (
        <ScreenWrapper marginBottom={true}>
            <ActivityFormProvider mode="add">
                <AddActivityScreen />
            </ActivityFormProvider>
        </ScreenWrapper>
    );
}
