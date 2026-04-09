import { useCallback, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    LayoutChangeEvent,
    Modal,
    PanResponder,
    Pressable,
    StyleSheet,
    View,
} from "react-native";

const DISMISS_THRESHOLD = 120;
const ANIMATION_DURATION = 300;

export default function Drawer({
    triggerButton,
    children,
}: {
    triggerButton: React.ReactNode;
    children: React.ReactNode;
}) {
    const windowHeight = Dimensions.get("window").height;

    const contentHeightRef = useRef(windowHeight);
    const translateY = useRef(new Animated.Value(windowHeight)).current;
    const dragY = useRef(new Animated.Value(0)).current;
    const backdropOpacity = useRef(new Animated.Value(0)).current;
    const hasOpened = useRef(false);
    const [modalVisible, setModalVisible] = useState(false);

    const combinedTranslate = Animated.add(translateY, dragY);

    const open = useCallback(() => {
        setModalVisible(true);
        // Animation is triggered from onLayout once the modal mounts
    }, []);

    const close = useCallback(() => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: contentHeightRef.current,
                duration: ANIMATION_DURATION,
                useNativeDriver: true,
            }),
            Animated.timing(backdropOpacity, {
                toValue: 0,
                duration: ANIMATION_DURATION,
                useNativeDriver: true,
            }),
        ]).start(() => {
            hasOpened.current = false;
            setModalVisible(false);
        });
    }, [translateY, backdropOpacity]);

    const snapBack = useCallback(() => {
        Animated.spring(dragY, {
            toValue: 0,
            useNativeDriver: true,
            damping: 15,
            stiffness: 300,
        }).start();
    }, [dragY]);

    const onLayout = useCallback(
        (e: LayoutChangeEvent) => {
            const h = e.nativeEvent.layout.height;
            if (h === 0) return;
            contentHeightRef.current = h;

            if (!hasOpened.current) {
                hasOpened.current = true;
                translateY.setValue(h);
                Animated.parallel([
                    Animated.timing(translateY, {
                        toValue: 0,
                        duration: ANIMATION_DURATION,
                        useNativeDriver: true,
                    }),
                    Animated.timing(backdropOpacity, {
                        toValue: 1,
                        duration: ANIMATION_DURATION,
                        useNativeDriver: true,
                    }),
                ]).start();
            }
        },
        [translateY, backdropOpacity],
    );

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: (_, { dy }) => Math.abs(dy) > 4,
            onPanResponderMove: (_, { dy }) => {
                if (dy > 0) dragY.setValue(dy);
                else dragY.setValue(dy * 0.1);
            },
            onPanResponderRelease: (_, { dy, vy }) => {
                if (dy > DISMISS_THRESHOLD || vy > 0.8) {
                    translateY.setValue((translateY as any)._value + dy);
                    dragY.setValue(0);
                    close();
                } else {
                    snapBack();
                }
            },
        }),
    ).current;

    return (
        <>
            <Pressable onPress={open}>{triggerButton}</Pressable>
            <Modal
                visible={modalVisible}
                transparent
                animationType="none"
                statusBarTranslucent
                onRequestClose={close}
            >
                <Animated.View
                    style={[
                        StyleSheet.absoluteFillObject,
                        styles.backdrop,
                        { opacity: backdropOpacity },
                    ]}
                >
                    <Pressable
                        style={StyleSheet.absoluteFill}
                        onPress={close}
                    />
                </Animated.View>

                <Animated.View
                    style={[
                        styles.drawer,
                        { transform: [{ translateY: combinedTranslate }] },
                    ]}
                    onLayout={onLayout}
                >
                    <View
                        style={styles.handleArea}
                        {...panResponder.panHandlers}
                    >
                        <View style={styles.handle} />
                    </View>
                    {children}
                </Animated.View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    drawer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 16,
    },
    handleArea: {
        alignItems: "center",
        paddingVertical: 16,
    },
    handle: {
        width: 40,
        height: 5,
        borderRadius: 3,
        backgroundColor: "rgba(0,0,0,0.2)",
    },
});
