/**
 * Job openings come from a Google Sheet the client edits (decision 2026-10-13).
 * Setup: create the sheet from docs/careers-openings-template.csv, then File → Share → Publish to web →
 * the sheet → Comma-separated values (.csv) → Publish, and paste that link below.
 * Columns (first row, exact names): Role, Department, Location, Experience, Type, Description, Status
 * Only rows with Status "Open" are shown. Changes appear on the site within a few minutes, no redeploy.
 */
export const OPENINGS_CSV_URL = '';

export interface Opening {
  role: string;
  department: string;
  location: string;
  experience: string;
  type: string;
  description: string;
}

/** Minimal CSV reader that handles quoted cells, commas and line breaks inside quotes. */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') {
      row.push(cell);
      cell = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
    } else cell += c;
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => c.trim()));
}

export async function loadOpenings(): Promise<Opening[]> {
  if (!OPENINGS_CSV_URL) return [];
  const res = await fetch(OPENINGS_CSV_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error('openings unavailable');
  const [head, ...rows] = parseCsv(await res.text());
  const col = (name: string) => head.findIndex((h) => h.trim().toLowerCase() === name);
  const at = (r: string[], name: string) => (r[col(name)] ?? '').trim();
  return rows
    .filter((r) => at(r, 'status').toLowerCase() === 'open' && at(r, 'role'))
    .map((r) => ({
      role: at(r, 'role'),
      department: at(r, 'department'),
      location: at(r, 'location'),
      experience: at(r, 'experience'),
      type: at(r, 'type'),
      description: at(r, 'description'),
    }));
}
