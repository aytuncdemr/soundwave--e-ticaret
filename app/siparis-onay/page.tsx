"use client";

import { UserContext } from "@/context/UserProvider";
import updateUser from "@/utils/updateUser";
import { useContext, useEffect } from "react";

export default function PaymentOkayPage() {
    const userContext = useContext(UserContext);

    useEffect(() => {
        if (userContext?.user?.bucket && userContext.user.bucket.length > 0) {
            userContext.dispatch({ type: "payment-okay", payload: "none" });
            updateUser({ ...userContext.user, bucket: [] });
        }
    }, [userContext?.user?.bucket]);

    return <section className="payment-okay-section"></section>;
}
