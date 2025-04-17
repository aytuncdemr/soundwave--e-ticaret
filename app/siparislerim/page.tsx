"use client";

import OrderCard from "@/components/Order";
import { UserContext } from "@/context/UserProvider";
import { Order } from "@/interfaces/Order";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios, { isAxiosError } from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const userContext = useContext(UserContext);
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
                    <h2 className="text-3xl lg:text-4xl  text-center mb-8 lg:mb-24">
                        Siparişlerim
                    </h2>
                </header>
                <div className="orders grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-8">
                    {orders.map((order) => {
                        return (
                            <OrderCard
                                key={order.merchant_oid}
                                order={order}
                            ></OrderCard>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
