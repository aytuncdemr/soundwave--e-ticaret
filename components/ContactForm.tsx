"use client";

import { type ContactData } from "@/interfaces/ContactData";
import { UserContext } from "@/context/UserProvider";
import { useContext, useReducer, useState } from "react";
import { ThreeDot } from "react-loading-indicators";
import Button from "./Button";
import axios, { isAxiosError } from "axios";

export default function ContactForm() {
    const userContext = useContext(UserContext);
    const [contactData, dispatch] = useReducer(contactReducer, {
        name: userContext?.user?.name || null,
        email: userContext?.user?.email || null,
        phoneNumber: userContext?.user?.phoneNumber || null,
        message: null,
        isNotificationAllow: false,
    });
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    function contactReducer(
        contactData: ContactData,
        action: { type: keyof ContactData | "reset"; payload: string }
    ) {
        if (action.type === "reset") {
            return {
                name: null,
                email: null,
                phoneNumber: null,
                message: null,
                isNotificationAllow: false,
            };
        }

        return { ...contactData, [action.type]: action.payload };
    }

    async function submitHandler(e: React.FormEvent) {
        e.preventDefault();

        try {
            setIsSending(true);
            setSuccess(null);
            setError(null);
            const { data } = await axios.post("/api/iletisim", contactData);
            setSuccess(data.message);
        } catch (error) {
            if (isAxiosError(error)) {
                setError(error.response?.data.message || error.message);
            } else if (error instanceof Error) {
                setError(error.message);
            }
        } finally {
            setIsSending(false);
            dispatch({ type: "reset", payload: "none" });
        }
    }

    return (
        <form onSubmit={submitHandler} className="flex flex-col gap-2 xl:gap-3">
            <input
                type="text"
                placeholder="İsim"
                required
                value={contactData.name || ""}
                className="border border-gray-200 py-2 px-1 outline-none xl:py-3 xl:px-2 xl:text-xl"
                onChange={(e) =>
                    dispatch({ type: "name", payload: e.target.value })
                }
            />
            <input
                type="email"
                placeholder="E-posta"
                value={contactData.email || ""}
                required
                className="border border-gray-200 py-2 px-1 outline-none xl:py-3 xl:px-2 xl:text-xl"
                onChange={(e) =>
                    dispatch({ type: "email", payload: e.target.value })
                }
            />
            <input
                type="tel"
                value={contactData.phoneNumber || ""}
                placeholder="Telefon Numarası"
                required
                className="border border-gray-200 py-2 px-1 outline-none xl:py-3 xl:px-2 xl:text-xl"
                onChange={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, "");
                    dispatch({
                        type: "phoneNumber",
                        payload: e.target.value,
                    });
                }}
            />
            <textarea
                value={contactData.message || ""}
                placeholder="Mesajınız"
                required
                className="border border-gray-200 min-h-[250px] xl:min-h-[350px] py-2 px-1 outline-none xl:py-3 xl:px-2 xl:text-xl"
                onChange={(e) =>
                    dispatch({ type: "message", payload: e.target.value })
                }
            />

            <Button
                className={`py-2 ${
                    isSending && "bg-gray-500 pointer-events-none"
                }`}
                type={isSending ? "button" : "submit"}
            >
                Gönder
            </Button>
            {isSending && (
                <div className="flex justify-center py-3">
                    <ThreeDot color="#000000" size="medium" />
                </div>
            )}
            {success && (
                <p className="font-bold text-xl xl:text-2xl text-center">
                    {success}
                </p>
            )}
            {error && (
                <p className="xl:text-2xl font-bold text-xl text-center">
                    {error}
                </p>
            )}
        </form>
    );
}
