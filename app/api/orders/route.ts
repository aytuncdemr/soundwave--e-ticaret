import { mongodb } from "@/utils/mongodb";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { orders } = await mongodb();

        const userOrders = await orders.find({ email: body.email }).toArray();

        return new Response(JSON.stringify(userOrders), { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return new Response(JSON.stringify({ message: error.message }), {
                status: 500,
            });
        } else {
            return new Response(
                JSON.stringify({ message: "Bir şeyler ters gitti." }),
                { status: 500 }
            );
        }
    }
}
