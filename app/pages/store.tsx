import { Badge } from "@/components/ui/badge"

import { ShapeCard } from "@/components/shapeCard/shapeCard"
import { useEffect, useState } from "react"

import { type Shape } from "../interfaces/shapes"

import { ShapeStoreContext } from "@/context/shapeStoreContext"

export const Store = () => {

    const [ shapesData, setShapesData ] = useState<Shape[]>([]);

    useEffect(() => {

        const loadData = async () => {
            const response = await fetch('/data.json'); 
            const data = await response.json();
            // console.log(data);
            setShapesData(data.shapesData);
        }

        loadData();
    },[])

    return (
        <>
            <header className=" flex justify-between items-start sm:items-center border border-b-gray-300 rounded-xl w-4/5 mx-auto mt-2">
                <div></div>
                <h1 className="text-6xl p-5 font-bold bg-linear-to-r from-pink-500 via-indigo-600 to-blue-800 bg-clip-text text-transparent">The Shape Store</h1>
                <div className="minicart flex justify-center items-center flex-row mr-5 mt-5 sm:mt-0">
                    {/* cart icon */}
                    <svg className="cart-icon mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > <path fill-rule="evenodd" clip-rule="evenodd" d="M5.79166 2H1V4H4.2184L6.9872 16.6776H7V17H20V16.7519L22.1932 7.09095L22.5308 6H6.6552L6.08485 3.38852L5.79166 2ZM19.9869 8H7.092L8.62081 15H18.3978L19.9869 8Z" fill="currentColor" /> <path d="M10 22C11.1046 22 12 21.1046 12 20C12 18.8954 11.1046 18 10 18C8.89543 18 8 18.8954 8 20C8 21.1046 8.89543 22 10 22Z" fill="currentColor" /> <path d="M19 20C19 21.1046 18.1046 22 17 22C15.8954 22 15 21.1046 15 20C15 18.8954 15.8954 18 17 18C18.1046 18 19 18.8954 19 20Z" fill="currentColor" /> </svg>
                    <Badge className="bg-red-500 text-white">0</Badge>
                </div>
            </header>

            <ShapeStoreContext.Provider value={[]}>
                <main className="w-4/5 mx-auto">
                    <h2 className="text-4xl pt-5 pb-3">Shapes For Sale</h2>
                    <div className="shapes-selection flex flex-col sm:flex-row">
                        { shapesData.map((shapeData: Shape, index: number) => (
                            <ShapeCard key={`shape-card-${index}`} shapeData={shapeData} />
                        ))}
                    </div>
                </main>
            </ShapeStoreContext.Provider>
        </>
    )
}