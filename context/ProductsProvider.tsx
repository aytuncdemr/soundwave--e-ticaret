"use client";

import { type Product } from "@/interfaces/Product";
import axios, { isAxiosError } from "axios";
import { createContext, useEffect, useState } from "react";

interface ProductsContextInterface {
    droneProducts: Product[];
    additionalProducts: Product[];
}

export const ProductsContext = createContext<ProductsContextInterface | null>(
    null
);

export default function ProductsProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [products, setProducts] = useState<ProductsContextInterface | null>(
        null
    );
    useEffect(() => {
        try {
            async function getProducts() {
                const { data } = await axios.get("/api/products");

                setProducts(data);
            }

            getProducts();
        } catch (error) {
            if (isAxiosError(error)) {
                console.log(error.response?.data.message || error.message);
            } else if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log(error);
            }
        }
    }, []);

    if (!products || !products?.droneProducts || !products.additionalProducts) {
        return;
    }

    return (
        <ProductsContext.Provider
            value={{
                droneProducts: products.droneProducts,
                additionalProducts: [], //products.additionalProducts,
            }}
        >
            {children}
        </ProductsContext.Provider>
    );
}
