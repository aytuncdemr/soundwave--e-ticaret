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
        <nav className="mobile-nav flex items-center justify-between md:hidden">
            {" "}
            <FontAwesomeIcon
                icon={faBars}
                onClick={openMobileSideBar}
                className="text-xl"
            ></FontAwesomeIcon>
            <Link className="text-2xl lg:text-3xl" href={"/"}>
                SoundWave
            </Link>
            <div className="flex items-center gap-3">
                <Link href={userContext?.user ? "/profil" : "/giris-yap"}>
                    <FontAwesomeIcon
                        icon={
                            userContext?.user ? faUser : faArrowRightToBracket
                        }
                        className={`text-xl ${
                            pathName === "/profil" &&
                            userContext?.user &&
                            "text-gray-400"
                        } ${
                            pathName === "/giris-yap" &&
                            !userContext?.user &&
                            "text-gray-400"
                        }`}
                    ></FontAwesomeIcon>
                </Link>
                <Link href={"/sepetim"}>
                    <FontAwesomeIcon
                        icon={faCartShopping}
                        className={`text-xl ${
                            pathName === "/sepetim" && "text-gray-400"
                        }`}
                    ></FontAwesomeIcon>
                </Link>
            </div>
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
