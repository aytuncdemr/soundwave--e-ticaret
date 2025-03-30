import Question from "@/components/Question";

export default function FAQ() {
    const questions = [
        {
            question: "Sipariş verdim, servis talebi oluşturabilir miyim?",
            answer: "Evet, www.soundwavesky.com adresinden servis talebi oluşturabilir ve yedek parça satın alabilirsiniz.",
        },
        {
            question:
                "Kurulum veya diğer konularla ilgili nasıl destek alabilirim?",
            answer: "“İletişim” sayfasındaki formdan bize ulaşabilir ve destek alabilirsiniz.",
        },
        {
            question: "İade için nelere dikkat etmeliyim?",
            answer: "Ürünle birlikte isim, soyisim ve telefon numaranızı eklemelisiniz. Kanatlarda çizik veya hasar varsa iade reddedilebilir.",
        },
        {
            question: "Pervaneleri değiştirirken nelere dikkat etmeliyim?",
            answer: "A ve B pervaneleri farklıdır. Değiştirdiğiniz yedek pervane, drone üzerindeki aynı grup pervaneyle eşleşmelidir. Yanlış montaj durumunda drone havalanamaz ve takla atar.",
        },
        {
            question: "Garanti süresi ne kadar?",
            answer: "Ürünlerimiz 3 yıl garanti kapsamındadır. Detaylı bilgi için garanti şartlarımızı inceleyebilirsiniz.",
        },
        {
            question: "Ürünüm arızalandı, ne yapmalıyım?",
            answer: "Arızalı ürünler için www.soundwavesky.com adresinden servis talebi oluşturabilirsiniz. Garanti kapsamında olup olmadığını kontrol etmek için faturanızla birlikte başvuru yapmanız gerekmektedir.",
        },
        {
            question: "Yedek parçaları nereden satın alabilirim?",
            answer: "Yedek parçaları web sitemizden veya yetkili bayilerimizden temin edebilirsiniz.",
        },
        {
            question: "Siparişim ne zaman kargoya verilir?",
            answer: "Siparişleriniz genellikle 1-3 iş günü içinde kargoya verilir. Kampanya dönemlerinde bu süre değişebilir.",
        },
        {
            question: "Kargo ücreti ne kadar?",
            answer: "Kargo ücreti sipariş tutarına ve teslimat adresinize göre değişebilir. 500 TL ve üzeri siparişlerde kargo ücretsizdir.",
        },
        {
            question: "Drone’un uçuş süresi ve menzili ne kadar?",
            answer: "Modeline bağlı olarak uçuş süresi 15-30 dakika arasında değişir. Maksimum menzil ise 500-2000 metre arasındadır.",
        },
        {
            question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
            answer: "Kredi kartı, banka havalesi seçeneklerimiz mevcuttur. Taksit seçenekleri hakkında bilgi almak için iletişime geçebilirsiniz.",
        },
    ];

    return (
        <section className="faq-section py-24 px-4">
            <div className="faq-contanier">
                <h2 className="text-3xl lg:text-4xl  text-center mb-8 lg:mb-12">
                    Sıkça Sorulan Sorular
                </h2>
                <div className="questions flex flex-col max-w-[42rem] mx-auto  gap-4">
                    {questions.map((q, index) => (
                        <Question
                            key={index}
                            question={q.question}
                            answer={q.answer}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
