"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { ProductsContext } from "@/context/ProductsProvider";
import Button from "./Button";

export default function ExampleProduct() {
    const products = useContext(ProductsContext);
    const product = products?.droneProducts?.find(
        (product) => product.link === "/urunler/soundwave-mini-3-plus"
    );

    if (!product) {
        return null;
    }

    return (
        <div className="example-product-container px-8 py-24 flex flex-col mx-auto lg:flex-row gap-4 lg:gap-8 max-w-[42rem] lg:max-w-[84rem] lg:items-center">
            <div className="flex flex-col gap-6">
                <h2 className="text-4xl text-center lg:hidden">
                    Yeni {product.shortName}
                </h2>

                <Link href={product.link}>
                    <Image
                        src={product.imgPaths[0]}
                        width={1920}
                        height={1080}
                        alt={product?.shortName}
                        className="p-4 border border-gray-200 max-h-[820px] rounded-lg lg:max-w-[42rem]"
                    ></Image>
                </Link>
            </div>

            <div className="flex flex-col gap-4 items-start lg:max-w-[28rem]">
                <h2 className="hidden lg:block text-5xl">
                    Yeni {product.shortName}
                </h2>
                {product.description?.slice(0, 2).map((desc, index) => (
                    <p key={index} className="text-gray-400 p-2 text-lg">
                        {desc}
                    </p>
                ))}
                <Button>
                    <Link
                        className="px-16 py-3 inline-block "
                        href={product?.link}
                    >
                        Ürüne git
                    </Link>
                </Button>
            </div>
        </div>
    );
}
