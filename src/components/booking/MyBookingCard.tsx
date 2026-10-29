"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Eye,
  MapPin,
  Trash2,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
// import { useRouter } from "next/navigation";

export type Booking = {
  _id: string;
  userName?: string;
  email?: string;
  name: string;
  country?: string;
  category?: string;
  price: string | number;
  duration?: string;
  departure?: string;
  imageUrl?: string;
  description?: string;
  departureDate?: string;
  bookingDate?: string;
  status?: string;
};

const statusConfig = {
  confirmed: {
    label: "Confirmed",
    icon: CheckCircle2,
    className: "bg-green-50 text-green-600",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    className: "bg-orange-50 text-orange-500",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    className: "bg-red-50 text-red-500",
  },
} as const;

type StatusKey = keyof typeof statusConfig;

const formatDate = (date?: string) => {
  if (!date) return "N/A";
  const d = new Date(date);
  if (isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const MyBookingCard = ({ booking }: { booking: Booking }) => {
  const rawStatus = booking.status?.toLowerCase() as StatusKey | undefined;
  const statusKey: StatusKey =
    rawStatus && rawStatus in statusConfig ? rawStatus : "pending";
  const status = statusConfig[statusKey];
  const StatusIcon = status.icon;

  const router = useRouter();

  const handleCancel = async () => {
    const token = await getTokenFromClient();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${booking._id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
    const deleteData = await res.json();
    console.log(deleteData);
    router.refresh();

    toast.success("Cancel button clicked", {
      description: `${booking.name} - Booking ID: ${booking._id}`,
    });
  };

  return (
    <Card className="flex flex-col gap-4 rounded-md border p-3 shadow-sm sm:flex-row">
      {/* Image */}
      <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-sm sm:h-36 sm:w-72">
        <Image
          src={booking.imageUrl || "/placeholder.jpg"}
          alt={booking.name}
          fill
          sizes="(max-width: 640px) 100vw, 208px"
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between gap-3">
        <div className="space-y-1.5">
          <Badge
            variant="secondary"
            className={cn(
              "gap-1.5 rounded-full px-3 py-1 font-normal",
              status.className,
            )}
          >
            <StatusIcon className="size-3.5" />
            {status.label}
          </Badge>

          <h2 className="text-2xl font-semibold tracking-tight">
            {booking.name}
          </h2>

          <div className="space-y-1 text-xs text-muted-foreground">
            <p className="flex items-center gap-2">
              <CalendarDays className="size-3.5" />
              Departure: {formatDate(booking.departureDate)}
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="size-3.5" />
              Booking ID: {booking._id}
            </p>
          </div>
        </div>

        <div className="flex items-end justify-between gap-3">
          <p className="text-2xl font-semibold text-sky-600">
            ${Number(booking.price).toLocaleString()}
          </p>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={statusKey === "cancelled"}
              onClick={handleCancel}
              className="border-red-400 text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="size-4" />
              Cancel
            </Button>

            <Link
              href={`/destination/${booking._id}`}
              className={cn(
                buttonVariants({ size: "sm" }),
                "bg-sky-600 text-white hover:bg-sky-700",
              )}
            >
              <Eye className="size-4" />
              View
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MyBookingCard;
