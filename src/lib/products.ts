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
      "LED ambient mood light",
      "300ml refillable water tank",
    ],
    specs: [
      { label: "Material", value: "ABS Plastic" },
      { label: "Color", value: "White" },
      { label: "Package includes", value: "1x Shahkar Portable Mini Air Cooler" },
      { label: "Weight", value: "480 g" },
    ],
  },
  {
    slug: "onyx-pro",
    name: "Mini Air Cooler Arctic Air 2.0 White Portable",
    tagline: "Bedside power cooler",
    price: 3500,
    oldPrice: 4500,
    img: product2,
    badge: "New",
    stockLeft: 7,
    description:
      "Built for those long load-shedding nights. The Onyx Pro pushes cold air further with a turbine-grade fan, and looks like a luxury speaker on your bedside.",
    features: [
      "3-in-1: Cooler, Humidifier & Night Lamp",
      "Whisper-quiet 35dB operation",
      "LED ambient mood light",
      "300ml refillable water tank",
    ],
    specs: [
      { label: "Material", value: "ABS Plastic" },
      { label: "Color", value: "White" },
      { label: "Package includes", value: "1x Shahkar Portable Mini Air Cooler" },
      { label: "Weight", value: "480 g" },
    ],
  },
  {
    slug: "tower-one",
    name: "Shahkar Rechargeable Green Portable Fan for Hot Weather",
    tagline: "Room-scale freshness",
    price: 2500,
    oldPrice: 3500,
    img: product3,
    badge: "Top Seller",
    stockLeft: 3,
    description:
      "A floor-standing tower cooler designed for bedrooms and small lounges. UPS & solar friendly — keeps an entire room cool without spiking your electricity bill.",
    features: [
      "3-in-1: Cooler, Humidifier & Night Lamp",
      "Whisper-quiet 35dB operation",
      "LED ambient mood light",
      "300ml refillable water tank",
    ],
    specs: [
      { label: "Material", value: "ABS Plastic" },
      { label: "Color", value: "White" },
      { label: "Package includes", value: "1x Shahkar Portable Mini Air Cooler" },
      { label: "Weight", value: "480 g" },
    ],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
