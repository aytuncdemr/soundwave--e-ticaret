import { StaticImageData } from "next/image";

export interface Product {
    name: string;
    shortName: string;
    price: number;
    imgPaths: StaticImageData[];
    stockAmount: number;
    link: string;
    category: string;
    description?: string[];
    type:"additional" | "drone";
}
