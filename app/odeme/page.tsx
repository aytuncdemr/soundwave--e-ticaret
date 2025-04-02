"use client";

import { UserContext } from "@/context/UserProvider";
import axios, { isAxiosError } from "axios";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { useContext, useEffect, useState } from "react";

declare global {
    interface Window {
        iFrameResize?: (options: object, selector: string) => void;
    }
}

export default function PaymentPage() {
    const userContext = useContext(UserContext);
    const total = useSearchParams().get("total");
    const [error, setError] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        async function getPaytrHTML() {
            try {
                setError(null);
                const { data } = await axios.post("/api/odeme", {
                    total,
                    ...userContext?.user,
                });
                setToken(data);
            } catch (error) {
                if (isAxiosError(error)) {
                    setError(error?.response?.data.message);
                } else if (error instanceof Error) {
                    setError(error.message);
                } else {
                    console.log(error);
                }
            }
        }

        getPaytrHTML();
    }, [total,userContext?.user]);

    return (
        <section className="pay-section min-h-screen py-32">
            {error && (
                <p className="text-center text-2xl py-12 text-red-500">
                    {error}
                </p>
            )}
            {token && (
                <>
                    <Script
                        src="https://www.paytr.com/js/iframeResizer.min.js"
                        onLoad={() => {
                            if (window.iFrameResize) {
                                window.iFrameResize({}, "#paytriframe");
                            }
                        }}
                    />
                    <iframe
                        src={`https://www.paytr.com/odeme/guvenli/${token}`}
                        id="paytriframe"
                        frameBorder={0}
                        className="w-full !min-h-[900px]"
                    ></iframe>
                </>
            )}
        </section>
    );
}
