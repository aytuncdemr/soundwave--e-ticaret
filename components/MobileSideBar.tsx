"use client";

import { UserContext } from "@/context/UserProvider";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";

export default function MobileSideBar({
    closeMobileSideBar,
    logOutHandler,
}: {
    logOutHandler: () => void;
    closeMobileSideBar: () => void;
}) {
    const pathName = usePathname();
    const userContext = useContext(UserContext);

    return (
        <aside className="mobile-side-bar animate-mobileSideBarSlideRight absolute max-w-[90%] w-[90%] max-h-screen h-full bg-[rgba(0,0,0,0.88)] backdrop-blur text-white left-0 top-0 p-6">
            <div className="mobile-side-bar-container h-full flex flex-col gap-10">
                <div className="flex items-center justify-between text-2xl">
                    <h1 className="font-bold">SoundWave</h1>
                    <FontAwesomeIcon
                        onClick={closeMobileSideBar}
                        icon={faClose}
                    ></FontAwesomeIcon>
                </div>
                <ul className="flex flex-col gap-8 flex-grow text-xl">
                    <li>
                        <Link
                            className={`${pathName === "/" && "text-gray-500"}`}
                            href={"/"}
                        >
                            Anasayfa
                        </Link>
                    </li>
                    {userContext?.user && (
                        <>
                            <li>
                                <Link
                                    className={`${
                                        pathName === "/hesabim" &&
                                        "text-gray-500"
                                    }`}
                                    href={"/hesabim"}
                                >
                                    Hesabım
                                </Link>
                            </li>
                        </>
                    )}
                    {!userContext?.user && (
                        <li>
                            <Link
                                className={`${
                                    pathName === "/giris-yap" && "text-gray-500"
                                }`}
                                href={"/giris-yap"}
                            >
                                Giriş Yap \ Kayıt Ol
                            </Link>
                        </li>
                    )}

                    <li>
                        <Link
                            className={`${
                                pathName === "/urunler/dronelar" &&
                                "text-gray-500"
                            }`}
                            href={"/urunler/dronelar"}
                        >
                            Dronelar
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={`${
                                pathName === "/urunler/yedek-parcalar" &&
                                "text-gray-500"
                            }`}
                            href={"/urunler/yedek-parcalar"}
                        >
                            Yedek Parçalar
                        </Link>
                    </li>

                    <li>
                        <Link
                            className={`${
                                pathName === "/iletisim" && "text-gray-500"
                            }`}
                            href={"/iletisim"}
                        >
                            İletişim
                        </Link>
                    </li>
                    {userContext?.user && (
                        <li>
                            <button onClick={logOutHandler}>
                                <p>Çıkış Yap</p>
                            </button>
                        </li>
                    )}

                    <li className="mt-auto">
                        <p className="text-center text-sm">
                            @2025 Soundwave -{" "}
                            <Link
                                href={"/gizlilik-politikasi"}
                                className="italic"
                            >
                                Gizlilik Politikası
                            </Link>
                            <br />
                            (Tüm hakları saklıdır.)
                        </p>
                    </li>
                </ul>
            </div>
        </aside>
    );
}
