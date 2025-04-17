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
    const [products, setProducts] = useState<Product[] | null>(
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

    if (!products) {
        return;
    }

    return (
        <ProductsContext.Provider
            value={{
                droneProducts: products.filter((product) => product.type === "drone"),
                additionalProducts: products.filter((product) => product.type === "additional"),
            }}
        >
            {children}
        </ProductsContext.Provider>
    );
}
