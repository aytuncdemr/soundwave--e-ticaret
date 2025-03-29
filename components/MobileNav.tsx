import {
    faArrowRightToBracket,
    faBars,
    faCartShopping,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { createPortal } from "react-dom";
import MobileSideBar from "./MobileSideBar";
import { useContext, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UserContext } from "@/context/UserProvider";

export default function MobileNav() {
    const [mobileSideBarOpen, setMobileSidebarOpen] = useState<boolean>(false);
    const pathName = usePathname();
    const router = useRouter();
    const userContext = useContext(UserContext);

    function logOutHandler() {
        closeMobileSideBar();
        userContext?.dispatch({ type: "logOut", payload: "none" });
        router.push("/");
    }

    function closeMobileSideBar() {
        setMobileSidebarOpen(false);
        document.body.style.overflow = "initial";
    }

    function openMobileSideBar() {
        setMobileSidebarOpen(true);
        window.scrollTo(0, 0);
        document.body.style.overflow = "hidden";
    }

    return (
        <nav className="mobile-nav md:hidden">
            <ul className="flex items-center justify-between ">
                <li>
                    <FontAwesomeIcon
                        icon={faBars}
                        onClick={openMobileSideBar}
                        className="text-xl"
                    ></FontAwesomeIcon>
                </li>
                <li>
                    <Link className="text-2xl" href={"/"}>
                        SoundWave
                    </Link>
                </li>
                <li>
                    <div className="flex items-center gap-3">
                        <Link
                            href={userContext?.user ? "/hesabim" : "/giris-yap"}
                        >
                            <FontAwesomeIcon
                                icon={
                                    userContext?.user
                                        ? faUser
                                        : faArrowRightToBracket
                                }
                                className={`text-xl ${
                                    pathName === "/hesabim" &&
                                    userContext?.user &&
                                    "text-gray-500"
                                } ${
                                    pathName === "/giris-yap" &&
                                    !userContext?.user &&
                                    "text-gray-500"
                                }`}
                            ></FontAwesomeIcon>
                        </Link>
                        <Link href={"/sepetim"}>
                            <FontAwesomeIcon
                                icon={faCartShopping}
                                className={`text-xl ${
                                    pathName === "/sepetim" && "text-gray-500"
                                }`}
                            ></FontAwesomeIcon>
                        </Link>
                    </div>
                </li>
            </ul>
            {mobileSideBarOpen &&
                createPortal(
                    <MobileSideBar
                        logOutHandler={logOutHandler}
                        closeMobileNav={closeMobileSideBar}
                    ></MobileSideBar>,
                    document.querySelector("body") as HTMLBodyElement
                )}
        </nav>
    );
}
