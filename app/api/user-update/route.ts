import { mongodb } from "@/utils/mongodb";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
    const body = await request.json();
    try {
        const { _id, ...updateFields } = body;
        const { users } = await mongodb();
        await users.findOneAndUpdate(
            { _id: new ObjectId(_id) },
            { $set: updateFields }
        );
        return new Response(
            JSON.stringify({
                message: "Yapılan değişiklikler başarıyla kaydedildi.",
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
                JSON.stringify({ message: "Bir şeyler ters gitti." }),
                { status: 500 }
            );
        }
    }
}
