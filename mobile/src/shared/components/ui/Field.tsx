import { Card } from "@/shared/components/ui/Card";
import Text from "@/shared/components/ui/Text";
import { cn } from "@/shared/utils/cn";
import { TextInput } from "react-native";

type FieldCardProps =
    | {
          type: "input";
          placeholder?: string;
          value?: string;
          onChangeText?: (text: string) => void;
          className?: string;
      }
    | {
          type: "display";
          value: string;
          className?: string;
          textClassName?: string;
      };

export default function Field(props: FieldCardProps) {
    if (props.type === "input") {
        return (
            <Card className={cn("h-14 py-0 justify-center", props.className)}>
                <TextInput
                    placeholder={props.placeholder}
                    value={props.value}
                    onChangeText={props.onChangeText}
                    className="text-base text-foreground placeholder:text-muted-foreground"
                />
            </Card>
        );
    }

    return (
        <Card className={cn("h-14 justify-center", props.className)}>
            <Text className={cn("capitalize ", props.textClassName)}>
                {props.value}
            </Text>
        </Card>
    );
}
