import nodemailer from "nodemailer";
import { type ContactData } from "@/interfaces/ContactData";

export const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
    },
});

async function sendEmail(formData: ContactData) {
    const mail = {
        from: `"${formData.email}"`,
        to: "soundwaveskyinfo@gmail.com",

        subject: `${formData.name || formData.email} iletişim formu`,
        text: `E-mail:${formData.email}\nMesaj: ${
            formData.isNotificationAllow
                ? formData.email + " kampanyalardan haberdar olmak istiyor."
                : formData.message || ""
        }\nTelefon Numarası: ${formData.phoneNumber || ""}`,
        html: `<p>E-mail: <strong>${formData.email}</strong></p>
        <p>Telefon Numarası: ${formData.phoneNumber || ""}</p>
        <p>Mesaj: ${
            formData.isNotificationAllow
                ? formData.email + " kampanyalardan haberdar olmak istiyor."
                : formData.message || ""
        }</p>`,
    };

    await transporter.sendMail(mail);
}

export async function POST(request: Request) {
    try {
        const body: ContactData = await request.json();
        if (!body.email) {
            return new Response(
                JSON.stringify({
                    message: "Lütfen bir e-posta adresi gönderiniz.",
                }),
                { status: 404 }
            );
        }

        await sendEmail(body);

        return new Response(
            JSON.stringify({
                message: `${
                    body.isNotificationAllow ? "Talebiniz" : "Mesajınız"
                } başarıyla gönderilmiştir.`,
            }),
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof Error) {
            return new Response(
                JSON.stringify({
                    message: error.message,
                }),
                { status: 400 }
            );
        } else {
            return new Response(
                JSON.stringify({
                    message: "Bir şeyler ters gitti.",
                }),
                { status: 500 }
            );
        }
    }
}
