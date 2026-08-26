import { useState } from "react";
import { Check, Lock, ShieldCheck } from "lucide-react";
import { Art3D } from "@/components/art/Art3D";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { cn } from "@/lib/cn";

/**
 * Programme payment (blueprint section 4.5 — "access payment when permitted").
 *
 * ASSUMPTION — the blueprint does not say whether payment is taken in-app or
 * handed off to a processor. This is built as a handoff: the plan, the
 * scholarship award and the balance are shown here, and the card details are
 * collected by the processor. That keeps card data out of the product entirely,
 * and the screen survives unchanged whichever processor is chosen.
 *
 * The page is shown in its locked state, since payment opens only after
 * admission.
 */
const PLANS = [
  {
    id: "full",
    name: "Pay in full",
    price: 120_000,
    note: "One payment. Saves ₦15,000 against the instalment plan.",
    best: true,
  },
  {
    id: "instalments",
    name: "Three instalments",
    price: 45_000,
    note: "₦45,000 today, then two monthly payments.",
    best: false,
  },
];

const SCHOLARSHIP = 60_000;
const naira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

export default function Payment() {
  const [plan, setPlan] = useState("full");
  const admitted = false; // Payment opens only once admission is confirmed.

  const selected = PLANS.find((p) => p.id === plan) ?? PLANS[0]!;
  const due = Math.max(selected.price - SCHOLARSHIP, 0);

  return (
    <div className="space-y-8">
      <header>
        <Pill tone="brand">Step 6 of 6</Pill>
        <h1 className="mt-3 text-title text-ink">Programme payment</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Your scholarship award is applied before you pay. Nothing is charged until your admission
          is confirmed.
        </p>
      </header>

      {!admitted ? (
        <section
          className="flex items-start gap-4 rounded-block border border-dashed border-line-strong bg-canvas/60 p-5"
          aria-labelledby="locked-heading"
        >
          <Art3D name="locked" size="lg" className="opacity-70" />
          <div className="min-w-0">
            <h2 id="locked-heading" className="text-base font-extrabold text-ink">
              Payment is not open yet
            </h2>
            <p className="mt-1 text-sm text-muted">
              It unlocks the moment your admission decision is published. Your application is
              currently with the verification team — you do not need to do anything.
            </p>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="plan-heading">
        <h2 id="plan-heading" className="sr-only">
          Choose a payment plan
        </h2>
        <fieldset disabled={!admitted} className={cn(!admitted && "opacity-60")}>
          <legend className="sr-only">Payment plan</legend>
          <ul className="grid gap-3 sm:grid-cols-2">
            {PLANS.map((option) => {
              const active = option.id === plan;
              return (
                <li key={option.id}>
                  <label
                    className={cn(
                      "flex h-full cursor-pointer flex-col rounded-block border-2 p-5 transition-colors",
                      active ? "border-brand-500 bg-brand-50" : "border-line bg-surface",
                      !admitted && "cursor-not-allowed",
                    )}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="text-sm font-extrabold text-ink">{option.name}</span>
                      <input
                        type="radio"
                        name="plan"
                        value={option.id}
                        checked={active}
                        onChange={() => setPlan(option.id)}
                        className="size-4 accent-[var(--color-brand-500)]"
                      />
                    </span>
                    <span className="mt-3 text-2xl font-extrabold tracking-tight text-ink">
                      {naira(option.price)}
                    </span>
                    <span className="mt-1.5 text-sm text-muted">{option.note}</span>
                    {option.best ? (
                      <span className="mt-3">
                        <Pill size="sm" tone="success">
                          Best value
                        </Pill>
                      </span>
                    ) : null}
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>
      </section>

      <Card as="section" className="rounded-block" aria-labelledby="summary-heading">
        <h2 id="summary-heading" className="text-base font-extrabold text-ink">
          Summary
        </h2>
        <dl className="mt-4 space-y-2.5 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted">{selected.name}</dt>
            <dd className="font-semibold tabular-nums text-ink">{naira(selected.price)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="inline-flex items-center gap-1.5 text-success">
              <Check className="size-4" aria-hidden="true" />
              Scholarship award
            </dt>
            <dd className="font-semibold tabular-nums text-success">−{naira(SCHOLARSHIP)}</dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-line pt-3">
            <dt className="font-bold text-ink">Due today</dt>
            <dd className="text-lg font-extrabold tabular-nums text-ink">{naira(due)}</dd>
          </div>
        </dl>

        <Button size="lg" fullWidth className="mt-5" disabled={!admitted}>
          {admitted ? (
            <>Continue to payment</>
          ) : (
            <>
              <Lock aria-hidden="true" className="size-4" />
              Opens after admission
            </>
          )}
        </Button>

        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-muted">
          <ShieldCheck className="size-3.5 text-success" aria-hidden="true" />
          Card details are handled by our payment provider, never by iPlace.
        </p>
      </Card>
    </div>
  );
}
