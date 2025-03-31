import Image, { StaticImageData } from "next/image";
import { Carousel } from "react-responsive-carousel";

export default function ProductCarousel({
    images,
}: {
    images: StaticImageData[];
}) {
    return (
        <Carousel
            renderThumbs={() =>
                images.map((src, index) => (
                    <Image
                        className="rounded-sm w-full "
                        src={src}
                        width={1920}
                        height={1080}
                        alt={src + " " + index}
                        key={index}
                    ></Image>
                ))
            }
            showIndicators={false}
            showStatus={false}
            showArrows={false}
        >
            {images.map((imgPath: StaticImageData, index: number) => {
                return (
                    <div key={index} className="rounded-xl p-4 border
                    ">
                        <Image
                            className="rounded-sm w-full"
                            src={imgPath}
                            width={1920}
                            height={1080}
                            alt={imgPath + " " + index}
                        ></Image>
                    </div>
                );
            })}
        </Carousel>
    );
}
