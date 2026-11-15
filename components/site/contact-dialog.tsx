"use client";

import { useActionState, useState } from "react";
import { IconArrowUpRight } from "@tabler/icons-react";
import { toast } from "sonner";
import { sendMessage, type ContactState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

/** Footer "Contact Me" → form → Supabase contact_messages (+ optional Resend email). */
export function ContactDialog({ email }: { email: string }) {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(async (prev: ContactState, data: FormData) => {
    const res = await sendMessage(prev, data);
    if (res?.ok) {
      toast.success(res.message);
      setOpen(false);
    }
    return res;
  }, null);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ring" size="lg">Contact Me<IconArrowUpRight stroke={1.8} /></Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-title text-[28px] font-medium tracking-[-.025em]">/CONTACT</DialogTitle>
          <DialogDescription>
            Send a message, or email <a href={"mailto:" + email} className="font-semibold text-ink underline underline-offset-2">{email}</a>.
          </DialogDescription>
        </DialogHeader>
        <form action={action} className="grid gap-4">
          <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
          <div className="grid gap-2">
            <Label htmlFor="c-name">Name</Label>
            <Input id="c-name" name="name" required maxLength={120} autoComplete="name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="c-email">Email</Label>
            <Input id="c-email" name="email" type="email" required maxLength={200} autoComplete="email" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="c-message">Message</Label>
            <Textarea id="c-message" name="message" required minLength={10} maxLength={4000} />
          </div>
          {state && !state.ok && <p role="alert" className="text-sm font-medium text-destructive">{state.message}</p>}
          <Button type="submit" disabled={pending} className="justify-self-start">
            {pending ? "Sending…" : "Send Message"}
            <IconArrowUpRight stroke={1.8} />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
