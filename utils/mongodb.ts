import { MongoClient, Db } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error(
        "Please define the MONGO_URI environment variable inside .env.local"
    );
}

const client = new MongoClient(MONGODB_URI);

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function mongodb() {
    if (!cachedClient || !cachedDb) {
        await client.connect();
        cachedClient = client;
        cachedDb = client.db("soundwave");
    }

    const users = cachedDb.collection("users");
    const products = cachedDb.collection("products");
    const orders = cachedDb.collection("orders");

    return { db: cachedDb, client: cachedClient, users, products, orders };
}
