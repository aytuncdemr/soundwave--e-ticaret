import { StaticImageData } from "next/image";

export interface Product {
    name: string;
    shortName: string;
    price: number;
    imgPaths: StaticImageData[];
    stockAmount: number;
    link: string;
    bucketAmount?: number;
    category: string;
    description?: string[];
    variations?:Product[];
}
