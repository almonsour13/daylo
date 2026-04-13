import AddActivityScreen from "@/features/add-activity";
import EditActivityScreen from "@/features/edit-activity";
import ScreenWrapper from "@/shared/components/layout/screen-wrapper";
import { ActivityFormProvider } from "@/shared/context/activity-form-context";

export default function EditActivity() {
    return (
        <ScreenWrapper marginBottom={true}>
            <ActivityFormProvider mode="edit">
                <EditActivityScreen />
            </ActivityFormProvider>
        </ScreenWrapper>
    );
}
