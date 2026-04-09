import clsx from "clsx";
import { TextInput, TextInputProps } from "react-native";

interface Props extends TextInputProps {
    className?: string;
}
export default function Input({ className, ...props }: Props) {
    return (
        <TextInput
            className={clsx("bg-white h-12 p-4 py-1 rounded-md", className)}
            {...props}
        />
    );
}
