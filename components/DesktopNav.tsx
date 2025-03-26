import { UserContext } from "@/context/UserProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";

export default function DesktopNav() {
    const userContext = useContext(UserContext);
    const pathName = usePathname();

    return (
        <div className="desktop-nav hidden md:flex items-center justify-between">
            <nav className="desktop-nav-left">
                <ul className="flex gap-6 items-center md:text-lg lg:text-xl">
                    <li>
                        <Link
                            className={`${
                                pathName === "/" && "text-gray-400"
                            } hover:text-gray-400 duration-150`}
                            href={"/"}
                        >
                            Anasayfa
                        </Link>
                    </li>

                    <li>
                        <Link
                            className={`${
                                pathName === "/urunler" && "text-gray-400"
                            } hover:text-gray-400 duration-150`}
                            href={"/urunler"}
                        >
                            Ürünlerimiz
                        </Link>
                    </li>

                    <li>
                        <Link
                            className={`${
                                pathName === "/iletisim" && "text-gray-400"
                            } hover:text-gray-400 duration-150`}
                            href={"/iletisim"}
                        >
                            İletişim
                        </Link>
                    </li>
                </ul>
            </nav>
            <Link className="text-2xl lg:text-3xl" href={"/"}>
                SoundWave
            </Link>
            <nav className="desktop-nav-right">
                <ul className="flex items-center gap-6 md:text-lg lg:text-xl">
                    <li>
                        <Link
                            className={`${
                                userContext?.user &&
                                pathName === "/profil" &&
                                "text-gray-400"
                            } ${
                                !userContext?.user &&
                                pathName === "/giris-yap" &&
                                "text-gray-400"
                            } hover:text-gray-400 duration-150`}
                            href={userContext?.user ? "/profil" : "/giris-yap"}
                        >
                            {userContext?.user ? "Profilim" : "Giriş Yap"}
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={`${
                                pathName === "/sepetim" && "text-gray-400"
                            } hover:text-gray-400 duration-150`}
                            href={"/sepetim"}
                        >
                            Sepetim ({userContext?.user?.bucket.length || 0})
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={`${
                                pathName === "/sikca-sorulan-sorular" &&
                                "text-gray-400"
                            } hover:text-gray-400 duration-150`}
                            href={"/sikca-sorulan-sorular"}
                        >
                            S.S.S
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
