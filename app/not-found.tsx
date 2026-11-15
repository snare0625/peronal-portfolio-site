import { IconArrowLeft } from "@tabler/icons-react";
import { TransitionLink } from "@/components/site/transition-link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-[70dvh] place-items-center bg-mist px-5 py-24 text-center">
      <div className="intro grid justify-items-center gap-6">
        <h1 className="font-title text-section font-medium leading-none tracking-[-.025em] text-ink">/404</h1>
        <p className="text-ui text-muted-foreground">This page doesn’t exist.</p>
        <Button asChild variant="outline">
          <TransitionLink href="/"><IconArrowLeft stroke={1.8} />Back home</TransitionLink>
        </Button>
      </div>
    </main>
  );
}
