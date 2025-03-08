export default function PrivacyPage() {
	return (
		<section className="privacy-section py-12 px-4">
			<div className="privacy-container max-w-[1200px] mx-auto">
				<h1 className="text-3xl lg:text-4xl font-bold mb-6 lg:mb-12 text-center">
					Gizlilik Politikası
				</h1>
				<p className="mb-4 lg:text-xl">
					SoundWaveSky olarak gizliliğinize önem veriyoruz. Bu
					gizlilik politikası, web sitemizi kullanırken kişisel
					bilgilerinizin nasıl toplandığını, kullanıldığını ve
					korunduğunu açıklar.
				</p>

				<div className="mb-6">
					<h2 className="text-xl font-semibold mb-2 lg:text-2xl">
						Toplanan Bilgiler
					</h2>
					<ul className="list-disc pl-6">
						<li>Ad, e-posta adresi ve iletişim bilgileri</li>
						<li>IP adresiniz ve tarayıcı bilgileriniz</li>
						<li>Sipariş geçmişi ve ödeme bilgileri</li>
						<li>
							Çerezler (cookies) ve benzeri takip teknolojileri
						</li>
					</ul>
				</div>

				<div className="mb-6">
					<h2 className="text-xl font-semibold mb-2 lg:text-2xl">
						Bilgilerin Kullanımı
					</h2>
					<p>Toplanan bilgiler şu amaçlarla kullanılabilir:</p>
					<ul className="list-disc pl-6">
						<li>Hizmetlerimizi sağlamak ve siparişleri işlemek</li>
						<li>
							Web sitemizi geliştirmek ve deneyiminizi
							kişiselleştirmek
						</li>
						<li>Pazarlama ve promosyon içerikleri sunmak</li>
						<li>Yasal yükümlülüklere uymak</li>
					</ul>
				</div>

				<div className="mb-6">
					<h2 className="text-xl font-semibold mb-2 lg:text-2xl">
						Bilgi Paylaşımı
					</h2>
					<p>
						Kişisel bilgileriniz üçüncü taraflarla şu durumlarda
						paylaşılabilir:
					</p>
					<ul className="list-disc pl-6">
						<li>Ödeme sağlayıcıları ve lojistik firmaları ile</li>
						<li>
							Hukuki gereklilikler ve yasal talepler doğrultusunda
						</li>
						<li>
							İş ortakları ve reklam hizmetleriyle (izin
							verildiğinde)
						</li>
					</ul>
				</div>

				<div className="mb-6">
					<h2 className="text-xl font-semibold mb-2 lg:text-2xl">
						Çerezler (Cookies)
					</h2>
					<p>
						Web sitemiz, kullanıcı deneyimini iyileştirmek için
						çerezler kullanır. Tarayıcınızdan çerezleri devre dışı
						bırakabilirsiniz ancak bazı özellikler çalışmayabilir.
					</p>
				</div>

				<div className="mb-6">
					<h2 className="text-xl font-semibold mb-2 lg:text-2xl">
						Gizlilik Haklarınız
					</h2>
					<p>
						Kişisel verilerinize erişme, düzeltme veya silme hakkına
						sahipsiniz. Gizlilikle ilgili talepleriniz için{" "}
						<a
							href="mailto:destek@soundwavesky.com"
							className="text-blue-600 underline"
						>
							destek@soundwavesky.com
						</a>{" "}
						adresinden bizimle iletişime geçebilirsiniz.
					</p>
				</div>

				<p className="text-sm text-gray-500 mt-8">
					Bu gizlilik politikası en son 2025 tarihinde
					güncellenmiştir.
				</p>
			</div>
		</section>
	);
}
