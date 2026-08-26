import { cn } from "@/lib/cn";
import type { Art3DName } from "@/data/art-names";

const SIZES = {
  xs: 24,
  sm: 32,
  md: 44,
  lg: 64,
  xl: 88,
  "2xl": 120,
  hero: 168,
} as const;

export type Art3DSize = keyof typeof SIZES;

type Art3DProps = {
  name: Art3DName;
  size?: Art3DSize;
  /**
   * Supply only when the illustration carries meaning the surrounding text does
   * not already state. Cards name their own subject, so the default is
   * decorative — announcing "rocket" next to a heading that says "Keep learning"
   * adds nothing for a screen reader.
   */
  alt?: string;
  className?: string;
};

/**
 * A slot for the 3D illustration set in public/art/3d/.
 *
 * Components address artwork by role (`"trophy"`, `"guardian"`) rather than by
 * file path, so replacing the fetched set with a commissioned pack is a change
 * to scripts/emoji-manifest.mjs and nothing else.
 */
export function Art3D({ name, size = "md", alt, className }: Art3DProps) {
  const px = SIZES[size];
  return (
    <img
      src={`/art/3d/${name}.png`}
      width={px}
      height={px}
      alt={alt ?? ""}
      aria-hidden={alt ? undefined : true}
      loading="lazy"
      decoding="async"
      className={cn("shrink-0 select-none object-contain", className)}
      style={{ width: px, height: px }}
      draggable={false}
    />
  );
}
