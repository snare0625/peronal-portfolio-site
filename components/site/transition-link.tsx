"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

/**
 * Page transition (as in the reference): the current page fades + lifts out (360ms), then the
 * next page plays its load-in (.intro elements). Same-page links, modifier clicks, new tabs
 * and reduced-motion users get a normal navigation.
 */
export function TransitionLink({ href, onClick, ...props }: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const router = useRouter();

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (props.target && props.target !== "_self") return;
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
    const page = document.querySelector<HTMLElement>("[data-page]");
    if (!page || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    e.preventDefault();
    const anim = page.animate(
      [{ opacity: 1, transform: "none" }, { opacity: 0, transform: "translateY(-12px) scale(.99)" }],
      { duration: 360, easing: "cubic-bezier(.4,0,.2,1)", fill: "forwards" }
    );
    anim.onfinish = () => router.push(href);
  };

  return <Link href={href} onClick={handle} {...props} />;
}
