import { createContext, useContext, useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton"

import { Button } from "@/components/ui/button";

import type { Shape } from "@/interfaces/shapes";

import { CartContext } from "@/context/cartContext";

const ShapeCardContext = createContext<Shape | undefined>(undefined);

interface ShapeCardProps {
    shapeData: Shape;
}

export const ShapeCard = ({ shapeData } : ShapeCardProps) => {

    const [ cardData, setCardData ] = useState<Shape | undefined>(undefined);

    const cartContext = useContext(CartContext);

    useEffect(() => {

        setCardData(shapeData);

    },[]);

    return (
        <ShapeCardContext value={cardData}>
            <div className="shape-card not-last:mb-3 sm:not-last:mr-3">

                <Card className="w-full max-w-sm">
                    <ShapeCard.Header />
                    <ShapeCard.Content />
                    <ShapeCard.Footer />

                </Card>
            </div>
        </ShapeCardContext>
    )
}

const ShapeCardHeader = () => {

    const shapeData = useContext(ShapeCardContext);

    return (
        <CardHeader>
            <CardTitle>{ shapeData?.name }</CardTitle>
            <CardDescription className="h-10">
                { shapeData?.description }
            </CardDescription>
        </CardHeader>
    )
}

const ShapeCardContent = () => {

    const shapeData = useContext(ShapeCardContext);

    // Avoid render issues specifically with no data for images
    return (
        <CardContent>
            {shapeData?.image ? (
                <img src={`./images/${ shapeData?.image }`} />
            ) : (
                <Skeleton className="aspect-video w-full" />
            ) }
            
        </CardContent>
    )
}

const ShapeCardFooter = () => {

    const shapeData = useContext(ShapeCardContext);

    const addTocart = (shapeID: string) => {
        console.log(`ADD ${shapeID}`);
        
        
    }

    return (
        <CardFooter className="flex-col gap-2">
            <Button type="button" className="w-full cursor-pointer" onClick={() => addTocart(shapeData!.id)}>
            Add To Cart
            </Button>
        </CardFooter>
    )
    
}

ShapeCard.Header = ShapeCardHeader;
ShapeCard.Content = ShapeCardContent;
ShapeCard.Footer = ShapeCardFooter;
