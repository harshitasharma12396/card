import { invite } from "@/content/invite";

const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const esc = (s: string) => s.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");

/** Builds a calendar file with every ceremony so guests can save the dates (times are India Standard Time). */
export function buildCalendar(): string {
  const { couple, events } = invite;
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Wedding Invitation//EN", "CALSCALE:GREGORIAN"];
  const now = stamp(new Date());
  events.forEach((day) => {
    const venue = ("venue" in day && day.venue) || "";
    day.ceremonies.forEach((c, i) => {
      const start = new Date(`${day.date}T${c.at}:00+05:30`);
      const end = new Date(start.getTime() + 90 * 60 * 1000);
      lines.push(
        "BEGIN:VEVENT",
        `UID:${day.id}-${i}@wedding-invite`,
        `DTSTAMP:${now}`,
        `DTSTART:${stamp(start)}`,
        `DTEND:${stamp(end)}`,
        `SUMMARY:${esc(`${c.name}: ${couple.first} & ${couple.second}`)}`,
        `LOCATION:${esc(venue)}`,
        "END:VEVENT",
      );
    });
  });
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

export function downloadCalendar() {
  const blob = new Blob([buildCalendar()], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "wedding-dates.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
