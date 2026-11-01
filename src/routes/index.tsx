import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { LayoutGrid, Camera, CheckSquare, Globe, Search, ChevronDown, Smartphone, Monitor } from "lucide-react";
import { PROJECTS } from "@/lib/hynt-data";
import { Workspace } from "@/components/hynt/Workspace";
import { SiteCapture } from "@/components/hynt/SiteCapture";
import { ApprovalsHub } from "@/components/hynt/Approvals";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HYNT Studio PM — Site-ready project management for designers" },
      { name: "description", content: "Approvals over WhatsApp, voice-to-task site visits and cash-flow milestones for interior design studios." },
      { property: "og:title", content: "HYNT Studio PM" },
      { property: "og:description", content: "Site-ready project management for interior designers in Indian metros." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Screen = "workspace" | "capture" | "approvals" | "client";
const dot = { R: "bg-danger", A: "bg-warning", G: "bg-success" };

function Index() {
  const [frame, setFrame] = useState<"mobile" | "desktop">("mobile");
  const [screen, setScreen] = useState<Screen>("approvals");
  const [pid, setPid] = useState("sharma");
  const [open, setOpen] = useState(false);
  const project = PROJECTS.find((p) => p.id === pid)!;
  const approvalsView = screen === "client" ? "client" : "designer";

  const app = (
    <div className="relative flex h-full flex-col overflow-hidden bg-background">
      {screen !== "client" && (
        <header className="relative z-30 flex items-center gap-2 border-b border-border bg-card px-4 py-3">
          <button onClick={() => setOpen(!open)} className="flex min-w-0 flex-1 items-center gap-2 text-left">
            <span className={cn("size-2.5 shrink-0 rounded-full", dot[project.health])} />
            <div className="min-w-0"><p className="truncate text-sm font-extrabold">{project.name}</p><p className="truncate text-[11px] text-muted-foreground">{project.status} · {project.pct}%</p></div>
            <ChevronDown className="size-4 shrink-0" />
          </button>
          <button aria-label="Search" onClick={() => toast("Search across projects")} className="rounded-full p-2 hover:bg-muted"><Search className="size-5" /></button>
          <div title="MK - Studio Kulkarni" className="flex size-9 items-center justify-center rounded-full bg-ink text-xs font-extrabold text-ink-foreground">MK</div>
          {open && (
            <div className="absolute inset-x-3 top-full mt-1 rounded-2xl border border-border bg-popover p-2 shadow-xl animate-screen">
              {PROJECTS.map((p) => (
                <button key={p.id} onClick={() => { setPid(p.id); setOpen(false); toast(`Switched to ${p.name}`); }} className={cn("flex w-full items-center gap-3 rounded-xl p-2.5 text-left hover:bg-muted", p.id === pid && "bg-muted")}>
                  <span className={cn("flex size-7 items-center justify-center rounded-full text-[10px] font-extrabold text-ink-foreground", dot[p.health])}>{p.health}</span>
                  <div className="flex-1"><p className="text-sm font-bold">{p.name}</p><p className="text-[11px] text-muted-foreground">{p.status}</p></div>
                  <span className="text-xs font-bold">{p.pct}%</span>
                </button>
              ))}
            </div>
          )}
        </header>
      )}
      <main key={screen} className="no-scrollbar flex-1 overflow-y-auto pb-24">
        {screen === "workspace" && <Workspace project={project} />}
        {screen === "capture" && <SiteCapture projectName={project.name} />}
        {(screen === "approvals" || screen === "client") && (
          <ApprovalsHub view={approvalsView} setView={(v) => setScreen(v === "client" ? "client" : "approvals")} />
        )}
      </main>
      <nav className="absolute inset-x-0 bottom-0 z-30 flex h-[76px] items-end justify-around border-t border-border bg-card px-2 pb-3">
        <NavBtn icon={LayoutGrid} label="Workspace" active={screen === "workspace"} onClick={() => setScreen("workspace")} />
        <button onClick={() => setScreen("capture")} className="-mt-6 flex flex-col items-center gap-1">
          <span className={cn("flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow", screen === "capture" && "ring-4 ring-accent")}><Camera className="size-6" /></span>
          <span className={cn("text-[10px] font-bold", screen === "capture" ? "text-primary" : "text-muted-foreground")}>Site Capture</span>
        </button>
        <NavBtn icon={CheckSquare} label="Approvals" active={screen === "approvals"} onClick={() => setScreen("approvals")} />
        <NavBtn icon={Globe} label="Client View" active={screen === "client"} onClick={() => setScreen("client")} />
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted">
      <div className="flex items-center justify-center gap-3 p-3">
        <span className="hidden text-sm font-extrabold sm:block">HYNT <span className="text-primary">Studio PM</span></span>
        <div className="flex rounded-full bg-card p-1 text-xs font-bold shadow-sm">
          <button onClick={() => setFrame("mobile")} className={cn("flex items-center gap-1.5 rounded-full px-3 py-1.5", frame === "mobile" && "bg-ink text-ink-foreground")}><Smartphone className="size-3.5" />Mobile Frame (iPhone 15 Pro)</button>
          <button onClick={() => setFrame("desktop")} className={cn("flex items-center gap-1.5 rounded-full px-3 py-1.5", frame === "desktop" && "bg-ink text-ink-foreground")}><Monitor className="size-3.5" />Desktop View</button>
        </div>
      </div>
      {frame === "mobile" ? (
        <div className="mx-auto h-[calc(100vh-60px)] max-w-[430px] sm:h-[860px] sm:py-2">
          <div className="h-full overflow-hidden sm:rounded-[2.75rem] sm:shadow-device">{app}</div>
        </div>
      ) : (
        <div className="mx-auto flex max-w-6xl items-center gap-12 px-8 py-6">
          <div className="hidden flex-1 lg:block">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">For boutique design studios</p>
            <h1 className="mt-3 text-5xl font-extrabold leading-[1.05] tracking-tight">Run 4–8 renovations from your pocket.</h1>
            <p className="mt-4 max-w-md text-muted-foreground">Zero-login client approvals over WhatsApp, voice-to-task site visits, and milestone billing — built for Indian metro sites.</p>
          </div>
          <div className="mx-auto h-[844px] w-[390px] shrink-0 overflow-hidden rounded-[3rem] shadow-device">{app}</div>
        </div>
      )}
    </div>
  );
}

function NavBtn({ icon: Icon, label, active, onClick }: { icon: typeof Globe; label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={cn("flex w-16 flex-col items-center gap-1", active ? "text-primary" : "text-muted-foreground")}>
      <Icon className="size-5" /><span className="text-[10px] font-bold">{label}</span>
    </button>
  );
}
