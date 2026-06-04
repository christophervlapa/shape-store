

import { ShapeCard } from "@/components/shapeCard/shapeCard"
import { Cart } from "@/components/cart/cart";
import { useEffect, useState, Suspense } from "react"

import { type Shape } from "../interfaces/shapes"
import { StoreLoading } from "../components/loading/storeLoading"

import { ShapeStoreContext } from "@/context/shapeStoreContext"

export const Store = () => {

    const [ shapesData, setShapesData ] = useState<Shape[]>([]);

    useEffect(() => {

        const loadData = async () => {
            const response = await fetch('http://localhost:3000/api/data'); 
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
                    <Cart />
                </div>
            </header>

            <ShapeStoreContext value={{}}>
                <main className="w-4/5 mx-auto">
                    <h2 className="text-4xl pt-5 pb-3">Shapes For Sale</h2>
                    <div className="shapes-selection flex flex-col sm:flex-row">
       
                        { shapesData?.length > 0 ? (shapesData?.map((shapeData: Shape, index: number) => (
                            <ShapeCard key={`shape-card-${index}`} shapeData={shapeData} />
                        ))) : (
                            <StoreLoading />
                        )}

                    </div>
                </main>
            </ShapeStoreContext>
        </>
    )
}