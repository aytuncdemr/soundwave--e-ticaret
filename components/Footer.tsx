"use client";

import {
    faChevronRight,
    faEnvelope,
    faLocationDot,
    faLock,
    faPhone,
    faQuestion,
    faStore,
    faTableList,
} from "@fortawesome/free-solid-svg-icons";
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
        <footer className="bg-black p-4 lg:p-12">
            <div className="footer-container text-white grid grid-cols-1 md:flex justify-around gap-8">
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl lg:text-2xl">Hakkımızda</h2>
                    <div className="flex items-center gap-3">
                        <FontAwesomeIcon icon={faStore}></FontAwesomeIcon>
                        <Link
                            className="hover:text-gray-400 duration-150 text-lg"
                            href={"/hakkimizda"}
                        >
                            Biz Kimiz ?
                        </Link>
                    </div>
                    <div className="flex items-center gap-3">
                        <FontAwesomeIcon icon={faQuestion}></FontAwesomeIcon>
                        <Link
                            className="hover:text-gray-400 duration-150 text-lg"
                            href={"/sikca-sorulan-sorular"}
                        >
                            Sıkça Sorulan Sorular (F.A.Q)
                        </Link>
                    </div>
                    <div className="flex items-center gap-3">
                        <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                        <Link
                            className="hover:text-gray-400 duration-150 text-lg"
                            href={"/gizlilik-politikasi"}
                        >
                            Gizlilik Politikası
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl lg:text-2xl">Bize Ulaşın</h2>
                    <div className="flex items-center gap-3">
                        <FontAwesomeIcon icon={faTableList}></FontAwesomeIcon>
                        <Link
                            className="hover:text-gray-400 duration-150 text-lg"
                            href="/iletisim"
                        >
                            İletişim formu
                        </Link>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
                        <a
                            className="hover:text-gray-400 duration-150 text-lg"
                            href="mailto:infosoundwavesky@gmail.com"
                        >
                            soundwaveskyinfo@gmail.com
                        </a>
                    </div>
                    <div className="flex items-center gap-3">
                        <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>
                        <p>
                             Pendik/İstanbul
                        </p>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="notifications-allow flex flex-col gap-6 max-w-[400px] lg:w-[400px] flex-1">
                        {" "}
                        <h2 className="text-center text-xl md:text-2xl">
                            Kampanyalarımızdan İlk Siz <br /> Haberdar Olun!
                        </h2>
                        <form
                            onSubmit={allowNotificationsHandler}
                            className="flex items-center p-3 rounded-sm border  border-gray-700"
                        >
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email || ""}
                                type="email"
                                placeholder="E-posta"
                                required
                                className="flex-1 lg:text-xl border-none outline-none bg-black "
                                ref={inputRef}
                            />
                            <button className="hover:cursor-pointer hover:text-gray-500 duration-150 text-xl">
                                <FontAwesomeIcon
                                    icon={faChevronRight}
                                ></FontAwesomeIcon>
                            </button>
                        </form>
                        {isSending && (
                            <div className="flex justify-center">
                                <ThreeDot color="#fff" size="medium" />,
                            </div>
                        )}
                        {response && (
                            <p className="text-center text-lg lg:text-xl">
                                {response}
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <p
                id="kampanyalar"
                className="text-sm text-center text-white mt-12"
            >
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
        </footer>
    );
}
