import HomeScreen from "@/features/home";
import ScreenWrapper from "@/shared/components/layout/screen-wrapper";

export default function Index() {
    return (
        <ScreenWrapper marginBottom={true}>
            <HomeScreen />
        </ScreenWrapper>
    );
}
