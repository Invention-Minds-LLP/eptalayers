/**
 * Posts a form to Netlify Forms. The matching hidden form in index.html registers the fields at deploy time;
 * Netlify stores each submission (and any uploaded file) and emails it to the addresses set under
 * Site settings → Forms → Form notifications. Resolves false when the post fails (e.g. on a local preview).
 */
export async function submitNetlifyForm(formName: string, fields: Record<string, string | File | null | undefined>): Promise<boolean> {
  const hasFile = Object.values(fields).some((v) => v instanceof File);
  try {
    let res: Response;
    if (hasFile) {
      const data = new FormData();
      data.append('form-name', formName);
      for (const [k, v] of Object.entries(fields)) if (v != null) data.append(k, v);
      res = await fetch('/', { method: 'POST', body: data });
    } else {
      const body = new URLSearchParams({ 'form-name': formName });
      for (const [k, v] of Object.entries(fields)) if (v != null) body.append(k, String(v));
      res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
    }
    return res.ok;
  } catch {
    return false;
  }
}
