import { site, type DayKey } from "@/data/site";

const keys: DayKey[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

// Returns null when hours have not been entered, so no status is shown.
export function isOpenNow(now = new Date()): boolean | null {
  const hours = site.hours;
  if (!hours) return null;
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: site.timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = keys.findIndex((k) => k === get("weekday").toLowerCase().slice(0, 3));
  const minutes = (Number(get("hour")) % 24) * 60 + Number(get("minute"));

  const today = hours[keys[day]];
  if (today) {
    const open = toMinutes(today.open);
    const close = toMinutes(today.close);
    if (close > open ? minutes >= open && minutes < close : minutes >= open) return true;
  }
  // Hours from yesterday that run past midnight.
  const y = hours[keys[(day + 6) % 7]];
  if (y) {
    const open = toMinutes(y.open);
    const close = toMinutes(y.close);
    if (close <= open && minutes < close) return true;
  }
  return false;
}
