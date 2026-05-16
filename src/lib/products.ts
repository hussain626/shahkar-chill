import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

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
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  price: number;
  oldPrice?: number;
  img: string;
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
      { name: "Ayesha Khan", city: "Karachi", rating: 5, text: "Bohat zabardast product hai! Skin instantly glow karne lagti hai. Buy 1 Get 1 offer ne to dil khush kar diya 💛", date: "2 days ago" },
      { name: "Hira Saleem", city: "Lahore", rating: 5, text: "Eid se pehle perfect order. Quality original hai aur delivery bhi 3 din mein mil gayi. Highly recommended!", date: "5 days ago" },
      { name: "Fatima Raza", city: "Islamabad", rating: 4, text: "Scrub aur mask dono effective hain. Skin texture pehle se kafi better lag raha hai.", date: "1 week ago" },
      { name: "Mehwish Tariq", city: "Rawalpindi", rating: 5, text: "Mein ne 2+2 wala bundle liya — paisa wasool! Sab dostoun ko gift kar rahi hoon Eid pe.", date: "1 week ago" },
      { name: "Zainab Ahmed", city: "Multan", rating: 5, text: "B&B ka rice glow kit Pakistani skin ke liye banaya gaya lagta hai. Bohat halka aur refreshing hai.", date: "2 weeks ago" },
    ],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
