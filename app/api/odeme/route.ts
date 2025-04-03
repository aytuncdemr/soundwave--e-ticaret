import { User } from "@/interfaces/User";
import { sendPaymentRequest } from "@/utils/sendPaymentRequest";
import { isAxiosError } from "axios";


export async function POST(request: Request) {
    try {
        const body = (await request.json()) as User & { total: number };
        const userIp = request.headers.get("x-forwarded-for")?.split(",")[0];

        if (!userIp) {
            return new Response(
                JSON.stringify({ message: "Kullanıcı IP'si belirlenemedi." }),
                {
                    status: 404,
                }
            );
        }

        const data = await sendPaymentRequest(body, userIp);

        return new Response(JSON.stringify(data.token), {
            status: 200,
        });
    } catch (error) {
        if (isAxiosError(error)) {
            return new Response(
                JSON.stringify({
                    message: error.response?.data || error.message,
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
