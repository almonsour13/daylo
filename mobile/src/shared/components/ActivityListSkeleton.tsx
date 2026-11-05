import { Card } from "@/shared/components/ui/Card";

export default function ActivityListSkeleton({
    count = 5,
}: {
    count?: number;
}) {
    return (
        <>
            {Array.from({ length: count }, (_, i) => (
                <Card key={`skeleton-${i}`} className="h-36" />
            ))}
        </>
    );
}
