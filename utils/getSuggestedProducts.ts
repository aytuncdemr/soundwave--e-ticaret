import { Product } from "@/interfaces/Product";

export default function getSuggestedProducts(
    array: Product[],
    expect: Product | null
) {
    if (!array || array.length === 0 || !expect) {
        return [];
    }

    const allProducts = array.filter(Boolean).flat();
    const suggestedProducts: Product[] = [];

    for (let i = 0; i < 4; i++) {
        let randomProduct =
            allProducts[Math.floor(Math.random() * allProducts.length)];

        while (
            randomProduct?.shortName === expect.shortName ||
            suggestedProducts.find(
                (product) => product.shortName === randomProduct?.shortName
            )
        ) {
            randomProduct =
                allProducts[Math.floor(Math.random() * allProducts.length)];
        }

        if (randomProduct) {
            suggestedProducts.push(randomProduct);
        }
    }

    return suggestedProducts;
}
