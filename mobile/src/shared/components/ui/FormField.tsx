import { ColView } from "@/shared/components/ui/CustomView";
import Label from "./Label";

export default function FormField({
    label,
    children,
}: {
    label: string;
    children?: React.ReactNode;
}) {
    return (
        <ColView>
            <Label className="">{label}</Label>
            {children}
        </ColView>
    );
}
