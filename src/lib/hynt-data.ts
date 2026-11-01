export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export type Health = "R" | "A" | "G";
export type Project = { id: string; name: string; health: Health; status: string; pct: number };

export const PROJECTS: Project[] = [
  { id: "sharma", name: "Sharma 3BHK, Baner", health: "R", status: "At Risk · 2d late", pct: 62 },
  { id: "iyer", name: "Iyer 2BHK, Wakad", health: "A", status: "Tile Approval Pending", pct: 41 },
  { id: "khan", name: "Khan 2BHK, Kharadi", health: "G", status: "Civil Done · ₹1.8L Ready to Bill", pct: 70 },
];

export const ROOMS = ["Kitchen", "Living Room", "Master Bed", "Bath 1"];
export const TRADES = ["Civil", "Electrical", "Carpentry", "Painting"];

export type PunchItem = { id: number; title: string; who: string; due: string; done: boolean };
export const INITIAL_PUNCH: PunchItem[] = [
  { id: 1, title: "Chipped floor tile skirting in MBR", who: "Ramesh - Civil", due: "Due Fri", done: false },
  { id: 2, title: "Switch plate misaligned in Hall", who: "Sunil - Electrical", due: "Completed", done: true },
];

export const TEAM = [
  { name: "Ramesh", role: "Site Supervisor", phone: "+91 98220 41123" },
  { name: "Imran", role: "Carpentry Lead · 4 workers", phone: "+91 98903 22871" },
  { name: "Sunil", role: "Electrical Lead", phone: "+91 97644 10982" },
  { name: "Raju", role: "Plywood Vendor", phone: "+91 90110 55320" },
];

export const APPROVAL_MSG =
  "Hi Mr. Sharma, one decision needed for the master bedroom laminate. It changes the total by + ₹18,400. Tap here to review & approve: hynt.studio/appr/sharma-31";
