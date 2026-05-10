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
    name: "Shahkar Cube Mini",
    tagline: "Compact desktop cooling",
    price: 3499,
    oldPrice: 4999,
    img: product1,
    badge: "Top Seller",
    stockLeft: 4,
    description:
      "The Cube Mini sits silently on your desk and turns warm air into a refreshing breeze in seconds. Powered by any USB port — laptop, power bank, or solar panel.",
    features: [
      "3-in-1: Cooler, Humidifier & Night Lamp",
      "Whisper-quiet 35dB operation",
      "7-color LED ambient mood light",
      "300ml refillable water tank",
    ],
    specs: [
      { label: "Power", value: "5V / 1A USB" },
      { label: "Wattage", value: "5W only" },
      { label: "Tank", value: "300 ml" },
      { label: "Weight", value: "480 g" },
    ],
  },
  {
    slug: "onyx-pro",
    name: "Shahkar Onyx Pro",
    tagline: "Bedside power cooler",
    price: 5299,
    oldPrice: 6999,
    img: product2,
    badge: "New",
    stockLeft: 7,
    description:
      "Built for those long load-shedding nights. The Onyx Pro pushes cold air further with a turbine-grade fan, and looks like a luxury speaker on your bedside.",
    features: [
      "Turbine fan — 40% more airflow",
      "Remote control included",
      "Chrome accent finish",
      "Runs 8 hours on a single fill",
    ],
    specs: [
      { label: "Power", value: "5V / 2A USB-C" },
      { label: "Wattage", value: "10W" },
      { label: "Tank", value: "600 ml" },
      { label: "Weight", value: "780 g" },
    ],
  },
  {
    slug: "tower-one",
    name: "Shahkar Tower One",
    tagline: "Room-scale freshness",
    price: 7899,
    oldPrice: 9499,
    img: product3,
    badge: "Top Seller",
    stockLeft: 3,
    description:
      "A floor-standing tower cooler designed for bedrooms and small lounges. UPS & solar friendly — keeps an entire room cool without spiking your electricity bill.",
    features: [
      "Cools rooms up to 120 sq.ft.",
      "Honeycomb cooling pad technology",
      "1.2L water reservoir",
      "Touch-glass control panel",
    ],
    specs: [
      { label: "Power", value: "12V DC / UPS Ready" },
      { label: "Wattage", value: "25W" },
      { label: "Tank", value: "1.2 L" },
      { label: "Height", value: "62 cm" },
    ],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
