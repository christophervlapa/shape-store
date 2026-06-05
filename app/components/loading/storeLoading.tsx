import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton"

// give users something to let them know we are loading data
export const StoreLoading = () => {

    return (
        <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
        </>
    )
}

export const SkeletonCard = () => {

    return (
  
        <Card className="shape-card w-full max-w-sm not-last:mb-3 sm:not-last:mr-3">
            <CardHeader>
                <CardTitle>
                    <Skeleton className="h-8 w-full" />
                </CardTitle>
                <CardDescription>
                    <Skeleton className="h-4 w-2/3 mt-2" />
                    <Skeleton className="h-4 w-4/5 mt-1" />
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Skeleton className="aspect-video w-full" />
            </CardContent>
        </Card>
    )
}