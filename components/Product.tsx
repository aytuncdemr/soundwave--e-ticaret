"use client";

import { ProductsContext } from "@/context/ProductsProvider";
import { useContext, useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleCheck,
    faMinus,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import ProductCard from "@/components/ProductCard";
import { UserContext } from "@/context/UserProvider";
import { toast } from "react-toastify";
import Link from "next/link";
import { type Product } from "@/interfaces/Product";
import { usePathname } from "next/navigation";
import getSuggestedProducts from "@/utils/getSuggestedProducts";
import ProductCarousel from "./ProductCarousel";
import Button from "./Button";
import updateUser from "@/utils/updateUser";
import TeknosaLogo from "@/public/teknosa-logo.png";
import HBLogo from "@/public/hepsiburada-logo.webp";
import TrendyolLogo from "@/public/trendyol-logo.png";

import Image from "next/image";

export default function Product() {
    const products = useContext(ProductsContext);
    const userContext = useContext(UserContext);
    const [amount, setAmount] = useState(1);
    const [product, setProduct] = useState<Product | null>(null);
    const [initialRender, setInitialRender] = useState(true);
    const pathName = usePathname();
    const [suggestedProducts, setSuggestedProducts] = useState<
        Product[] | null
    >(null);

    function addToBasket() {
        if (!userContext?.user) {
            toast.error(
                <p className="lg:text-lg lg:py-2 lg:px-4 text-center xl:w-[]">
                    Lütfen önce hesabınıza{" "}
                    <Link
                        className="underline-offset-4 underline hover:text-red-500 duration-150"
                        href={"/giris-yap"}
                    >
                        giriş yapın
                    </Link>{" "}
                    veya{" "}
                    <Link
                        className="underline-offset-4 underline hover:text-red-500 duration-150"
                        href={"/giris-yap"}
                    >
                        kayıt olun
                    </Link>
                </p>,
                {
                    className:
                        "bg-black text-white xl:max-w-[24rem] xl:w-[24rem]",
                }
            );

            return;
        }

        if (amount >= (product?.stockAmount as number)) {
            toast.error(
                <p className="lg:text-lg lg:py-2 lg:px-4">
                    Bu üründen sepetinize en fazla {product?.stockAmount} kadar
                    ekleyebilirsiniz.
                </p>,
                {
                    className:
                        "bg-black text-white xl:max-w-[24rem] xl:w-[24rem]",
                }
            );

            return;
        }

        const newBucket = [
            ...(userContext.user.bucket as Product[]),
            ...Array.from({ length: amount }, () => product as Product),
        ];

        userContext?.dispatch({
            type: "bucket",
            payload: newBucket,
        });

        if (userContext?.user) {
            updateUser({ ...userContext?.user, bucket: newBucket });
        }

        toast.success(
            <p className="lg:text-lg lg:py-2 lg:px-4">
                Ürünler sepetinize başarıyla eklendi
            </p>,
            {
                className: "bg-black text-white xl:max-w-[24rem] xl:w-[24rem]",
            }
        );
    }

    useEffect(() => {
        if (products?.droneProducts && products.additionalProducts) {
            const allProducts = [
                ...products?.droneProducts,
                ...products?.additionalProducts,
            ];
            const product = allProducts.find(
                (product) => product.link === pathName
            ) as Product;
            setProduct(product);
            setSuggestedProducts(getSuggestedProducts(allProducts, product));
        }
    }, []);

    useEffect(() => {
        if (!initialRender) {
            const timeOutId = setTimeout(() => {
                updateUser(userContext?.user);
            }, 1500);
            return () => clearTimeout(timeOutId);
        }
        setInitialRender(false);
    }, [userContext?.user?.bucket]);

    if (!product) {
        return;
    }

    return (
        <div className="product-container max-w-[36rem] xl:max-w-[82rem] mx-auto flex flex-col gap-16">
            <div className="flex flex-col items-center xl:items-start xl:flex-row gap-6">
                <div className="max-w-[42rem] xl:w-1/2">
                    <ProductCarousel
                        images={product.imgPaths}
                    ></ProductCarousel>
                </div>
                <div className="product-info xl:w-1/2">
                    <p className="my-2 lg:text-xl xl:text-2xl xl:mb-6">
                        Soundwave SKY
                        <span className="text-gray-500">
                            <Link
                                href={
                                    product?.category === "Dronelar"
                                        ? "/urunler/dronelar"
                                        : "/urunler/yedek-parcalar"
                                }
                            >{`/${product?.category}`}</Link>
                            <Link href={product.link}>
                                {`/${product?.shortName}`}
                            </Link>
                        </span>
                    </p>
                    <p className="text-3xl lg:text-4xl xl:text-5xl text-gray-700 mb-2 xl:mb-4">
                        {product?.name}
                    </p>
                    <div className="mb-4 xl:mb-8">
                        <p className="text-xl lg:text-2xl xl:text-3xl text-gray-600 font-thin">
                            {product?.price}.00 TL{" "}
                        </p>
                        <p className="text-gray-500 lg:text-lg xl:text-xl">
                            Vergiler Dahil
                        </p>
                        <div className="flex flex-col gap-1 mt-4 text-gray-500 text-xl">
                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon
                                    icon={faCircleCheck}
                                ></FontAwesomeIcon>
                                <p>3 Yıl Garanti</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon
                                    icon={faCircleCheck}
                                ></FontAwesomeIcon>
                                <p>Ücretsiz Kargo</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon
                                    icon={faCircleCheck}
                                ></FontAwesomeIcon>
                                <p>7/24 Teknik Destek</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon
                                    icon={faCircleCheck}
                                ></FontAwesomeIcon>
                                <p>Güvenli Ödeme İmkanı</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 items-center xl:items-start">
                        <p className="text-2xl lg:text-3xl  text-gray-600 mb-2">
                            Adet
                        </p>
                        <div className="flex items-center w-48  justify-between  border">
                            <button
                                className="flex items-center justify-center border-r  py-4 px-4"
                                onClick={() => {
                                    if (product.stockAmount > 0) {
                                        setAmount((prevState) => prevState + 1);
                                    }
                                }}
                            >
                                <FontAwesomeIcon
                                    className="lg:text-lg "
                                    icon={faPlus}
                                ></FontAwesomeIcon>
                            </button>
                            <p className="text-xl lg:text-2xl ">{amount}</p>
                            <button
                                className="flex items-center justify-center border-l py-4 px-4"
                                onClick={() =>
                                    setAmount((prevState) =>
                                        prevState - 1 > -1 ? prevState - 1 : 0
                                    )
                                }
                            >
                                <FontAwesomeIcon
                                    className="lg:text-lg xl:text-xl"
                                    icon={faMinus}
                                ></FontAwesomeIcon>
                            </button>
                        </div>
                        {product?.stockAmount === 0 && (
                            <p className="text-red-500 lg:text-lg xl:text-xl">
                                (Ürünün stoğu tükenmiş)
                            </p>
                        )}
                        <Button
                            onClick={addToBasket}
                            className={`py-3 px-12 ${
                                (amount < 1 || product?.stockAmount === 0) &&
                                "bg-gray-500 border border-gray-500 pointer-events-none"
                            }`}
                        >
                            Sepete Ekle
                        </Button>
                        <div className="flex flex-col gap-2">
                            <div>
                                <p className="text-center md:text-start">Diğer platformlardan sipariş vermek için</p>
                            </div>
                            <div className="flex items-center gap-2 mt-4">
                                <a className="border rounded-xl hover:bg-gray-100 duration-150" target="_blank" href="https://www.trendyol.com/magaza/skypilot-m-1141271?sst=0">
                                    <Image src={TrendyolLogo} alt="trendyol logo" className="h-[120px] w-[220px]" />
                                </a>
                                <a className="border rounded-xl hover:bg-gray-100 duration-150" target="_blank" href="https://www.teknosa.com/magaza/soundwave">
                                    <Image src={TeknosaLogo} alt="teknosa logo" className="h-[120px] w-[220px]" />
                                </a>
                               <a
  className="border rounded-xl bg-gray-300 text-gray-500 pointer-events-none opacity-70"
  target="_blank"
  href="https://www.hepsiburada.com/magaza/soundwave-teknoloji?tab=allproducts"
>
  <Image src={HBLogo} alt="hb logo" className="h-[120px] w-[220px]" />
</a>

                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {product.category === "Dronelar" && (
                <div className="flex flex-col gap-6 xl:gap-8 mt-4 items-center max-w-[100%] w-[100%] mx-auto">
                    <h2 className="text-3xl xl:text-4xl text-center text-gray-600">
                        SoundWave {product.shortName} Drone
                    </h2>
                    {product?.description?.map(
                        (desc: string, index: number) => (
                            <p key={index} className="text-gray-500 text-xl">
                                {desc}
                            </p>
                        )
                    )}
                </div>
            )}
            <div className="flex flex-col items-center gap-4">
                <p className="text-3xl lg:text-4xl xl:text-5xl text-center mb-12">
                    İlginizi çekebilecek <br /> diğer ürünler
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 items-center md:flex-row gap-4">
                    {suggestedProducts &&
                        suggestedProducts.map((suggestedProduct) => {
                            if (!suggestedProduct) {
                                return;
                            }

                            return (
                                <ProductCard
                                    key={suggestedProduct?.shortName}
                                    product={suggestedProduct}
                                ></ProductCard>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
