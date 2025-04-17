"use client";

import { UserContext } from "@/context/UserProvider";
import updateUser from "@/utils/updateUser";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function PaymentOkayPage() {
    const userContext = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        if (userContext?.user?.bucket && userContext.user.bucket.length > 0) {
            userContext.dispatch({ type: "paymentOkay", payload: "none" });
            updateUser({ ...userContext.user, bucket: [] });
        }

        setTimeout(() => {
            router.push("/siparislerim");
        }, 3500);
    }, [userContext?.user?.bucket]);

    return (
        <section className="payment-okay-section flex items-center justify-center max-h-screen h-screen">
            <div className="payment-okay-container flex flex-col items-center gap-4 p-4">
                <FontAwesomeIcon
                    icon={faCheck}
                    className="text-7xl text-green-600"
                ></FontAwesomeIcon>
                <p className="text-gray-600 text-3xl md:text-4xl xl:text-5xl mb-4 text-center">
                    Siparişinizi başarıyla <br /> işleme aldık
                </p>
                <p className="text-gray-600 text-2xl md:text-3xl xl:text-4xl text-center">
                    Siparişlerim sayfasına yönlendiriliyorsunuz....
                </p>
            </div>
        </section>
    );
}
