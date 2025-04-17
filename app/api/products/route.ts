import { mongodb } from "@/utils/mongodb";

export async function GET() {
    try {
        const { products } = await mongodb();

        const productDocuments = await products.find(
            {},
            { projection: { _id: 0 } }
        ).toArray();

        if (!productDocuments) {
            return new Response(
                JSON.stringify({ message: "Ürünler dökümanı bulunamadı" }),
                { status: 500 }
            );
        }

        return new Response(JSON.stringify(productDocuments), { status: 200 });
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
