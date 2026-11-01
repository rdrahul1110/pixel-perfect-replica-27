import { useState } from "react";
import { toast } from "sonner";
import { AlertTriangle, Phone, MessageCircle, CalendarClock, CheckCircle2, FileText } from "lucide-react";
import { Btn, Card, Chip, Modal, Progress, WhatsAppPreview } from "./ui";
import { TEAM, inr, type Project } from "@/lib/hynt-data";
import { cn } from "@/lib/utils";

const MILESTONES = [
  { name: "Booking Advance", amt: 165000, paid: true },
  { name: "Civil Completion", amt: 330000, paid: true },
  { name: "Carpentry 50%", amt: 330000, paid: false },
];

export function Workspace({ project }: { project: Project }) {
  const [tab, setTab] = useState("Overview");
  const [bill, setBill] = useState<null | "invoice" | "share">(null);
  const [billed, setBilled] = useState(false);
  const tone = project.health === "R" ? "danger" : project.health === "A" ? "warning" : "success";
  const label = project.health === "R" ? "AT RISK" : project.health === "A" ? "WATCH" : "ON TRACK";
  return (
    <div className="space-y-4 p-4 animate-screen">
      <div>
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-xl font-extrabold">{project.name}</h1>
          <Chip tone={tone}>({project.health}) {label}</Chip>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">Handover: 20 Dec (46 days left) · {project.pct}% Completed · {project.health === "R" ? "2 Days Late" : project.status}</p>
      </div>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
        {["Overview", "Drawings & Revisions", "Feed", "Tasks", "Money"].map((t) => (
          <button key={t} onClick={() => { setTab(t); if (t !== "Overview") toast(`${t} – coming in the full build`); }} className={cn("shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold", tab === t ? "bg-ink text-ink-foreground" : "border border-border bg-card text-muted-foreground")}>{t}</button>
        ))}
      </div>

      <Card className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Phase Progress</p>
        {[["Civil", 100, "100% Done"], ["Electrical", 100, "100% Done"], ["Carpentry", 55, "55% Done"], ["Finishing", 0, "Starts 28 Nov"]].map(([n, v, l]) => (
          <div key={n as string} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold">{n}</span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">{l}{n === "Carpentry" && <Chip tone="warning" className="py-0.5">2 Days Late</Chip>}</span>
            </div>
            <Progress value={v as number} tone={n === "Carpentry" ? "warning" : "success"} />
          </div>
        ))}
      </Card>

      <div className="space-y-3 rounded-2xl border-2 border-danger/30 bg-danger/5 p-4">
        <p className="flex items-center gap-2 text-xs font-extrabold tracking-wider text-danger"><AlertTriangle className="size-4" />CRITICAL BLOCKER (Carpentry)</p>
        <p className="text-sm leading-relaxed">Kitchen 18mm commercial ply due on 2 Nov was not delivered. <b>4 carpenters idle since Monday.</b></p>
        <div className="grid grid-cols-2 gap-2">
          <Btn variant="danger" className="text-xs" onClick={() => toast("Calling Raju Plywoods…")}><Phone className="size-4" />Call Raju Plywoods</Btn>
          <Btn variant="outline" className="text-xs" onClick={() => toast.success("Carpentry re-planned: +2 days, finishing unchanged")}><CalendarClock className="size-4" />Re-plan Schedule</Btn>
        </div>
      </div>

      <Card className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Money Milestones</p>
        {MILESTONES.map((m, i) => {
          const paid = m.paid;
          return (
            <div key={m.name} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className={cn("flex size-7 items-center justify-center rounded-full text-xs font-bold", paid ? "bg-success/15 text-success" : "bg-muted")}>{paid ? <CheckCircle2 className="size-4" /> : i + 1}</span>
                <div><p className="text-sm font-bold">{m.name}</p><p className="text-xs text-muted-foreground">{inr(m.amt)}</p></div>
              </div>
              {paid ? <Chip tone="success">Paid</Chip> : billed ? <Chip tone="info">Billed · Awaiting</Chip> : <Chip tone="success" className="animate-glow bg-success text-success-foreground">READY TO BILL</Chip>}
            </div>
          );
        })}
        {!billed && <Btn className="w-full" onClick={() => setBill("invoice")}><FileText className="size-4" />Raise Milestone 3 Bill</Btn>}
      </Card>

      <div className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Site Team</p>
        <div className="grid grid-cols-2 gap-2">
          {TEAM.map((t) => (
            <Card key={t.name} className="p-3">
              <p className="text-sm font-extrabold">{t.name}</p>
              <p className="text-[11px] leading-tight text-muted-foreground">{t.role}</p>
              <div className="mt-2 flex gap-2">
                <button aria-label={`Call ${t.name}`} onClick={() => toast(`Calling ${t.name} · ${t.phone}`)} className="flex size-9 items-center justify-center rounded-full bg-muted"><Phone className="size-4" /></button>
                <button aria-label={`WhatsApp ${t.name}`} onClick={() => toast.success(`Opening WhatsApp chat with ${t.name}`)} className="flex size-9 items-center justify-center rounded-full bg-whatsapp/20 text-success"><MessageCircle className="size-4" /></button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Modal open={bill === "invoice"} onClose={() => setBill(null)} title="Invoice #HS-2026-031">
        <div className="space-y-2 rounded-xl border border-border p-4 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Client</span><b>Mr. Rohit Sharma</b></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Milestone</span><b>3 · Carpentry 50%</b></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Amount</span><b>{inr(330000)}</b></div>
          <div className="flex justify-between"><span className="text-muted-foreground">GST 18%</span><b>{inr(59400)}</b></div>
          <div className="flex justify-between border-t border-border pt-2 text-base"><span className="font-bold">Total</span><b>{inr(389400)}</b></div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Btn variant="outline" onClick={() => toast.success("Invoice PDF generated")}>Download PDF</Btn>
          <Btn onClick={() => setBill("share")}>Share link</Btn>
        </div>
      </Modal>
      <Modal open={bill === "share"} onClose={() => setBill(null)} title="Send Invoice on WhatsApp">
        <WhatsAppPreview to="Mr. Rohit Sharma" onSent={() => { setBill(null); setBilled(true); }}
          message={`Hi Mr. Sharma, carpentry is 50% complete 🎉 Milestone 3 invoice of ${inr(389400)} (incl. GST) is ready. View & pay: hynt.studio/inv/sharma-031`} />
      </Modal>
    </div>
  );
}
