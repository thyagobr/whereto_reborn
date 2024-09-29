import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export const CardSkeleton = () => {
  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-[450px]">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-4 w-[200px] my-2" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-[250px] my-3" />
          <Separator className="mt-4" />
          <div className="mt-3 flex gap-3">
            <Skeleton className="h-4 w-[75px]" />
            <Skeleton className="h-4 w-[75px]" />
            <Skeleton className="h-4 w-[75px]" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
