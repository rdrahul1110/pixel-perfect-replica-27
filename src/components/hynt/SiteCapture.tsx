import { useState } from "react";
import { toast } from "sonner";
import { Camera, Mic, WifiOff, Plus, Check, Pencil, Trash2, Send, FileText } from "lucide-react";
import site from "@/assets/site.jpg";
import { Btn, Card, Chip, Modal, WhatsAppPreview } from "./ui";
import { INITIAL_PUNCH, ROOMS, TRADES, type PunchItem } from "@/lib/hynt-data";
import { cn } from "@/lib/utils";

type Photo = { id: number; room: string; trade: string; time: string };

export function SiteCapture({ projectName }: { projectName: string }) {
  const [room, setRoom] = useState("Kitchen");
  const [trade, setTrade] = useState("Carpentry");
  const [photos, setPhotos] = useState<Photo[]>([{ id: 0, room: "Kitchen", trade: "Carpentry", time: "10:48 AM" }]);
  const [listening, setListening] = useState(false);
  const [parsed, setParsed] = useState<null | { title: string; assignee: string; due: string }>(null);
  const [editing, setEditing] = useState(false);
  const [punch, setPunch] = useState<PunchItem[]>(INITIAL_PUNCH);
  const [modal, setModal] = useState<null | "punch" | "summary">(null);

  const snap = () => {
    setPhotos((p) => [{ id: Date.now(), room, trade, time: new Date().toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" }) }, ...p]);
    toast.success(`Photo tagged ${room} > ${trade}`);
  };
  const speak = () => {
    setListening(true); setParsed(null);
    setTimeout(() => { setListening(false); setParsed({ title: "Fix gap below loft shutter", assignee: "Imran (Carpentry Head)", due: "Thursday" }); }, 2200);
  };
  const open = punch.filter((p) => !p.done);
  const punchMsg = `*Punch List – ${projectName}*\n${open.map((p) => `• ${p.title} (${p.who.split(" - ")[0]}, ${p.due})`).join("\n")}\n\nPlease share photos once fixed. – Meera`;
  const summaryMsg = `Hi Mr. Sharma, today's site update:\n• Kitchen carpentry carcass 80% fixed, loft shutters aligned\n• Electrical switch plates corrected in Hall\n• MBR skirting touch-up scheduled for Friday\n\n${photos.length} photos attached. – Studio Kulkarni`;

  return (
    <div className="pb-36 animate-screen">
      <div className="sticky top-0 z-10 border-b border-border bg-background/95 px-4 py-3 backdrop-blur">
        <p className="text-sm font-extrabold">Site Visit: {projectName}</p>
        <div className="mt-1 flex items-center gap-2">
          <Chip tone="danger"><span className="size-1.5 animate-pulse rounded-full bg-danger" />11:02 AM Live</Chip>
          <Chip tone="warning"><WifiOff className="size-3" />Offline: 4 items queued</Chip>
        </div>
      </div>
      <div className="space-y-5 p-4">
        <section className="space-y-2">
          <Pills items={ROOMS} value={room} onChange={setRoom} />
          <Pills items={TRADES} value={trade} onChange={setTrade} />
          <button onClick={snap} className="flex h-36 w-full flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-primary/50 bg-accent text-accent-foreground active:scale-[0.98]">
            <span className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground"><Camera className="size-7" /></span>
            <span className="text-sm font-extrabold">Tap to Take Site Photo</span>
          </button>
          <p className="text-center text-xs text-muted-foreground">Next photo will be tagged: <b className="text-foreground">{room} &gt; {trade}</b></p>
          <p className="pt-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Today's Photos ({photos.length})</p>
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            {photos.map((p) => (
              <div key={p.id} className="relative w-28 shrink-0 overflow-hidden rounded-xl animate-screen">
                <img src={site} alt="Site" loading="lazy" width={816} height={816} className="aspect-square w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-ink/75 p-1.5 text-[9px] font-bold text-ink-foreground">{p.room} › {p.trade}<br /><span className="opacity-70">{p.time}</span></div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <button onClick={speak} className={cn("flex w-full items-center gap-3 rounded-2xl p-4 text-left transition", listening ? "bg-ink text-ink-foreground" : "bg-card border border-border")}>
            <span className={cn("flex size-14 shrink-0 items-center justify-center rounded-full", listening ? "bg-danger" : "bg-ink text-ink-foreground")}><Mic className="size-7" /></span>
            {listening ? (
              <div className="flex h-10 flex-1 items-center gap-1">
                {Array.from({ length: 18 }).map((_, i) => <span key={i} className="h-full w-1.5 rounded-full bg-whatsapp animate-wave" style={{ animationDelay: `${i * 0.07}s` }} />)}
              </div>
            ) : (
              <div><p className="font-extrabold">Hold to Speak</p><p className="text-xs text-muted-foreground">Hindi / English / Marathi</p></div>
            )}
          </button>
          {parsed && (
            <Card className="space-y-3 border-info/40 animate-screen">
              <p className="text-xs italic text-muted-foreground">Heard: "loft shutter ke neeche gap hai, Imran ko Thursday tak fix karne bolo"</p>
              {editing ? (
                <input value={parsed.title} onChange={(e) => setParsed({ ...parsed, title: e.target.value })} className="w-full rounded-lg border border-input px-3 py-2 text-sm font-bold" />
              ) : <p className="font-extrabold">{parsed.title}</p>}
              <div className="flex flex-wrap gap-1.5">
                <Chip tone="info">Kitchen › Carpentry</Chip><Chip>{parsed.assignee}</Chip><Chip tone="warning">Due {parsed.due}</Chip>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Btn className="px-2 text-xs" onClick={() => { setPunch((p) => [{ id: Date.now(), title: parsed.title, who: "Imran - Carpentry", due: "Due Thu", done: false }, ...p]); setParsed(null); setEditing(false); toast.success("Task added to punch list"); }}><Plus className="size-3.5" />Add</Btn>
                <Btn variant="outline" className="px-2 text-xs" onClick={() => setEditing(!editing)}><Pencil className="size-3.5" />{editing ? "Done" : "Edit"}</Btn>
                <Btn variant="danger" className="px-2 text-xs" onClick={() => { setParsed(null); toast("Task discarded"); }}><Trash2 className="size-3.5" />Discard</Btn>
              </div>
            </Card>
          )}
        </section>

        <section className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Today's Punch List · {open.length} open</p>
          {punch.map((p) => (
            <button key={p.id} onClick={() => { setPunch((all) => all.map((x) => x.id === p.id ? { ...x, done: !x.done } : x)); toast(p.done ? "Reopened" : "Marked complete"); }} className="flex w-full items-start gap-3 rounded-xl border border-border bg-card p-3 text-left">
              <span className={cn("mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md border-2", p.done ? "border-success bg-success text-success-foreground" : "border-border")}>{p.done && <Check className="size-4" />}</span>
              <div><p className={cn("text-sm font-bold", p.done && "text-muted-foreground line-through")}>{p.title}</p><p className="text-xs text-muted-foreground">{p.who} · {p.done ? "Completed" : p.due}</p></div>
            </button>
          ))}
        </section>
      </div>
      <div className="absolute inset-x-0 bottom-[76px] z-20 space-y-2 border-t border-border bg-background/95 p-3 backdrop-blur">
        <Btn className="w-full text-xs" onClick={() => setModal("punch")}><Send className="size-4" />Send Punch List to Ramesh on WhatsApp</Btn>
        <Btn variant="ink" className="w-full text-xs" onClick={() => setModal("summary")}><FileText className="size-4" />End Visit & Draft Client Daily Summary</Btn>
      </div>
      <Modal open={modal === "punch"} onClose={() => setModal(null)} title="Punch List → Ramesh">
        <WhatsAppPreview to="Ramesh (Site Supervisor)" message={punchMsg} onSent={() => setModal(null)} />
      </Modal>
      <Modal open={modal === "summary"} onClose={() => setModal(null)} title="Client Daily Summary">
        <WhatsAppPreview to="Mr. Rohit Sharma" message={summaryMsg} onSent={() => setModal(null)}
          extra={<div className="mb-2 ml-auto grid w-[90%] grid-cols-3 gap-1">{photos.slice(0, 3).map((p) => <img key={p.id} src={site} alt="" className="aspect-square rounded-lg object-cover" />)}</div>} />
      </Modal>
    </div>
  );
}

function Pills({ items, value, onChange }: { items: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto">
      {items.map((i) => (
        <button key={i} onClick={() => onChange(i)} className={cn("shrink-0 rounded-full px-3.5 py-2 text-xs font-bold", value === i ? "bg-ink text-ink-foreground" : "border border-border bg-card")}>{i}</button>
      ))}
      <button onClick={() => toast("Add custom tag")} className="shrink-0 rounded-full border border-dashed border-border px-3 text-xs font-bold text-muted-foreground">+</button>
    </div>
  );
}
