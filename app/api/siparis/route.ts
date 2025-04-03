import { mongodb } from "@/utils/mongodb";
import crypto from "crypto";

export async function POST(request: Request) {
    try {
        const body = await request.text();
        const params = new URLSearchParams(body);

        const merchant_oid = params.get("merchant_oid");
        const hash = params.get("hash");

        const status = params.get("status");
        const payment_type = params.get("payment_type");
        const total_amount = params.get("total_amount");
        const failed_reason_msg = params.get("failed_reason_msg");
        const failed_reason_code = params.get("failed_reason_code	");

        const { orders } = await mongodb();

        const hashStr =
            (merchant_oid as string) +
            (process.env.MERCHANT_SALT as string) +
            (status as string) +
            (total_amount as string);
        const hashSoundwave = crypto
            .createHmac("sha256", process.env.MERCHANT_KEY as string)
            .update(hashStr)
            .digest("base64");

        console.log(params);
        console.log("hash:", hash);
        console.log("hashSoundwave:", hashSoundwave);

        if (hash !== hashSoundwave) {
            return new Response("Hash değerleri aynı değil.", { status: 400 });
        }

        await orders.findOneAndUpdate(
            { merchant_oid },
            {
                $set:
                    status === "success"
                        ? { paid: true, payment_type }
                        : {
                              payment_error: failed_reason_msg,
                              payment_error_code: failed_reason_code,
                              payment_type,
                          },
            }
        );
        return new Response("OK", { status: 200 });
    } catch (error) {
        console.log("error:", error);
        if (error instanceof Error) {
            return new Response(
                "Bir şeyler ters gitti <SoundwaveSKY>: " + error.message,
                { status: 500 }
            );
        } else {
            return new Response("Bir şeyler ters gitti <SoundwaveSKY>", {
                status: 500,
            });
        }
    }
}
