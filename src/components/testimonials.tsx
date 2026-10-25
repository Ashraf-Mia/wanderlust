"use client"

import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const testimonials = [
  {
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
    image: "/images/person2.png",
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/person1.png",
  },
] as const

export function Testimonials() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Carousel
          aria-label="Traveler testimonials"
          opts={{ align: "start", loop: false }}
        >
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2 className="text-4xl font-light text-zinc-900 md:text-5xl">
                What Travelers Say
              </h2>
              <p className="mt-3 text-zinc-500 md:text-lg">
                Real experiences from our happy travelers
              </p>
            </div>
            <div className="mt-2 flex shrink-0 items-center gap-3">
              <CarouselPrevious className="static size-11 border-zinc-200 bg-transparent text-zinc-500 hover:border-[#00A5CC] hover:bg-transparent hover:text-[#00A5CC] md:size-12" />
              <CarouselNext className="static size-11 border-zinc-200 bg-transparent text-zinc-500 hover:border-[#00A5CC] hover:bg-transparent hover:text-[#00A5CC] md:size-12" />
            </div>
          </div>

          <CarouselContent className="mt-10">
            {testimonials.map((item) => (
              <CarouselItem key={item.name} className="md:basis-1/2">
                <figure className="flex h-full gap-5 border border-zinc-200/80 bg-white p-5 md:p-6">
                  <div className="flex min-w-0 flex-1 flex-col">
                    <blockquote className="flex-1 text-[15px] leading-6 text-zinc-900 md:leading-7">
                      {item.quote}
                    </blockquote>
                    <figcaption className="mt-6">
                      <div className="text-sm text-[#00A5CC]">
                        — {item.name}
                      </div>
                      <div className="ml-4 mt-0.5 text-sm text-zinc-400">
                        {item.location}
                      </div>
                    </figcaption>
                  </div>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={176}
                    height={200}
                    className="h-auto w-32 shrink-0 object-cover sm:w-40 md:w-44"
                  />
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}
