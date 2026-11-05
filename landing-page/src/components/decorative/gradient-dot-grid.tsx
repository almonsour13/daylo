import { cn } from "@/lib/utils";

export default function GradientDotGrid({
    className,
    glowPosition = "bottom",
    color = "rgba(128,128,128,1)",
}: {
    className?: string;
    glowPosition?: "bottom" | "top" | "center";
    /**
     * Any valid CSS color (e.g. "rgba(128,128,128,1)"), or the name of a
     * CSS custom property (e.g. "--primary-foreground") to read from the
     * current theme — detected by a leading "--" and wrapped in var().
     */
    color?: string;
}) {
    const resolvedColor = color.trim().startsWith("--")
        ? `var(${color})`
        : color;

    const maskDirection =
        glowPosition === "top"
            ? "to top"
            : glowPosition === "center"
              ? "to bottom"
              : "to bottom";

    const glowAt =
        glowPosition === "top"
            ? "50% 0%"
            : glowPosition === "center"
              ? "50% 50%"
              : "50% 100%";

    const glowClass =
        glowPosition === "top"
            ? "top-0"
            : glowPosition === "center"
              ? "inset-0"
              : "bottom-0";

    return (
        <div
            className={cn("absolute inset-0 -z-10 overflow-hidden", className)}
        >
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `radial-gradient(${resolvedColor} 0.8px, transparent 0.8px)`,
                    backgroundSize: "12px 12px",
                    maskImage: `linear-gradient(${maskDirection}, transparent 0%, rgba(0,0,0,0.5) 50%, black 100%)`,
                    WebkitMaskImage: `linear-gradient(${maskDirection}, transparent 0%, rgba(0,0,0,0.5) 50%, black 100%)`,
                }}
            />
        </div>
    );
}
