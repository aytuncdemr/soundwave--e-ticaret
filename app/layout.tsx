import { type Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@fortawesome/fontawesome-svg-core/styles.css";
import ProductsProvider from "@/context/ProductsProvider";
import UserProvider from "@/context/UserProvider";
import { ToastContainer } from "react-toastify";

import { config } from "@fortawesome/fontawesome-svg-core";
import WhatsappWidget from "@/components/WhatsappWidget";
config.autoAddCss = false;

export const metadata: Metadata = {
    title: "SoundWave - Drone Modelleri | Havacılığı Birlikte Yazıyoruz",
    description:
        "SoundWave'in performans, güvenilirlik ve yenilik için tasarlanmış en yeni drone modellerini keşfedin. Şimdi alışveriş yapın ve havada yepyeni bir deneyime ulaşın.",
    keywords:
        "Drone, Pervane, Kanat, Drone Satışı, Drone Aksesuarları, Uçak, Kanat, SoundWave droneları, Gelişmiş Dronelar, Soundwave, SoundwaveSky,  Drone, Uçuş, Havacılık, Drone satın al, hava fotoğrafçılığı droneları",
    metadataBase: new URL("https://www.soundwavesky.com"),
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "SoundWave - Drone Modelleri | Havacılığı Birlikte Yazıyoruz",
        description:
            "SoundWave ile drone teknolojisindeki en son yenilikleri keşfedin. Hem hobi meraklıları hem de profesyoneller için profesyonel drone modelleri.",
        url: "https://www.soundwavesky.com",
        images: [
            {
                url: "/banner.jpeg",
                width: 800,
                height: 600,
                alt: "SoundWave Droneları",
            },
        ],
        type: "website",
    },
    robots: "index, follow",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="tr-TR" className="scroll-smooth">
            <body className="font-thin">
                <ProductsProvider>
                    <UserProvider>
                        <Header></Header>
                        <main className="min-h-screen">{children}</main>
                        <Footer></Footer>
                    </UserProvider>
                </ProductsProvider>
                <ToastContainer></ToastContainer>
                <WhatsappWidget></WhatsappWidget>
            </body>
        </html>
    );
}

//TODO: USERPROVIDER MUST BE RENEWED



//TODO: TEST EVERY FUNCTIONALITY IN MOBILE ANd DESKTOP
//TODO: TEST EVERY VIEWSIZE
//TODO: ADD DESCRIPTIONS FOR EACH PRODUCT