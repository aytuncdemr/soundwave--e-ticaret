"use client";

import { UserContext } from "@/context/UserProvider";
import { User } from "@/interfaces/User";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useState } from "react";
import { toast } from "react-toastify";

export default function ProfilePage() {
    const router = useRouter();
    const userContext = useContext(UserContext);
    const [initialUserInfo, setInitialUserInfo] = useState(userContext?.user);
    const [isEditing, setIsEditing] = useState(false);
    const [newAddress, setNewAddress] = useState<string | null>(null);

    function submitHandler(e: FormEvent) {
        e.preventDefault();
        setIsEditing(false);
        setNewAddress(null);
        if (newAddress) {
            userContext?.dispatch({
                type: "addresses",
                payload: newAddress,
            });
        }
        setInitialUserInfo(userContext?.user);
    }

    async function sendPasswordRenew() {
        try {
            const { data } = await axios.post("/api/sifre-yenile", {
                email: userContext?.user?.email,
                _id: userContext?.user?._id,
            });

            toast.success(
                <p className="lg:text-lg lg:py-2 lg:px-4 text-center xl:w-[]">
                    {data.message}
                </p>,
                {
                    className:
                        "bg-black text-white xl:max-w-[24rem] xl:w-[24rem]",
                }
            );
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                toast.error(
                    <p className="lg:text-lg lg:py-2 lg:px-4 text-center xl:w-[]">
                        {error.response?.data.message || error.message}
                    </p>,
                    {
                        className:
                            "bg-black text-white xl:max-w-[24rem] xl:w-[24rem]",
                    }
                );
            } else if (error instanceof Error) {
                toast.error(
                    <p className="lg:text-lg lg:py-2 lg:px-4 text-center xl:w-[]">
                        {error.message}
                    </p>,
                    {
                        className:
                            "bg-black text-white xl:max-w-[24rem] xl:w-[24rem]",
                    }
                );
            }
        }
    }

    return (
        <>
            <section className="user-info-section py-24 px-2">
                <div className="user-info-container max-w-[42rem] mx-auto">
                    <header className="mb-4">
                        <h2 className="text-3xl text-center lg:text-4xl">
                            Hesabım
                        </h2>
                    </header>

                    <form
                        onSubmit={submitHandler}
                        className="flex flex-col gap-2 py-4 px-4 lg:gap-4"
                    >
                        <div className="flex flex-col lg:text-lg gap-1 lg:gap-2">
                            <label htmlFor="name">İsim & Soyisim</label>
                            <input
                                className="border py-1 px-1 outline-1 outline-gray-200"
                                type="text"
                                id="name"
                                value={userContext?.user?.name || ""}
                                disabled={!isEditing}
                                onChange={(e) =>
                                    userContext?.dispatch({
                                        type: "name",
                                        payload: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="flex flex-col gap-1 lg:text-lg lg:gap-2">
                            <label htmlFor="email">E-posta</label>
                            <input
                                className="border py-1 px-1 outline-1 outline-gray-200"
                                type="email"
                                id="email"
                                value={userContext?.user?.email || ""}
                                disabled
                                onChange={(e) =>
                                    userContext?.dispatch({
                                        type: "email",
                                        payload: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="flex flex-col gap-1 lg:text-lg lg:gap-2">
                            <label htmlFor="phoneNumber">
                                Telefon Numarası
                            </label>
                            <input
                                maxLength={11}
                                className="border py-1 px-1 outline-1 outline-gray-200"
                                type="tel"
                                id="phoneNumber"
                                value={userContext?.user?.phoneNumber || ""}
                                disabled={!isEditing}
                                onChange={(e) => {
                                    e.target.value = e.target.value.replace(
                                        /\D/g,
                                        ""
                                    );
                                    userContext?.dispatch({
                                        type: "phoneNumber",
                                        payload: e.target.value,
                                    });
                                }}
                            />
                        </div>
                        <div className="flex flex-col gap-1 lg:text-lg lg:gap-2">
                            <label htmlFor="registeredAt">Üyelik Tarihi</label>
                            <input
                                className="border py-1 px-1 outline-1 outline-gray-200"
                                type="text"
                                id="registeredAt"
                                value={userContext?.user?.registeredAt || ""}
                                disabled
                            />
                        </div>
                        <div className="flex flex-col gap-2 lg:text-lg lg:gap-3">
                            <label htmlFor="address">
                                Adreslerim{" "}
                                <button
                                    type="button"
                                    className={`border border-black ml-4 px-2 rounded-full bg-black text-white hover:text-black hover:bg-white duration-150 `}
                                    onClick={() => setIsEditing(true)}
                                >
                                    Yeni Adres Ekle
                                </button>
                            </label>
                            {userContext?.user?.addresses.map(
                                (address, index: number) => {
                                    return (
                                        <textarea
                                            key={index}
                                            className="border py-1 px-1 outline-1 min-h-[125px] outline-gray-200"
                                            id="address"
                                            value={address || ""}
                                            disabled
                                        />
                                    );
                                }
                            )}
                        </div>
                        {isEditing && (
                            <div className="mb-4 text-lg">
                                <label htmlFor="address">Yeni Adres</label>
                                <textarea
                                    className="border w-full min-h-32 py-1 px-1 outline-1 outline-gray-200"
                                    id="address"
                                    value={newAddress || ""}
                                    onChange={(e) => {
                                        setNewAddress(e.target.value);
                                    }}
                                />
                            </div>
                        )}

                        {!isEditing && (
                            <>
                                <button
                                    type="button"
                                    onClick={sendPasswordRenew}
                                    className="underline text-md mb-4"
                                >
                                    Şifremi Unuttum
                                </button>
                            </>
                        )}

                        {isEditing && (
                            <>
                                <button className="text-white hover:bg-white border-black bg-black md:text-xl  hover:text-black duration-150 border py-2 px-2   max-w-[1/2] w-1/2 mx-auto  md:hover:bg-white md:hover:text-black">
                                    Kaydet
                                </button>
                                <button
                                    onClick={() => {
                                        setIsEditing(false);
                                        setNewAddress(null);
                                        if (initialUserInfo) {
                                            userContext?.dispatch({
                                                type: "setUser",
                                                payload:
                                                    initialUserInfo as User,
                                            });
                                        }
                                    }}
                                    className="text-white hover:bg-white border-black bg-black md:text-xl  hover:text-black duration-150 border py-2 px-2   max-w-[1/2] w-1/2 mx-auto  md:hover:bg-white md:hover:text-black"
                                    type="button"
                                >
                                    İptal Et
                                </button>
                            </>
                        )}
                        {!isEditing && (
                            <>
                                <button
                                    type="button"
                                    className="text-white hover:bg-white border-black bg-black md:text-xl  hover:text-black duration-150 border py-2 px-2   max-w-[1/2] w-1/2 mx-auto  md:hover:bg-white md:hover:text-black"
                                    onClick={() => setIsEditing(true)}
                                >
                                    Düzenle
                                </button>
                                <button
                                    type="button"
                                    className="text-white hover:bg-white border-black bg-black md:text-xl  hover:text-black duration-150 border py-2 px-2   max-w-[1/2] w-1/2 mx-auto  md:hover:bg-white md:hover:text-black"
                                    onClick={() => {
                                        userContext?.dispatch({
                                            type: "logOut",
                                            payload: "none",
                                        });

                                        router.push("/");
                                    }}
                                >
                                    Çıkış Yap
                                </button>
                            </>
                        )}
                    </form>
                </div>
            </section>
        </>
    );
}
