"use client";

import { useState, type ReactNode } from "react";
import { PackagePlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Toaster, toast } from "@/components/ui/toast";

import { getTokenFromClient } from "@/lib/getTokenFromClient";

const categories = [
  "Beach",
  "Mountain",
  "City",
  "Adventure",
  "Cultural",
] as const;

type FormState = {
  name: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departure: string;
  imageUrl: string;
  description: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  name: "",
  country: "",
  category: "Beach",
  price: "",
  duration: "",
  departure: "",
  imageUrl: "",
  description: "",
};

const fieldClassName =
  "h-10 border-transparent bg-[#F6F7F8] shadow-none placeholder:text-zinc-400";

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!form.name.trim()) errors.name = "Destination name is required";
  if (!form.country.trim()) errors.country = "Country is required";
  if (!form.duration.trim()) errors.duration = "Duration is required";
  if (!form.departure) errors.departure = "Departure date is required";
  if (!form.price.trim()) {
    errors.price = "Price is required";
  } else if (Number.isNaN(Number(form.price)) || Number(form.price) <= 0) {
    errors.price = "Enter a valid price";
  }

  return errors;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-sm text-red-600">{message}</p>;
}

function Field({
  htmlFor,
  label,
  error,
  children,
}: {
  htmlFor: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      <FieldError message={error} />
    </div>
  );
}

export default function AddDestinationPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});

  const setField = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = await getTokenFromClient();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/add-destination`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      },
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await res.json();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    toast.add({
      type: "success",
      title: "Travel package created",
      description: `"${form.name}" has been added successfully.`,
    });
    setForm(initialForm);
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
  };
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
      <h1 className="text-3xl font-light text-zinc-900 md:text-4xl">
        Add New Travel Package
      </h1>

      <Card className="mx-auto mt-8 max-w-2xl rounded-lg border-zinc-200 bg-white shadow-none">
        <CardContent className="p-6 md:p-8">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5"
          >
            <Field
              htmlFor="destination-name"
              label="Destination Name"
              error={errors.name}
            >
              <Input
                id="destination-name"
                value={form.name}
                onChange={(event) => setField("name", event.target.value)}
                placeholder="Bali Paradise"
                aria-invalid={Boolean(errors.name)}
                aria-required="true"
                className={fieldClassName}
              />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field htmlFor="country" label="Country" error={errors.country}>
                <Input
                  id="country"
                  value={form.country}
                  onChange={(event) => setField("country", event.target.value)}
                  placeholder="Indonesia"
                  aria-invalid={Boolean(errors.country)}
                  aria-required="true"
                  className={fieldClassName}
                />
              </Field>

              <div className="flex flex-col gap-2">
                <Label>Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(value) => {
                    if (value) setField("category", value);
                  }}
                >
                  <SelectTrigger
                    aria-label="Category"
                    className="h-10 w-full border-transparent bg-[#F6F7F8] shadow-none"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field htmlFor="price" label="Price (USD)" error={errors.price}>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={(event) => setField("price", event.target.value)}
                  placeholder="e.g., 1299"
                  aria-invalid={Boolean(errors.price)}
                  aria-required="true"
                  className={fieldClassName}
                />
              </Field>

              <Field
                htmlFor="duration"
                label="Duration"
                error={errors.duration}
              >
                <Input
                  id="duration"
                  value={form.duration}
                  onChange={(event) => setField("duration", event.target.value)}
                  placeholder="e.g., 7 Days/6 Nights"
                  aria-invalid={Boolean(errors.duration)}
                  aria-required="true"
                  className={fieldClassName}
                />
              </Field>
            </div>

            <Field
              htmlFor="departure"
              label="Departure Date"
              error={errors.departure}
            >
              <Input
                id="departure"
                type="date"
                value={form.departure}
                onChange={(event) => setField("departure", event.target.value)}
                aria-invalid={Boolean(errors.departure)}
                aria-required="true"
                className={fieldClassName}
              />
            </Field>

            <Field htmlFor="image-url" label="Image URL">
              <Input
                id="image-url"
                type="url"
                value={form.imageUrl}
                onChange={(event) => setField("imageUrl", event.target.value)}
                placeholder="https://example.com/image.jpg"
                className={fieldClassName}
              />
            </Field>

            <Field htmlFor="description" label="Description">
              <Textarea
                id="description"
                value={form.description}
                onChange={(event) =>
                  setField("description", event.target.value)
                }
                placeholder="Describe the travel experience..."
                className="min-h-28 border-transparent bg-[#F6F7F8] shadow-none placeholder:text-zinc-400"
              />
            </Field>

            <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="h-10 border-red-200 bg-white px-5 text-red-500 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 />
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-10 bg-[#00A5CC] px-5 text-white hover:bg-[#008FB3]"
              >
                <PackagePlus />
                Add Travel Package
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Toaster />
    </div>
  );
}
