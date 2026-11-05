import { Card } from "@/shared/components/ui/Card";
import { ColView, RowView } from "@/shared/components/ui/CustomView";
import Icon from "@/shared/components/ui/Icon";
import Text from "@/shared/components/ui/Text";
import { profileService } from "@/shared/services/profile.service";
import { useProfileStore } from "@/shared/stores/use-profile.store";
import { Profile } from "@/shared/types/type";
import { cn } from "@/shared/utils/cn";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";

export default function ProfileEditScreen() {
    const navigation = useNavigation();
    const [isUpdating, setIsUpdating] = useState(false);
    const profile = useProfileStore((s) => s.profile);
    const updateProfile = useProfileStore((s) => s.updateProfile);

    const [newProfile, setNewProfile] = useState<Profile | null>(
        profile || {
            name: "",
        },
    );

    const handleChange = (key: keyof Profile, value: any) => {
        setNewProfile((prev) => {
            if (!prev) return null;

            return {
                ...prev,
                [key]: value,
            };
        });
    };

    const handleSave = async () => {
        if (newProfile) {
            const updated = {
                ...newProfile,
                updatedAt: Date.now().toString(),
            };
            setIsUpdating(true);
            profileService
                .update(updated)
                .then(() => {
                    updateProfile(updated);
                    navigation.goBack();
                })
                .catch(() => {
                    setIsUpdating(false);
                });
        }
    };

    const isDirty = newProfile?.name?.trim() !== profile?.name?.trim();

    const isValid = !!newProfile?.name?.trim();

    const canSave = isDirty && isValid;

    return (
        <>
            <ColView className="flex-1 gap-0">
                <RowView className="p-4 justify-between items-center">
                    <RowView className="gap-2 items-center">
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            hitSlop={12}
                            accessibilityRole="button"
                            accessibilityLabel="Go back"
                        >
                            <Icon
                                name="arrow-back"
                                size={24}
                                className="text-foreground"
                            />
                        </TouchableOpacity>
                        <Text className="text-xl">Edit Profile</Text>
                    </RowView>
                </RowView>

                <ColView className="px-4 gap-4">
                    <ColView>
                        <Text>Name</Text>
                        <Card className="h-16 py-2">
                            <TextInput
                                placeholder="Enter your name"
                                value={newProfile?.name}
                                onChangeText={(v) => handleChange("name", v)}
                                className="text-foreground"
                            />
                        </Card>
                    </ColView>
                </ColView>

                <ColView className="flex-1 justify-end p-4 pb-8">
                    <TouchableOpacity
                        className={cn(
                            "h-16 rounded-full bg-primary justify-center items-center",
                            (!canSave || isUpdating) && "opacity-30",
                        )}
                        disabled={!canSave || isUpdating}
                        onPress={() => handleSave()}
                    >
                        <Text className="text-white">
                            {isUpdating ? "Updating..." : "Save"}
                        </Text>
                    </TouchableOpacity>
                </ColView>
            </ColView>
        </>
    );
}
