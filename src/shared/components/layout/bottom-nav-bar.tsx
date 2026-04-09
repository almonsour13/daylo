import { HIDDEN_ON_ROUTES, NAV_ITEMS } from "@/shared/constants/constant";
import Feather from "@expo/vector-icons/Feather";
import { usePathname, useRouter } from "expo-router";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BottomNavBar() {
    const insets = useSafeAreaInsets();

    const router = useRouter();
    const pathname = usePathname();

    const shouldHideNav = (pathname: string): boolean => {
        const isActivityDetails = /^\/\d+$/.test(pathname);
        if (isActivityDetails) return true;

        return HIDDEN_ON_ROUTES.some(
            (route) =>
                route.endsWith("/")
                    ? pathname.startsWith(route) // prefix match
                    : pathname === route, // exact match
        );
    };
    if (shouldHideNav(pathname)) {
        return null;
    }

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    return (
        <View
            style={{ paddingBottom: insets.bottom }}
            // className="absolute bottom-0 left-0 right-0"
            className="bg-white rounded-t-2xl shadow-2xl"
        >
            <View className="px-4 justify-center items-center">
                <View className="py-4 flex-row justify-between items-center gap-16 rounded-full">
                    {NAV_ITEMS.map((item) => {
                        const href = item.href;
                        const isItemActive = isActive(href);

                        // if (item.label === "__fab__") {
                        //     return (
                        //         <Pressable
                        //             key={item.label}
                        //             onPress={() => router.push(href)}
                        //         >
                        //             <View
                        //                 className={`p-4 aspect-square bg-black rounded-full`}
                        //             >
                        //                 <Feather
                        //                     name={item.icon}
                        //                     size={20}
                        //                     color={"white"}
                        //                 />
                        //             </View>
                        //         </Pressable>
                        //     );
                        // }
                        return (
                            <Pressable
                                key={item.label}
                                onPress={() => router.push(href)}
                            >
                                <View
                                    className={`h-12 bg-red-100 items-center justify-center gap-1 ${isItemActive ? "" : "opacity-50"}`}
                                >
                                    <Feather name={item.icon} size={24} />
                                    {/* <Text className="text-xs">
                                        {item.label}
                                    </Text> */}
                                </View>
                            </Pressable>
                        );
                    })}
                </View>
            </View>
        </View>
    );
}
