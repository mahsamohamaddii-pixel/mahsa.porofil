import "dotenv/config";
import { db, pool } from "@/db";
import { categories, products, productImages, reviews } from "@/db/schema";
import { BANNER_IMAGES } from "@/lib/banner-images";

type SeedImage = string;

const DRESS_IMAGES: SeedImage[] = [
  "https://images.pexels.com/photos/32628117/pexels-photo-32628117.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
  "https://images.pexels.com/photos/13153053/pexels-photo-13153053.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
  "https://images.pexels.com/photos/24740603/pexels-photo-24740603.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
  "https://images.pexels.com/photos/39873881/pexels-photo-39873881.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
  "https://images.pexels.com/photos/31589274/pexels-photo-31589274.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
  "https://images.pexels.com/photos/34780341/pexels-photo-34780341.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
  "https://images.pexels.com/photos/18895490/pexels-photo-18895490.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
  "https://images.pexels.com/photos/29912459/pexels-photo-29912459.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
  "https://images.pexels.com/photos/34362939/pexels-photo-34362939.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
  "https://images.pexels.com/photos/32065400/pexels-photo-32065400.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
];

const COAT_IMAGES: SeedImage[] = [
  "https://images.pexels.com/photos/19099688/pexels-photo-19099688.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
  "https://images.pexels.com/photos/12989422/pexels-photo-12989422.png?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
  "https://images.pexels.com/photos/10356436/pexels-photo-10356436.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
  "https://images.pexels.com/photos/29879990/pexels-photo-29879990.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
  "https://images.pexels.com/photos/30363106/pexels-photo-30363106.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
  "https://images.pexels.com/photos/33722977/pexels-photo-33722977.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
  "https://images.pexels.com/photos/33639134/pexels-photo-33639134.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
  "https://images.pexels.com/photos/20876216/pexels-photo-20876216.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
  "https://images.pexels.com/photos/17040846/pexels-photo-17040846.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
  "https://images.pexels.com/photos/30363102/pexels-photo-30363102.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
];

const MINIMAL_IMAGES: SeedImage[] = [
  "https://images.pexels.com/photos/6995898/pexels-photo-6995898.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
  "https://images.pexels.com/photos/6995902/pexels-photo-6995902.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
  "https://images.pexels.com/photos/20578718/pexels-photo-20578718.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
  "https://images.pexels.com/photos/35802003/pexels-photo-35802003.png?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
  "https://images.pexels.com/photos/7682077/pexels-photo-7682077.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
  "https://images.pexels.com/photos/28452456/pexels-photo-28452456.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
  "https://images.pexels.com/photos/19222080/pexels-photo-19222080.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
  "https://images.pexels.com/photos/36100701/pexels-photo-36100701.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
  "https://images.pexels.com/photos/6641404/pexels-photo-6641404.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
  "https://images.pexels.com/photos/12911893/pexels-photo-12911893.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
];

const ACCESSORY_IMAGES: SeedImage[] = [
  "https://images.pexels.com/photos/8125856/pexels-photo-8125856.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
  "https://images.pexels.com/photos/8125855/pexels-photo-8125855.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
  "https://images.pexels.com/photos/10259873/pexels-photo-10259873.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
  "https://images.pexels.com/photos/8306529/pexels-photo-8306529.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
  "https://images.pexels.com/photos/28389455/pexels-photo-28389455.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
  "https://images.pexels.com/photos/29811437/pexels-photo-29811437.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
  "https://images.pexels.com/photos/6774653/pexels-photo-6774653.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
  "https://images.pexels.com/photos/8306531/pexels-photo-8306531.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
  "https://images.pexels.com/photos/26100578/pexels-photo-26100578.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
  "https://images.pexels.com/photos/8125854/pexels-photo-8125854.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1050",
];

const REVIEW_NAMES = [
  "نگار احمدی",
  "ساناز محمودی",
  "پریسا کریمی",
  "مهسا رضایی",
  "الهام صادقی",
  "یاسمن طاهری",
  "رویا نوروزی",
  "شبنم حسینی",
  "دنیا اکبری",
  "ترانه یوسفی",
  "آیدا شریفی",
  "بهار قاسمی",
];

const REVIEW_TITLES = [
  "کیفیت فوق‌العاده",
  "ارزش خرید بالا",
  "دقیقاً مثل عکس",
  "دوخت و پارچه عالی",
  "یک خرید لوکس واقعی",
  "راضی‌کننده و شیک",
  "سایزبندی دقیق",
  "بسته‌بندی شیک و حرفه‌ای",
];

const REVIEW_BODIES = [
  "کیفیت پارچه خیلی بهتر از چیزی بود که فکرش رو می‌کردم. دوخت تمیز و فینیشینگ حرفه‌ای داره و کاملاً حس لوکس بودن رو منتقل می‌کنه.",
  "رنگ محصول دقیقاً مطابق با عکس‌های سایت بود و سایزبندی هم کاملاً استاندارد و دقیق بود. از خریدم خیلی راضی‌ام.",
  "بسته‌بندی محصول فوق‌العاده شیک بود، انگار یک هدیه لوکس گرفته بودم. ارسال هم سریع‌تر از چیزی بود که انتظار داشتم.",
  "برای یک مهمانی مهم خریدم و همه از ظرافت و کیفیت دوخت تعریف کردند. قطعاً دوباره از این برند خرید می‌کنم.",
  "پارچه نرم و روی تنم خیلی خوش‌دوخت افتاد. فقط کمی زمان بیشتری برای ارسال نیاز بود ولی در کل عالی بود.",
  "از نظر من این محصول نسبت به قیمتش کاملاً ارزش خرید داره. کیفیت دوخت و متریال در حد برندهای لوکس اروپایی است.",
  "استایل مینیمال و در عین حال خاص این محصول باعث شد خیلی زود جزو لباس‌های محبوبم بشه. پیشنهاد می‌کنم.",
  "رنگ‌بندی محصول خیلی شیک و قابل ترکیب با سایر لباس‌هامه. پشتیبانی فروشگاه هم در انتخاب سایز کمک زیادی کرد.",
  "خیلی وقت بود دنبال همچین کیفیتی می‌گشتم. حس پارچه روی دست فوق‌العاده است و افت لباس هم عالیه.",
  "محصول زودتر از موعد مقرر به دستم رسید و کاملاً مطابق انتظارم بود. تجربه خرید خیلی خوبی داشتم.",
];

function pick<T>(arr: T[], n: number, seed: number): T[] {
  const result: T[] = [];
  const used = new Set<number>();
  let i = seed;
  while (result.length < n && used.size < arr.length) {
    const idx = i % arr.length;
    if (!used.has(idx)) {
      used.add(idx);
      result.push(arr[idx]);
    }
    i += 3;
  }
  return result;
}

type ProductSeed = {
  slug: string;
  name: string;
  nameFa: string;
  subtitleFa: string;
  descriptionFa: string;
  detailsFa: string[];
  price: number;
  compareAtPrice?: number;
  colors: { name: string; hex: string }[];
  sizes: string[];
  materialFa: string;
  isFeatured?: boolean;
  isNew?: boolean;
  images: string[];
};

const COLOR = {
  black: { name: "مشکی", hex: "#161616" },
  burgundy: { name: "زرشکی", hex: "#7a1f2b" },
  cream: { name: "کرم", hex: "#e8dcc8" },
  smoke: { name: "دودی", hex: "#6b6b6b" },
  camel: { name: "شتری", hex: "#b08968" },
  navy: { name: "سرمه‌ای", hex: "#1b2a4a" },
  blush: { name: "صورتی پودری", hex: "#e3c4c4" },
  emerald: { name: "زمردی", hex: "#0f5132" },
  gold: { name: "طلایی", hex: "#c9a227" },
  ivory: { name: "عاجی", hex: "#f1ead9" },
  sage: { name: "زیتونی", hex: "#8a8f6a" },
};

const dresses: ProductSeed[] = [
  {
    slug: "rosa-evening-gown",
    name: "Rosa Evening Gown",
    nameFa: "پیراهن مجلسی رزا",
    subtitleFa: "پیراهن بلند ساتن با برش فرانسوی",
    descriptionFa:
      "پیراهن مجلسی رزا با پارچه ساتن درجه‌یک و برش فرانسوی، برای مهمانی‌ها و مراسم رسمی طراحی شده است. حس حرکت نرم روی پارچه و براقیت ملایم آن، حضوری به‌یادماندنی برایتان رقم می‌زند.",
    detailsFa: [
      "پارچه ساتن سیلک با افت عالی و براقیت لوکس",
      "آستردار کامل برای راحتی و دوام بیشتر",
      "زیپ مخفی پشت با قابلیت تنظیم کمر",
      "مناسب شست‌وشوی خشک حرفه‌ای",
    ],
    price: 18500000,
    compareAtPrice: 22900000,
    colors: [COLOR.burgundy, COLOR.black, COLOR.emerald],
    sizes: ["34", "36", "38", "40", "42"],
    materialFa: "ساتن سیلک ۹۵٪ همراه با الیاف الاستیک",
    isFeatured: true,
    images: pick(DRESS_IMAGES, 3, 0),
  },
  {
    slug: "celeste-blue-evening-dress",
    name: "Celeste Evening Dress",
    nameFa: "پیراهن شب سلست",
    subtitleFa: "طراحی آسیمتریک با دامن مواج",
    descriptionFa:
      "پیراهن سلست با رنگ آبی عمیق و دامن چندلایه، الهام‌گرفته از آسمان شامگاهی است. یقه آسیمتریک و بدنه فرم‌گرفته، تناسب اندام را به بهترین شکل به نمایش می‌گذارد.",
    detailsFa: [
      "دامن چندلایه تولی با حجم‌دهی طبیعی",
      "یقه آسیمتریک با جزئیات دست‌دوز",
      "زیپ پنهان و قلاب ایمنی روی کمر",
      "مناسب فصل پاییز و زمستان",
    ],
    price: 21500000,
    colors: [COLOR.navy, COLOR.black],
    sizes: ["34", "36", "38", "40"],
    materialFa: "تول و کرپ با پوشش داخلی ساتن",
    isFeatured: true,
    images: pick(DRESS_IMAGES, 3, 1),
  },
  {
    slug: "eclipse-sequin-dress",
    name: "Eclipse Sequin Dress",
    nameFa: "پیراهن پولک‌دوزی اکلیپس",
    subtitleFa: "درخشش کامل برای شب‌های خاص",
    descriptionFa:
      "پیراهن اکلیپس با پولک‌دوزی ریز و براق در تمام سطح پارچه، برای مراسم‌های VIP و شب‌های خاص طراحی شده. هر پولک به‌صورت دستی روی پارچه نصب شده تا درخششی یکنواخت و لوکس ایجاد کند.",
    detailsFa: [
      "پولک‌دوزی کامل و دست‌دوز روی پارچه مش",
      "بدنه فرم‌گرفته با پوشش داخلی ضدحساسیت",
      "آستین کوتاه با یقه هفت",
      "توصیه می‌شود با شال یا ژاکت کوتاه ست شود",
    ],
    price: 24900000,
    compareAtPrice: 27500000,
    colors: [COLOR.black, COLOR.gold],
    sizes: ["36", "38", "40", "42"],
    materialFa: "پارچه مش با پولک‌دوزی دستی",
    isNew: true,
    images: pick(DRESS_IMAGES, 3, 2),
  },
  {
    slug: "ava-noir-dress",
    name: "Ava Noir Dress",
    nameFa: "پیراهن مشکی آوا",
    subtitleFa: "مینیمال، فرم‌گرفته و همیشه مد",
    descriptionFa:
      "پیراهن آوا یک قطعه ضروری در کمد لباس هر زن شیک‌پوش است. برش ساده و فرم‌گرفته آن، آن را برای مهمانی‌های رسمی و حتی قرارهای کاری مهم مناسب می‌کند.",
    detailsFa: [
      "برش فرم‌گرفته با خط‌دوزی ظریف در کمر",
      "پارچه کرپ با افت عالی و ضدچروک",
      "آستین سه‌ربع با یقه قایقی",
      "قابل شست‌وشوی ملایم در منزل",
    ],
    price: 13900000,
    colors: [COLOR.black, COLOR.smoke],
    sizes: ["34", "36", "38", "40", "42"],
    materialFa: "کرپ درجه‌یک با الیاف ویسکوز",
    images: pick(DRESS_IMAGES, 2, 4),
  },
  {
    slug: "isabella-emerald-dress",
    name: "Isabella Emerald Dress",
    nameFa: "پیراهن زمردی ایزابلا",
    subtitleFa: "رنگ زمردی خیره‌کننده با بافت مخمل",
    descriptionFa:
      "ایزابلا با پارچه مخمل سبک و رنگ زمردی عمیق، انتخابی بی‌نظیر برای مراسم‌های شب و جشن‌های زمستانی است. سطح نرم مخمل در نور، جلوه‌ای رویایی ایجاد می‌کند.",
    detailsFa: [
      "مخمل سبک با سطح نرم و افت عالی",
      "برش بدن‌نما با دامن شلیته‌ای کوتاه",
      "آستین بلند و یقه هفت ظریف",
      "ایده‌آل برای مراسم شب و جشن سال نو",
    ],
    price: 19800000,
    colors: [COLOR.emerald, COLOR.black],
    sizes: ["36", "38", "40"],
    materialFa: "مخمل الاستیک درجه‌یک",
    images: pick(DRESS_IMAGES, 2, 7),
  },
];

const coats: ProductSeed[] = [
  {
    slug: "camelia-wool-coat",
    name: "Camelia Wool Coat",
    nameFa: "پالتو پشمی کاملیا",
    subtitleFa: "گرمای لوکس برای روزهای سرد",
    descriptionFa:
      "پالتو کاملیا از پشم درجه‌یک با برش بلند و دکمه‌های فلزی مینیمال دوخته شده است. طراحی اورسایز آن، هم راحتی و هم ظرافت را به همراه دارد.",
    detailsFa: [
      "پشم ۸۰٪ ترکیب‌شده با کشمیر برای گرمای بیشتر",
      "برش بلند اورسایز با آستین پاف",
      "دو جیب کناری عمیق و کمربند جدا",
      "آستر کامل ساتن داخل پالتو",
    ],
    price: 26500000,
    compareAtPrice: 31000000,
    colors: [COLOR.camel, COLOR.smoke],
    sizes: ["36", "38", "40", "42", "44"],
    materialFa: "پشم و کشمیر ترکیبی",
    isFeatured: true,
    images: pick(COAT_IMAGES, 2, 1),
  },
  {
    slug: "aria-tailored-coat",
    name: "Aria Tailored Coat",
    nameFa: "پالتو کلاسیک آریا",
    subtitleFa: "برش رسمی برای استایل اداری",
    descriptionFa:
      "پالتو آریا با برش تیلورد و دکمه‌بندی دوبل، مناسب محیط‌های رسمی و کاری است. خط دوخت دقیق روی شانه و کمر، فرمی استاندارد و شیک به بدن می‌دهد.",
    detailsFa: [
      "برش تیلورد با دکمه‌بندی دوبل کلاسیک",
      "یقه انگلیسی و جیب‌های دوبل",
      "پارچه ضدچروک مناسب استفاده روزانه",
      "مناسب فصل پاییز و اوایل زمستان",
    ],
    price: 22900000,
    colors: [COLOR.smoke, COLOR.navy, COLOR.black],
    sizes: ["36", "38", "40", "42"],
    materialFa: "پشم فاستونی با پوشش ضدآب سبک",
    images: pick(COAT_IMAGES, 2, 0),
  },
  {
    slug: "noor-fur-trim-coat",
    name: "Noor Statement Coat",
    nameFa: "پالتو شاخص نور",
    subtitleFa: "جزئیات خزدار برای حضوری متفاوت",
    descriptionFa:
      "پالتو نور با یقه و سرآستین خزدار مصنوعی، ترکیبی از گرما و لوکس بودن را ارائه می‌دهد. این پالتو برای کسانی طراحی شده که می‌خواهند متفاوت دیده شوند.",
    detailsFa: [
      "یقه و سرآستین خز مصنوعی قابل تعویض",
      "بدنه پشمی ضخیم مناسب زمستان سرد",
      "بند کمر برای فرم‌دهی به بدن",
      "تولید مسئولانه بدون استفاده از خز طبیعی",
    ],
    price: 29500000,
    colors: [COLOR.burgundy, COLOR.black],
    sizes: ["36", "38", "40", "42"],
    materialFa: "پشم ضخیم با خز مصنوعی",
    isNew: true,
    images: pick(COAT_IMAGES, 2, 2),
  },
  {
    slug: "luna-oversized-coat",
    name: "Luna Oversized Coat",
    nameFa: "پالتو اورسایز لونا",
    subtitleFa: "راحتی مینیمال با ظاهر مدرن",
    descriptionFa:
      "پالتو لونا با برش اورسایز و رنگ بژ خنثی، یک قطعه همه‌کاره برای ترکیب با استایل‌های روزمره و مینیمال است.",
    detailsFa: [
      "برش اورسایز راحت و مدرن",
      "رنگ خنثی قابل ترکیب با اکثر لباس‌ها",
      "دو جیب کاربردی جلو",
      "سبک‌وزن و مناسب نیمه‌فصل",
    ],
    price: 17900000,
    colors: [COLOR.cream, COLOR.camel],
    sizes: ["36", "38", "40", "42", "44"],
    materialFa: "پشم سبک ترکیبی با پلی‌استر",
    images: pick(COAT_IMAGES, 2, 6),
  },
  {
    slug: "elan-classic-trench",
    name: "Élan Classic Trench",
    nameFa: "بارانی کلاسیک الان",
    subtitleFa: "بی‌زمان، شیک، همیشه مد",
    descriptionFa:
      "بارانی الان یک طراحی کلاسیک با کمربند و دکمه‌های برنزی است که هیچ‌گاه از مد نمی‌افتد. مناسب فصل بهار و پاییز و تمام مناسبت‌های روزمره.",
    detailsFa: [
      "پارچه گابردین ضدآب و نفوذناپذیر",
      "کمربند قابل تنظیم با سگک فلزی",
      "یقه دوخت‌دار و جیب‌های عمیق",
      "برش میان‌ران با فرم استاندارد",
    ],
    price: 15800000,
    colors: [COLOR.camel, COLOR.navy],
    sizes: ["34", "36", "38", "40", "42"],
    materialFa: "گابردین پنبه‌ای ضدآب",
    images: pick(COAT_IMAGES, 2, 5),
  },
];

const minimal: ProductSeed[] = [
  {
    slug: "mira-essential-knit",
    name: "Mira Essential Knit",
    nameFa: "ژاکت بافت میرا",
    subtitleFa: "نرم، ساده، همیشه کاربردی",
    descriptionFa:
      "ژاکت بافت میرا از نخ کشمیر نرم بافته شده و یکی از پایه‌ای‌ترین قطعات استایل مینیمال است. مناسب برای ترکیب با دامن، شلوار پارچه‌ای یا حتی زیر پالتو.",
    detailsFa: [
      "بافت کشمیر نرم و سبک‌وزن",
      "یقه گرد ساده با حاشیه ریب",
      "قابل شست‌وشو با دست",
      "رنگ‌بندی خنثی برای ترکیب آسان",
    ],
    price: 8200000,
    colors: [COLOR.cream, COLOR.smoke, COLOR.sage],
    sizes: ["S", "M", "L"],
    materialFa: "کشمیر ۳۰٪ و پشم مرینوس ۷۰٪",
    isFeatured: true,
    images: pick(MINIMAL_IMAGES, 2, 0),
  },
  {
    slug: "sana-tailored-blazer-set",
    name: "Sana Tailored Set",
    nameFa: "ست بلیزر سانا",
    subtitleFa: "استایل اداری با تاچ مدرن",
    descriptionFa:
      "ست بلیزر و شلوار سانا برای زنان حرفه‌ای طراحی شده که ظرافت را با کارایی ترکیب می‌کنند. برش راست و پارچه باکیفیت، حسی مدرن و قدرتمند منتقل می‌کند.",
    detailsFa: [
      "ست کامل بلیزر و شلوار راسته",
      "پارچه ضدچروک مناسب سفر و کار",
      "دکمه‌بندی تک‌ردیفه با یقه کلاسیک",
      "قابل شستشو با ماشین لباسشویی در دمای پایین",
    ],
    price: 12500000,
    colors: [COLOR.black, COLOR.smoke, COLOR.cream],
    sizes: ["34", "36", "38", "40"],
    materialFa: "پلی‌استر ویسکوز درجه‌یک",
    images: pick(MINIMAL_IMAGES, 2, 9),
  },
  {
    slug: "noa-camel-coord",
    name: "Noa Camel Co-ord",
    nameFa: "ست شتری نوا",
    subtitleFa: "راحتی روزمره با ظاهر گران‌قیمت",
    descriptionFa:
      "ست نوا شامل یک تاپ و شلوار هم‌رنگ شتری است که به‌راحتی می‌توان آن را جداگانه نیز استفاده کرد. مناسب لباس روزمره لوکس و سفر.",
    detailsFa: [
      "پارچه نرم با افت طبیعی روی بدن",
      "قابل استفاده به‌صورت ست یا جدا",
      "کمر کش راحت با بند تنظیم",
      "سبک، مناسب فصل بهار و تابستان",
    ],
    price: 9800000,
    colors: [COLOR.camel, COLOR.ivory],
    sizes: ["S", "M", "L"],
    materialFa: "ویسکوز سبک با افت نرم",
    images: pick(MINIMAL_IMAGES, 2, 4),
  },
  {
    slug: "rose-linen-jumpsuit",
    name: "Rose Linen Jumpsuit",
    nameFa: "سرهمی کتان رز",
    subtitleFa: "مینیمال و خنک برای روزهای گرم",
    descriptionFa:
      "سرهمی رز از کتان طبیعی دوخته شده و با پاچه‌های گشاد و کمر بلند، یکی از راحت‌ترین و شیک‌ترین گزینه‌ها برای فصل گرم است.",
    detailsFa: [
      "کتان ۱۰۰٪ طبیعی و تنفس‌پذیر",
      "پاچه گشاد با افت روان",
      "کمربند پارچه‌ای جدا",
      "مناسب سفر و استفاده روزانه",
    ],
    price: 7600000,
    colors: [COLOR.ivory, COLOR.sage],
    sizes: ["S", "M", "L"],
    materialFa: "کتان طبیعی ۱۰۰٪",
    isNew: true,
    images: pick(MINIMAL_IMAGES, 2, 7),
  },
  {
    slug: "yas-street-chic-set",
    name: "Yas Street Chic Set",
    nameFa: "ست خیابانی یاس",
    subtitleFa: "مینیمال با روحیه مدرن شهری",
    descriptionFa:
      "ست یاس برای زنانی طراحی شده که به دنبال سادگی هوشمندانه هستند؛ ترکیبی از پیراهن ساده و اکسسوری‌های مینیمال برای حضور در شهر.",
    detailsFa: [
      "پارچه سبک با حس لطیف روی پوست",
      "برش ساده و قابل ترکیب با اکسسوری",
      "رنگ خنثی برای استایل همه‌روزه",
      "مناسب چهار فصل سال",
    ],
    price: 6400000,
    colors: [COLOR.cream, COLOR.black],
    sizes: ["S", "M", "L", "XL"],
    materialFa: "پنبه ترکیبی نرم",
    images: pick(MINIMAL_IMAGES, 2, 1),
  },
];

const accessories: ProductSeed[] = [
  {
    slug: "shabnam-quilted-handbag",
    name: "Shabnam Quilted Handbag",
    nameFa: "کیف دوشی شبنم",
    subtitleFa: "زنجیر طلایی با چرم درجه‌یک",
    descriptionFa:
      "کیف شبنم با طراحی کوییلت و زنجیر طلایی، یک اکسسوری ضروری برای تکمیل هر استایل لوکس است. فضای داخلی کیف برای حمل وسایل روزمره به‌خوبی طراحی شده.",
    detailsFa: [
      "چرم گاوی درجه‌یک با دوخت کوییلت",
      "زنجیر فلزی با روکش طلایی ضدخش",
      "یک جیب زیپ‌دار و دو جیب داخلی",
      "ابعاد: ۲۵×۱۸×۸ سانتی‌متر",
    ],
    price: 15500000,
    compareAtPrice: 18200000,
    colors: [COLOR.black, COLOR.burgundy, COLOR.cream],
    sizes: ["یک‌سایز"],
    materialFa: "چرم طبیعی گاوی",
    isFeatured: true,
    images: pick(ACCESSORY_IMAGES, 2, 0),
  },
  {
    slug: "takshoes-pointed-pumps",
    name: "Takshoes Pointed Pumps",
    nameFa: "کفش پاشنه‌بلند تاک",
    subtitleFa: "ظرافت کلاسیک برای هر مناسبت",
    descriptionFa:
      "کفش پاشنه‌بلند تاک با نوک تیز و پاشنه استایلتو، انتخابی بی‌نظیر برای مراسم رسمی و مهمانی‌هاست. راحتی پاشنه با کفی طبی تضمین شده است.",
    detailsFa: [
      "چرم درجه‌یک با پرداخت براق",
      "پاشنه استایلتو ۸ سانتی‌متری",
      "کفی طبی ضدلغزش برای راحتی بیشتر",
      "موجود در سایزهای استاندارد زنانه",
    ],
    price: 9200000,
    colors: [COLOR.black, COLOR.burgundy],
    sizes: ["36", "37", "38", "39", "40"],
    materialFa: "چرم طبیعی با زیره ضدلغزش",
    images: pick(ACCESSORY_IMAGES, 1, 2),
  },
  {
    slug: "elham-diamond-halo-ring",
    name: "Elham Diamond Halo Ring",
    nameFa: "انگشتر هاله الماس الهام",
    subtitleFa: "درخشش ظریف برای دستانی خاص",
    descriptionFa:
      "انگشتر الهام با طراحی هاله و نگین مرکزی برجسته، نماد ظرافت و اصالت است. مناسب هدیه یا مناسبت‌های خاص زندگی.",
    detailsFa: [
      "روکش طلای ۱۸ عیار روی نقره استرلینگ",
      "نگین مرکزی زیرکونیا تراش برلیان",
      "طراحی هاله با نگین‌های ریز اطراف",
      "همراه با جعبه هدیه مخملی",
    ],
    price: 6800000,
    colors: [COLOR.gold],
    sizes: ["۶", "۷", "۸", "۹"],
    materialFa: "نقره استرلینگ با روکش طلا",
    images: pick(ACCESSORY_IMAGES, 2, 3),
  },
  {
    slug: "parisa-diamond-drop-earrings",
    name: "Parisa Drop Earrings",
    nameFa: "گوشواره آویز پریسا",
    subtitleFa: "ظرافتی که در هر حرکت می‌درخشد",
    descriptionFa:
      "گوشواره پریسا با آویزهای ظریف و نگین‌های براق، برای شب‌های خاص و مراسم رسمی طراحی شده است. سبک‌وزن و راحت برای استفاده طولانی.",
    detailsFa: [
      "طراحی آویز با نگین‌های زیرکونیا",
      "روکش رودیوم ضدحساسیت و ضدتیرگی",
      "وزن سبک برای راحتی در طول روز",
      "همراه با پاکت مخملی برند",
    ],
    price: 5400000,
    colors: [COLOR.gold, COLOR.black],
    sizes: ["یک‌سایز"],
    materialFa: "نقره استرلینگ با روکش رودیوم",
    isNew: true,
    images: pick(ACCESSORY_IMAGES, 2, 5),
  },
  {
    slug: "donya-cateye-sunglasses",
    name: "Donya Cat-Eye Sunglasses",
    nameFa: "عینک آفتابی گربه‌ای دنیا",
    subtitleFa: "استایل رترو با حفاظت کامل",
    descriptionFa:
      "عینک آفتابی دنیا با فریم گربه‌ای و عدسی‌های پلاریزه، ترکیبی از مد روز و محافظت واقعی در برابر نور خورشید را ارائه می‌دهد.",
    detailsFa: [
      "عدسی پلاریزه با محافظت ۱۰۰٪ در برابر UV",
      "فریم استات سبک و مقاوم",
      "طراحی گربه‌ای متناسب با اکثر فرم‌های صورت",
      "همراه با کیف محافظ و دستمال تمیزکننده",
    ],
    price: 4200000,
    colors: [COLOR.black, COLOR.camel],
    sizes: ["یک‌سایز"],
    materialFa: "فریم استات با عدسی پلاریزه",
    images: pick(ACCESSORY_IMAGES, 1, 8),
  },
];

const categorySeeds = [
  {
    slug: "dresses",
    name: "Dresses",
    nameFa: "پیراهن‌های مجلسی",
    descriptionFa: "پیراهن‌های شب و مجلسی با پارچه‌های لوکس برای مناسبت‌های خاص شما.",
    heroImage: BANNER_IMAGES.dresses,
    position: 1,
    items: dresses,
  },
  {
    slug: "coats",
    name: "Coats",
    nameFa: "پالتو و بارانی",
    descriptionFa: "پالتوهای پریمیوم با پارچه‌های گرم و برش‌های خاص برای فصل سرد.",
    heroImage: BANNER_IMAGES.coats,
    position: 2,
    items: coats,
  },
  {
    slug: "minimal",
    name: "Minimal Edit",
    nameFa: "استایل مینیمال",
    descriptionFa: "قطعات ساده و همیشه‌مد برای ساختن کمد لباسی هوشمند و لوکس.",
    heroImage: BANNER_IMAGES.minimal,
    position: 3,
    items: minimal,
  },
  {
    slug: "accessories",
    name: "Accessories",
    nameFa: "اکسسوری",
    descriptionFa: "کیف، جواهرات و عینک‌های آفتابی برای تکمیل هر استایل.",
    heroImage: BANNER_IMAGES.accessories,
    position: 4,
    items: accessories,
  },
];

function randomReviewSet(seed: number) {
  const count = 3 + (seed % 3); // 3-5 reviews
  const ratingsPool = [5, 5, 5, 4, 4, 5, 3, 5, 4];
  const result: { authorName: string; rating: number; titleFa: string; bodyFa: string; verified: boolean }[] = [];
  for (let i = 0; i < count; i++) {
    const nameIdx = (seed + i * 5) % REVIEW_NAMES.length;
    const titleIdx = (seed + i * 2) % REVIEW_TITLES.length;
    const bodyIdx = (seed + i * 7) % REVIEW_BODIES.length;
    const ratingIdx = (seed + i * 3) % ratingsPool.length;
    result.push({
      authorName: REVIEW_NAMES[nameIdx],
      rating: ratingsPool[ratingIdx],
      titleFa: REVIEW_TITLES[titleIdx],
      bodyFa: REVIEW_BODIES[bodyIdx],
      verified: (seed + i) % 4 !== 0,
    });
  }
  return result;
}

async function main() {
  console.log("Seeding database...");

  await db.execute(`truncate table order_items, orders, reviews, product_images, products, categories restart identity cascade`);

  let globalProductSeed = 0;

  for (const cat of categorySeeds) {
    const [insertedCategory] = await db
      .insert(categories)
      .values({
        slug: cat.slug,
        name: cat.name,
        nameFa: cat.nameFa,
        descriptionFa: cat.descriptionFa,
        heroImage: cat.heroImage,
        position: cat.position,
      })
      .returning();

    for (const item of cat.items) {
      globalProductSeed += 1;
      const reviewSet = randomReviewSet(globalProductSeed * 13 + item.slug.length);
      const avgRating =
        reviewSet.reduce((sum, r) => sum + r.rating, 0) / reviewSet.length;

      const [insertedProduct] = await db
        .insert(products)
        .values({
          slug: item.slug,
          name: item.name,
          nameFa: item.nameFa,
          subtitleFa: item.subtitleFa,
          descriptionFa: item.descriptionFa,
          detailsFa: item.detailsFa,
          categoryId: insertedCategory.id,
          price: String(item.price),
          compareAtPrice: item.compareAtPrice ? String(item.compareAtPrice) : null,
          colors: item.colors,
          sizes: item.sizes,
          materialFa: item.materialFa,
          isFeatured: !!item.isFeatured,
          isNew: !!item.isNew,
          stock: 18 + (globalProductSeed % 12) * 3,
          rating: avgRating.toFixed(1),
          reviewCount: reviewSet.length,
        })
        .returning();

      await db.insert(productImages).values(
        item.images.map((url, idx) => ({
          productId: insertedProduct.id,
          url,
          alt: `${item.nameFa} - تصویر ${idx + 1}`,
          position: idx,
        })),
      );

      await db.insert(reviews).values(
        reviewSet.map((r) => ({
          productId: insertedProduct.id,
          authorName: r.authorName,
          rating: r.rating,
          titleFa: r.titleFa,
          bodyFa: r.bodyFa,
          verified: r.verified,
        })),
      );
    }
  }

  console.log("Seed completed successfully.");
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
