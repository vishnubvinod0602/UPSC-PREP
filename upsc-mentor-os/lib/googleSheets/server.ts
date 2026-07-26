const SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;

if (!SCRIPT_URL) {
  throw new Error(
    "GOOGLE_APPS_SCRIPT_URL environment variable is missing."
  );
}

async function parseResponse<T>(res: Response): Promise<T> {
  const text = await res.text();

  if (!res.ok) {
    throw new Error(
      `Google Apps Script Error (${res.status}): ${text}`
    );
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(
      `Invalid JSON returned from Google Apps Script:\n${text}`
    );
  }
}

export async function fetchSheet<T>(
  sheet: string,
  params?: Record<string, string>
): Promise<T[]> {
  const query = new URLSearchParams({
    sheet,
    ...(params ?? {}),
  });

  const res = await fetch(
    `${SCRIPT_URL!}?${query.toString()}`,
    {
      cache: "no-store",
    }
  );

  return parseResponse<T[]>(res);
}

async function postAction<T>(
  action: string,
  sheet: string,
  payload: Record<string, unknown>
): Promise<T> {
  const res = await fetch(SCRIPT_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action,
      sheet,
      ...payload,
    }),
  });

  return parseResponse<T>(res);
}

export function addRow(
  sheet: string,
  data: unknown
) {
  return postAction("add", sheet, {
    data,
  });
}

export function updateRow(
  sheet: string,
  id: string,
  data: unknown
) {
  return postAction("update", sheet, {
    id,
    data,
  });
}

export function deleteRow(
  sheet: string,
  id: string
) {
  return postAction("delete", sheet, {
    id,
  });
}

export function importRows(
  sheet: string,
  data: unknown[]
) {
  return postAction("import", sheet, {
    data,
  });
}