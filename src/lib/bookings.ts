export type BookingStatus = "confirmed" | "pending" | "cancelled";

export type Booking = {
  /** Booking id — also carries the id of the booked destination. */
  _id: string;
  name: string;
  imageUrl?: string | null;
  price?: string | null;
  /** Default departure of the destination. */
  departure?: string | null;
  /** Departure picked while booking. */
  departureDate?: string | null;
  bookingDate?: string | null;
  email?: string | null;
  userName?: string | null;
  status?: string | null;
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const DATE_ONLY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})/;

/** Formats `2026-05-15` (or any date string) as `May 15, 2026`. */
export function formatDepartureDate(value?: string | null): string | null {
  if (!value) return null;

  const dateOnly = DATE_ONLY_PATTERN.exec(value);
  if (dateOnly) {
    const [, year, month, day] = dateOnly;
    const monthName = MONTHS[Number(month) - 1];
    if (monthName) return `${monthName} ${Number(day)}, ${year}`;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;

  return parsed.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/** Maps whatever the API stores to a known badge status. Defaults to pending. */
export function getBookingStatus(status?: string | null): BookingStatus {
  const normalized = status?.trim().toLowerCase();

  if (normalized === "confirmed" || normalized === "approved") return "confirmed";
  if (normalized === "cancelled" || normalized === "canceled" || normalized === "rejected") {
    return "cancelled";
  }

  return "pending";
}

/** Keeps only well-formed booking objects returned by the API. */
export function normalizeBookings(data: unknown): Booking[] {
  if (!Array.isArray(data)) return [];

  return data.filter(
    (item): item is Booking =>
      typeof item === "object" &&
      item !== null &&
      typeof (item as Partial<Booking>)._id === "string" &&
      typeof (item as Partial<Booking>).name === "string",
  );
}
