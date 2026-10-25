import Image from "next/image"

const reasons = [
  {
    icon: "/images/ShieldCheck.png",
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/images/MapTrifold.png",
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/images/Headset.png",
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
] as const

export function WhyChooseUs() {
  return (
    <section className="bg-[#E7F6F9] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-light text-zinc-900 md:text-5xl">
            Why Choose Wanderlust
          </h2>
          <p className="mt-3 text-zinc-500 md:text-lg">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:mt-12 md:grid-cols-3">
          {reasons.map((reason) => (
            <div key={reason.title} className="bg-white p-6 md:p-8">
              <Image
                src={reason.icon}
                alt=""
                width={40}
                height={40}
                className="h-9 w-9 md:h-10 md:w-10"
              />
              <h3 className="mt-5 text-xl text-zinc-900 md:text-2xl">
                {reason.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
