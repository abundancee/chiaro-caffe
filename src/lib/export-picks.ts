import { formatPrice, type MenuItem } from "@/data/menu";
import { fullAddress, site } from "@/data/site";

interface ExportLine {
  item: MenuItem;
  quantity: number;
  options: Record<string, string>;
  note: string;
}

const INK: [number, number, number] = [23, 18, 15];
const ROAST: [number, number, number] = [92, 74, 61];
const BRASS: [number, number, number] = [184, 151, 90];

async function logoDataUrl() {
  const blob = await (await fetch("/images/site/logo-pdf.png")).blob();
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function buildPdf(lines: ExportLine[], total: number, table: string) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a5" });
  doc.setProperties({ title: `${site.name}: My picks`, author: site.name });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const M = 14;

  const frame = () => {
    doc.setDrawColor(...BRASS);
    doc.setLineWidth(0.25);
    doc.rect(6, 6, W - 12, H - 12);
  };
  frame();

  const logo = await logoDataUrl();
  doc.addImage(logo, "PNG", W / 2 - 9, 11, 18, 18 * (909 / 783), undefined, "FAST");

  let y = 39;
  doc.setTextColor(...INK);
  doc.setFont("times", "italic");
  doc.setFontSize(19);
  doc.text("My picks", W / 2, y, { align: "center" });
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...ROAST);
  const when = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: site.timeZone }).format(new Date());
  doc.text(table.trim() ? `Table ${table.trim()}   ·   ${when}` : when, W / 2, y, { align: "center" });
  y += 5;
  doc.setDrawColor(...BRASS);
  doc.line(M, y, W - M, y);
  y += 8;

  for (const line of lines) {
    const details = [...Object.values(line.options), line.note].filter(Boolean).join(" · ");
    doc.setFont("times", "normal");
    doc.setFontSize(13);
    const name = doc.splitTextToSize(line.item.name, W - M * 2 - 44) as string[];
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const notes = details ? (doc.splitTextToSize(details, W - M * 2 - 44) as string[]) : [];
    const height = name.length * 5.4 + notes.length * 4.2 + 5;
    if (y + height > H - 34) {
      doc.addPage();
      frame();
      y = 16;
    }
    doc.setTextColor(...INK);
    doc.setFont("times", "normal");
    doc.setFontSize(16);
    doc.text(`${line.quantity}`, M, y);
    doc.setFontSize(13);
    doc.text(name, M + 11, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.text(formatPrice(line.item.price * line.quantity), W - M, y, { align: "right" });
    y += name.length * 5.4 - 1;
    if (notes.length) {
      doc.setFontSize(9);
      doc.setTextColor(...ROAST);
      doc.text(notes, M + 11, y);
      y += notes.length * 4.2;
    }
    y += 5;
  }

  y -= 2;
  doc.setDrawColor(...BRASS);
  doc.line(M, y, W - M, y);
  y += 8;
  doc.setTextColor(...INK);
  doc.setFont("times", "italic");
  doc.setFontSize(14);
  doc.text("Total", M, y);
  doc.setFont("times", "normal");
  doc.setFontSize(17);
  doc.text(formatPrice(total), W - M, y, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...ROAST);
  const pages = doc.getNumberOfPages();
  for (let p = 1; p <= pages; p++) {
    doc.setPage(p);
    doc.text("A list of what you fancy, to show a member of staff. Not a receipt.", W / 2, H - 16, { align: "center" });
    doc.text(`${fullAddress}  ·  ${site.phone}`, W / 2, H - 12, { align: "center", maxWidth: W - 20 });
  }
  return doc.output("blob");
}

// The tab has to open during the click or browsers block it, so it opens first and receives the PDF once it is ready.
export async function openPicksPdf(lines: ExportLine[], total: number, table: string) {
  const tab = window.open("", "_blank");
  try {
    const url = URL.createObjectURL(await buildPdf(lines, total, table));
    if (tab) {
      tab.location.href = url;
    } else {
      const link = document.createElement("a");
      link.href = url;
      link.download = "chiaro-my-picks.pdf";
      link.click();
    }
    window.setTimeout(() => URL.revokeObjectURL(url), 120_000);
  } catch (error) {
    tab?.close();
    throw error;
  }
}
