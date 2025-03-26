import { ObjectId } from "mongodb";
import { Product } from "./Product";

export interface User {
	email: string;
	bucket: Product[];
	_id: ObjectId;
	addresses: string[];
	phoneNumber: string;
	name: string;
	registeredAt: string;
}

