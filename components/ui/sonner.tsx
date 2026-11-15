"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

export function Toaster(props: ToasterProps) {
  return (
    <Sonner
      position="bottom-center"
      toastOptions={{
        style: {
          borderRadius: 999,
          border: "1px solid #ECECEC",
          background: "#FFFFFF",
          color: "#171717",
          fontFamily: "var(--font-manrope)",
          fontWeight: 600,
          boxShadow: "0 22px 40px -10px rgb(0 0 0 / 0.14)",
        },
      }}
      {...props}
    />
  );
}
