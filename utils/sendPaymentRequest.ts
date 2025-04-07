import { User } from "@/interfaces/User";
import axios from "axios";
import crypto from "crypto";
import QueryString from "qs";
import { mongodb } from "./mongodb";
import groupBucket from "./groupBucket";
import getDate from "./getDate";
import getDateWithHour from "./getDateWithHour";

export async function sendPaymentRequest(
    payment: User & { total: number },
    userIp: string
) {
    const merchant_id = process.env.MERCHANT_ID as string;
    const merchant_key = process.env.MERCHANT_KEY as string;
    const merchant_salt = process.env.MERCHANT_SALT as string;
    const basket = JSON.stringify(
        groupBucket(payment.bucket)?.map((product) => [
            product.name,
            String(product.price),
            product.bucketAmount,
        ])
    );
    const user_basket = Buffer.from(basket).toString("base64");
    const merchant_oid = "TR" + Date.now();
    const max_installment = 0;
    const no_installment = 1;
    const user_ip = userIp;
    const email = payment.email;
    const payment_amount = payment.total * 100;
    const currency = "TL";
    const user_name = payment.name;
    const user_address = payment.addresses[0];
    const user_phone = payment.phoneNumber;
    const merchant_ok_url = "https://www.soundwavesky.com/siparis-onay";
    const merchant_fail_url = "https://www.soundwavesky.com/siparis-hata";
    const hash = `${merchant_id}${user_ip}${merchant_oid}${email}${payment_amount}${user_basket}${no_installment}${max_installment}${currency}`;
    const paytr_token = crypto
        .createHmac("sha256", merchant_key)
        .update(hash + merchant_salt)
        .digest("base64");

    const params = {
        merchant_id,
        merchant_key,
        merchant_salt,
        email,
        payment_amount,
        merchant_oid,
        user_name,
        user_address,
        user_phone,
        merchant_ok_url,
        merchant_fail_url,
        user_basket,
        user_ip,
        no_installment,
        max_installment,
        currency,
        paytr_token,
    };

    const { data } = await axios.post(
        "https://www.paytr.com/odeme/api/get-token",
        QueryString.stringify(params),
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );

    const { orders } = await mongodb();
    await orders.insertOne({
        email,
        total: payment_amount / 100,
        merchant_oid,
        name: user_name,
        address: user_address,
        phoneNumber: user_phone,
        ipAddress: user_ip,
        bucket: JSON.parse(basket),
        paid: false,
        status: "Ödeme Bekleniyor - " + getDateWithHour(),
        date: getDateWithHour(),
    });
    return data;
}
