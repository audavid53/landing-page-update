import { Sparkles, Star } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";

const TESTIMONIALS = [
  {
    name: "Chidinma Okeke",
    role: "Now Associate Product Manager",
    org: "Paystack (ex-UNILAG)",
    quote:
      "Before iPlace, I was applying to 30 generic roles a week with zero callbacks. In Week 3, I shipped a one-page fintech checkout tear-down. That single project got me referred straight to an interview.",
    tag: "Finance & Tech",
  },
  {
    name: "Tunde Adebayo",
    role: "Junior Software Engineer",
    org: "HealthTech Startup (ex-UI)",
    quote:
      "I studied microbiology and had imposter syndrome about tech. The mentor breakdown with Emeka and the Five Conversations challenge pushed me to message engineers directly. Best 4 weeks of my year.",
    tag: "Career Switcher",
  },
  {
    name: "Amara Nwosu",
    role: "Agri-Supply Chain Analyst",
    org: "AgriTech Group (ex-FUTO)",
    quote:
      "The readiness baseline showed that my social networking score was only 32%. iPlace gave me exact message scripts that felt natural. I connected with 4 senior leads and landed an internship.",
    tag: "Agribusiness",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-surface-sunk/60 py-16 sm:py-24 border-y border-line">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
            <Sparkles className="size-3.5" />
            Verified Cohort Stories
          </div>
          <h2 className="mt-3 text-title text-ink font-extrabold tracking-tight">
            Proof, not promises.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted">
            Hear from young Nigerians who went through the 4-week cohort and graduated with career direction and employer proof.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, idx) => (
            <Card
              key={idx}
              className="p-6 bg-surface border border-line rounded-3xl shadow-card flex flex-col justify-between"
              padded
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="size-4 fill-current" />
                    ))}
                  </div>
                  <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[0.6875rem] font-bold text-brand-700">
                    {t.tag}
                  </span>
                </div>

                <p className="mt-4 text-xs sm:text-sm text-ink-soft leading-relaxed">
                  “{t.quote}”
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-line flex items-center gap-3">
                <Avatar name={t.name} size="md" ring />
                <div>
                  <h3 className="text-sm font-extrabold text-ink">{t.name}</h3>
                  <p className="text-xs text-muted font-medium">
                    {t.role} · <span className="text-ink-soft font-semibold">{t.org}</span>
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
