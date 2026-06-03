import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Shape } from "@/interfaces/shapes";

interface ShapeCardProps {
    shapeData: Shape;
}

export const ShapeCard = ({ shapeData } : ShapeCardProps) => {

    const addTocart = (shapeID: string) => {
        console.log(`ADD ${shapeID}`)
    }

    return (
        <div className="shape-card not-last:mb-3 sm:not-last:mr-3">

            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>{ shapeData.name }</CardTitle>
                    <CardDescription className="h-10">
                     { shapeData.description }
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <img src={`./images/${shapeData.image}`} />
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="button" className="w-full">
                    Add To Cart
                    </Button>
                    <Button type="button" variant="outline" className="w-full">
                    View { shapeData.name }
                    </Button>
                </CardFooter>
                </Card>
        </div>
    )
}