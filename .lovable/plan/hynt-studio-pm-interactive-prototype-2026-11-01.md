# HYNT Studio PM — interactive prototype

Front-end only prototype (no backend), all data is realistic mock data held in app state.

## Shell
- Top toggle: "Mobile Frame (iPhone 15 Pro)" vs "Desktop View" (desktop centers the phone inside a device mockup).
- Top bar: project switcher (Sharma / Iyer / Khan with R/A/G status, % done), search icon, "MK" avatar.
- Bottom nav: Workspace | Site Capture (raised center button) | Approvals Hub | Client View.
- Colors: Slate #0F172A, Emerald #16A34A, surface #F8FAFC, Amber/Red/Sky badges. Font: Plus Jakarta Sans.

## Screens
1. **Approvals Hub** — Designer/Client tab toggle.
   - Designer: status tabs, Decision #31 hero card (Option A vs B images, cost/timeline chips), Share on WhatsApp modal with exact message, Nudge/Edit/Withdraw, queued Decision #32.
   - Client (zero-login): radio options, financial explanation, Approve CTA → timestamped success state, question/voice fallback buttons.
2. **Site Capture** — sticky header with offline badge, room/trade chips, shutter adds tagged photo cards, hold-to-speak with animated soundwave → parsed editable task card → adds to punch list, live checklist, WhatsApp punch-list modal, End Visit daily summary modal.
3. **Workspace** — health header + metrics, sub-nav pills, phase progress bars, critical blocker card, money milestones with Raise Bill modal (invoice preview + share), team roster with Call/WhatsApp.
4. **Client View** nav item opens the client approval page directly.

## Polish
Smooth screen transitions, reusable WhatsApp-preview modal, toasts on every action, consistent ₹ formatting (en-IN). Generated sample images for laminates and site photos.

## Technical
- Single route `/` with state-driven screens; components under `src/components/hynt/`; mock data in `src/lib/hynt-data.ts`.
- Sonner toaster mounted in root; design tokens in styles.css; head() metadata for index.
