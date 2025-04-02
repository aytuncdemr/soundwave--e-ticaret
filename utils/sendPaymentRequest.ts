import { User } from "@/interfaces/User";
import axios from "axios";
import crypto from "crypto";
import QueryString from "qs";

export async function sendPaymentRequest(payment: User & { total: number }) {
    const merchant_id = process.env.MERCHANT_ID as string;
    const merchant_key = process.env.MERCHANT_KEY as string;
    const merchant_salt = process.env.MERCHANT_SALT as string;
    const basket = JSON.stringify([
        ["Örnek Ürün 1", "18.00", 1],
        ["Örnek Ürün 2", "33.25", 2],
        ["Örnek Ürün 3", "45.42", 1],
    ]);
    const user_basket = Buffer.from(basket).toString("base64");
    const merchant_oid = "IN" + Date.now();
    const max_installment = 0;
    const no_installment = 1;
    const installment_count = 0;
    const user_ip = "81.214.164.65";
    const email = "aytunc04@hotmail.com";
    const payment_amount = 100000;
    const currency = "TL";
    const test_mode = "1";
    const user_name = "Aytunc Demir";
    const user_address = "Çarşı Mah Istanbul Maltepe";
    const user_phone = "05539516861";
    const merchant_ok_url = "https://www.soundwavesky.com/siparisler"; 
    const merchant_fail_url = "https://www.soundwavesky.com/siparis-hata";
    const timeout_limit = 30;
    const debug_on = "1";
    const lang = "tr";

    const hashSTR = `${merchant_id}${user_ip}${merchant_oid}${email}${payment_amount}${user_basket}${no_installment}${max_installment}${currency}${test_mode}`;
    const paytr_token = hashSTR + merchant_salt;

    const token = crypto
        .createHmac("sha256", merchant_key)
        .update(paytr_token)
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
        timeout_limit,
        debug_on,
        test_mode,
        lang,
        no_installment,
        max_installment,
        installment_count,
        currency,
        paytr_token: token,
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

    return data;
}
