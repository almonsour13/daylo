import { useEffect, useRef } from "react";
import { Animated, Pressable } from "react-native";

interface Props {
    onChange?: (value: boolean) => void;
    value?: boolean;
}

export default function Switch({ onChange, value }: Props) {
    const translateX = useRef(new Animated.Value(value ? 22 : 2)).current;

    useEffect(() => {
        Animated.spring(translateX, {
            toValue: value ? 22 : 2,
            useNativeDriver: true,
            bounciness: 4,
            speed: 20,
        }).start();
    }, [value]);

    return (
        <Pressable
            onPress={() => onChange && onChange(!value)}
            className={`w-12 h-6 rounded-full justify-center ${value ? "bg-black" : "bg-zinc-300"}`}
        >
            <Animated.View
                className="w-4 h-4 rounded-full bg-white"
                style={{ transform: [{ translateX }] }}
            />
        </Pressable>
    );
}
