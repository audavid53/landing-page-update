import { useState } from "react";
import { Flame } from "lucide-react";
import { BADGE_TIERS } from "@/data/badges";
import { BadgeArt } from "@/components/art/BadgeArt";
import { Card } from "@/components/ui/Card";

export function BadgesGamification() {
  const [activeBadgeIndex, setActiveBadgeIndex] = useState(2);
  const selectedTier = BADGE_TIERS[activeBadgeIndex] ?? BADGE_TIERS[0];

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-xp-soft px-3 py-1 text-xs font-bold text-amber-700 border border-amber-200">
          <Flame className="size-3.5 fill-current text-amber-600" />
          Effort You Can See
        </div>
        <h2 className="mt-3 text-title text-ink font-extrabold tracking-tight">
          13 Badges. Real Career Privileges.
        </h2>
        <p className="mt-3 text-base text-muted leading-relaxed">
          Every action earns XP — completing an assessment, contacting an industry mentor, shipping a portfolio case study. Each badge tier unlocks actual platform perks and employer recommendations.
        </p>
      </div>

      {/* Badge Showcase Grid */}
      <div className="mt-12">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3 sm:gap-4">
          {BADGE_TIERS.map((tier, idx) => {
            const isSelected = idx === activeBadgeIndex;
            return (
              <button
                type="button"
                key={tier.level}
                onClick={() => setActiveBadgeIndex(idx)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-200 ${
                  isSelected
                    ? "bg-surface border-brand-500 shadow-card scale-105 ring-2 ring-brand-500/20"
                    : "bg-surface/60 border-line hover:bg-surface hover:border-line-strong"
                }`}
              >
                <BadgeArt
                  from={tier.from}
                  to={tier.to}
                  glyph={tier.glyph}
                  size={46}
                  locked={idx > 4}
                />
                <span className="mt-2 text-xs font-extrabold text-ink truncate w-full text-center">
                  {tier.name}
                </span>
                <span className="text-[0.625rem] font-bold text-muted">
                  Lvl {tier.level}
                </span>
              </button>
            );
          })}
        </div>

        {/* Highlight Card for the Selected Badge */}
        {selectedTier && (
          <div className="mt-8 max-w-xl mx-auto">
            <Card className="p-5 bg-surface border border-brand-200 shadow-raised rounded-3xl text-center" padded>
              <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-brand-50 mb-2">
                <BadgeArt
                  from={selectedTier.from}
                  to={selectedTier.to}
                  glyph={selectedTier.glyph}
                  size={48}
                />
              </div>
              <h3 className="text-base font-black text-ink">{selectedTier.name} Tier</h3>
              <p className="text-xs font-bold text-brand-600 mt-0.5">
                Requires {selectedTier.xpRequired.toLocaleString("en-NG")} XP (Level {selectedTier.level})
              </p>
              <div className="mt-3 rounded-xl bg-surface-sunk p-3 border border-line text-xs font-bold text-ink-soft">
                Unlocked Privilege: <span className="text-brand-700">{selectedTier.perk}</span>
              </div>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}
