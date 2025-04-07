"use client";

import { ProductsContext } from "@/context/ProductsProvider";
import { UserContext } from "@/context/UserProvider";
import { Order } from "@/interfaces/Order";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios, { isAxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const userContext = useContext(UserContext);
    const productsContext = useContext(ProductsContext);
    useEffect(() => {
        try {
            async function getOrders() {
                const { data } = await axios.post("/api/orders", {
                    email: userContext?.user?.email,
                });

                setOrders(data);
            }
            if (userContext?.user) {
                getOrders();
            }
        } catch (error) {
            if (isAxiosError(error)) {
                setError(error.response?.data.message || error.message);
            } else if (error instanceof Error) {
                setError(error.message);
            } else {
                console.log(error);
            }
        }
    }, []);

    if (!orders || !(orders.length > 0) || error) {
        return (
            <>
                <div className="text-center flex flex-col gap-4 py-64">
                    <p className="text-xl lg:text-2xl xl:text-4xl">
                        Görünüşe göre herhangi <br /> bir siparişiniz
                        bulunmuyor.
                    </p>
                    <FontAwesomeIcon
                        className="text-8xl xl:text-9xl"
                        icon={faTruckFast}
                    ></FontAwesomeIcon>
                    <Link
                        href={"/urunler/dronelar"}
                        className="text-2xl xl:text-3xl underline hover:text-gray-500 duration-150 mt-4 "
                    >
                        Alışverişe başlamak <br /> için tıklayın.
                    </Link>
                    {error && <p className="text-lg xl:text-xl">{error}</p>}
                </div>
            </>
        );
    }

    return (
        <section className="orders-section py-32 px-16">
            <div className="orders-container">
                <header>
                    <h2 className="text-3xl lg:text-4xl  text-center mb-8 lg:mb-12">
                        Siparişlerim
                    </h2>
                </header>
                <div className="orders grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-8">
                    {orders.map((order) => {
                        return (
                            <div
                                className="border border-gray-300 p-6 rounded-lg text-lg lg:text-xl flex flex-col gap-6"
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
                                    <p className="text-2xl">Ürünler</p>
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
                                        ].find(
                                            (product) =>
                                                product.name === bucketElem[0]
                                        )?.imgPaths[0];

                                        return (
                                            <div key={index}>
                                                <p>{bucketElem[0]}</p>
                                                {imagePath && (
                                                    <Image
                                                        src={imagePath}
                                                        alt={bucketElem[0]}
                                                        width={1920}
                                                        height={1080}
                                                        className="max-w-[20%]"
                                                    ></Image>
                                                )}
                                                <p>Adet: {bucketElem[2]}</p>
                                                <p>
                                                    Fiyat: {bucketElem[1]}.00TL
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>

                                <p>ADRES: {order.address}</p>

                                <p className="text-center mt-8">
                                    TOPLAM FİYAT: {order.total}.00TL
                                </p>
                                <p className="text-center">({order.status})</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
