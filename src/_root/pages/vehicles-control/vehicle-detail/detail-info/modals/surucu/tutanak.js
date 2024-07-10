export const pdfTemplate = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tutanak</title>
        <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
            font-size: 14px;
        }
        /* Adjustments specific for PDF generation */
        @media print {
            body {
                font-size: 10px; /* Adjust font size as needed for PDF */
            }
            /* Ensure proper text wrapping */
            p, label {
                word-wrap: break-word;
                white-space: pre-wrap;
            }
        }
    </style>
</head>

<body>
    <h1 style="font-size: 10px;">Araç Teslim Tutanağı</h1>
    <p>Aşağıda bilgilerine yer verilen aracı sağlam olarak teslim aldığımı, araç kullanım politikasında yer verilen
        esasları okuduğumu, anladığımı ve kabul ettiğimi beyan ederim.
        Teslim sonrasında da aracı söz konusu kurallar çerçevesinde kullanacagımı taahhüt ederim.</p>

    <div>
        <div>
            <div>
                <p>Marka</p>
                <p>Model</p>
                <p>Plaka</p>
                <p>KM</p>
                <p>OGS</p>
                <p>Taşıt Tanıma</p>
                <p>Diğer</p>
                <p>Teslim Tarihi</p>
            </div>
            <div>
                <p>:</p>
                <p>:</p>
                <p>:</p>
                <p>:</p>
                <p>:</p>
                <p>:</p>
                <p>:</p>
                <p>:</p>
            </div>
            <div>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
            </div>
        </div>
        <div>
            <p>Araç üzerinde bulunan aksesuarlar</p>
            <p>Deneme Tanım</p>
        </div>
    </div>

    <div>
        <div>
            <p>Teslim Eden</p>
            <p></p>
        </div>
        <div>
            <p>Teslim Alan</p>
            <p></p>
        </div>
    </div>

    <h3>Araçların Temel Kullanım Esasları ve Sorumluluklar</h3>
    <ol>
        <li>Araçlar, Kanunlara aykırılık teşkil edecek şekilde kullanılmayacaktır. Taşınması suç olarak belirtilen
            eşyaların araçlarda taşınması veya bulundurulması ile
            diğer gayri kanuni işlerde kullanılması kesinlikle yasaktır.</li>
        <li>Aran kullanım klavuzlarında verilen azami değerlerin üstünde kullanılması ve/veya arızalı olduğu bilinen bir
            aracın kullanılmaya devam edilmesi sonucu
            meydana gelebilecek maddi ve manevi tüm zararlardan çalışan sorumludur.</li>
        <li>Kendisine şirket aracı tahsis edilmiş çalışan, aracın normal ve saglıklı çalışmasından sorumludur. Bu
            nedenle
            aracın genel bakımlarının (lastik basıncı, yağ ve su seviyesi vb.) ve periyodik kontrollerinin yapılmasından
            ve
            yaptırılmasından sorumludur.</li>
        <li>Kendisine şirket aracı tahsis edilmiş çalışan, üretici firma tarafından tavsiye edilen aracın periyodik
            bakımı
            ve yağ değişimi takvimine uymak ve bu kontrolleri yetkili servislere ve/veya şirketin belirleyeceği diğer
            servislere yaptırmakla yükümlüdür.</li>
        <li>Kendisine şirket aracı tahsis edilmiş çalışan, trafik yasası ile belirlenen yolcu sayısı üstünde yolcu
            taşıyamaz
            ve yasa esaslarına uygun olarak aracı kullanır.</li>
        <li>Kullancının uykusuz olması, refleksleri ve hareket kabiliyetleri azaltan yada uyuşturan ilaçlar alması
            durumunda ya da alkollü olması durumunda araçlar kullanılmamalıdır.</li>
        <li>Araçlar yarış, hız denemesi, ralli, sağlamlık denemesi, motorlu sporlar faaliyetleri gibi, amaçları dışında
            veya trafiğe kapalı ya da dağlık arazi, kum, bataklık, dere yatağı gibi tahammül güçlerine uygun olmayan her
            türlü yer, yol ve şartta kullanılmamalıdir.</li>
        <li>Tüm şirket araçlarnın müşteriler, iş ortakları ve kamuoyu önünde, Şirketleri temsil etmesi nedeniyle, iç ve
            dış temizliğine dikkat etmek öncelikle araç
            kullanıcısının, daha sonra da ilgili amirin sorumluluğundadır.</li>
        <li>Eğer şirket yeterli park yeri /garaj imkanı sağlayamıyorsa, araç tahsis edilen çalışanlar araçlarının,
            özellikle
            gece, güvenli bir yerde park edilmesini
            sağlamalıdırlar.</li>
        <li>Kendisine şirket aracı tahsis edilen çalışan, işi gereği yaptığı seyahatlerde aracını park ederek araçtan
            ayrılması gerekiyorsa, aracın kilitlendiğinden ve varsa alarmının aktif hale getirildiğinden kesinlikle emin
            olması gerekmektedir. (Eğer araç daha uzun bir süre için park edilmiş olarak bırakılacaksa,
            yukardakı önlemlere ek olarak varsa direksiyon kilidi gibi alternatif güvenlik önlemlerini de almalıdır.)
        </li>
        <li>Kendisine şirket aracı tahsis edilmiş çalışan, genel kabul görmüş yol ve trafik kurallarına uymakla
            yükümlüdür.</li>
        <li>Sürücü ehliyetine süreli veya süresiz olarak alıkoyulan ve/veya tamamıyla ehliyetin kendine tanıdığı
            haklardan
            yoksun kalan kullanıcı, kendisine tahsis
            edilen şirket aracını üzerinde olması gereken tüm aksesuarlar ile birlikte tam ve sağlam olarak bir tutanak
            eşliğinde ilgili departman yöneticisine teslim eder. Kendisine İş Kolu / Görev aracı tahsis edilmiş
            çalışanın
            herhangi bir nedenden dolayı sürücü belgesi elinden alınması durumunda, Şirket, çalışanın iş sözleşmesinin
            fesih hakkını saklı tutar.</li>
        <li>Kendisıne şirket aracı tahsis edlmiş çalışanın kaza yapması durumunda, gerekli ilk yardım yapıldıktan sonra
            , aracın yeri değiştirilmeksizin yasal kaza ve alkol raporu alınmalıdır. Ayrıca, bu raporların "asli
            gibidir"
            kaşesi vurulmuş birer nüshası ile kazaya karışmış diğer kişilerin ehliyet, ruhsat ve trafik sigorta
            poliçelerinin
            birer fotokopisi alınarak Muhasebe Müdürlüğüne gönderilmelidir. Gerekli yasal işlemlerin tamamlanmasından
            sonra
            araç en yakın servise
            götürülmeli ve amirine bilgi verilmelidir.</li>
        <li>Sigorta kapsamı dışında bulunan tüm aksesuarların ve/veya sürücüye ait özel eşyaların alınmasından ve
            kaybolmasından çalışan sorumludur.</li>
    </ol>
    <p>
    </p>
</body>

</html>
`;