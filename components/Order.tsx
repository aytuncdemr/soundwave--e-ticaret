"use client";

import { ProductsContext } from "@/context/ProductsProvider";
import { type Order } from "@/interfaces/Order";
import Image from "next/image";
import { useContext } from "react";

export default function OrderCard({ order }: { order: Order }) {
    const productsContext = useContext(ProductsContext);

    async function sendSentHandler() {
        try {
            await fetch("/api/orders", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    merchant_oid: order.merchant_oid,
                }),
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error("Gönderim hatası:", error.message);
            }
        }
    }
    return (
        <>
            <div
                className={`border border-gray-300 p-6 rounded-lg text-lg lg:text-xl flex flex-col gap-6 ${
                    !order.paid && "text-red-500"
                } ${order.isSent && "text-green-500"}`}
                key={order.merchant_oid}
            >
                <h2 className="text-center text-2xl mb-4">
                    {order.merchant_oid}
                </h2>
                <p>ALICI: {order.name}</p>

                <p>E-POSTA: {order.email}</p>
                <p>TELEFON: {order.phoneNumber}</p>
                <p>SIPARIS TARIHI: {order.date}</p>

                <div className="flex flex-col gap-4">
                    <p className="text-2xl">Ürünler ({order.bucket.length})</p>
                    {order.bucket.map((bucketElem, index) => {
                        if (
                            !productsContext?.additionalProducts ||
                            !productsContext.droneProducts
                        ) {
                            return null;
                        }

                        const imagePath = [
                            ...productsContext?.additionalProducts,
                            ...productsContext?.droneProducts,
                        ].find((product) => product.name === bucketElem[0])
                            ?.imgPaths[0];

                        return (
                            <div
                                key={index}
                                className="border p-4 flex flex-col gap-2 rounded-lg"
                            >
                                <p>{bucketElem[0]}</p>
                                <div className="flex items-center justify-between">
                                    {imagePath && (
                                        <Image
                                            src={imagePath}
                                            alt={bucketElem[0]}
                                            width={1920}
                                            height={1080}
                                            className="max-w-[20%]"
                                        ></Image>
                                    )}
                                    <div>
                                        <p>ADET: {bucketElem[2]}</p>
                                        <p>FIYAT: {bucketElem[1]}.00TL</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <p>ADRES: {order.address}</p>

                <p className="text-center mt-8">
                    TOPLAM FİYAT: {order.total}.00TL
                </p>

                {!order.paid && (
                    <>
                        <p>
                            Hata: {order.payment_error} ( kod:
                            {order.payment_error_code})
                        </p>
                    </>
                )}
                <p className="text-center">({order.status})</p>
                {order.paid && (
                    <button type="button" onClick={sendSentHandler}>
                        Gönderildi olarak işaretle
                    </button>
                )}
            </div>
        </>
    );
}
