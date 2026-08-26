import { CompassArt } from "@/components/art/Illustration";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-16 text-center">
      <CompassArt size={120} />
      <h1 className="text-title text-ink">This page went off the map</h1>
      <p className="text-muted">
        The link may be old, or the page may have moved. Your progress is safe — head back and pick
        up where you left off.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <ButtonLink to="/dashboard">Back to dashboard</ButtonLink>
        <ButtonLink to="/learning" variant="secondary">
          Open Learning Centre
        </ButtonLink>
      </div>
    </div>
  );
}
