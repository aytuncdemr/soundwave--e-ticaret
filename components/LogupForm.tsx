"use client";

import { UserContext } from "@/context/UserProvider";
import getDate from "@/utils/getDate";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useContext, useReducer, useState } from "react";

export interface LogupDataInterface {
    email: string | null;
    addresses: string[] | null;
    phoneNumber: string | null;
    name: string | null;
    password: string | null;
    bucket: [];
    registeredAt: string;
}

export default function LogupForm() {
    const [error, setError] = useState<string | null>(null);
    const [formLogupData, logupDispatch] = useReducer(logupReducerFunction, {
        email: null,
        addresses: null,
        phoneNumber: null,
        name: null,
        password: null,
        bucket: [],
        registeredAt: getDate(),
    });
    const [passwordGuard, setPasswordGuard] = useState<string | null>(null);
    const userContext = useContext(UserContext);
    const router = useRouter();

    function logupReducerFunction(
        prevLogupData: LogupDataInterface,
        action: { type: keyof LogupDataInterface; payload: string | string[] }
    ) {
        return { ...prevLogupData, [action.type]: action.payload };
    }
    async function logupSubmitHandler(e: React.FormEvent) {
        e.preventDefault();
        if (passwordGuard !== formLogupData.password) {
            setError("Şifreler eşleşmiyor");
            return;
        }
        setError(null);
        try {
            const { data } = await axios.post("/api/kayit-ol", formLogupData);

            userContext?.dispatch({ type: "setUser", payload: data });
            router.push("/");
        } catch (error) {
            if (isAxiosError(error)) {
                setError(error.response?.data.message || error.message);
            } else if (error instanceof Error) {
                setError(error.message);
            } else {
                console.log(error);
            }
        }
    }

    return (
        <form onSubmit={logupSubmitHandler}>
            <div className="inputs flex flex-col gap-3 px-2 py-2">
                <input
                    type="text"
                    placeholder="İsim - Soyisim"
                    required
                    value={formLogupData.name || ""}
                    onChange={(e) =>
                        logupDispatch({
                            type: "name",
                            payload: e.target.value,
                        })
                    }
                    className="border border-gray-200 py-2 px-1 lg:text-xl outline-none w-full"
                />

                <input
                    type="email"
                    placeholder="E-posta"
                    required
                    value={formLogupData.email || ""}
                    onChange={(e) =>
                        logupDispatch({
                            type: "email",
                            payload: e.target.value,
                        })
                    }
                    className="border border-gray-200 py-2 px-1 lg:text-xl outline-none w-full"
                />
                <input
                    type="password"
                    placeholder="Şifre"
                    required
                    value={formLogupData.password || ""}
                    onChange={(e) =>
                        logupDispatch({
                            type: "password",
                            payload: e.target.value,
                        })
                    }
                    className="border border-gray-200 py-2 px-1 lg:text-xl outline-none w-full"
                />
                <input
                    type="password"
                    placeholder="Şifre Tekrar"
                    required
                    value={passwordGuard || ""}
                    onChange={(e) => setPasswordGuard(e.target.value)}
                    className="border border-gray-200 py-2 px-1 lg:text-xl outline-none w-full"
                />
                <input
                    type="tel"
                    placeholder="Telefon Numarası"
                    required
                    maxLength={11}
                    value={formLogupData.phoneNumber || ""}
                    onChange={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, "");
                        logupDispatch({
                            type: "phoneNumber",
                            payload: e.target.value,
                        });
                    }}
                    className="border border-gray-200 py-2 px-1 lg:text-xl outline-none w-full"
                />
                <textarea
                    className="min-h-[200px] border border-gray-200 lg:text-xl py-2 px-1 outline-none w-full"
                    placeholder="Adres"
                    id="addresses"
                    value={formLogupData.addresses || ""}
                    onChange={(e) =>
                        logupDispatch({
                            type: "addresses",
                            payload: [e.target.value],
                        })
                    }
                ></textarea>
                <button className="bg-black text-white py-2 text-lg hover:bg-white hover:text-black border border-black duration-150">
                    Tamam
                </button>
                {error && <p className="text-center font-bold">{error}</p>}
                <a href="#kampanyalar" className="text-center underline">
                    Kampanyalardan ve Haberlerden faydalanmak için tıklayın
                </a>
            </div>
        </form>
    );
}
