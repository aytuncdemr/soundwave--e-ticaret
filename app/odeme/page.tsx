"use client";

import { UserContext } from "@/context/UserProvider";
import axios, { isAxiosError } from "axios";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function PaymentPage() {
    const userContext = useContext(UserContext);
    const total = useSearchParams().get("total");
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        async function getPaytrHTML() {
            try {
                setError(null);
                const { data } = await axios.post("/api/odeme", {
                    total,
                    ...userContext?.user,
                });
                console.log(data);
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

        getPaytrHTML();
    }, []);

    return (
        <section className="pay-section">
            {error && <p className="text-center text-2xl">{error}</p>}
        </section>
    );
}
