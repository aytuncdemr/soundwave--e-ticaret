import { User } from "@/interfaces/User";
import { sendPaymentRequest } from "@/utils/sendPaymentRequest";
import { isAxiosError } from "axios";

export async function POST(request: Request) {
    const body = (await request.json()) as User & { total: number };

    try {
        const token = await sendPaymentRequest(body);
        console.log("PayTR token:", token);

        return new Response(JSON.stringify({ token }), { status: 200 });
    } catch (error) {
        if (isAxiosError(error)) {
            return new Response(
                JSON.stringify({
                    message: error.response?.data.message || error.message,
                }),
                { status: 500 }
            );
        } else if (error instanceof Error) {
            return new Response(JSON.stringify({ message: error.message }), {
                status: 500,
            });
        } else {
            return new Response(
                JSON.stringify({ message: "Bir şeyler ters gitti" }),
                { status: 500 }
            );
        }
    }
}
