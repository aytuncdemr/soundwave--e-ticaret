import { faSquareWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function WhatsappWidget() {
    return (
        <div className="whatsapp-widget fixed bottom-4 right-4 lg:bottom-8 lg:right-8">
            <a
                href={`https://wa.me/+905446434261?text=Merhaba Soundwave SKY Drone ürünleri ve ek parçaları hakkında sizden bilgi almak istiyorum.`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <div className="text-green-500 hover:text-green-600 duration-150">
                    <FontAwesomeIcon
                        className="text-7xl"
                        icon={faSquareWhatsapp}
                    />
                </div>
            </a>
        </div>
    );
}
