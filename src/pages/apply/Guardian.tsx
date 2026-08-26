import { useState } from "react";
import { Info, ShieldCheck } from "lucide-react";
import { Art3D } from "@/components/art/Art3D";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { cn } from "@/lib/cn";

/**
 * Parent/guardian onboarding (blueprint section 4.4).
 *
 * The brief asks for three things: collect the details, show completion, and
 * explain why it is required. The third is the one forms usually skip, so the
 * reason sits at the top of the page rather than in a footnote — a guardian's
 * phone number is a big ask if nobody says what it is for.
 *
 * ASSUMPTION — the required fields are not specified in the blueprint. This
 * collects the minimum that a consent-and-contact record needs; confirm against
 * the admissions process before wiring it to an API.
 */
const FIELDS = [
  { id: "name", label: "Full name", type: "text", autoComplete: "name", required: true },
  {
    id: "relationship",
    label: "Relationship to you",
    type: "select",
    options: ["Parent", "Guardian", "Sibling (over 21)", "Other"],
    required: true,
  },
  { id: "phone", label: "Phone number", type: "tel", autoComplete: "tel", required: true },
  { id: "email", label: "Email address", type: "email", autoComplete: "email", required: false },
  { id: "occupation", label: "Occupation", type: "text", required: false },
] as const;

export default function Guardian() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  const missing = FIELDS.filter((f) => f.required && !values[f.id]?.trim());
  const complete = missing.length === 0;

  return (
    <div className="space-y-8">
      <header>
        <Pill tone="brand">Step 3 of 6</Pill>
        <h1 className="mt-3 text-title text-ink">Parent or guardian details</h1>
      </header>

      {/* The "why", stated before the first field rather than after it. */}
      <section
        data-ramp="sky"
        className="ramp-block relative overflow-hidden rounded-block p-6"
        aria-labelledby="why-heading"
      >
        <Art3D
          name="guardian"
          size="xl"
          className="pointer-events-none absolute -top-2 -right-2 rotate-6 drop-shadow-lg"
        />
        <div className="relative max-w-lg pr-16">
          <h2 id="why-heading" className="text-lg font-extrabold tracking-tight text-white">
            Why we ask for this
          </h2>
          <ul className="mt-3 space-y-2 text-sm on-block-muted">
            <li>
              Applicants under 21 need a parent or guardian on record before admission is confirmed.
            </li>
            <li>
              We contact them only twice: once to confirm your place, and once if you stop
              engaging for more than three weeks.
            </li>
            <li>Their details are never shared with employers or other learners.</li>
          </ul>
        </div>
      </section>

      <Card as="section" className="rounded-block">
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            setSaved(true);
          }}
        >
          {FIELDS.map((field) => {
            const id = `guardian-${field.id}`;
            return (
              <div key={field.id}>
                <label htmlFor={id} className="block text-sm font-semibold text-ink">
                  {field.label}
                  {field.required ? null : (
                    <span className="ml-1.5 text-xs font-medium text-muted">Optional</span>
                  )}
                </label>

                {field.type === "select" ? (
                  <select
                    id={id}
                    required={field.required}
                    value={values[field.id] ?? ""}
                    onChange={(e) => setValues((v) => ({ ...v, [field.id]: e.target.value }))}
                    className={cn(
                      "mt-1.5 h-12 w-full rounded-card border border-line bg-surface px-3.5 text-sm text-ink",
                      "focus-visible:border-brand-400",
                    )}
                  >
                    <option value="">Select…</option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={id}
                    type={field.type}
                    required={field.required}
                    autoComplete={"autoComplete" in field ? field.autoComplete : undefined}
                    value={values[field.id] ?? ""}
                    onChange={(e) => setValues((v) => ({ ...v, [field.id]: e.target.value }))}
                    className={cn(
                      "mt-1.5 h-12 w-full rounded-card border border-line bg-surface px-3.5 text-sm text-ink",
                      "placeholder:text-muted focus-visible:border-brand-400",
                    )}
                  />
                )}
              </div>
            );
          })}

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button type="submit" size="lg" disabled={!complete}>
              Save guardian details
            </Button>
            {saved && complete ? (
              <Pill tone="success" icon={<ShieldCheck />}>
                Saved
              </Pill>
            ) : !complete ? (
              <p className="text-sm text-muted">
                {missing.length} required {missing.length === 1 ? "field" : "fields"} left.
              </p>
            ) : null}
          </div>
        </form>
      </Card>

      <p className="flex items-start gap-2.5 rounded-card bg-info-soft p-4 text-sm text-ink-soft">
        <Info className="mt-0.5 size-4 shrink-0 text-info" aria-hidden="true" />
        You can update these details any time before verification finishes.
      </p>
    </div>
  );
}
