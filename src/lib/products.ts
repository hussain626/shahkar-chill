import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

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
};

export const products: Product[] = [
  {
    slug: "cube-mini",
    name: "Shahkar Portable Mini Air Cooler White ABS 2X Pro",
    tagline: "Premium desktop mist cooling",
    price: 3690,
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
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
