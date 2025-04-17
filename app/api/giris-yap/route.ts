import { mongodb } from "@/utils/mongodb";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (
            body.email === process.env.ADMIN_EMAIL &&
            body.password === process.env.ADMIN_PASSWORD
        ) {
            const token = jwt.sign(
                {
                    email: process.env.ADMIN_EMAIL,
                    password: process.env.ADMIN_PASSWORD,
                },
                process.env.JWT_SECRET as string,
                { expiresIn: "1h" }
            );
            return new Response(JSON.stringify({ token }), { status: 200 });
        }

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
