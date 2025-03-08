import { User } from "@/interfaces/interfaces";
import crypto from "crypto";

async function generateOID() {
	return "1234";
}

function generatePaytrToken(
	user_ip: string,
	merchant_oid: string,
	email: string,
	total: number
) {
	const hashSTR = [
		process.env.MERCHANT_ID,
		user_ip,
		merchant_oid,
		email,
		total,
		"eft",
		"1",
	].join("");

	const token = hashSTR + process.env.MERCHANT_SALT;
	return crypto
		.createHmac("sha256", process.env.MERCHANT_KEY as string)
		.update(token)
		.digest("base64");
}

export async function POST(request: Request) {
	try {
		const user = (await request.json()) as User & {
			total: number;
		};
		if (!user) {
			return new Response(
				JSON.stringify("User object has not been sent"),
				{ status: 400 }
			);
		}
		const user_ip = "85.103.109.216";
		// request.headers.get("x-real-ip") || // Try to get IP from x-real-ip header
		// request.headers.get("x-forwarded-for")?.split(",")[0]; // Fallback to x-forwarded-for header
		if (!user_ip) {
			return new Response(
				JSON.stringify("User IP could not be determined"),
				{ status: 500 }
			);
		}
		const basket = JSON.stringify([
			["Örnek Ürün 1", "18.00", 1],
			["Örnek Ürün 2", "33.25", 2],
			["Örnek Ürün 3", "45.42", 1],
		]);
		const user_basket = Buffer.from(basket).toString("base64");
		const merchant_oid = await generateOID();


		const formData = new URLSearchParams();
		formData.append("merchant_id", process.env.MERCHANT_ID as string);
		formData.append("merchant_key",process.env.MERCHANT_KEY as string);
		formData.append("merchant_salt", process.env.MERCHANT_SALT as string);
		formData.append("email", user.email);
		formData.append("payment_amount", String(user.total));
		formData.append("merchant_oid", merchant_oid);
		formData.append("user_name", user.name);
		formData.append("user_address", user.addresses[0]);
		formData.append("user_phone", user.phoneNumber);
		formData.append("merchant_ok_url", "https://www.google.com");
		formData.append("merchant_fail_url","https://www.google.com");
		formData.append("user_basket", user_basket);
		formData.append("user_ip", user_ip);
		formData.append("test_mode", "1"); //TODO:
		formData.append("no_installment", "1");
		formData.append("max_installment", "1");
		formData.append("currency", "TL");
		formData.append("paytr_token", generatePaytrToken(user_ip,merchant_oid,user.email,user.total));
		console.log("Formdata:", formData);
		const response = await fetch(
			"https://www.paytr.com/odeme/api/get-token",
			{
				method: "POST",
				headers: {
					"content-type": "application/x-www-form-urlencoded",
				},
				body: formData.toString(),
			}
		);

		const responseText = await response.text();
		console.log("PayTR Response:", responseText); // Yanıtı logla

		if (!response.ok) {
			throw new Error(
				`PayTR Error: ${response.status} - ${responseText}`
			);
		}

		const body = await response.formData();
		console.log("Body:", body);

		if (!response.ok) {
			throw new Error("PayTR did not accept your request");
		}

		const token = await response.json();
		return new Response(JSON.stringify(token), { status: 200 });
	} catch (error) {
		if (error instanceof String) {
			return new Response(JSON.stringify(error), { status: 500 });
		}
		if (error instanceof Error) {
			return new Response(JSON.stringify(error.message), { status: 400 });
		}
	}
}
