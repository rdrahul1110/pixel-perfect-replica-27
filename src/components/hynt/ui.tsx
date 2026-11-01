import type { ReactNode } from "react";
import { X, MessageCircle, Copy } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Tone = "success" | "warning" | "danger" | "info" | "muted";
const toneCls: Record<Tone, string> = {
  success: "bg-success/12 text-success border-success/30",
  warning: "bg-warning/12 text-warning border-warning/30",
  danger: "bg-danger/12 text-danger border-danger/30",
  info: "bg-info/12 text-info border-info/30",
  muted: "bg-muted text-muted-foreground border-border",
};
export function Chip({ tone = "muted", children, className }: { tone?: Tone; children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-bold", toneCls[tone], className)}>
      {children}
    </span>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-2xl border border-border bg-card p-4 shadow-sm", className)}>{children}</div>;
}

export function Btn({
  children, onClick, variant = "primary", className,
}: { children: ReactNode; onClick?: () => void; variant?: "primary" | "ink" | "outline" | "ghost" | "danger"; className?: string }) {
  const v = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    ink: "bg-ink text-ink-foreground hover:bg-ink/90",
    outline: "border border-border bg-card text-foreground hover:bg-muted",
    ghost: "text-muted-foreground hover:bg-muted",
    danger: "border border-danger/30 bg-danger/5 text-danger hover:bg-danger/10",
  }[variant];
  return (
    <button onClick={onClick} className={cn("inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold transition active:scale-[0.98]", v, className)}>
      {children}
    </button>
  );
}

export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-50 flex items-end bg-ink/50 animate-screen" onClick={onClose}>
      <div className="max-h-[88%] w-full overflow-y-auto rounded-t-3xl bg-card p-5" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-extrabold">{title}</h3>
          <button onClick={onClose} aria-label="Close" className="rounded-full bg-muted p-2"><X className="size-4" /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function WhatsAppPreview({ to, message, onSent, extra }: { to: string; message: string; onSent: () => void; extra?: ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-3 rounded-t-2xl bg-ink px-4 py-3 text-ink-foreground">
        <div className="flex size-9 items-center justify-center rounded-full bg-whatsapp font-bold">{to[0]}</div>
        <div><p className="text-sm font-bold">{to}</p><p className="text-[11px] opacity-70">WhatsApp · prefilled</p></div>
      </div>
      <div className="rounded-b-2xl bg-chat p-4">
        {extra}
        <div className="ml-auto max-w-[90%] whitespace-pre-line rounded-xl rounded-tr-none bg-card p-3 text-sm leading-relaxed shadow-sm">{message}</div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Btn variant="outline" onClick={() => { navigator.clipboard?.writeText(message); toast.success("WhatsApp link copied"); }}><Copy className="size-4" />Copy</Btn>
        <Btn onClick={() => { toast.success(`Sent to ${to} on WhatsApp`); onSent(); }}><MessageCircle className="size-4" />Send</Btn>
      </div>
    </div>
  );
}

export function Progress({ value, tone = "success" }: { value: number; tone?: "success" | "warning" }) {
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
      <div className={cn("h-full rounded-full transition-all", tone === "success" ? "bg-success" : "bg-warning")} style={{ width: `${value}%` }} />
    </div>
  );
}
