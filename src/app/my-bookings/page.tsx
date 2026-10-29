import MyBookingCard, { Booking } from "@/components/booking/MyBookingCard";
import { auth } from "@/lib/auth";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

import { headers } from "next/headers";

const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  let bookings: Booking[] = [];
  const token = await getTokenFromServer();
  if (user?.email) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${user.email}`,
        {
          cache: "no-store",
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.ok) {
        const data = await res.json();
        bookings = Array.isArray(data) ? data : [];
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-serif">My Bookings</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage and view your upcoming travel plans
        </p>
      </div>

      {!user ? (
        <p className="text-center text-muted-foreground">
          Please log in to see your bookings.
        </p>
      ) : bookings.length === 0 ? (
        <p className="text-center text-muted-foreground">
          You have no bookings yet.
        </p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <MyBookingCard key={booking._id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingPage;
