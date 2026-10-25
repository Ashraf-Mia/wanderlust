export type Destination = {
  _id: string;
  name: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departure: string;
  imageUrl: string;
  description: string;
};

export type PriceRange = {
  value: string;
  label: string;
  /** Inclusive lower bound. */
  min: number;
  /** Inclusive upper bound. */
  max: number;
};

export const ALL_CATEGORIES = "all-categories";

export const PRICE_RANGES: readonly PriceRange[] = [
  { value: "all", label: "All Prices", min: 0, max: Number.POSITIVE_INFINITY },
  { value: "budget", label: "Budget · Under $10,000", min: 0, max: 10_000 },
  {
    value: "mid",
    label: "Mid-range · $10,001 – $50,000",
    min: 10_001,
    max: 50_000,
  },
  {
    value: "luxury",
    label: "Luxury · Over $50,000",
    min: 50_001,
    max: Number.POSITIVE_INFINITY,
  },
];

export const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
] as const;

export function formatPrice(price: string): string {
  const value = Number(price);
  return Number.isFinite(value) ? value.toLocaleString("en-US") : price;
}
