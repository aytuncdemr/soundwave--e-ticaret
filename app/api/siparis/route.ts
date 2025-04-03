import { mongodb } from "@/utils/mongodb";

export async function POST(request: Request) {
    console.log("POST");
    try {
        const body = await request.text();
        const params = new URLSearchParams(body);
        const hash = params.get("hash");
        const merchant_oid = params.get("merchant_oid");
        const status = params.get("status");
        const payment_type = params.get("payment_type");
        const failed_reason_msg = params.get("failed_reason_msg");
        const failed_reason_code = params.get("failed_reason_code	");

        const { orders } = await mongodb();

        await orders.findOneAndUpdate(
            { hash, merchant_oid },
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
        console.log("Returning OK");
        return new Response("OK", { status: 200 });
    } catch (error) {
        console.log("Error code executing");
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
