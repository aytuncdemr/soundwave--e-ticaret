import { LogupDataInterface } from "@/components/LogupForm";
import { mongodb } from "@/utils/mongodb";

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as LogupDataInterface;

        const { users } = await mongodb();

        const userAlreadyExist = await users.findOne(
            { email: body.email },
            {
                projection: {
                    password: 0,
                },
            }
        );

        if (userAlreadyExist) {
            return new Response(
                JSON.stringify({
                    message:
                        "Başka bir kullanıcı bu email adresini kullanmakta",
                }),
                { status: 400 }
            );
        }

        const insertedDoc = await users.insertOne(body);

        const newUser = await users.findOne(
            { _id: insertedDoc.insertedId },
            { projection: { password: 0 } }
        );

        return new Response(JSON.stringify(newUser), {
            status: 200,
        });
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
