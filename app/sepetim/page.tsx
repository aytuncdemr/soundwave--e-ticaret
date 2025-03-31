"use client";

import Button from "@/components/Button";
import { UserContext } from "@/context/UserProvider";
import { Product } from "@/interfaces/Product";
import groupBucket from "@/utils/groupBucket";
import updateUser from "@/utils/updateUser";
import {
    faMinus,
    faPlus,
    faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function BasketPage() {
    const userContext = useContext(UserContext);
    const [initialRender, setInitialRender] = useState(true);

    function addItem(bucketElem: Product) {
        const newBucket = _.cloneDeep(userContext?.user?.bucket);

        if (newBucket) {
            const newBucketElem = _.cloneDeep(bucketElem);

            newBucket.push(newBucketElem);

            userContext?.dispatch({
                type: "bucket",
                payload: newBucket,
            });
            if (userContext?.user) {
                updateUser({ ...userContext?.user, bucket: newBucket });
            }
        }
    }

    function removeItem(bucketElem: Product) {
        const newBucket = _.cloneDeep(userContext?.user?.bucket);

        const elemIndex = newBucket?.findIndex(
            (elem) => elem.shortName === bucketElem.shortName
        );

        if (elemIndex !== -1 && elemIndex !== undefined && newBucket) {
            newBucket.splice(elemIndex, 1);

            userContext?.dispatch({
                type: "bucket",
                payload: newBucket,
            });
            if (userContext?.user) {
                updateUser({ ...userContext?.user, bucket: newBucket });
            }
        }
    }

    useEffect(() => {
        if (!initialRender) {
            const timeOutId = setTimeout(() => {
                updateUser(userContext?.user);
            }, 1500);
            return () => clearTimeout(timeOutId);
        }

        setInitialRender(false);
    }, [userContext?.user?.bucket]);

    const renderBucketList = groupBucket(userContext?.user?.bucket);
    const total =
        renderBucketList?.reduce(
            (accumulator, next) =>
                accumulator + (next?.bucketAmount || 0) * next.price,
            0
        ) ?? 0;

    return (
        <>
            <section className="basket-section max-w-[102rem] flex items-center justify-center mx-auto px-4 py-12">
                <div className="basket-container flex flex-col gap-4 ">
                    {!userContext?.user && (
                        <div className="text-center flex flex-col gap-4 py-64">
                            <p className="text-xl lg:text-2xl xl:text-4xl">
                                Görünüşe göre hesabınıza daha <br /> giriş
                                yapmamışsınız
                            </p>
                            <FontAwesomeIcon
                                className="text-8xl xl:text-9xl"
                                icon={faShoppingBag}
                            ></FontAwesomeIcon>
                            <Link
                                href={"/giris-yap"}
                                className="text-2xl xl:text-3xl underline hover:text-gray-500 duration-150"
                            >
                                Giriş yapmak veya Kayıt <br /> olmak için
                                tıklayın.
                            </Link>
                        </div>
                    )}

                    {renderBucketList && renderBucketList?.length === 0 && (
                        <div className="text-center flex flex-col gap-4 py-64">
                            <p className="text-xl lg:text-2xl xl:text-4xl ">
                                Görünüşe göre sepetinizde <br /> herhangi bir
                                ürün yok.
                            </p>
                            <FontAwesomeIcon
                                className="text-8xl xl:text-9xl"
                                icon={faShoppingBag}
                            ></FontAwesomeIcon>
                            <Link
                                href={"/urunler/dronelar"}
                                className="text-2xl xl:text-3xl underline hover:text-gray-500 duration-150"
                            >
                                Ürünlerimizi görmek <br /> için tıklayın.
                            </Link>
                        </div>
                    )}

                    {renderBucketList && renderBucketList?.length > 0 && (
                        <>
                            <div className="grid grid-cols-1 lg:grid-cols-2 lg:justify-items-strech gap-4">
                                {renderBucketList?.map(
                                    (bucketElem, index: number) => (
                                        <div
                                            key={bucketElem.shortName}
                                            className="bucket-list-item border py-4 px-4 rounded-lg max-w-[48rem] flex flex-col gap-4"
                                        >
                                            <div className="flex items-center justify-between">
                                                <Link
                                                    href={bucketElem.link}
                                                    className="flex gap-2 items-center"
                                                >
                                                    <Image
                                                        width={1920}
                                                        height={1080}
                                                        src={
                                                            bucketElem
                                                                .imgPaths[0]
                                                        }
                                                        alt={`${bucketElem.name}-${index}`}
                                                        className="max-w-[75px] lg:max-w-[100px] lg:w-[120px] lg:h-[120px]"
                                                    />
                                                    <p className="text-sm lg:text-lg text-gray-600">
                                                        {bucketElem.name}
                                                    </p>
                                                </Link>
                                            </div>
                                            <div className="flex items-center w-full justify-between gap-1">
                                                <div className="text-center">
                                                    <p className="text-lg">
                                                        Toplam Fiyat
                                                    </p>
                                                    <p className="text-lg">
                                                        {bucketElem.price *
                                                            (bucketElem.bucketAmount ||
                                                                0)}
                                                        TL
                                                    </p>
                                                </div>
                                                <div className="flex items-center justify-between border">
                                                    <button
                                                        className="flex items-center justify-center border-r py-4 px-4"
                                                        onClick={() =>
                                                            addItem(bucketElem)
                                                        }
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faPlus}
                                                        />
                                                    </button>
                                                    <p className="py-4 px-5">
                                                        {
                                                            bucketElem.bucketAmount
                                                        }
                                                    </p>
                                                    <button
                                                        className="flex items-center justify-center border-l py-4 px-4"
                                                        onClick={() => {
                                                            removeItem(
                                                                bucketElem
                                                            );
                                                        }}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faMinus}
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                            <p className="text-gray-600 text-xl font-bold mt-12 text-center">
                                Toplam Fiyat: {total}
                                TL (Vergiler Dahil)
                                <br />
                                Ücretsiz Kargo
                            </p>
                            <Button className="max-w-[50%] lg:max-w-[33%] lg:w-[33%] mt-8 mx-auto ">
                                <Link
                                    className="px-8 py-2 inline-block"
                                    href={`/odeme?total=${total}`}
                                >
                                    Ödemeye Geç
                                </Link>
                            </Button>
                        </>
                    )}
                </div>
            </section>
        </>
    );
}
