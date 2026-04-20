import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Michael Torres",
    role: "CEO, TorresMedia",
    content:
      "NeosTechs transformed our outdated website into a modern, high-performing platform. Our leads increased by 3x within the first month of launch.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Founder, EduLearn",
    content:
      "The AI agent they built for our customer support handles 80% of inquiries automatically. Their team was responsive and delivered ahead of schedule.",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "CTO, HealthBridge",
    content:
      "Working with NeosTechs felt like an extension of our own team. They understood our compliance needs and built a dashboard that our doctors actually love using.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in-up">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-accent mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            What our clients{" "}
            <span className="text-gradient">say about us</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it. Here's what our partners have to say.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="glass rounded-2xl p-8 card-hover opacity-0 animate-fade-in-up flex flex-col"
              style={{
                animationDelay: `${index * 0.15}s`,
                animationFillMode: "forwards",
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-muted-foreground leading-relaxed mb-6 flex-1">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-sm">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
