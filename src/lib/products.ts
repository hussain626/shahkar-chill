import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import rev1 from "@/assets/review1.jpg";
import rev2 from "@/assets/review2.jpg";
import no from "@/assets/no.jpg";
import rev3 from "@/assets/review3.jpg";
import product5 from "@/assets/product-5.jpg"
import prod51 from "@/assets/prod5-1.jpg"
import prod52 from "@/assets/prod5-2.jpg"

export type Bundle = {
  id: string;
  label: string;
  sublabel: string;
  price: number;
  deliveredQty: number;
  highlight?: boolean;
};

export type Review = {
  name: string;
  city: string;
  rating: number;
  text: string;
  date: string;
  image: string;
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  price: number;
  oldPrice?: number;
  img: string;           // Keeps fallback compatibility for list pages
  images?: string[];     // Array of image URLs for the carousel
  badge?: string;
  stockLeft: number;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  bundles?: Bundle[];
  eidSpecial?: boolean;
  reviews?: Review[];
};

export const products: Product[] = [
  {
    slug: "cube-mini",
    name: "Shahkar Portable Mini Air Cooler White ABS 2X Pro",
    tagline: "Premium desktop mist cooling",
    price: 3499,
    oldPrice: 4999,
    img: product1,
    badge: "Top Seller",
    stockLeft: 4,
    description:
      "Beat the Pakistani heat in style. The Shahkar 2X Pro Mini Air Cooler turns plain warm air into a refreshing, mist-cooled breeze in seconds — powered by any USB port (laptop, power bank, or wall adapter). Sleek, premium-white ABS body fits effortlessly on your desk, bedside, or even your car. Whisper-quiet, ultra-portable, and energy-light — premium comfort without the heavy electricity bill.",
    features: [
      "USB-Powered — works with laptop, power bank or adapter",
      "True Mist Cooling Technology for instant cold air",
      "Ultra-Portable — take it anywhere in Pakistan",
      "Whisper-Quiet operation, perfect for sleep & work",
      "Premium ABS build, designed to last all summer",
    ],
    specs: [
      { label: "Material", value: "Premium ABS Plastic" },
      { label: "Color", value: "White" },
      { label: "Power", value: "USB 5V" },
      { label: "Package includes", value: "1x Mini Air Cooler" },
    ],
  },
  {
    slug: "onyx-pro",
    name: "Mini Air Cooler Arctic Air 2.0 White Portable",
    tagline: "Next-gen portable mist AC",
    price: 3500,
    oldPrice: 4500,
    img: product2,
    badge: "New",
    stockLeft: 7,
    description:
      "Meet the Arctic Air 2.0 — engineered for those long load-shedding nights and scorching summer days. A turbine-grade fan paired with advanced mist-cooling pushes ice-cold air further across your room. USB-powered for total portability — bedroom, office, study or car. Premium matte-white finish, designed to look as luxurious as it feels.",
    features: [
      "Arctic-Grade Mist Cooling pushes air further & colder",
      "USB-Powered — UPS, power bank & solar friendly",
      "Portable luxury design for bedside or desk",
      "3-Speed silent airflow with refreshing humidity",
      "Refillable water tank for hours of cool comfort",
    ],
    specs: [
      { label: "Material", value: "Premium ABS Plastic" },
      { label: "Color", value: "Arctic White" },
      { label: "Power", value: "USB 5V" },
      { label: "Package includes", value: "1x Arctic Air 2.0 Cooler" },
    ],
  },
  {
    slug: "tower-one",
    name: "Shahkar Rechargeable Green Portable Fan for Hot Weather",
    tagline: "Rechargeable cordless cooling",
    price: 2500,
    oldPrice: 3500,
    img: product3,
    badge: "Top Seller",
    stockLeft: 3,
    description:
      "Cordless freedom for Pakistani summers. The Shahkar Rechargeable Portable Fan delivers powerful, room-scale airflow on a single charge — perfect for load-shedding, outdoor sehri, rooftops or travel. USB-rechargeable, premium green finish, and built to keep you cool wherever you go. No wires. No bills. Just pure comfort.",
    features: [
      "USB-Rechargeable — hours of cordless cooling",
      "Powerful airflow for the entire room",
      "Portable & lightweight — ideal for travel & outdoor",
      "Multi-speed silent operation",
      "Load-shedding & UPS proof — works without electricity",
    ],
    specs: [
      { label: "Material", value: "Premium ABS Plastic" },
      { label: "Color", value: "Green" },
      { label: "Power", value: "USB Rechargeable" },
      { label: "Package includes", value: "1x Rechargeable Portable Fan" },
    ],
  },
  {
    slug: "bnb-rice-glow",
    name: "B&B Rice Glow Bundle — Face Wash, Scrub & Mask (3-in-1)",
    tagline: "Eid ul Adha Special — Buy 1 Get 1 FREE",
    price: 1999,
    oldPrice: 2999,
    img: product4,
    badge: "Eid Special",
    stockLeft: 12,
    description:
      "Pakistan ki #1 rice glow routine — ab Eid ul Adha pe DOUBLE. B&B Brightening Rice Face Wash, Rice Scrub aur Rice Glow Mask — ek complete 3-in-1 facial kit, ghar pe parlour-jaisa nikhaar. Made for Pakistani skin, paraben & sulphate free, dermatologically tested. Limited Eid stock — order karo aur free bundle apna karo!",
    features: [
      "3-in-1 Complete Facial Kit — Face Wash + Scrub + Mask",
      "Ultra Whitening & Brightening Formula for instant glow",
      "Deep Cleansing + Gentle Exfoliation — removes dirt, oil & dead skin",
      "Improves skin tone & texture — suitable for all Pakistani skin types",
      "Paraben & Sulphate Free — dermatologically tested",
      "7-Day easy return guarantee",
    ],
    specs: [
      { label: "Brand", value: "B&B (Body & Body)" },
      { label: "Type", value: "3-in-1 Facial Kit" },
      { label: "Ideal Usage", value: "All Skin Types" },
      { label: "Box Content", value: "Face Wash + Scrub + Mask" },
    ],
    eidSpecial: true,
    bundles: [
      {
        id: "b1",
        label: "Buy 1 Get 1 FREE",
        sublabel: "2 Full Kits Included — Save Rs. 1,999",
        price: 1999,
        deliveredQty: 2,
      },
      {
        id: "b2",
        label: "Buy 2 Get 2 FREE",
        sublabel: "4 Full Kits Included — Save Rs. 4,497",
        price: 3499,
        deliveredQty: 4,
        highlight: true,
      },
    ],
    reviews: [
      { name: "Ayesha Khan", city: "Karachi", rating: 5, text: "Bohat zabardast product hai! Skin instantly glow karne lagti hai. Buy 1 Get 1 offer ne to dil khush kar diya 💛", date: "2 days ago", image: product1 },
      { name: "Hira Saleem", city: "Lahore", rating: 5, text: "Eid se pehle perfect order. Quality original hai aur delivery bhi 3 din mein mil gayi. Highly recommended!", date: "5 days ago", image: product1 },
      { name: "Fatima Raza", city: "Islamabad", rating: 4, text: "Scrub aur mask dono effective hain. Skin texture pehle se kafi better lag raha hai.", date: "1 week ago" , image: product1},
      { name: "Mehwish Tariq", city: "Rawalpindi", rating: 5, text: "Mein ne 2+2 wala bundle liya — paisa wasool! Sab dostoun ko gift kar rahi hoon Eid pe.", date: "1 week ago", image: product1 },
      { name: "Zainab Ahmed", city: "Multan", rating: 5, text: "B&B ka rice glow kit Pakistani skin ke liye banaya gaya lagta hai. Bohat halka aur refreshing hai.", date: "2 weeks ago", image: product1 },
    ],
  },
   {
    slug: "scrub-gun",
    name: "Kitchen Cleaning Brush 5 in 1 – Rechargeable Electric Scrubber",
    tagline: "5 in 1 - for Kitchen & Bathroom and Scrubbers for for Dishes, Stove, Pots & Pans",
    price: 1799,
    oldPrice: 3000,
    img: product5,
    images: [product5, prod51, prod52],
    badge: "Discount",
    stockLeft: 12,
    description:
      "This sleek, rechargeable electric cleaning brush is the perfect solution for tough grime in your home, kitchen, bathroom, or pool. Designed for effortless cleaning, it’s ideal for busy households and those who value convenience without compromise. Its compact, stylish design makes it easy to store and carry, while the powerful electric head delivers deep cleaning without the hassle of manual scrubbing. The brush is built to last with a durable, high-quality material that withstands daily use. Its rechargeable battery ensures long-term performance, so you won’t have to replace it often. The soft, bristle head gently cleans surfaces while being gentle on delicate items. It’s perfect for cleaning tiles, glass, stainless steel, and more, making it a versatile tool for any household. - Rechargeable battery for long-lasting use - Multi-functional design for kitchen, bathroom, and pool cleaning - Soft, bristle head for gentle yet effective cleaning - Compact and stylish design for easy storage - Durable construction for everyday use",
    features: [
      "Power Source: Rechargeable Lithium-ion Battery",
      "Battery Capacity: Approx. 1500 – 2000mAh",
      "Charging Method: USB Charging (Type-C or Micro USB)",
      "Charging Time: 2 to 3 Hours",
      "Usage Time: 70 – 90 Minutes (Depending on Use)",
      "Motor Speed: Approx. 300 – 400 RPM",
      "Water Resistance: IPX7 Rated (Waterproof Design)",
      "Design: Ergonomic & Lightweight, Anti-Slip Handle",
      "Dimensions: Approx. 28 × 15.5 × 10.5 cm",
    ],
    specs: [
      { label: "Water Resistence", value: "IPX7 Rated" },
      { label: "Type", value: "5-in-1 Electrical Handheld Brush" },
      { label: "Motor Speed", value: "300-400 RPM" },
      { label: "Box Content", value: "1x Handheld Brush 4x Brush Heads for different usage " },
    ],
    eidSpecial: false,
    reviews: [
      { name: "Ayesha Khan", city: "Karachi", rating: 5, text: "Brushes alag alag type ke kaam ke liye useful hain, design bhi smart hai. Highly satisfied", date: "2 days ago", image: rev1 },
      { name: "Hira Saleem", city: "Lahore", rating: 5, text: "Cleaning brush bohat powerful hai, plates aur sink easily clean ho jaate hain.", date: "5 days ago", image: rev2 },
      { name: "Fatima Raza", city: "Islamabad", rating: 4, text: "Delivery fast thi aur product original nikla. Kitchen ke liye must-have item hai.", date: "1 week ago", image: no},
      { name: "Mehwish Tariq", city: "Rawalpindi", rating: 5, text: "Very nice brush kitchen k liye,,, easy to clean easy to use he,,All time best", date: "1 week ago", image:no  },
      { name: "Zainab Ahmed", city: "Multan", rating: 5, text: "Rechargeable feature bohat convenient hai, daily use mein perfect chez hai. Quality good hai.", date: "2 weeks ago", image: rev3 },
    ],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
