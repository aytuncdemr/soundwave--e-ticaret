import { mongodb } from "@/utils/mongodb";
import jwt from "jsonwebtoken";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const collection = url.searchParams.get("collection");
        const authHeader = request.headers.get("authorization");
        const token = authHeader?.split(" ")[1];

        if (!token || !jwt.verify(token, process.env.JWT_SECRET as string)) {
            return new Response(
                JSON.stringify({ message: "Token değeri eksik veya hatalı." })
            );
        }

        const { orders, users, products } = await mongodb();

        const orderDocuments =
            collection === "orders" && (await orders.find({}).toArray());
        const userDocuments =
            collection === "users" && (await users.find({}).toArray());
        const productDocuments =
            collection === "products" && (await products.find({}).toArray());

        return new Response(
            JSON.stringify({
                orders: orderDocuments || null,
                users: userDocuments || null,
                products: productDocuments || null,
            }),
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof Error) {
            return new Response(JSON.stringify({ message: error.message }), {
                status: 500,
            });
        } else {
            return new Response(
                JSON.stringify({
                    message: "Beklenmeyen bir hata meydana geldi.",
                }),
                { status: 500 }
            );
        }
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (
            !body.token ||
            !jwt.verify(body.token, process.env.JWT_SECRET as string)
        ) {
            return new Response(
                JSON.stringify({ message: "Token değeri eksik veya hatalı." })
            );
        }

        return new Response(
            JSON.stringify({
                message: "Değişiklikler başarıyla kaydedildi.",
            }),
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof Error) {
            return new Response(JSON.stringify({ message: error.message }), {
                status: 500,
            });
        } else {
            return new Response(
                JSON.stringify({
                    message: "Beklenmeyen bir hata meydana geldi.",
                }),
                { status: 500 }
            );
        }
    }
}
