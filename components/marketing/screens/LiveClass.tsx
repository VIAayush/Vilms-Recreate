import { MessageSquare, Mic, Users, Video } from "lucide-react";
import { Avatar, LiveDot } from "./primitives";

// A live class in progress, inside the institute's own platform.
export function LiveClassScreen() {
  const people = ["Sneha P", "Aman V", "Isha M", "Karan S", "Divya R", "Arjun T"];
  return (
    <div className="grid gap-3 p-3 sm:grid-cols-[1fr_210px] sm:p-4">
      <div className="relative overflow-hidden rounded-xl bg-[rgb(23_23_23)] p-3 text-white">
        <div className="flex items-center gap-2 text-[11px] font-semibold">
          <LiveDot /> Live · Polity · Batch A
          <span className="ml-auto rounded bg-white/10 px-2 py-0.5 text-[10px] font-medium">42 joined</span>
        </div>
        <div className="mt-3 grid aspect-[16/8] place-items-center rounded-lg bg-[radial-gradient(circle_at_50%_40%,rgb(60_64_67),rgb(32_33_36))]">
          <div className="text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[rgb(26_115_232)] text-[18px] font-semibold">MI</span>
            <p className="mt-2 text-[12px] text-white/80">Meera Iyer · presenting</p>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-6 gap-1.5">
          {people.map((p, i) => (
            <div key={p} className="grid aspect-video place-items-center rounded-md bg-white/10">
              <Avatar name={p} size="sm" tone={i % 5} />
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-center gap-2">
          {[Mic, Video, MessageSquare, Users].map((I, i) => (
            <span key={i} className="grid h-8 w-8 place-items-center rounded-full bg-white/10">
              <I aria-hidden className="h-3.5 w-3.5" />
            </span>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <div className="rounded-xl border border-edge bg-panel p-3">
          <p className="text-[10.5px] text-fg-muted">Part of</p>
          <p className="text-[12.5px] font-semibold">Prelims Foundation Batch</p>
          <p className="mt-2 text-[10.5px] text-fg-muted">Zoom link attached · reminders sent</p>
        </div>
        <div className="rounded-xl border border-edge bg-panel p-3">
          <p className="text-[10.5px] text-fg-muted">RSVPs</p>
          <p className="font-display text-[24px] font-semibold">42</p>
          <div className="mt-1 h-1.5 rounded-full bg-sunken">
            <div className="h-full w-[84%] rounded-full bg-green" />
          </div>
          <p className="mt-1.5 text-[10.5px] text-fg-muted">of 50 in the batch</p>
        </div>
      </div>
    </div>
  );
}

