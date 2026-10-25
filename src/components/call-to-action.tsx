import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CallToAction() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="/images/CTA.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/55" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
        <h2 className="text-4xl font-light text-white md:text-5xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 text-white/90 md:text-lg">
          Join thousands of travelers who have discovered the world with us
        </p>
        <div className="mt-8 flex justify-center md:mt-10">
          <Button className="h-11 gap-3 rounded bg-white px-7 text-sm font-semibold uppercase tracking-wide text-zinc-900 hover:bg-zinc-100">
            Book Your Trip Today
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
