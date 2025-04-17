import { Product } from "@/interfaces/Product";
import { ObjectId } from "mongodb";
import { useState } from "react";
import Button from "./Button";
import _ from "lodash";

export default function ProductEditCard({
    product,
    setProducts,
}: {
    product: Product & { _id: ObjectId };
    setProducts: React.Dispatch<
        React.SetStateAction<(Product & { _id: ObjectId })[] | null>
    >;
}) {
    const [isEditing, setIsEditing] = useState(false);

    function changeProductElement(
        field: keyof Product,
        value: string | number
    ) {
        setProducts((prevState) => {
            const newState = _.cloneDeep(prevState);
            
            if(field && value){
                console.log("1");
            }
            // let productToUpdate = newState?.find(
            //     (productElement) => productElement._id === product?._id
            // );

            // productToUpdate = {...productToUpdate as (Product & {_id:ObjectId}),[field]:value};
             return newState;
        });
    }

    return (
        <div className="product-edit-card border border-gray-300 rounded-lg p-4 text-lg flex flex-col gap-4">
            <p className="text-center text-2xl">{product.shortName}</p>

            <div className="flex flex-col gap-1">
                <label className="px-1" htmlFor={product.name}>
                    İsim
                </label>
                <input
                    type="text"
                    id={product.name}
                    className={`border  px-2 rounded-lg py-2 outline-none ${
                        !isEditing && "bg-gray-100"
                    }`}
                    value={product.name || ""}
                    onChange={(e) =>
                        changeProductElement("name", e.target.value)
                    }
                    disabled={!isEditing}
                />
            </div>
            <div className="flex flex-col gap-1">
                <label className="px-1" htmlFor={product.shortName}>
                    Kısa İsim
                </label>
                <input
                    type="text"
                    id={product.shortName}
                    className={`border  px-2 rounded-lg py-2 outline-none ${
                        !isEditing && "bg-gray-100"
                    }`}
                    value={product.shortName || ""}
                    onChange={(e) =>
                        changeProductElement("shortName", e.target.value)
                    }
                    disabled={!isEditing}
                />
            </div>
            <div className="flex flex-col gap-1">
                <label className="px-1" htmlFor={product.link}>
                    Link
                </label>
                <input
                    type="text"
                    id={product.link}
                    className={`border  px-2 rounded-lg py-2 outline-none ${
                        !isEditing && "bg-gray-100"
                    }`}
                    value={product.link || ""}
                    onChange={(e) =>
                        changeProductElement("link", e.target.value)
                    }
                    disabled={!isEditing}
                />
            </div>
            <div className="flex flex-col gap-1">
                <label className="px-1" htmlFor={product.category}>
                    Kategori
                </label>
                <input
                    type="text"
                    id={product.category}
                    className={`border  px-2 rounded-lg py-2 outline-none ${
                        !isEditing && "bg-gray-100"
                    }`}
                    value={product.category || ""}
                    onChange={(e) =>
                        changeProductElement("category", e.target.value)
                    }
                    disabled={!isEditing}
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="px-1" htmlFor={product.price.toString()}>
                    Fiyat (TL)
                </label>
                <input
                    type="number"
                    id={product.price.toString()}
                    className={`border  px-2 rounded-lg py-2 outline-none ${
                        !isEditing && "bg-gray-100"
                    }`}
                    value={product.price || ""}
                    onChange={(e) =>
                        changeProductElement("price", Number(e.target.value))
                    }
                    disabled={!isEditing}
                />
            </div>

            <div className="flex flex-col gap-1">
                <label
                    className="px-1"
                    htmlFor={product.stockAmount.toString()}
                >
                    Stok Sayısı
                </label>
                <input
                    type="number"
                    id={product.stockAmount.toString()}
                    className={`border  px-2 rounded-lg py-2 outline-none ${
                        !isEditing && "bg-gray-100"
                    }`}
                    value={product.stockAmount ?? ""}
                    onChange={(e) =>
                        changeProductElement(
                            "stockAmount",
                            Number(e.target.value)
                        )
                    }
                    disabled={!isEditing}
                />
            </div>

            <Button
                className="py-2"
                onClick={() => setIsEditing((prevState) => !prevState)}
            >
                {isEditing ? "Tamam" : "Düzenle"}
            </Button>
        </div>
    );
}
