"use client";

import Button from "@/components/Button";
import Link from "next/link";

export default function NotFound() {
    return (
        <section className="not-found-section flex items-center justify-center max-h-screen h-screen">
            <div className="not-found-container flex flex-col items-center gap-4">
                <h1 className="text-5xl md:text-6xl 2xl:text-7xl font-bold">
                    404
                </h1>
                <p className="text-gray-600 text-2xl md:text-2xl 2xl:text-3xl text-center">
                    Oops! <br />
                    Görünüşe göre böyle bir <br /> sayfamız yok.
                </p>
                <Button className="px-12 py-3 rounded-md">
                    <Link href="/">Anasayfaya Dön</Link>
                </Button>
            </div>
        </section>
    );
}
