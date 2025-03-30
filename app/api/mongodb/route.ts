import { User } from "@/interfaces/User";
import { mongodb } from "@/utils/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const collectionName = url.searchParams.get("collection");
    const query = url.searchParams.get("query");
    const options = url.searchParams.get("options");

    if (!collectionName) {
        return new Response(JSON.stringify("Collection name is required"), {
            status: 400,
        });
    }

    const collection = (await mongodb()).db.collection(collectionName);

    const data = await collection
        .find(
            query ? JSON.parse(query) : {},
            options
                ? { ...JSON.parse(options), projection: { password: 0 } } // password will not be sent
                : { projection: { password: 0 } } // password will not be sent
        )
        .toArray();

    if (data) {
        return new Response(JSON.stringify(data), { status: 200 });
    }

    return new Response(JSON.stringify("Beklenmedik bir hata oluştu"), {
        status: 500,
    });
}
