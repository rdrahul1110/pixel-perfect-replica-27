import { useState } from "react";
import { toast } from "sonner";
import { Bell, Pencil, Undo2, MessageCircle, Clock, Eye, CheckCircle2, Mic, MessageSquareText, ChevronRight } from "lucide-react";
import walnut from "@/assets/walnut.jpg";
import ashgrey from "@/assets/ashgrey.jpg";
import { Btn, Card, Chip, Modal, WhatsAppPreview } from "./ui";
import { APPROVAL_MSG } from "@/lib/hynt-data";
import { cn } from "@/lib/utils";

export function ApprovalsHub({ view, setView }: { view: "designer" | "client"; setView: (v: "designer" | "client") => void }) {
  return (
    <div>
      <div className="mx-4 mt-3 grid grid-cols-2 rounded-xl bg-muted p-1 text-xs font-bold">
        {(["designer", "client"] as const).map((v) => (
          <button key={v} onClick={() => setView(v)} className={cn("rounded-lg py-2", view === v ? "bg-card shadow-sm" : "text-muted-foreground")}>
            {v === "designer" ? "Designer View" : "Client Web View (Zero-Login)"}
          </button>
        ))}
      </div>
      {view === "designer" ? <DesignerView /> : <ClientView />}
    </div>
  );
}

function DesignerView() {
  const [tab, setTab] = useState("Pending (2)");
  const [share, setShare] = useState(false);
  const [withdrawn, setWithdrawn] = useState(false);
  return (
    <div className="space-y-4 p-4 animate-screen">
      <div className="flex gap-2">
        {["Pending (2)", "Approved (14)", "All"].map((t) => (
          <button key={t} onClick={() => setTab(t)} className={cn("rounded-full px-3 py-1.5 text-xs font-bold", tab === t ? "bg-ink text-ink-foreground" : "bg-card border border-border text-muted-foreground")}>{t}</button>
        ))}
      </div>
      {tab === "Approved (14)" ? (
        <Card className="text-sm text-muted-foreground">14 decisions approved this month. Latest: <b className="text-foreground">#30 Kitchen countertop – Kashmir White</b> (approved 1 Nov).</Card>
      ) : (
        <>
          <Card className={cn("space-y-3 border-2 border-primary/30", withdrawn && "opacity-50")}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-primary">Decision #31</p>
                <h2 className="text-lg font-extrabold leading-tight">Master Bedroom Laminate</h2>
              </div>
              <Chip tone={withdrawn ? "muted" : "warning"}>{withdrawn ? "Withdrawn" : "Pending"}</Chip>
            </div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p className="flex items-center gap-1.5"><Clock className="size-3.5" />Waiting on: <b className="text-foreground">Mr. Rohit Sharma</b> · Sent 2 days ago</p>
              <p className="flex items-center gap-1.5"><Eye className="size-3.5 text-info" />Opened 3 Nov, 9:10 PM</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Option img={walnut} label="Option A" name="Greenlam Walnut" sub="Original in BoQ" />
              <Option img={ashgrey} label="Option B" name="Merino Ash Grey" sub="Client requested · 3D render" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Chip tone="warning">Cost: + ₹18,400 (A → B)</Chip>
              <Chip tone="success">No delay if approved by Thu, 5 Nov</Chip>
            </div>
            <Btn className="w-full" onClick={() => setShare(true)}><MessageCircle className="size-4" />Share on WhatsApp</Btn>
            <div className="grid grid-cols-3 gap-2">
              <Btn variant="outline" className="px-2 text-xs" onClick={() => toast.success("Nudge sent to Mr. Sharma")}><Bell className="size-3.5" />Nudge</Btn>
              <Btn variant="outline" className="px-2 text-xs" onClick={() => toast("Edit mode opened")}><Pencil className="size-3.5" />Edit</Btn>
              <Btn variant="danger" className="px-2 text-xs" onClick={() => { setWithdrawn(!withdrawn); toast(withdrawn ? "Decision restored" : "Decision withdrawn"); }}><Undo2 className="size-3.5" />{withdrawn ? "Restore" : "Withdraw"}</Btn>
            </div>
          </Card>
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Up next</p>
          <Card className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-info">Decision #32 · Iyer 2BHK</p>
              <p className="text-sm font-bold">False ceiling cove lighting</p>
              <p className="text-xs text-muted-foreground">Draft · warm 3000K vs neutral 4000K</p>
            </div>
            <ChevronRight className="size-5 text-muted-foreground" />
          </Card>
        </>
      )}
      <Modal open={share} onClose={() => setShare(false)} title="Share on WhatsApp">
        <WhatsAppPreview to="Mr. Rohit Sharma" message={APPROVAL_MSG} onSent={() => setShare(false)} />
      </Modal>
    </div>
  );
}

function Option({ img, label, name, sub }: { img: string; label: string; name: string; sub: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <img src={img} alt={name} loading="lazy" width={816} height={816} className="aspect-square w-full object-cover" />
      <div className="p-2">
        <p className="text-[10px] font-bold uppercase text-muted-foreground">{label}</p>
        <p className="text-xs font-bold leading-tight">{name}</p>
        <p className="text-[10px] text-muted-foreground">{sub}</p>
      </div>
    </div>
  );
}

export function ClientView() {
  const [choice, setChoice] = useState<"A" | "B">("B");
  const [done, setDone] = useState(false);
  if (done)
    return (
      <div className="flex flex-col items-center p-8 text-center animate-screen">
        <div className="mb-4 flex size-20 items-center justify-center rounded-full bg-success/15"><CheckCircle2 className="size-12 text-success" /></div>
        <h2 className="text-2xl font-extrabold">Decision Recorded!</h2>
        <p className="mt-3 text-sm text-muted-foreground">Time-stamped on <b className="text-foreground">4 Nov, 6:42 PM</b>. Meera Kulkarni and the site team have been notified, and your project BoQ has been updated.</p>
        <Card className="mt-5 w-full text-left text-sm">
          <p className="text-xs text-muted-foreground">You chose</p>
          <p className="font-bold">{choice === "B" ? "Option B · Merino Ash Grey (+ ₹18,400)" : "Option A · Greenlam Walnut Rhythm"}</p>
        </Card>
        <Btn variant="ghost" className="mt-4" onClick={() => setDone(false)}>Reset demo</Btn>
      </div>
    );
  return (
    <div className="space-y-4 p-4 animate-screen">
      <div className="rounded-xl bg-ink p-3 text-ink-foreground">
        <p className="text-xs font-extrabold tracking-widest text-whatsapp">HYNT</p>
        <p className="text-xs opacity-80">Decision needed from Meera Kulkarni (Studio Kulkarni)</p>
      </div>
      <h2 className="text-2xl font-extrabold leading-tight">Master Bedroom Laminate Choice</h2>
      {([["A", walnut, "Greenlam Walnut Rhythm", "Standard BoQ"], ["B", ashgrey, "Merino Ash Grey", "+ ₹18,400"]] as const).map(([k, img, n, s]) => (
        <button key={k} onClick={() => setChoice(k)} className={cn("flex w-full items-center gap-3 rounded-2xl border-2 bg-card p-3 text-left transition", choice === k ? "border-primary shadow-glow" : "border-border")}>
          <img src={img} alt={n} loading="lazy" width={816} height={816} className="size-20 rounded-xl object-cover" />
          <div className="flex-1">
            <p className="text-[11px] font-bold uppercase text-muted-foreground">Option {k}</p>
            <p className="font-bold">{n}</p>
            <p className={cn("text-xs font-bold", k === "B" ? "text-warning" : "text-muted-foreground")}>{s}</p>
          </div>
          <span className={cn("flex size-6 items-center justify-center rounded-full border-2", choice === k ? "border-primary" : "border-border")}>
            {choice === k && <span className="size-3 rounded-full bg-primary" />}
          </span>
        </button>
      ))}
      <Card className="bg-muted/60 text-sm leading-relaxed">
        {choice === "B"
          ? <>Choosing Option B adds <b>₹18,400</b> to your overall budget. There is <b>no change</b> to your handover date (20 Dec) if approved today.</>
          : <>Option A keeps your budget unchanged. Handover stays on <b>20 Dec</b>.</>}
      </Card>
      <Btn className="min-h-14 w-full text-base" onClick={() => setDone(true)}>
        {choice === "B" ? "Approve Option B (+ ₹18,400)" : "Approve Option A (no change)"}
      </Btn>
      <div className="grid grid-cols-2 gap-2">
        <Btn variant="outline" className="text-xs" onClick={() => toast("Question sent to Meera")}><MessageSquareText className="size-4" />Ask a Question</Btn>
        <Btn variant="outline" className="text-xs" onClick={() => toast("Voice note recorder opened")}><Mic className="size-4" />Voice Note</Btn>
      </div>
    </div>
  );
}
