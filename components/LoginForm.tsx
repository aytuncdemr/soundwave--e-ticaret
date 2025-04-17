"use client";

import { UserContext } from "@/context/UserProvider";
import { useContext, useState } from "react";
import Button from "./Button";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const userContext = useContext(UserContext);
    const router = useRouter();
    async function loginSubmitHandler(e: React.FormEvent) {
        e.preventDefault();
        try {
            setError(null);

            const { data } = await axios.post("/api/giris-yap", {
                email,
                password,
            });
            if (data.token) {
                userContext?.dispatch({
                    type: "setUser",
                    payload: {
                        email: "admin@hotmail.com",
                        bucket: [],
                        _id: "admin",
                        addresses: [],
                        phoneNumber: "05555555555",
                        name: "Admin",
                        registeredAt: "01.01.2025",
                        token: data.token,
                    },
                });
                router.push("/admin");
            } else {
                userContext?.dispatch({ type: "setUser", payload: data });
                router.push("/");
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
    }

    return (
        <form onSubmit={loginSubmitHandler}>
            <div className="inputs flex flex-col gap-3 lg:gap-4 px-2 py-2">
                <input
                    type="email"
                    placeholder="E-posta"
                    value={email || ""}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-200 py-2 px-1 lg:text-xl outline-none w-full"
                />
                <input
                    type="password"
                    value={password || ""}
                    placeholder="Şifre"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-200 lg:text-xl py-2 px-1 outline-none w-full"
                />
                <Button className="py-2" type="submit">
                    Giriş Yap
                </Button>

                {error && <p className="text-center font-bold">{error}</p>}
                <a href="#kampanyalar" className="text-center underline">
                    Kampanyalardan ve Haberlerden <br /> faydalanmak için
                    tıklayın
                </a>
            </div>
        </form>
    );
}
