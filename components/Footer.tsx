"use client";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { ThreeDot } from "react-loading-indicators";
import axios from "axios";

export default function Footer() {
    const [email, setEmail] = useState<string | null>(null);
    const [response, setResponse] = useState<string | null>(null);
    const [isSending, setIsSending] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    async function allowNotificationsHandler(e: FormEvent) {
        e.preventDefault();
        if (inputRef.current) {
            inputRef.current.blur();
        }

        try {
            setResponse(null);
            setEmail(null);
            setIsSending(true);

            const {
                data: { message },
            } = await axios.post("/api/iletisim", {
                email,
                isNotificationAllow: true,
            });
            setResponse(message);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setResponse(error.response?.data.message || error.message);
            } else if (error instanceof Error) {
                setResponse(error.message);
            }
        } finally {
            setIsSending(false);
            setTimeout(() => {
                setResponse(null);
            }, 3000);
        }
    }

    return (
        <footer className="bg-black py-8 px-4">
            <div className="footer-container text-white flex flex-col gap-6 max-w-[25rem] mx-auto justify-center">
                <h2 className="text-center text-xl md:text-2xl">
                    Kampanyalarımızdan <br /> Haberdar Olun!
                </h2>

                <form
                    onSubmit={allowNotificationsHandler}
                    className="flex items-center p-3 rounded-sm  border border-gray-700 mb-6"
                >
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email || ""}
                        type="email"
                        placeholder="E-posta"
                        required
                        className="flex-1 lg:text-xl border-none bg-black outline-none"
                        ref={inputRef}
                    />
                    <button className="hover:cursor-pointer hover:text-gray-500 duration-150 text-xl">
                        <FontAwesomeIcon
                            icon={faChevronRight}
                        ></FontAwesomeIcon>
                    </button>
                </form>
                {isSending && (
                    <div className="flex justify-center mb-6">
                        <ThreeDot color="#fff" size="medium" />,
                    </div>
                )}
                {response && (
                    <p className="text-lg text-center lg:text-xl mb-6">
                        {response}
                    </p>
                )}

                <p id="kampanyalar" className="text-sm text-center">
                    @2025 Soundwave -{" "}
                    <Link
                        className="underline underline-offset-2 decoration-[rgb(177,174,174)] hover:text-gray-300 duration-150"
                        href={"/gizlilik-politikasi"}
                    >
                        Gizlilik Politikası
                    </Link>
                    <br />
                    (Tüm hakları saklıdır.)
                </p>
            </div>
        </footer>
    );
}
