"use client";

import OrderCard from "@/components/Order";
import ProductEditCard from "@/components/ProductEditCard";
import { UserContext } from "@/context/UserProvider";
import { Order } from "@/interfaces/Order";
import { Product } from "@/interfaces/Product";
import { User } from "@/interfaces/User";
import axios, { isAxiosError } from "axios";
import { ObjectId } from "mongodb";
import { useContext, useEffect, useState } from "react";

export default function AdminPage() {
    const userContext = useContext(UserContext);
    const [orders, setOrders] = useState<Order[] | null>(null);
    const [products, setProducts] = useState<
        (Product & { _id: ObjectId })[] | null
    >(null);
    const [users, setUsers] = useState<User[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"orders" | "users" | "products">(
        "orders"
    );

    useEffect(() => {
        try {
            async function getCollections() {
                const { data } = await axios.get(
                    `/api/admin?collection=${activeTab}`,
                    {
                        headers: {
                            Authorization: `Bearer ${userContext?.user?.token}`,
                        },
                    }
                );

                setOrders(data.orders);
                setProducts(data.products);
                setUsers(data.users);
            }
            if (userContext?.user?.token) {
                getCollections();
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
    }, [activeTab, userContext?.user]);

    return (
        <section className="admin-section py-24 px-12 min-h-[90vh]">
            <div className="admin-container flex flex-col gap-12">
                <header>
                    <h2 className="text-xl lg:text-5xl text-center">Admin</h2>
                </header>
                {error && <p className="text-lg">Hata:{error}</p>} 
                <div className="flex items-center gap-4 text-lg xl:text-2xl">
                    <button
                        className={` ${
                            activeTab === "orders" && "underline"
                        } underline-offset-4 decoration-slate-400`}
                        onClick={() => setActiveTab("orders")}
                    >
                        Siparişler
                    </button>
                    <button
                        className={` ${
                            activeTab === "products" && "underline"
                        }  underline-offset-4 decoration-slate-400`}
                        onClick={() => setActiveTab("products")}
                    >
                        Ürünler
                    </button>
                    <button
                        className={` ${
                            activeTab === "users" && "underline"
                        }  underline-offset-4 decoration-slate-400`}
                        onClick={() => setActiveTab("users")}
                    >
                        Kullanıcılar
                    </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
                    {activeTab === "orders" &&
                        orders?.map((order) => {
                            return (
                                <OrderCard
                                    key={order.merchant_oid}
                                    order={order}
                                ></OrderCard>
                            );
                        })}
                    {activeTab === "users" && <div className="users">{users?.map((user) => user.name)}</div>}
                    {activeTab === "products" &&
                        products?.map((product) => (
                            <ProductEditCard
                                key={product.shortName}
                                product={product as Product & { _id: ObjectId }}
                                setProducts={setProducts}
                            ></ProductEditCard>
                        ))}
                </div>
                        
            </div>
        </section>
    );
}
