import { mongodb } from "@/utils/mongodb";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { users } = await mongodb();

        const user = await users.findOne(body, {
            projection: {
                password: 0,
            },
        });
        if (!user) {
            return new Response(
                JSON.stringify({ message: "Hatalı e-posta veya şifre." }),
                { status: 404 }
            );
        }

        return new Response(JSON.stringify(user), { status: 200 });
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
