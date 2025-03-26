"use client";

import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";

export default function Header() {
  
    return (
        <header className="bg-black py-4 px-4 md:py-8">
            <div className="header-container text-white max-w-[1250px] mx-auto">
              <MobileNav></MobileNav>
              <DesktopNav></DesktopNav>
            </div>
        </header>
    );
}
