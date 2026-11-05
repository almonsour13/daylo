import { Card } from "@/shared/components/ui/Card";
import { ColView, RowView } from "@/shared/components/ui/CustomView";
import Text from "@/shared/components/ui/Text";
import { useOnboardingContext } from "@/shared/context/OnboardingContext";
import { onboardingService } from "@/shared/services/oboarding.service";
import { profileService } from "@/shared/services/profile.service";
import { settingsService } from "@/shared/services/settings.service";
import { useProfileStore } from "@/shared/stores/use-profile.store";
import { useSettingsStore } from "@/shared/stores/use-settings-store";
import { Preferences, Profile } from "@/shared/types/type";
import { cn } from "@/shared/utils/cn";
import { useEffect, useRef, useState } from "react";
import {
    FlatList,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";
import ProgressBar from "../components/ProgressBar";
import FinishStep from "../components/steps/FinishStep";
import PermissionStep from "../components/steps/PermissionStep";
import ProfileStep from "../components/steps/ProfileStep";

const ONBOARDING_STEPS = ["Profile", "Permission", "Finish"];
type StepName = (typeof ONBOARDING_STEPS)[number];

type PermissionStatus = "idle" | "granted" | "denied";
export type Permissions = {
    notifications: PermissionStatus;
};

const DEFAULT_PREFERENCES: Preferences = { theme: "system" };

export default function OnboardingStepsScreen() {
    const { width } = useWindowDimensions();
    const { setIsOnboarded } = useOnboardingContext();
    const [index, setIndex] = useState(0);
    const [isFinishing, setIsFinishing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [profile, setProfile] = useState<Profile>({ name: "" });
    const preferences = DEFAULT_PREFERENCES;
    const [permissions, setPermissions] = useState<Permissions>({
        notifications: "idle",
    });

    const setNewProfile = useProfileStore((s) => s.setProfile);
    const setSettings = useSettingsStore((s) => s.setSettings);
    const flatListRef = useRef<FlatList<StepName>>(null);
    const navTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
        };
    }, []);

    const isFirstStep = index === 0;
    const isLastStep = index === ONBOARDING_STEPS.length - 1;
    const step = ONBOARDING_STEPS[index];

    const goTo = (i: number) => {
        setIndex(i);
        flatListRef.current?.scrollToIndex({ index: i, animated: true });
    };
    const nextStep = () => {
        if (index < ONBOARDING_STEPS.length - 1) goTo(index + 1);
    };
    const prevStep = () => {
        if (index > 0) goTo(index - 1);
    };

    const trimmedName = profile.name.trim();
    const isProfileValid = trimmedName !== "";

    // Denied counts as resolved so users aren't trapped on this step
    const permissionsResolved = Object.values(permissions).every(
        (status) => status !== "idle",
    );

    const canProceed: Record<StepName, boolean> = {
        Profile: isProfileValid,
        Permission: permissionsResolved,
        Finish: true,
    };
    const canProceedToNextStep = canProceed[step];

    const finish = async () => {
        if (!canProceedToNextStep || isFinishing) return;
        setIsFinishing(true);
        setError(null);
        try {
            const finalProfile = { ...profile, name: trimmedName };
            await profileService.save(finalProfile);
            await settingsService.save({ preferences });
            await onboardingService.complete();

            setNewProfile(finalProfile);
            setSettings({ preferences });
            navTimeoutRef.current = setTimeout(() => {
                // navigation.navigate("Main", { screen: "HomeScreen" });
                setIsOnboarded(true);
            }, 200);
        } catch (e) {
            console.error("[Onboarding] Failed to finish:", e);
            setError("Something went wrong. Please try again.");
        } finally {
            setIsFinishing(false);
        }
    };

    return (
        <ColView className="flex-1 gap-8">
            <ProgressBar total={ONBOARDING_STEPS.length} index={index} />

            <View className="flex-1">
                <FlatList
                    ref={flatListRef}
                    data={ONBOARDING_STEPS}
                    extraData={{ index, profile, permissions }}
                    keyExtractor={(item) => item}
                    horizontal
                    pagingEnabled
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    getItemLayout={(_, i) => ({
                        length: width,
                        offset: width * i,
                        index: i,
                    })}
                    renderItem={({ item }) => (
                        <View style={{ width }}>
                            {item === "Profile" ? (
                                <ProfileStep
                                    isActive={step === "Profile"}
                                    profile={profile}
                                    setProfile={setProfile}
                                />
                            ) : item === "Permission" ? (
                                <PermissionStep
                                    isActive={step === "Permission"}
                                    permissions={permissions}
                                    setPermissions={setPermissions}
                                />
                            ) : item === "Finish" ? (
                                <FinishStep isActive={step === "Finish"} />
                            ) : null}
                        </View>
                    )}
                />
            </View>

            {!!error && (
                <Text className="px-4 text-center text-destructive">
                    {error}
                </Text>
            )}

            <RowView className="px-4 pb-12">
                {!isFirstStep ? (
                    <TouchableOpacity
                        onPress={prevStep}
                        disabled={isFinishing}
                        accessibilityRole="button"
                        accessibilityLabel="Back"
                        className={cn("flex-1", isFinishing && "opacity-50")}
                    >
                        <Card className="h-16 justify-center items-center bg-muted">
                            <Text className="text-foreground text-lg font-medium">
                                Back
                            </Text>
                        </Card>
                    </TouchableOpacity>
                ) : (
                    <View className="flex-1" />
                )}
                <TouchableOpacity
                    onPress={isLastStep ? finish : nextStep}
                    disabled={!canProceedToNextStep || isFinishing}
                    accessibilityRole="button"
                    accessibilityLabel={isLastStep ? "Finish" : "Next"}
                    accessibilityState={{
                        disabled: !canProceedToNextStep || isFinishing,
                    }}
                    className={cn(
                        "flex-1",
                        (!canProceedToNextStep || isFinishing) && "opacity-50",
                    )}
                >
                    <Card className="h-16 justify-center items-center bg-primary">
                        <Text className="text-white text-lg font-medium">
                            {isFinishing
                                ? "Finishing..."
                                : isLastStep
                                  ? "Finish"
                                  : "Next"}
                        </Text>
                    </Card>
                </TouchableOpacity>
            </RowView>
        </ColView>
    );
}
