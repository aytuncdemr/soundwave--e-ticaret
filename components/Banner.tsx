"use client";

export default function Banner() {
    function scrollToProducts() {
        document.getElementById("urunler")?.scrollIntoView({
            behavior: "smooth",
        });
    }

    return (
        <div className="banner-container bg-banner-gradient bg-cover bg-center bg-no-repeat min-h-[46rem] py-12 px-4 flex items-end justify-center ">
            <div className="mt-auto flex flex-col gap-4 text-white">
                <h2 className="text-4xl text-center md:text-5xl md:mb-4">
                    Her Uçuş Yeni <br /> Bir Macera
                </h2>
                <button
                    onClick={scrollToProducts}
                    className=" px-4 py-2 border-gray-100 duration-150 border  md:text-xl hover:bg-white hover:text-black hover:border-transparent"
                >
                    Ürünlere Gözat
                </button>
            </div>
        </div>
    );
}
