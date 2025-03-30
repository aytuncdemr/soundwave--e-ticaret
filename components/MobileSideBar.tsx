"use client";

import { UserContext } from "@/context/UserProvider";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";

export default function MobileSideBar({
    closeMobileNav,
    logOutHandler,
}: {
    logOutHandler: () => void;
    closeMobileNav: () => void;
}) {
    const pathName = usePathname();
    const userContext = useContext(UserContext);

    return (
        <aside className="mobile-side-bar md:hidden animate-mobileSideBarSlideRight absolute max-w-[90%] w-[90%] max-h-screen h-full bg-[rgba(0,0,0,0.88)] backdrop-blur text-white left-0 top-0 p-6">
            <div className="mobile-nav-container h-full flex flex-col gap-10">
                <div className="flex items-center justify-between text-2xl">
                    <h1 className="font-bold">SoundWave</h1>
                    <FontAwesomeIcon
                        icon={faClose}
                        onClick={closeMobileNav}
                    ></FontAwesomeIcon>
                </div>
                <ul className="flex flex-col gap-7 flex-grow text-xl">
                    <li>
                        <Link
                            className={`${pathName === "/" && "text-gray-500"}`}
                            href={"/"}
                            onClick={closeMobileNav}
                        >
                            Anasayfa
                        </Link>
                    </li>
                    {!userContext?.user && (
                        <li>
                            <Link
                                className={`${
                                    pathName === "/giris-yap" && "text-gray-500"
                                }`}
                                href={"/giris-yap"}
                                onClick={closeMobileNav}
                            >
                                Giriş Yap \ Kayıt Ol
                            </Link>
                        </li>
                    )}

                    <li>
                        <Link
                            className={`${
                                pathName === "/urunler/dronelar" && "text-gray-500"
                            }`}
                            onClick={closeMobileNav}
                            href={"/urunler/dronelar"}
                        >
                            Dronelar
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={`${
                                pathName === "/urunler/yedek-parcalar" && "text-gray-500"
                            }`}
                            onClick={closeMobileNav}
                            href={"/urunler/yedek-parcalar"}
                        >
                            Yedek Parçalar
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
                                    onClick={closeMobileNav}
                                    href={"/hesabim"}
                                >
                                    Hesabım
                                </Link>
                            </li>
                        </>
                    )}
                    <li>
                        <Link
                            className={`${
                                pathName === "/iletisim" && "text-gray-500"
                            }`}
                            onClick={closeMobileNav}
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
                                onClick={closeMobileNav}
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
