"use client";

export default function Banner() {
    function scrollToProducts() {
        document.getElementById("products")?.scrollIntoView({
            behavior: "smooth",
        });
    }

    return (
        <div className="bg-banner-gradient bg-cover bg-center bg-no-repeat h-96 w-full min-h-[46rem] py-12 px-2 flex flex-col justify-center md:justify-normal items-center ">
            <div className="md:mt-auto flex flex-col gap-4">
                <h2 className="text-white text-4xl md:text-5xl md:mb-4 text-center">
                    Her Uçuş Yeni <br /> Bir Macera
                </h2>
                <button
                    onClick={scrollToProducts}
                    className="text-white py-2 px-4 hover:bg-white md:text-xl hover:text-black duration-150 border-gray-100 border hover:border-transparent"
                >
                    Ürünlere Gözat
                </button>
            </div>
        </div>
    );
}
