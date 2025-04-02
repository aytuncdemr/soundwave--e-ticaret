import { type Product } from "@/interfaces/Product";

export default function groupBucket(bucket: Product[] | null | undefined) {
    if (!bucket) {
        return null;
    }

    const groupedBucket: (Product & { bucketAmount: number })[] = [];
    for (let i = 0; i < bucket.length; i++) {
        const elem: Product & { bucketAmount: number } = {
            ...bucket[i],
            bucketAmount: 0,
        };

        if (
            !groupedBucket.find(
                (groupedElem) => groupedElem.shortName === elem.shortName
            )
        ) {
            groupedBucket.push(elem);
            for (let j = i; j < bucket.length; j++) {
                if (bucket[j].shortName === elem?.shortName) {
                    ++elem.bucketAmount;
                }
            }
        }
    }

    return groupedBucket.sort((a, b) => b.price - a.price);
}
