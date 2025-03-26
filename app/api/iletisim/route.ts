import nodemailer from "nodemailer";
import { type ContactData } from "@/interfaces/ContactData";

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
    },
});

async function sendEmail(formData: ContactData) {
    const mailOptions = {
        from: `"${formData.name || formData.email}" <${formData.email}>`,
        to: process.env.EMAIL,
        subject: `${
            formData.name || formData.email
        }'dan gelen iletişim formu <SoundWave>`,
        text: `Mesaj: ${
            formData.isNotificationAllow
                ? formData.email + " kampanyalardan haberdar olmak istiyor."
                : formData.message
        }\nE-mail:${formData.email}\nTelefon Numarası: ${
            formData.phoneNumber || ""
        }`,
        html: `<p><strong>Mesaj:</strong> ${
            formData.isNotificationAllow
                ? formData.email + " kampanyalardan haberdar olmak istiyor."
                : formData.message
        }</p>
               <p><strong>Telefon Numarası:</strong> ${
                   formData.phoneNumber || ""
               }</p>
			   <p><strong>E-mail:</strong> ${formData.email}</p>`,
    };

    await transporter.sendMail(mailOptions);
}

export async function POST(request: Request) {
    try {
        const formData = (await request.json()) as ContactData;

        await sendEmail(formData);

        return new Response(
            JSON.stringify({
                message: `${
                    formData.isNotificationAllow ? "Talebiniz" : "Mesajınız"
                } başarıyla gönderilmiştir`,
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
                { status: 400 }
            );
        }
    }
}
