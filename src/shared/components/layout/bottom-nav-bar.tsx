import { HIDDEN_ON_ROUTES, NAV_ITEMS } from "@/shared/constants/constant";
import Feather from "@expo/vector-icons/Feather";
import { usePathname, useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BottomNavBar() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const pathname = usePathname();
    const translateY = useRef(new Animated.Value(0)).current;
    const isHidden = useRef(false);

    const shouldHideNav = (pathname: string): boolean => {
        const isActivityDetails = /^\/\d+$/.test(pathname);
        if (isActivityDetails) return true;
        return HIDDEN_ON_ROUTES.some((route) =>
            route.endsWith("/")
                ? pathname.startsWith(route)
                : pathname === route,
        );
    };

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    useEffect(() => {
        const hide = shouldHideNav(pathname);
        if (hide === isHidden.current) return;
        isHidden.current = hide;
        Animated.spring(translateY, {
            toValue: hide ? 120 : 0,
            useNativeDriver: true,
            bounciness: 0,
            speed: 20,
        }).start();
    }, [pathname]);
    const item = NAV_ITEMS.find((item) => item.label === "__fab__");
    return (
        <Animated.View
            style={{
                paddingBottom: insets.bottom,
                transform: [{ translateY }],
            }}
            className="absolute bottom-0 left-0 right-0 rounded-t-4xl shadow-4xl"
        >
            <View className="p-4 pb-4 flex-row gap-2 justify-center items-center">
                <View className="h-18 p-4 px-6 flex-row gap-6 items-center rounded-full bg-white">
                    {NAV_ITEMS.map((item) => {
                        const href = item.href;
                        const isItemActive = isActive(href);
                        if (item.label === "__fab__") return;
                        return (
                            <Pressable
                                key={item.label}
                                onPress={() => router.push(href)}
                            >
                                <View
                                    className={`h-12 aspect-square items-center justify-center gap-1 ${isItemActive ? "" : "opacity-50"}`}
                                >
                                    <Feather name={item.icon} size={24} />
                                </View>
                            </Pressable>
                        );
                    })}
                </View>
                <Pressable onPress={() => router.push("/addActivity")}>
                    <View className="h-18 aspect-square justify-center items-center bg-black rounded-full">
                        <Feather name="plus" size={24} color="white" />
                    </View>
                </Pressable>
            </View>
        </Animated.View>
    );
}
