import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type {
  OverviewData,
  GenderIdentityResponse,
  CulturalIdentityData,
  EthnicityData,
  WellnessNeedsData,
} from "@/Services/api/demographics";

export type DemographicsReportData = {
  overview: OverviewData;
  gender: GenderIdentityResponse;
  cultural: CulturalIdentityData;
  ethnicity: EthnicityData;
  wellness: WellnessNeedsData;
};

// Amelia Sage brand sage-green, as RGB for jsPDF.
const SAGE: [number, number, number] = [139, 170, 135];
const CHARCOAL: [number, number, number] = [45, 45, 45];
const MUTED: [number, number, number] = [150, 150, 150];
const MARGIN = 40;

type Row = (string | number)[];

// jspdf-autotable attaches `lastAutoTable` to the doc at runtime but does not
// augment the jsPDF type in v5, so we type it explicitly here.
type AutoTableDoc = jsPDF & { lastAutoTable?: { finalY: number } };

/**
 * Builds and downloads a branded "User Demographics Report" PDF from the
 * already-fetched demographics data. Pure formatting utility — no data fetching.
 */
export function buildDemographicsPdf(d: DemographicsReportData): void {
  const doc: AutoTableDoc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const generatedAt = new Date();

  // ── Header banner ──
  doc.setFillColor(...SAGE);
  doc.rect(0, 0, pageWidth, 88, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("User Demographics Report", MARGIN, 46);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(`Amelia Sage  •  Generated ${generatedAt.toLocaleString()}`, MARGIN, 68);

  // Adds a titled table that flows after the previous one (new page if needed).
  const section = (title: string, head: string[], body: Row[]) => {
    const prevY = doc.lastAutoTable?.finalY ?? 100;
    let titleY = prevY + 30;
    if (titleY > pageHeight - 90) {
      doc.addPage();
      titleY = 56;
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(...CHARCOAL);
    doc.text(title, MARGIN, titleY);
    autoTable(doc, {
      startY: titleY + 8,
      head: [head],
      body: body.map((r) => r.map((c) => String(c))),
      theme: "grid",
      headStyles: { fillColor: SAGE, textColor: 255, fontStyle: "bold" },
      styles: { fontSize: 10, cellPadding: 6 },
      alternateRowStyles: { fillColor: [247, 250, 247] },
      margin: { left: MARGIN, right: MARGIN },
    });
  };

  const ov = d.overview.data;
  const growthLabel = `${ov.growth_percentage >= 0 ? "+" : ""}${ov.growth_percentage}% vs last month`;

  // ── Summary ──
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...CHARCOAL);
  doc.text("Summary", MARGIN, 116);
  autoTable(doc, {
    startY: 124,
    head: [["Metric", "Value"]],
    body: [
      ["Total Users", String(ov.total_users)],
      ["New This Month", `${ov.new_this_month}  (${growthLabel})`],
      ["New Last Month", String(ov.new_last_month)],
      ["Most Common Age Range", ov.average_age ?? "N/A"],
    ],
    theme: "grid",
    headStyles: { fillColor: SAGE, textColor: 255, fontStyle: "bold" },
    styles: { fontSize: 10, cellPadding: 6 },
    alternateRowStyles: { fillColor: [247, 250, 247] },
    margin: { left: MARGIN, right: MARGIN },
  });

  // ── Gender identity ──
  section(
    "Gender Identity Distribution",
    ["Gender", "Users", "Percentage"],
    d.gender.data.distribution.map((g) => [g.gender, g.count, `${g.percentage}%`]),
  );

  // ── Cultural identity ──
  section(
    "Cultural Identity Distribution",
    ["Cultural Identity", "Users", "Percentage"],
    d.cultural.data.distribution.map((c) => [c.identity, c.count, `${c.percentage}%`]),
  );

  // ── Ethnicity ──
  section(
    "Ethnicity (Hispanic / Latina) Breakdown",
    ["Response", "Users", "Percentage"],
    d.ethnicity.data.response_breakdown.map((e) => [e.label, e.count, `${e.percentage}%`]),
  );

  // ── Wellness support needs ──
  section(
    "Wellness Support Needs",
    ["Support Area", "Users", "Percentage"],
    d.wellness.data.wellness_support_needs.distribution.map((w) => [
      w.area,
      w.count,
      `${w.percentage}%`,
    ]),
  );

  // ── Wellness journey progress ──
  const wj = d.wellness.data.wellness_journey_progress;
  section(
    "Wellness Journey Progress",
    ["Stage", "Users", "Percentage"],
    [
      ["Active Progress", wj.active_progress.users_count, `${wj.active_progress.percentage}%`],
      ["Goal Achievement", wj.goal_achievement.users_count, `${wj.goal_achievement.percentage}%`],
    ],
  );

  // ── Footer (page numbers) ──
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setTextColor(...MUTED);
    doc.text("Confidential — Amelia Sage", MARGIN, pageHeight - 24);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - MARGIN, pageHeight - 24, {
      align: "right",
    });
  }

  const stamp = generatedAt.toISOString().slice(0, 10);
  doc.save(`amelia-demographics-report-${stamp}.pdf`);
}
