import { Product } from "@/interfaces/Product";

export default function groupBucket(bucket: Product[] | null | undefined) {
    if (!bucket) {
        return null;
    }

    const groupedBucket: Product[] = [];
    for (let i = 0; i < (bucket.length ?? 0); i++) {
        const elem: Product = bucket[i];

        if (
            !groupedBucket.find(
                (groupedElem) => groupedElem.link === elem?.link
            ) &&
            elem
        ) {
            elem.bucketAmount = 0;
            groupedBucket.push(elem);
            for (let j = i; j < (bucket.length ?? 0); j++) {
                if (bucket[j].name === elem?.name) {
                    ++elem.bucketAmount;
                }
            }
        }
    }

    if (groupedBucket) {
        groupedBucket.sort((a, b) => b.price - a.price);
    }

    return groupedBucket;
}
