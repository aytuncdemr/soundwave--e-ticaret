import { isAxiosError } from "axios";
import { mongodb } from "@/utils/mongodb";
import { ObjectId } from "mongodb";
import nodemailer from "nodemailer";


async function sendEmail(email: string, newPassword: string) {
    
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.APP_PASSWORD,
        },
    });
    
    const mailOptions = {
        from: `Soundwave SKY <www.soundwavesky.com>`,
        to: email,
        subject: `Yeni Şifre Talebi <SoundWaveSKY>`,
        text: `Yeni şifreniz: ${newPassword}\n`,
        html: `<p>Yeni şifreniz: ${newPassword}</p>`,
    };

    await transporter.sendMail(mailOptions);
    transporter.close();
}

function generateSecurePassword() {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let password = "";
    const randomValues = new Uint8Array(8);
    globalThis.crypto.getRandomValues(randomValues);

    randomValues.forEach((value) => {
        password += chars.charAt(value % chars.length);
    });

    return password;
}

export async function POST(request: Request) {
    try {
        const body: { email: string; _id: string } = await request.json();

        if (!body.email) {
            return new Response(
                JSON.stringify({
                    message: "E-mail bilgisini lütfen gönderiniz.",
                }),
                { status: 400 }
            );
        }
        const newPassword = generateSecurePassword();
        sendEmail(body.email, newPassword);

        const { users } = await mongodb();

        await users.findOneAndUpdate(
            { _id: new ObjectId(body._id) },
            { $set: { password: newPassword } }
        );

        return new Response(
            JSON.stringify({
                message: "Yeni şifreniz e-postanıza iletilmiştir",
            }),
            { status: 200 }
        );
    } catch (error) {
        if (isAxiosError(error)) {
            return new Response(
                JSON.stringify({
                    message: error.response?.data.message || error.message,
                }),
                { status: 500 }
            );
        } else if (error instanceof Error) {
            return new Response(JSON.stringify({ message: error.message }), {
                status: 500,
            });
        }
    }
}
