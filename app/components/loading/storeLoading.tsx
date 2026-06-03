import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton"

const StoreLoading = () => {

    return (
        <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
        </>
    )
}

const SkeletonCard = () => {

    return (
  
        <Card className="shape-card w-full max-w-sm not-last:mb-3 sm:not-last:mr-3">
            <CardHeader>
                <CardTitle>
                    <Skeleton className="h-6 w-full" />
                </CardTitle>
                <CardDescription>
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-4/5" />
                </CardDescription>
            </CardHeader>
        </Card>
    )
}