import { mongodb } from "@/utils/mongodb";

export async function GET() {
    try {
        const { products } = await mongodb();

        const productDocument = await products.findOne(
            {},
            { projection: { _id: 0 } }
        );

        if (!productDocument) {
            return new Response(
                JSON.stringify({ message: "Ana product dökümanı bulunamadı" }),
                { status: 500 }
            );
        }

        return new Response(JSON.stringify(productDocument), { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return new Response(JSON.stringify({ message: error.message }), {
                status: 404,
            });
        } else {
            return new Response(
                JSON.stringify({ message: "Bir şeyler ters gitti" }),
                { status: 500 }
            );
        }
    }
}
